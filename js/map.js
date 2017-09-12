'use strict';

var mainPinHandle = document.querySelector('.pin__main');

mainPinHandle.addEventListener('mousedown', function (e) {
  e.preventDefault();
  var startCoords = {
    x: e.clientX,
    y: e.clientY
  };

  var onMouseMove = function (moveE) {
    moveE.preventDefault();

    var shift = {
      x: startCoords.x - moveE.clientX,
      y: startCoords.y - moveE.clientY
    };

    startCoords = {
      x: moveE.clientX,
      y: moveE.clientY
    };

    var xCoord = mainPinHandle.offsetLeft - shift.x;
    var yCoord = mainPinHandle.offsetTop - shift.y;

    mainPinHandle.style.left = xCoord + 'px';
    mainPinHandle.style.top = yCoord + 'px';

    window.addressForm.setAttribute('value', 'x:' + (xCoord + 37) + ' y:' + (yCoord + 94));
  };

  var onMouseUp = function (upE) {
    upE.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

