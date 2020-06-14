'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var housingTimeIn = document.querySelector('#timein');
  var housingTimeOut = document.querySelector('#timeout');

  // Удаление всех опций в количестве мест
  var clearHousingCapacity = function () {
    var housingCapacity = document.querySelector('#capacity');
    var options = housingCapacity.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      options[i].remove();
    }
  };
  // Создание требуемых опций в количестве мест
  var createHousingCapacityElement = function (amount) {
    var arrayOfValues = ['Не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];
    var housingCapacity = document.querySelector('#capacity');
    if (amount === '100') {
      var option = document.createElement('option');
      option.value = 0;
      option.textContent = arrayOfValues[0];
      housingCapacity.appendChild(option);
    } else {
      for (var iamount = amount; iamount > 0; iamount--) {
        var anotherOption = document.createElement('option');
        var strForOption = arrayOfValues[iamount];
        anotherOption.value = iamount;
        anotherOption.textContent = strForOption;
        housingCapacity.appendChild(anotherOption);
      }
    }
  };

  // Активация формы
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');

    var adFormFieldset = adForm.querySelectorAll('fieldset');
    for (var i = 0; i < adFormFieldset.length; i++) {
      // adFormFieldset[i].disabled = 'false';  - почему-то в таком виде не отрабатывает.
      adFormFieldset[i].removeAttribute('disabled');
    }

    clearHousingCapacity();
    createHousingCapacityElement(document.querySelector('#room_number').value);

    var housingRoomNumber = document.querySelector('#room_number');
    housingRoomNumber.addEventListener('change', onHousingRoomNumberChange);

    var housingType = document.querySelector('#type');
    housingType.addEventListener('change', onHousingTypeChange);

    housingTimeIn.addEventListener('change', onHousingTimeInChange);

    housingTimeOut.addEventListener('change', onHousingTimeOutChange);

    var adFormSubmit = document.querySelector('.ad-form__submit');
    var adFormReset = document.querySelector('.ad-form__reset');
    adFormSubmit.addEventListener('click', onAdFormSubmit);
    adFormReset.addEventListener('click', onAdFormReset);
  };

  // Отключение формы
  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');

    var adFormFieldset = adForm.querySelectorAll('fieldset');
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = 'true';
    }

    document.querySelector('form').reset();

    var housingRoomNumber = document.querySelector('#room_number');
    housingRoomNumber.removeEventListener('change', onHousingRoomNumberChange);

    var adFormSubmit = document.querySelector('.ad-form__submit');
    adFormSubmit.removeEventListener('click', onAdFormSubmit);
  };

  // Обработчик изменения полей формы при смене количества комнат
  var onHousingRoomNumberChange = function (evt) {
    clearHousingCapacity();
    createHousingCapacityElement(evt.target.value);
  };

  //  Обработчик изменения поля тип жилья
  var onHousingTypeChange = function (evt) {
    var housingPrice = document.querySelector('#price');
    var minPrice = evt.target.options[evt.target.selectedIndex].dataset.minprice;
    housingPrice.min = minPrice;
    housingPrice.placeholder = minPrice;
  };

  //  Обработчик изменения время заезда
  var onHousingTimeInChange = function (evt) {
    housingTimeOut[evt.target.selectedIndex].selected = true;
  };

  var onHousingTimeOutChange = function (evt) {
    housingTimeIn[evt.target.selectedIndex].selected = true;
  };

  // Обработчик отправки формы
  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    adForm.reset();

    deactivateForm();
    window.map.setMapFaded();
    window.pin.removePinElementsAll();
    window.pin.checkMapPinMainAddress();
  };

  var onAdFormReset = function (evt) {
    evt.preventDefault();
    adForm.reset();

    deactivateForm();
    window.map.setMapFaded();
    window.pin.removePinElementsAll();
    window.pin.checkMapPinMainAddress();
  };

  window.form = {
    // Функции
    activateForm: activateForm,
    deactivateForm: deactivateForm,
  };
})();
