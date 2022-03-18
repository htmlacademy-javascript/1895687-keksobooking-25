import {createAdverts} from './create-advert.js';

const thesaurus = {
  'flat' : 'Квартира',
  'bungalow' : 'Бунгало',
  'house':'Дом',
  'palace':'Дворец',
  'hotel':'Отель'
};

const hideElement = (element) => element.classList.add('hidden');  // returns undefined

const adverts = createAdverts(1);

const theAdvertTemplate = document.querySelector('#card').content;
const theAdvertSample = theAdvertTemplate.querySelector('.popup');
const fragment = document.createDocumentFragment();

adverts.forEach(( {author, offer} ) => {
  const { avatar } = author;
  const { title, address, price, type, rooms, guests, checkIn, checkOut, features, description, photos } = offer;
  const newAdvert = theAdvertSample.cloneNode(true);
  const titleElement = newAdvert.querySelector('.popup__title');
  titleElement.textContent = title ? title : hideElement(titleElement);
  const addressElement = newAdvert.querySelector('.popup__text--address');
  addressElement.textContent = address ? address : hideElement(addressElement);
  const priceElement = newAdvert.querySelector('.popup__text--price');
  priceElement.textContent = price ? `${ price } ₽/ночь` : hideElement(priceElement);
  const typeElement = newAdvert.querySelector('.popup__type');
  typeElement.textContent = type ? thesaurus[type] : hideElement(typeElement);
  const visitors = guests ? guests : 0;
  const capacityElement = newAdvert.querySelector('.popup__text--capacity');
  capacityElement.textContent  = rooms ?
    `${ rooms } комнаты для ${ visitors } гостей` :
    hideElement(capacityElement);
  const timeElement = newAdvert.querySelector('.popup__text--time');
  timeElement.textContent = checkIn && checkOut ?
    `Заезд после ${ checkIn }, выезд до ${ checkOut }` :
    hideElement(timeElement);
  const featuresContainer = newAdvert.querySelector('.popup__features');
  if(features){
    featuresContainer.querySelectorAll('.popup__feature').forEach((element) => {
      const isDeclared = features.some(
        (feature) => element.classList.contains(`popup__feature--${feature}`)
      );
      if(!isDeclared){
        element.remove();
      }
    });
  }
  else{
    hideElement(featuresContainer);
  }
  const descriptionElement = newAdvert.querySelector('.popup__description');
  descriptionElement.textContent = description ? description: hideElement(descriptionElement);
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
  else{
    hideElement(photosContainer);
  }
  newAdvert.querySelector('.popup__avatar').src = avatar ? avatar : '';

  fragment.append(newAdvert);
});

document.querySelector('#map-canvas').append(fragment);
