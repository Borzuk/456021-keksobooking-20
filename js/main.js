'use strict';

// Пустой массив для объявлений
var advertisements = [];

/////////////////////////////////////////////////////////////////////////////////////////////
// Функция для создания и наполнения случайного объявления
var generateAdvertisement = function (id) {
    //  Определяем переменные, которые будут использоваться при генерации объявлений
    var aTypes = ["palace", "flat", "house", "bungalo"];
    var aCheckInOut = ["12:00", "13:00", "14:00"];
    var aFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    var aPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
    var maxPrice = '10000';
    var maxRooms = '5';
    var maxGuests = '15';

    // Максимальная и минимальная координата для положения метки
    var minX = 0;
    var maxX = 1200;
    var minY = 130;
    var maxY = 630;

    // Случайное число
    var getRndByMax = function (min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    // Создаем случайный массив из случайных элементов базового массива
    var getRandomArrFrom = function(baseArr) {
        return Array.apply(null, Array(getRndByMax(1, baseArr.length))).map(function (item, index) {
            return baseArr[getRndByMax(0, baseArr.length)]
        });
    };

    // Координаты пина на карте для заполнения данных адреса и поля location
    var pinX = getRndByMax(minX, maxX);
    var pinY = getRndByMax(minY, maxY);

    // Создаем объект для объявления
    let newAdv = {
        "author": {
            "avatar": "img/avatars/user0" + id + ".png"
        },
        "offer": {
            "title": "Заголовок объявления №" + id,
            "address": String(pinX + ", " + pinY),
            "price": getRndByMax(0, maxPrice),
            "type": aTypes[getRndByMax(0, aTypes.length)],
            "rooms": getRndByMax(0, maxRooms),
            "guests": getRndByMax(0, maxGuests),
            "checkin": aCheckInOut[getRndByMax(0, aCheckInOut.length)],
            "checkout": aCheckInOut[getRndByMax(0, aCheckInOut.length)],
            "features": getRandomArrFrom(aFeatures),
            "description": "Описание объявления №" + id,
            "photos": getRandomArrFrom(aPhotos)
        },
        "location": {
            "x": pinX,
            "y": pinY
        }
    };

    // Добавляем полученный объект в массив объявлений
    advertisements.push(newAdv);
}


// Создаем случайные 8 объявлений.
for(var i = 1; i <= 8; i++){
     generateAdvertisement(i);
}

//////////////////////////////////////////////////////////////////////////////////

// Объявляем переменную для карты
var mapPinsOrigin = document.querySelector('.map__pins');

// Объявляем переменную фрагмента документа
var fragment = document.createDocumentFragment();

// Функция для создания одной метки на во фрагменте
var createPinElements = function (pinData) {
    var template = document.querySelector('#pin').content;
    var element = template.querySelector('.map__pin');
    var pin = element.cloneNode(true);
    var pinImg = pin.getElementsByTagName('img');

    // Установка координат для пина
    var actualPinX = pinData.location.x - pin.clientWidth / 2;
    var actualPinY = pinData.location.y - pin.clientHeight;

    pin.style.left = actualPinX + 'px';
    pin.style.top = actualPinY + 'px';

    pinImg[0].src = pinData.author.avatar;
    pinImg[0].alt = pinData.offer.title;

    //  Добавление пина во фрагмент
    fragment.appendChild(pin);
}

// Перебираем массив объявлений и наполняем фрагменты
for (var i = 0; i < advertisements.length; i++) {
    createPinElements(advertisements[i]);
};

// Добавление фрагмента в карту
mapPinsOrigin.appendChild(fragment);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
