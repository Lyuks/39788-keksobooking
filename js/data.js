'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  window.OFFER_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  window.FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  window.CHECKIN_OUT_TIMES = [
    '12:00',
    '13:00',
    '14:00',
  ];

  window.OFFER_TYPE = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var getFeaturesArr = function () {
    var feature = [];
    var featuresClone = window.FEATURES.slice();
    var randomNumber = Math.floor(Math.random() * window.FEATURES.length + 1);
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
              'title': window.OFFER_TITLES[getRandomNumber(0, window.OFFER_TITLES.length - 1)],
              'address': location.x + ', ' + location.y,
              'price': getRandomNumber(1000, 1000000),
              'rooms': getRandomNumber(1, 5),
              'guests': getRandomNumber(1, 10),
              'checkin': window.CHECKIN_OUT_TIMES[getRandomNumber(0, window.CHECKIN_OUT_TIMES.length - 1)],
              'checkout': window.CHECKIN_OUT_TIMES[getRandomNumber(0, window.CHECKIN_OUT_TIMES.length - 1)],
              'type': window.OFFER_TYPES[getRandomNumber(0, window.OFFER_TYPES.length - 1)],
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
  window.announcements = createAnnouncements(8);

}());
