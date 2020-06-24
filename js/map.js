'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsOrigin = document.querySelector('.map__pins');

  // Удаление класса неактивности с карты
  var removeMapFaded = function () {
    map.classList.remove('map--faded');
    window.filter.setMapFilterHandler();
  };

  // Удаление класса неактивности с карты
  var setMapFaded = function () {
    map.classList.add('map--faded');
    window.filter.removeMapFilterHandler();
  };

  // Заполнение карты пинами по входящим данным
  var fillMapWithPins = function (advdata) {
    var limit;
    if (advdata.length <= window.data.LIMIT_ADVERTISEMENT) {
      limit = advdata.length;
    } else {
      limit = window.data.LIMIT_ADVERTISEMENT;
    }
    for (var j = 0; j < limit; j++) {
      var pin = window.pin.createPinElements(advdata, j, mapPinsOrigin);;
      pin.addEventListener('click', openCard);
      pin.addEventListener('keydown', openCard);
    }
  };

  // Открыть карту по данным и добавить ее на страницу
  var openCard = function (evt) {
    if (evt.button === 0 || evt.code === 'Enter') {
      var pinId = evt.currentTarget.dataset.id;
      var pinData = window.advertisementsByType[pinId];

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
