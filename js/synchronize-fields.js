'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, syncValues) {
  firstField.addEventListener('change', function (e) {
    syncValues(secondField, e.target.value);
  });
};

