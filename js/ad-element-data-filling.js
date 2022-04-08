const typeThesaurus = {
  'flat' : 'Квартира',
  'bungalow' : 'Бунгало',
  'house':'Дом',
  'palace':'Дворец',
  'hotel':'Отель'
};

const hideElement = (element) => element.classList.add('hidden');

const fillAdvertElementWithData = (adElement, data) =>{
  const { author, offer } = data;
  const { avatar } = author;
  const { title, address, price, type, rooms, guests, checkIn, checkOut, features, description, photos } = offer;

  const titleElement = adElement.querySelector('.popup__title');
  titleElement.textContent = title ? title : hideElement(titleElement);
  const addressElement = adElement.querySelector('.popup__text--address');
  addressElement.textContent = address ? address : hideElement(addressElement);
  const priceElement = adElement.querySelector('.popup__text--price');
  priceElement.textContent = price ? `${ price } ₽/ночь` : hideElement(priceElement);
  const typeElement = adElement.querySelector('.popup__type');
  typeElement.textContent = type ? typeThesaurus[type] : hideElement(typeElement);
  const visitors = guests ? guests : 0;
  const capacityElement = adElement.querySelector('.popup__text--capacity');
  capacityElement.textContent  = rooms ?
    `${ rooms } комнаты для ${ visitors } гостей` :
    hideElement(capacityElement);
  const timeElement = adElement.querySelector('.popup__text--time');
  timeElement.textContent = checkIn && checkOut ?
    `Заезд после ${ checkIn }, выезд до ${ checkOut }` :
    hideElement(timeElement);
  const featuresContainerElement = adElement.querySelector('.popup__features');
  if(features){
    featuresContainerElement.querySelectorAll('.popup__feature').forEach((unit) => {
      const isDeclared = features.some(
        (feature) => unit.classList.contains(`popup__feature--${feature}`)
      );
      if(!isDeclared){
        unit.remove();
      }
    });
  }
  else{
    hideElement(featuresContainerElement);
  }
  const descriptionElement = adElement.querySelector('.popup__description');
  descriptionElement.textContent = description ? description: hideElement(descriptionElement);
  const photosContainerElement = adElement.querySelector('.popup__photos');
  const photoElementSample = photosContainerElement.querySelector('.popup__photo').cloneNode(true);
  photosContainerElement.querySelectorAll('.popup__photo').forEach((unit) => unit.remove());
  if(photos){
    photos.forEach((photo) => {
      const newPhotoElement = photoElementSample.cloneNode(true);
      newPhotoElement.src = photo;
      photosContainerElement.append(newPhotoElement);
    });
  }
  else{
    hideElement(photosContainerElement);
  }
  const avatarElement = adElement.querySelector('.popup__avatar');
  avatarElement.src = avatar ? avatar : hideElement(avatarElement);
};

export { fillAdvertElementWithData };
