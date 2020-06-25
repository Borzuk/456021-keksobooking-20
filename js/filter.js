'use strict';

var advertisementsByType = window.data.advertisements;

(function () {
  var checkDataByParams = function (evt) {
    window.card.removeCardsPopup();
    if (evt.target.name === 'housing-type') {
      if (evt.target.value !== 'any') {
        advertisementsByType = window.data.advertisements.filter(function (advertisement) {
          return advertisement.offer.type === evt.target.value;
        });
      } else {
        advertisementsByType = window.data.advertisements;
      }
    }

    window.pin.removePinElementsAll();
    window.map.fillMapWithPins(advertisementsByType);
  };

  var setMapFilterHandler = function () {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    mapFiltersContainer.addEventListener('change', checkDataByParams);
  };

  var removeMapFilterHandler = function () {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    mapFiltersContainer.removeEventListener('change', checkDataByParams);
  };

  window.filter = {
    checkDataByParams: checkDataByParams,
    setMapFilterHandler: setMapFilterHandler,
    removeMapFilterHandler: removeMapFilterHandler,

    advertisementsByType: advertisementsByType,
  };
})();
