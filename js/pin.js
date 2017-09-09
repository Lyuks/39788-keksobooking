'use strict';

(function () {
  //  контейнер для флагов
  window.pinsContainer = document.querySelector('.tokyo__pin-map');
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
  for (var i = 0; i < window.announcements.length; i++) {
    var pinElem = createPin(window.announcements[i], i);
    fragment.appendChild(pinElem);
  }

  //  суем фрагмент в контейнер
  window.pinsContainer.appendChild(fragment);

}());
