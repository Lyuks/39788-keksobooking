'use strict';

(function () {
  //  пишем обработчики событий
  var ESCAPE_KEY = 27;
  var ENTER_KEY = 13;
  var dialog = document.querySelector('#offer-dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  dialogClose.setAttribute('tabindex', 1);
  dialog.classList.add('hidden');

  //  обработчик по клику на контейнер с объявлениями

  var getAttribute = function (targetElem) {
    if ((targetElem.getAttribute('data-index')) !== null) {
      return (targetElem.getAttribute('data-index'));
    } else {
      return (targetElem.parentNode.getAttribute('data-index'));
    }
  };

  window.pinsContainer.addEventListener('click', function (e) {
    var activePin = document.querySelector('.pin--active');
    var target = e.target;

    if (target.classList.contains('pin__main') || target.hasAttribute('alt')) {
      e.preventDefault();
    } else {

    //  получаем значение дата атрибута
      window.showCard(window.announcements[getAttribute(target)]);
      if (activePin !== null) {
        activePin.classList.remove('pin--active');
      }
      if (target.classList.contains('pin')) {
        target.classList.add('pin--active');
        dialog.classList.remove('hidden');

      } else {
        target.parentNode.classList.add('pin--active');
        dialog.classList.remove('hidden');
      }
    }

  });

  // функция удаления класса активного пина
  var removeActivePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
      activePin.classList.remove('pin--active');
    }
  };

  // удаление активного пина по клику
  var onDialogCloseClick = function () {
    dialog.classList.add('hidden');
    removeActivePin();
  };

  //  удаление активного пина по нажатию esc
  var onEscapeTap = function (e) {
    if (e.keyCode === ESCAPE_KEY) {
      dialog.classList.add('hidden');
    }
    removeActivePin();
  };

  var onEnterTap = function (e) {
    if (e.keyCode === ENTER_KEY) {
      dialog.classList.remove('hidden');
    }
  };
  window.pinsContainer.addEventListener('keydown', onEnterTap);
  document.addEventListener('keydown', onEscapeTap);
  dialogClose.addEventListener('click', onDialogCloseClick);

  // делаем валидацию форм

  window.addressForm = document.querySelector('#address');
  window.addressForm.setAttribute('required', 'required');
  window.addressForm.setAttribute('readonly', true);

  var formTitle = document.querySelector('#title');
  formTitle.setAttribute('required', 'required');
  formTitle.setAttribute('minlength', '30');
  formTitle.setAttribute('maxlength', '100');

  var priceForNight = document.querySelector('#price');
  priceForNight.setAttribute('required', 'required');
  priceForNight.setAttribute('type', 'number');
  priceForNight.setAttribute('placeholder', '1000');
  priceForNight.setAttribute('min', '1000');
  priceForNight.setAttribute('max', '1000000');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInValues = timeIn.querySelectorAll('option');
  var timeOutValues = timeOut.querySelectorAll('option');

  window.syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields(timeIn, timeOut, timeInValues, timeOutValues, syncValues);


// cинхронизируем поля Тип жилья и Цена за ночь
  var houseType = document.querySelector('#type');
  var onHouseTypeClick = function () {
    switch (houseType.value) {
      case 'house':
        priceForNight.setAttribute('min', '5000');
        priceForNight.setAttribute('placeholder', '5000');
        break;
      case 'bungalo':
        priceForNight.setAttribute('min', '0');
        priceForNight.setAttribute('placeholder', '0');
        break;
      case 'flat':
        priceForNight.setAttribute('min', '1000');
        priceForNight.setAttribute('placeholder', '1000');
        break;
      case 'palace':
        priceForNight.setAttribute('min', '10000');
        priceForNight.setAttribute('placeholder', '10000');
        break;
    }
  };
  houseType.addEventListener('change', onHouseTypeClick);
// заканчиваем синхронизировать поля Тип жилья и Цена за ночь

  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var onRoomNumberClick = function () {
    switch (roomNumber.value) {
      case '1':
        guestsNumber.value = roomNumber.value;
        break;
      case '2':
        guestsNumber.value = roomNumber.value;
        break;
      case '3':
        guestsNumber.value = roomNumber.value;
        break;
      case '100':
        guestsNumber.value = 0;
        break;
    }
  };
  roomNumber.addEventListener('change', onRoomNumberClick);

  //  выводим по умолчанию значения для 1 гостя
  var changeSelects = function () {
    var firstSelect = document.querySelector('#capacity option:first-child');
    var thirdSelect = document.querySelector('#capacity option:nth-child(3)');
    firstSelect.setAttribute('selected', false);
    thirdSelect.setAttribute('selected', true);
  };
  changeSelects();

  var noticeForm = document.querySelector('.notice__form');
  noticeForm.setAttribute('action', 'https://1510.dump.academy/keksobooking');

  //  подсветка незаполненных инпутов при отправке
  var submitButton = document.querySelector('.form__submit');
  var allFields = noticeForm.querySelectorAll('input');
  var onSubmitFormClick = function () {
    for (var i = 0; i < allFields.length; i++) {
      if (allFields[i].checkValidity() === false) {
        allFields[i].setAttribute('style', 'border:3px solid red');
      } else {
        allFields[i].setAttribute('style', 'border:1px solid #d9d9d3');
      }
    }
  };
  submitButton.addEventListener('click', onSubmitFormClick);

}());

