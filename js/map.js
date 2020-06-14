'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsOrigin = document.querySelector('.map__pins');

  // Удаление класса неактивности с карты
  var removeMapFaded = function () {
    map.classList.remove('map--faded');
  };

  // Удаление класса неактивности с карты
  var setMapFaded = function () {
    map.classList.add('map--faded');
  };

  // Заполнение карты пинами по входящим данным
  var fillMapWithPins = function (advdata) {
    for (var j = 0; j < advdata.length; j++) {
      var pin = window.pin.createPinElements(j, mapPinsOrigin);
      pin.addEventListener('click', openCard);
      pin.addEventListener('keydown', openCard);
    }
  };

  // Открыть карту по данным и добавить ее на страницу
  var openCard = function (evt) {
    if (evt.button === 0 || evt.code === 'Enter') {
      var pinId = evt.currentTarget.dataset.id;
      var pinData = window.data.advertisements[pinId];

      // Удалим карту если уже есть.
      window.card.removeCardsPopup();
      window.card.createPinCards(pinData, map);
    }
  };

  window.map = {
    // Функции
    removeMapFaded: removeMapFaded,
    setMapFaded: setMapFaded,
    fillMapWithPins: fillMapWithPins,
    openCard: openCard,
  };

})();
