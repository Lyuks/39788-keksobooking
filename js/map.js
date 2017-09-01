var getRandomNumber = function(min,max){
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
var TYPES_OF_HOUSE = [
  'flat',
  'house',
  'bungalo'
]
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]
var CHECKIN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
]


var createAnnouncements = function(announcementsCount){
  var a = [];
  for (announcementsCount = 0; announcementsCount < 8; announcementsCount++) {
    var location = {
      x: getRandomNumber(300,900),
      y: getRandomNumber(100, 500)
    }
    a.unshift(
        {
          "author": {
            "avatar": 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
          },
          "offer": {
            "title": OFFER_TITLES[getRandomNumber(0, OFFER_TITLES.length - 1)],
            "address": location.x +', ' + location.y,
            "price": getRandomNumber(1000, 1000000),
            "rooms": getRandomNumber(1, 5),
            "guests":getRandomNumber(1, 10),
            "checkin": CHECKIN_OUT_TIMES[getRandomNumber(0, CHECKIN_OUT_TIMES.length - 1)],
            "checkout": CHECKIN_OUT_TIMES[getRandomNumber(0, CHECKIN_OUT_TIMES.length - 1)],
            "type": TYPES_OF_HOUSE[getRandomNumber(0, TYPES_OF_HOUSE.length - 1)],
            "features": FEATURES[getRandomNumber(0, FEATURES.length - 1)],
            "description":'',
            "photos":[]
            },
          "location": {
            "x": location.x,
            "y": location.y
          }
        }
      );
    }
    return a;
};

var announcements = createAnnouncements(8);
var pinsContainer = document.querySelector('.tokyo__pin-map');

var createPin = function(pinNumber){
    var pinElement = document.createElement('div');
    var pinImg = document.createElement('img');
    pinElement.setAttribute('style', 'left:' + pinNumber.location.x + 'px; top:' + pinNumber.location.y + 'px');
    pinElement.classList.add('pin');
    pinElement.appendChild(pinImg);
    pinImg.setAttribute('width','40');
    pinImg.setAttribute('height','40');
    pinImg.classList.add('rounded');
    pinImg.setAttribute('src', pinNumber.author.avatar);
    return pinElement;
  };

var renderPins = function(container,pins) {
  for (var i = 0; i < pins.length; i++) {
    var pinElem = createPin(pins[i]);
    container.appendChild(pinElem);
  }
};

renderPins(pinsContainer, announcements);









