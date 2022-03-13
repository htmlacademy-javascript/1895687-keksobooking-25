import {createAdverts} from './create-advert.js';

const adverts = createAdverts(1);

const theAdvertTemplate = document.querySelector('#card').content;
const theAdvertSample = theAdvertTemplate.querySelector('.popup');
const fragment = document.createDocumentFragment();

adverts.forEach(( {author, offer} ) => {
  const { avatar } = author;
  const { title, address, price, type, rooms, guests, checkIn, checkOut, features, description, photos } = offer;
  const newAdvert = theAdvertSample.cloneNode(true);
  newAdvert.querySelector('.popup__title').textContent = title ? title : '';
  newAdvert.querySelector('.popup__text--address').textContent = address ? address : '';
  newAdvert.querySelector('.popup__text--price').textContent = price ? `${ price } ₽/ночь` : 'Цена не указана';
  let translatedType;
  switch (type) {
    case 'flat':
      translatedType = 'Квартира';
      break;
    case 'bungalow':
      translatedType = 'Бунгало';
      break;
    case 'house':
      translatedType = 'Дом';
      break;
    case 'palace':
      translatedType = 'Дворец';
      break;
    case 'hotel':
      translatedType = 'Отель';
      break;
    default:
      translatedType = 'Тип не указан';
  }
  newAdvert.querySelector('.popup__type').textContent = translatedType;
  newAdvert.querySelector('.popup__text--capacity').textContent = `${ rooms  } комнаты для ${  guests  } гостей`;
  newAdvert.querySelector('.popup__text--time').textContent = `Заезд после ${ checkIn }, выезд до ${ checkOut }`;
  const featuresContainer = newAdvert.querySelector('.popup__features');
  featuresContainer.querySelectorAll('.popup__feature').forEach((element) => {
    if(features){
      const isDeclared = features.some(
        (feature) => element.classList.contains(`popup__feature--${feature}`)
      );
      if(!isDeclared){
        element.remove();
      }
    }
    else{
      element.remove();
    }
  });
  newAdvert.querySelector('.popup__description').textContent = description ? description: '';
  const photosContainer = newAdvert.querySelector('.popup__photos');
  const photoSample = photosContainer.querySelector('.popup__photo').cloneNode(true);
  photosContainer.querySelectorAll('.popup__photo').forEach((element) => element.remove());
  if(photos){
    photos.forEach((photo) => {
      const newPhotoItem = photoSample.cloneNode(true);
      newPhotoItem.src = photo;
      photosContainer.append(newPhotoItem);
    });
  }
  newAdvert.querySelector('.popup__avatar').src = avatar ? avatar : '';

  fragment.append(newAdvert);
});
document.querySelector('#map-canvas').append(fragment);

