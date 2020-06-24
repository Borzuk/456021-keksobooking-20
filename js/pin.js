'use strict';

(function () {
  var getPinElements = function () {
    return document.querySelectorAll('.map__pin');
  };

  // Создадим одну метку по полученнм данным
  var createPinElements = function (data, pinId, parent) {
    var pinData = data[pinId];
    var template = document.querySelector('#pin').content;
    var pinElement = template.querySelector('.map__pin');
    var pin = pinElement.cloneNode(true);
    var pinInnerImg = pin.getElementsByTagName('img');

    // Установка координат для пина
    var actualPinX = Math.floor(pinData.location.x - pin.clientWidth / 2);
    var actualPinY = Math.floor(pinData.location.y - pin.clientHeight);

    pin.style.left = actualPinX + 'px';
    pin.style.top = actualPinY + 'px';

    pin.dataset.id = pinId;

    pinInnerImg[0].src = pinData.author.avatar;
    pinInnerImg[0].alt = pinData.offer.title;

    parent.appendChild(pin);

    return (pin);

  };

  // Удаляем все пины
  var removePinElementsAll = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    for (var iMapPins = 0; iMapPins < mapPins.length; iMapPins++) {
      if (!mapPins[iMapPins].classList.contains('map__pin--main')) {
        mapPins[iMapPins].remove();
      }
    }
  };

  // Определение положения главного пина
  var checkMapPinMainAddress = function () {
    var mapPinMain = document.querySelector('.map__pin--main');
    var mapPinMainActualX = Number.parseInt(mapPinMain.style.left, 10) + mapPinMain.clientWidth / 2;
    var mapPinMainActualY = Number.parseInt(mapPinMain.style.top, 10) + mapPinMain.clientHeight;

    var adFormInputField = document.querySelector('#address');
    adFormInputField.value = Math.floor(mapPinMainActualX) + ', ' + Math.floor(mapPinMainActualY);
  };

  window.pin = {
    // Функции
    getPinElements: getPinElements,
    createPinElements: createPinElements,
    removePinElementsAll: removePinElementsAll,
    checkMapPinMainAddress: checkMapPinMainAddress,
  };
})();
