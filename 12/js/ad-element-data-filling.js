const THESAURUS = {
  'flat' : 'Квартира',
  'bungalow' : 'Бунгало',
  'house':'Дом',
  'palace':'Дворец',
  'hotel':'Отель'
};

const hideElement = (element) => element.classList.add('hidden');  // returns undefined

const fillAdvertElementWithData = (adElement, advertData) =>{
  const { author, offer } = advertData;
  const { avatar } = author;
  const { title, address, price, type, rooms, guests, checkIn, checkOut, features, description, photos } = offer;

  const titleElement = adElement.querySelector('.popup__title');
  titleElement.textContent = title ? title : hideElement(titleElement);
  const addressElement = adElement.querySelector('.popup__text--address');
  addressElement.textContent = address ? address : hideElement(addressElement);
  const priceElement = adElement.querySelector('.popup__text--price');
  priceElement.textContent = price ? `${ price } ₽/ночь` : hideElement(priceElement);
  const typeElement = adElement.querySelector('.popup__type');
  typeElement.textContent = type ? THESAURUS[type] : hideElement(typeElement);
  const visitors = guests ? guests : 0;
  const capacityElement = adElement.querySelector('.popup__text--capacity');
  capacityElement.textContent  = rooms ?
    `${ rooms } комнаты для ${ visitors } гостей` :
    hideElement(capacityElement);
  const timeElement = adElement.querySelector('.popup__text--time');
  timeElement.textContent = checkIn && checkOut ?
    `Заезд после ${ checkIn }, выезд до ${ checkOut }` :
    hideElement(timeElement);
  const featuresContainer = adElement.querySelector('.popup__features');
  if(features){
    featuresContainer.querySelectorAll('.popup__feature').forEach((unit) => {
      const isDeclared = features.some(
        (feature) => unit.classList.contains(`popup__feature--${feature}`)
      );
      if(!isDeclared){
        unit.remove();
      }
    });
  }
  else{
    hideElement(featuresContainer);
  }
  const descriptionElement = adElement.querySelector('.popup__description');
  descriptionElement.textContent = description ? description: hideElement(descriptionElement);
  const photosContainer = adElement.querySelector('.popup__photos');
  const photoSample = photosContainer.querySelector('.popup__photo').cloneNode(true);
  photosContainer.querySelectorAll('.popup__photo').forEach((unit) => unit.remove());
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
  const avatarElement = adElement.querySelector('.popup__avatar');
  avatarElement.src = avatar ? avatar : hideElement(avatarElement);
};

export { fillAdvertElementWithData };
