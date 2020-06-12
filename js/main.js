'use strict';

// Пустой массив для объявлений
var advertisements = [];

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


/*
var fragmentOfCards = document.createDocumentFragment();

// Функция для наполнения карточки по данным
var createPinCards = function (pinData) {
  var template = document.querySelector('#card').content;
  var pinElement = template.querySelector('.map__card');
  var pinCard = pinElement.cloneNode(true);

  var pinCardInnerTitle = pinCard.querySelector('.popup__title');
  if (pinData.offer.title) {
    pinCardInnerTitle.innerText = pinData.offer.title;
  } else {
    pinCardInnerTitle.remove();
  }

  var pinCardInnerAddress = pinCard.querySelector('.popup__text--address');
  if (pinData.offer.address) {
    pinCardInnerAddress.innerText = pinData.offer.address;
  } else {
    pinCardInnerAddress.remove();
  }

  var pinCardInnerPrice = pinCard.querySelector('.popup__text--price');
  if (pinData.offer.price) {
    pinCardInnerPrice.innerText = pinData.offer.price + '₽/ночь';
  } else {
    pinCardInnerPrice.remove();
  }

  var pinCardInnerType = pinCard.querySelector('.popup__type');
  if (pinData.offer.type) {
    var offerType = '';
    if (pinData.offer.type === 'flat') {
      offerType = 'Квартира';
    } else if (pinData.offer.type === 'bungalo') {
      offerType = 'Бунгало';
    } else if (pinData.offer.type === 'house') {
      offerType = 'Дом';
    } else {
      offerType = 'Дворец';
    }
    pinCardInnerType.innerText = offerType;
  } else {
    pinCardInnerType.remove();
  }

  var pinCardInnerCapacity = pinCard.querySelector('.popup__text--capacity');
  pinCardInnerCapacity.innerText = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';

  var pinCardInnerTime = pinCard.querySelector('.popup__text--time');
  pinCardInnerTime.innerText = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;

  var pinCardInnerFeatures = pinCard.querySelector('.popup__features');

  // Удалим все характеристики из шаблона
  while (pinCardInnerFeatures.firstChild) {
    pinCardInnerFeatures.removeChild(pinCardInnerFeatures.firstChild);
  }

  if (pinData.offer.features.length > 0) {
    // Добавим новые узлы, из массива характеристик
    for (var k = 0; k < pinData.offer.features.length; k++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + pinData.offer.features[k]);
      pinCardInnerFeatures.appendChild(li);
    }
  }


  var pinCardInnerDescription = pinCard.querySelector('.popup__description');
  if (pinData.offer.description) {
    pinCardInnerDescription.innerText = pinData.offer.description;
  } else {
    pinCardInnerDescription.remove();
  }

  var pinCardInnerPhotos = pinCard.querySelector('.popup__photos');

  // Удалим шаблоны фото
  while (pinCardInnerPhotos.firstChild) {
    pinCardInnerPhotos.removeChild(pinCardInnerPhotos.firstChild);
  }

  if (pinData.offer.photos.length > 0) {
    // Добавим новые фото
    for (var l = 0; l < pinData.offer.photos.length; l++) {
      var img = document.createElement('img');
      img.classList.add('popup__foto');
      img.src = pinData.offer.photos[l];
      img.style.width = '45px';
      img.style.height = '40px';
      img.alt = 'Фотография жилья';
      pinCardInnerPhotos.appendChild(img);
    }
  }

  var pinCardInnerAvatar = pinCard.querySelector('.popup__avatar');
  pinCardInnerAvatar.src = pinData.author.avatar;

  //  Добавление карты во фрагмент
  fragmentOfCards.appendChild(pinCard);
};

createPinCards(advertisements[0]);

// Добавление фрагмента в карту
var mapFiltersContainer = document.querySelector('.map__filters-container');
// Вставка в самое начало родителя, то есть перед первым узлом
map.insertBefore(fragmentOfCards, mapFiltersContainer);
*/

