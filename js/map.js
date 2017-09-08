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
    var imgNumber = function () {
      if (i < 100) {
        return '0' + (+i + 1);
      } return i;
    };
    announceArr.push(
        {
          'author': {
            'avatar': 'img/avatars/user' + imgNumber() + '.png'
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
var createPin = function (pinNumber, index) {
  var pinElement = document.createElement('div');
  var pinImg = document.createElement('img');
  pinElement.setAttribute('data-index', index);
  pinElement.setAttribute('style', 'left:' + pinNumber.location.x + 'px; top:' + pinNumber.location.y + 'px');
  pinElement.setAttribute('tabindex', 0);
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
  var pinElem = createPin(announcements[i], i);
  fragment.appendChild(pinElem);
}

//  суем фрагмент в контейнер
pinsContainer.appendChild(fragment);


//  создаем новую панель диалога
var createNewDialogPanel = function (announcement) {
  var template = document.querySelector('#lodge-template');
  var newDialogPanel = template.content.cloneNode(true);
  newDialogPanel.querySelector('.lodge__title').textContent = announcement.offer.title;
  newDialogPanel.querySelector('.lodge__address').textContent = announcement.offer.address;
  newDialogPanel.querySelector('.lodge__price').innerHTML = announcement.offer.price + ' ' + '&#x20bd;/ночь';
  newDialogPanel.querySelector('.lodge__type').textContent = OFFER_TYPE[announcement.offer.type];
  newDialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + announcement.offer.guests + ' гостей в ' + announcement.offer.rooms + ' комнатах';
  newDialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  (function () {
    for (var j = 0; j < announcement.offer.features.length; j++) {
      var k = '<span class = "feature__image feature__image--' + announcement.offer.features[j] + '"' + '></span>';
      newDialogPanel.querySelector('.lodge__features').innerHTML += k;
    }
  }());
  newDialogPanel.querySelector('.lodge__description').textContent = announcement.offer.description;
  return newDialogPanel;
};

//  меняем старую панель на новую
var changeDialogPanel = function (announcement) {
  var dialog = document.querySelector('#offer-dialog');
  var panel = document.querySelector('.dialog__panel');
  var img = document.querySelector('.dialog__title img');
  dialog.removeChild(panel);
  dialog.appendChild(createNewDialogPanel(announcement));
  img.setAttribute('src', announcement.author.avatar);
};

//  пишем обработчики событий
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
var dialog = document.querySelector('#offer-dialog');
var dialogClose = dialog.querySelector('.dialog__close');
dialogClose.setAttribute('tabindex', 1);
dialog.classList.add('hidden');

//  обработчик по клику на контейнер с объявлениями

var getAttribute = function (targetElem) {
  if ((targetElem.getAttribute('data-index')) !== null) {
    return (targetElem.getAttribute('data-index'));
  } else {
    return (targetElem.parentNode.getAttribute('data-index'));
  }
};

pinsContainer.addEventListener('click', function (e) {
  var activePin = document.querySelector('.pin--active');
  var target = e.target;

//  получаем значение дата атрибута
  changeDialogPanel(announcements[getAttribute(target)]);
  if (activePin !== null) {
    activePin.classList.remove('pin--active');
  }
  if (target.classList.contains('pin')) {
    target.classList.add('pin--active');
    dialog.classList.remove('hidden');

  } else {
    target.parentNode.classList.add('pin--active');
    dialog.classList.remove('hidden');
  }


});

// функция удаления класса активного пина
var removeActivePin = function () {
  var activePin = document.querySelector('.pin--active');
  if (activePin !== null) {
    activePin.classList.remove('pin--active');
  }
};

// удаление активного пина по клику
var onDialogCloseClick = function () {
  dialog.classList.add('hidden');
  removeActivePin();
};

//  удаление активного пина по нажатию esc
var onEscapeTap = function (e) {
  if (e.keyCode === ESCAPE_KEY) {
    dialog.classList.add('hidden');
  }
  removeActivePin();
};

var onEnterTap = function (e) {
  if (e.keyCode === ENTER_KEY) {
    dialog.classList.remove('hidden');
  }
};
pinsContainer.addEventListener('keydown', onEnterTap);
document.addEventListener('keydown', onEscapeTap);
dialogClose.addEventListener('click', onDialogCloseClick);

// делаем валидацию форм

var addressForm = document.querySelector('#address');
addressForm.setAttribute('required', 'required');

var formTitle = document.querySelector('#title');
formTitle.setAttribute('required', 'required');
formTitle.setAttribute('minlength', '30');
formTitle.setAttribute('maxlength', '100');

var priceForNight = document.querySelector('#price');
priceForNight.setAttribute('required', 'required');
priceForNight.setAttribute('type', 'number');
priceForNight.setAttribute('placeholder', '1000');
priceForNight.setAttribute('min', '1000');
priceForNight.setAttribute('max', '1000000');

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var onTimeInClick = function(e) {
  timeOut.value = timeIn.value;
  timeOut.setAttribute('required','required');
};
timeIn.addEventListener('change', onTimeInClick);

var houseType = document.querySelector('#type');
var onHouseTypeClick = function () {
  switch (houseType.value) {
    case 'house':
      priceForNight.setAttribute('min', '5000');
      break;
    case 'bungalo':
      priceForNight.setAttribute('min', '0');
      break;
    case 'flat':
      priceForNight.setAttribute('min', '1000');
      break;
    case 'palace':
      priceForNight.setAttribute('min', '10000');
      break;
}
};
houseType.addEventListener('change', onHouseTypeClick);

var roomNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');
var onRoomNumberClick = function() {
  switch (roomNumber.value) {
    case '1':
      guestsNumber.value = roomNumber.value;
      break;
    case '2':
      guestsNumber.value = roomNumber.value;
      break;
    case '3':
      guestsNumber.value = roomNumber.value;
      break;
    case '100':
      guestsNumber.value = 0;
      break;
  }
};
roomNumber.addEventListener('change', onRoomNumberClick);

//  выводим по умолчанию значения для 1 гостя
var changeSelects = function () {
  var firstSelect = document.querySelector('#capacity option:first-child');
  var thirdSelect = document.querySelector('#capacity option:nth-child(3)');
  firstSelect.setAttribute('selected', false);
  thirdSelect.setAttribute('selected', true);
}
changeSelects();

var noticeForm = document.querySelector('.notice__form');
noticeForm.setAttribute('action', 'https://1510.dump.academy/keksobooking');

var onNoticeFormSubmit = function (e) {
  noticeForm.reset();
}
noticeForm.addEventListener('submit', onNoticeFormSubmit);

//  подсветка незаполненных инпутов при отправке
var submitButton = document.querySelector('.form__submit');
var allFields = noticeForm.querySelectorAll('input');
var onSubmitFormClick = function() {
  for (i = 0; i < allFields.length; i++) {
    if (allFields[i].checkValidity() === false) {
      allFields[i].setAttribute('style', 'border:3px solid red');
    } else {
      allFields[i].setAttribute('style', 'border:1px solid #d9d9d3');
    }
  }
};
submitButton.addEventListener('click', onSubmitFormClick);
console.log(allFields);

