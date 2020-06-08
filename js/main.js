'use strict';

// Пустой массив для объявлений
var advertisements = [];

//
// Функция для создания и наполнения случайного объявления
var generateAdvertisement = function (id) {
  //  Определяем переменные, которые будут использоваться при генерации объявлений
  var housingTypes = ['palace', 'flat', 'house', 'bungalo'];
  var timesOfCheckInOut = ['12:00', '13:00', '14:00'];
  var featuresOfHousing = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosOfHousing = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var maxCostPerNight = '10000';
  var maxRoomsOfHousing = '5';
  var maxGuests = '15';

  // Максимальная и минимальная координата для положения метки
  var minX = 0;
  var maxX = 1200;
  var minY = 130;
  var maxY = 630;

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
  var pinX = getRandomNumber(minX, maxX);
  var pinY = getRandomNumber(minY, maxY);

  // Создаем объект для объявления
  var newAdvertisement = {
    'author': {
      'avatar': 'img/avatars/user0' + id + '.png'
    },
    'offer': {
      'title': 'Заголовок объявления №' + id,
      'address': String(pinX + ', ' + pinY),
      'price': getRandomNumber(0, maxCostPerNight),
      'type': housingTypes[getRandomNumber(0, housingTypes.length)],
      'rooms': getRandomNumber(0, maxRoomsOfHousing),
      'guests': getRandomNumber(0, maxGuests),
      'checkin': timesOfCheckInOut[getRandomNumber(0, timesOfCheckInOut.length)],
      'checkout': timesOfCheckInOut[getRandomNumber(0, timesOfCheckInOut.length)],
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


// Создаем случайные 8 объявлений.
for (var i = 1; i <= 8; i++) {
  generateAdvertisement(i);
}

// Объявляем переменную для карты
var mapPinsOrigin = document.querySelector('.map__pins');

// Объявляем переменную фрагмента документа
var fragment = document.createDocumentFragment();

// Функция для создания одной метки на во фрагменте
var createPinElements = function (pinData) {
  var template = document.querySelector('#pin').content;
  var pinElement = template.querySelector('.map__pin');
  var pin = pinElement.cloneNode(true);
  var pinInnerImg = pin.getElementsByTagName('img');

  // Установка координат для пина
  var actualPinX = pinData.location.x - pin.clientWidth / 2;
  var actualPinY = pinData.location.y - pin.clientHeight;

  pin.style.left = actualPinX + 'px';
  pin.style.top = actualPinY + 'px';

  pinInnerImg[0].src = pinData.author.avatar;
  pinInnerImg[0].alt = pinData.offer.title;

  //  Добавление пина во фрагмент
  fragment.appendChild(pin);
};

// Перебираем массив объявлений и наполняем фрагменты
for (var j = 0; j < advertisements.length; j++) {
  createPinElements(advertisements[j]);
}

// Добавление фрагмента в карту
mapPinsOrigin.appendChild(fragment);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
