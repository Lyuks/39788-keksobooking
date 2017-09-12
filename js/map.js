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

    mainPinHandle.style.left = (mainPinHandle.offsetLeft - shift.x) + 'px';
    mainPinHandle.style.top = (mainPinHandle.offsetTop - shift.y) + 'px';
    var xCoord = parseInt(mainPinHandle.style.left.substring(0, mainPinHandle.style.left.length - 2), 10) + 37;
    var yCoord = parseInt(mainPinHandle.style.top.substring(0, mainPinHandle.style.top.length - 2), 10) + 94;
    window.addressForm.setAttribute('value', 'x:' + xCoord + ' y:' + yCoord);
  };

  var onMouseUp = function (upE) {
    upE.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

