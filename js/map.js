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
    var xCoord = mainPinHandle.style.left;
    var yCoord = mainPinHandle.style.top;
    window.addressForm.setAttribute('value', 'x:' + (parseInt(xCoord.substring(0, xCoord.length - 2), 10) + 37) + ' y:' + (parseInt(yCoord.substring(0, yCoord.length - 2), 10) + 47));
  };

  var onMouseUp = function (upE) {
    upE.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

