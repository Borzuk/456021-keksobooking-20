'use strict';

(function () {

  // Наполним карточку по входящим данным
  var createPinCards = function (pinData, parent) {

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
    pinCardInnerCapacity.innerText =
      pinData.offer.rooms +
      ' комнаты для ' +
      pinData.offer.guests +
      ' гостей';

    var pinCardInnerTime = pinCard.querySelector('.popup__text--time');
    pinCardInnerTime.innerText =
      'Заезд после ' +
      pinData.offer.checkin +
      ', выезд до ' +
      pinData.offer.checkout;

    var pinCardInnerFeatures = pinCard.querySelector('.popup__features');

    while (pinCardInnerFeatures.firstChild) {
      pinCardInnerFeatures.removeChild(pinCardInnerFeatures.firstChild);
    }

    if (pinData.offer.features.length > 0) {
      for (var k = 0; k < pinData.offer.features.length; k++) {
        var li = document.createElement('li');
        li.classList.add('popup__feature');
        li.classList.add('popup__feature--' + pinData.offer.features[k]);
        pinCardInnerFeatures.appendChild(li);
      }
    }

    var pinCardInnerDescription = pinCard.querySelector('.popup__description');
    if (pinData.offer.description) {
      pinCardInnerDescription.innerText =
        pinData.offer.description;
    } else {
      pinCardInnerDescription.remove();
    }

    var pinCardInnerPhotos = pinCard.querySelector('.popup__photos');

    while (pinCardInnerPhotos.firstChild) {
      pinCardInnerPhotos.removeChild(pinCardInnerPhotos.firstChild);
    }

    if (pinData.offer.photos.length > 0) {
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

    var onPopupCloseClick = function (evt) {
      evt.preventDefault();
      popupCard.remove();
    };

    var onPopupCloseKeyDown = function (evt) {
      if (evt.code === 'Enter' || evt.code === 'Escape') {
        evt.preventDefault();
        popupCard.remove();
      }
    };

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    parent.insertBefore(pinCard, mapFiltersContainer);

    var popupCard = document.querySelector('.map__card.popup');
    var popupCardCloseBtn = popupCard.querySelector('.popup__close');
    popupCardCloseBtn.addEventListener('click', onPopupCloseClick);
    popupCardCloseBtn.addEventListener('keydown', onPopupCloseKeyDown);
    document.addEventListener('keydown', onDocumentEscPressed);
  };

  // Удаление карточки
  var removeCardsPopup = function () {
    var mapCardPopup = document.querySelector('.map__card.popup');
    if (mapCardPopup) {
      mapCardPopup.remove();
    }
    document.removeEventListener('keydown', onDocumentEscPressed);
  };

  var onDocumentEscPressed = function (evt) {
    if (evt.code === 'Escape') {
      removeCardsPopup();
    }
  };

  window.card = {
    // Функции
    createPinCards: createPinCards,
    removeCardsPopup: removeCardsPopup,
  };

})();
