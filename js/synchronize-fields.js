'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, syncValues) {
  firstField.addEventListener('change', function (e) {
    var target = e.target.value;
    for (var i = 0; i < firstFieldValues.length; i++) {
      if (secondFieldValues[i].value === target) {
        syncValues(secondField, secondFieldValues[i].value);
      }
      else {
       syncValues(secondField, secondFieldValues[i].value);
      }
    }
  });
};

