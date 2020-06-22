'use strict';

// Модуль, создающий данные
(function () {
  // Пустой массив для объявлений
  var advertisements = [];

  // Определяем переменные, которые будут использоваться при добавлении объявлений
  // Пока не удалял, вдруг пригодятся при добавлении объявлений
  // var housingTypes = ['palace', 'flat', 'house', 'bungalo'];
  // var timesOfCheckInOut = ['12:00', '13:00', '14:00'];
  // var featuresOfHousing = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var photosOfHousing = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var maxCostPerNight = '10000';
  // var maxRoomsOfHousing = '5';
  // var maxGuests = '15';

  // Максимальная и минимальная координата для положения метки
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var setAdvertisementsData = function (data) {
    advertisements.push(data);
  };

  window.data = {
    // Константы
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,

    // Массив данных
    advertisements: advertisements,
    setAdvertisementsData: setAdvertisementsData,
  };
})();
