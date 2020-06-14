'use strict';

// Модуль, создающий данные
(function () {
  // Пустой массив для объявлений
  var advertisements = [];

  //  Определяем переменные, которые будут использоваться при генерации объявлений
  var housingTypes = ['palace', 'flat', 'house', 'bungalo'];
  var timesOfCheckInOut = ['12:00', '13:00', '14:00'];
  var featuresOfHousing = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosOfHousing = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var maxCostPerNight = '10000';
  var maxRoomsOfHousing = '5';
  var maxGuests = '15';

  // Максимальная и минимальная координата для положения метки
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var generateAdvertisement = function (id) {

    // Случайное число
    var getRandomNumber = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    };

    // Создаем случайный массив из случайных элементов базового массива
    var getRandomArrFrom = function (baseArray) {
      baseArray.sort(function () {
        return 0.5 - Math.random();
      });
      return baseArray.slice(0, getRandomNumber(1, baseArray.length - 1));
    };

    // Координаты пина на карте для заполнения данных адреса и поля location
    var pinX = getRandomNumber(MIN_X, MAX_X);
    var pinY = getRandomNumber(MIN_Y, MAX_Y);

    // Создаем объект для объявления
    var newAdvertisement = {
      'author': {
        'avatar': 'img/avatars/user0' + id + '.png'
      },
      'offer': {
        'title': 'Заголовок объявления №' + id,
        'address': String(pinX + ', ' + pinY),
        'price': getRandomNumber(0, maxCostPerNight),
        'type': housingTypes[getRandomNumber(0, housingTypes.length - 1)],
        'rooms': getRandomNumber(0, maxRoomsOfHousing),
        'guests': getRandomNumber(0, maxGuests),
        'checkin': timesOfCheckInOut[getRandomNumber(0, timesOfCheckInOut.length - 1)],
        'checkout': timesOfCheckInOut[getRandomNumber(0, timesOfCheckInOut.length - 1)],
        'features': getRandomArrFrom(featuresOfHousing),
        'description': 'Описание объявления №' + id,
        'photos': getRandomArrFrom(photosOfHousing)
      },
      'location': {
        'x': pinX,
        'y': pinY
      }
    };

    // Добавляем полученный объект в массив объявлений
    advertisements.push(newAdvertisement);

  };

  // Создаем случайные 8 объявлений. В дальнейшей просто заменю на реальные объявы с сервера.
  for (var i = 1; i <= 8; i++) {
    generateAdvertisement(i);
  }

  window.data = {
    // Константы
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,

    // Массив данных
    advertisements: advertisements,
  };
})();
