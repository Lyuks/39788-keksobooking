'use strict';


(function () {

  //  создаем новую панель диалога
  window.createNewDialogPanel = function (announcement) {
    var template = document.querySelector('#lodge-template');
    var newDialogPanel = template.content.cloneNode(true);
    newDialogPanel.querySelector('.lodge__title').textContent = announcement.offer.title;
    newDialogPanel.querySelector('.lodge__address').textContent = announcement.offer.address;
    newDialogPanel.querySelector('.lodge__price').innerHTML = announcement.offer.price + ' ' + '&#x20bd;/ночь';
    newDialogPanel.querySelector('.lodge__type').textContent = window.OFFER_TYPE[announcement.offer.type];
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
}());

