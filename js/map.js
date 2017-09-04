'use strict';


//  контейнер для флагов
var pinsContainer = document.querySelector('.tokyo__pin-map');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = [
  'flat',
  'house',
  'bungalo'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var CHECKIN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

var OFFER_TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
var getFeaturesArr = function () {
// debugger;
  var feature = [];
  var featuresClone = FEATURES.slice();
  var randomNumber = Math.floor(Math.random() * FEATURES.length + 1);
  for (var i = 0; i < randomNumber; i++) {
    var randomArrElem = getRandomNumber(0, featuresClone.length - 1);
    feature.push(featuresClone[randomArrElem]);
    featuresClone.splice(randomArrElem, 1);
  }
  return feature;
};

var createAnnouncements = function (announcementsCount) {
  var announceArr = [];
  for (var i = 0; i < announcementsCount; i++) {
    var location = {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(100, 500)
    };

    announceArr.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
          },
          'offer': {
            'title': OFFER_TITLES[getRandomNumber(0, OFFER_TITLES.length - 1)],
            'address': location.x + ', ' + location.y,
            'price': getRandomNumber(1000, 1000000),
            'rooms': getRandomNumber(1, 5),
            'guests': getRandomNumber(1, 10),
            'checkin': CHECKIN_OUT_TIMES[getRandomNumber(0, CHECKIN_OUT_TIMES.length - 1)],
            'checkout': CHECKIN_OUT_TIMES[getRandomNumber(0, CHECKIN_OUT_TIMES.length - 1)],
            'type': OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length - 1)],
            'features': getFeaturesArr(),
            'description': '',
            'photos': []
          },
          'location': {
            'x': location.x,
            'y': location.y
          }
        }
    );
  }
  return announceArr;
};

//  массив флагов
var announcements = createAnnouncements(8);


//  создаем одну метку с флагом
var createPin = function (pinNumber) {
  var pinElement = document.createElement('div');
  var pinImg = document.createElement('img');
  pinElement.setAttribute('style', 'left:' + pinNumber.location.x + 'px; top:' + pinNumber.location.y + 'px');
  pinElement.classList.add('pin');
  pinElement.appendChild(pinImg);
  pinImg.setAttribute('width', '40');
  pinImg.setAttribute('height', '40');
  pinImg.classList.add('rounded');
  pinImg.setAttribute('src', pinNumber.author.avatar);
  return pinElement;
};

var fragment = document.createDocumentFragment();

//  cуем флаги во фрагмент
for (var i = 0; i < announcements.length; i++) {
  var pinElem = createPin(announcements[i]);
  fragment.appendChild(pinElem);
}

//  суем флаги в контейнер
pinsContainer.appendChild(fragment);


//  создаем новую панель диалога
var createNewDialogPanel = function () {
  var template = document.querySelector('#lodge-template');
  var newDialogPanel = template.content.cloneNode(true);
  newDialogPanel.querySelector('.lodge__title').textContent = announcements[0].offer.title;
  newDialogPanel.querySelector('.lodge__address').textContent = announcements[0].offer.address;
  newDialogPanel.querySelector('.lodge__price').innerHTML = announcements[0].offer.price + ' ' + '&#x20bd;/ночь';
  newDialogPanel.querySelector('.lodge__type').textContent = OFFER_TYPE[announcements[0].offer.type];
  newDialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + announcements[0].offer.guests + ' гостей в ' + announcements[0].offer.rooms + ' комнатах';
  newDialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + announcements[0].offer.checkin + ', выезд до ' + announcements[0].offer.checkout;
  (function () {
    for (var j = 0; j < announcements[0].offer.features.length; j++) {
      var k = '<span class = "feature__image feature__image--' + announcements[0].offer.features[j] + '"' + '></span>';
      newDialogPanel.querySelector('.lodge__features').innerHTML += k;
    }
  }());
  newDialogPanel.querySelector('.lodge__description').textContent = announcements[0].offer.description;
  return newDialogPanel;
};

//  меняем старую панель на новую
var changeDialogPanel = function () {
  var dialog = document.querySelector('#offer-dialog');
  var panel = document.querySelector('.dialog__panel');
  var img = document.querySelector('.dialog__title img');
  dialog.removeChild(panel);
  dialog.appendChild(createNewDialogPanel());
  img.setAttribute('src', announcements[0].author.avatar);
};

changeDialogPanel();


