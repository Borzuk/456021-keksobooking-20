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

// Получение данных с сервера
var getDataFromServer = function () {
  var loadUrl = 'https://javascript.pages.academy/keksobooking/data';
  var onSuccessLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.data.setAdvertisementsData(data[i]);
    }
    setStateActive();
  };
  var onErrorLoad = function () {
    setStateUnactive();
  };

  window.ajax.load(loadUrl, onSuccessLoad, onErrorLoad);
};

//  Установка неактивного состояния по-умолчанию
setStateUnactive();

// Обработчик на главной метке
var onMapPinMainMouseDown = function (evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    getDataFromServer();
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
    mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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