//  Активное состояние
var setStateActive = function () {

  // Функция, создающая 1 пин по входящим данным
  var generateElementsFromArray = function (advdata) {

    // Объявляем переменную для карты
    var mapPinsOrigin = document.querySelector('.map__pins');

    // Объявляем переменную фрагмента документа
    var fragmentOfPins = document.createDocumentFragment();

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
      fragmentOfPins.appendChild(pin);
    };

    // Перебираем массив объявлений и наполняем фрагменты
    for (var j = 0; j < advdata.length; j++) {
      createPinElements(advdata[j]);
    }

    // Добавление фрагмента в карту
    mapPinsOrigin.appendChild(fragmentOfPins);
  };

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  var adFormFieldset = adForm.querySelectorAll('fieldset');
  for (var i = 0; i < adFormFieldset.length; i++) {
    // adFormFieldset[i].disabled = 'false';  - почему-то в таком виде не отрабатывает.
    adFormFieldset[i].removeAttribute('disabled');
  }

  // Создаем случайные 8 объявлений. В дальнейшей просто заменю на реальные объявы с сервера.
  for (i = 1; i <= 8; i++) {
    generateAdvertisement(i);
  }

  generateElementsFromArray(advertisements);
  checkMapPinMainAddress();

  clearHousingCapacity();
  createHousingCapacityElement(document.querySelector('#room_number').value);

  var housingRoomNumber = document.querySelector('#room_number');
  housingRoomNumber.addEventListener('change', onHousingRoomNumberChange);

  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('click', onAdFormSubmit);

};

// Неактивное состояние
var setStateUnactive = function () {

  var map = document.querySelector('.map');
  map.classList.add('map--faded');

  var adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  var adFormFieldset = adForm.querySelectorAll('fieldset');
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = 'true';
  }

  // Удаляем все пины и сбрасываем демо-массив
  advertisements = [];
  var mapPins = document.querySelectorAll('.map__pin');
  for (var iMapPins = 0; iMapPins < mapPins.length; iMapPins++) {
    if (!mapPins[iMapPins].classList.contains('map__pin--main')) {
      mapPins[iMapPins].remove();
    }
  }


  // Сбрасываем форму
  document.querySelector('form').reset();

  var housingRoomNumber = document.querySelector('#room_number');
  housingRoomNumber.removeEventListener('change', onHousingRoomNumberChange);

  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.removeEventListener('click', onAdFormSubmit);
};

// Определение положения главного пина
var checkMapPinMainAddress = function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainActualX = Number.parseInt(mapPinMain.style.left, 10) + mapPinMain.clientWidth / 2;
  var mapPinMainActualY = Number.parseInt(mapPinMain.style.top, 10) + mapPinMain.clientHeight;

  var adFormInputField = document.querySelector('#address');
  adFormInputField.value = mapPinMainActualX + ', ' + mapPinMainActualY;
};

// Функция для создания требуемого количества option в числе гостей
var clearHousingCapacity = function () {
  var housingCapacity = document.querySelector('#capacity');
  var options = housingCapacity.querySelectorAll('option');
  for (var i = 0; i < options.length; i++) {
    options[i].remove();
  }
};
var createHousingCapacityElement = function (amount) {
  var arrayOfValues = ['Не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];
  var housingCapacity = document.querySelector('#capacity');
  if (amount === '100') {
    var option = document.createElement('option');
    option.value = 0;
    option.textContent = arrayOfValues[0];
    housingCapacity.appendChild(option);
  } else {
    for (var iamount = amount; iamount >= 0; iamount--) {
      var anotherOption = document.createElement('option');
      var strForOption = arrayOfValues[iamount];
      anotherOption.value = iamount;
      anotherOption.textContent = strForOption;
      housingCapacity.appendChild(anotherOption);
    }
  }
};

// Обработчик на главной метке
var onMapPinMainMouseDown = function (evt) {
  if (evt.button === 0) {
    setStateActive();
  }
};

// Обработчик изменения полей формы при смене количества комнат
var onHousingRoomNumberChange = function (evt) {
  clearHousingCapacity();
  createHousingCapacityElement(evt.target.value);
};

// Обработчик отправки формы
var onAdFormSubmit = function (evt) {
  evt.preventDefault();
  // Пока что просто уберу в неактивное состояние форму
  setStateUnactive();
};

//  Установка неактивного состояния по-умолчанию
setStateUnactive();

// Добавляем обработчик на главный пин
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
