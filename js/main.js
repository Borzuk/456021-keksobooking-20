'use strict';

//  Активное состояние
var setStateActive = function () {
  window.map.removeMapFaded();
  window.map.fillMapWithPins(window.data.advertisements);
  window.form.activateForm();
  window.pin.checkMapPinMainAddress();
};

// Неактивное состояние
var setStateUnactive = function () {
  window.form.deactivateForm();
  window.map.setMapFaded();
  window.pin.removePinElementsAll();
  window.pin.checkMapPinMainAddress();
};

//  Установка неактивного состояния по-умолчанию
setStateUnactive();

// Обработчик на главной метке
var onMapPinMainMouseDown = function (evt) {
  if (evt.button === 0) {
    setStateActive();
  }
};
var onMapPinMainKeyDown = function (evt) {
  if (evt.code === 'Enter') {
    setStateActive();
  }
};

// Добавляем обработчик на главный пин
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
mapPinMain.addEventListener('keydown', onMapPinMainKeyDown);
