'use strict';

(function () {
  window.showCard = function (announcement) {
    var dialog = document.querySelector('#offer-dialog');
    var panel = document.querySelector('.dialog__panel');
    var img = document.querySelector('.dialog__title img');
    dialog.removeChild(panel);
    dialog.appendChild(window.createNewDialogPanel(announcement));
    img.setAttribute('src', announcement.author.avatar);
  };
}());
