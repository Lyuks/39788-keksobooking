'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, syncValues) {
  firstField.addEventListener('change', function (e) {
    var target = e.target;
    for (var i = 0; i < firstFieldValues.length; i++) {
      // var a = secondFieldValues[i].getAttribute('min');
      if (secondFieldValues[i].value === target.value) {
        syncValues(secondField, secondFieldValues[i].value);
      }
    }
  });
};

