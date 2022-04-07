import { getArrayCutTo } from './array-utils.js';
import { getData } from './communication.js';
import { showLoadErrorMessage } from './show-error.js';
import { createMarkers, deleteMarkers, closePopup } from './user-map.js';

const MARKERS_COUNT = 10;
const RERENDER_DELAY = 500;
const MIDDLE_PRICE_LINE = 10000;
const HIGH_PRICE_LINE = 50000;

const criteria = {
  accomodationType : 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features : []
};

const filtersForm = document.querySelector('.map__filters');
const featuresSet = filtersForm.querySelector('#housing-features');

const filterAccomodationType = (element) => criteria.accomodationType === 'any' ||
  element.offer.type === criteria.accomodationType;

const filterPrice = (element) => {
  const price = element.offer.price;
  switch(criteria.price){
    case 'any':
      return true;
    case 'high':
      return price >= HIGH_PRICE_LINE;
    case 'middle':
      return price >= MIDDLE_PRICE_LINE &&
      price < HIGH_PRICE_LINE;
    case 'low':
      return price < MIDDLE_PRICE_LINE;
  }
};

const filterRooms = (element) => criteria.rooms === 'any' ||
  Number(criteria.rooms) === element.offer.rooms;

const filterGuests = (element) => criteria.guests === 'any' ||
  Number(criteria.guests) === element.offer.guests;

const filterFeatures = (element) => (!criteria.features.length) ||
  criteria.features.reduce(
    (result, feature) => result && element.offer.features && element.offer.features.includes(feature),
    true
  );

const filterDataWithTheCriteria = (data) => data.filter(filterAccomodationType)
  .filter(filterPrice)
  .filter(filterRooms)
  .filter(filterGuests)
  .filter(filterFeatures);

const showFilteredAds = () =>{
  closePopup();
  deleteMarkers();
  getData(
    (data)=>{
      const filteredData = filterDataWithTheCriteria(data);
      createMarkers(getArrayCutTo(filteredData, MARKERS_COUNT));
    },
    showLoadErrorMessage
  );
};

const debounce = (callback, delay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>callback.apply(this, rest), delay);
  };
};

const renderChosen = debounce(showFilteredAds, RERENDER_DELAY);

const selectorChanginHandler = (evt) => {
  const target = evt.target;
  if(target.matches('select')){
    if(target.matches('#housing-type')){
      criteria.accomodationType = target.value;
    }
    if(target.matches('#housing-price')){
      criteria.price = target.value;
    }
    if(target.matches('#housing-rooms')){
      criteria.rooms = target.value;
    }
    if(target.matches('#housing-guests')){
      criteria.guests = target.value;
    }
    renderChosen();
    evt.stopPropagation();
  }
};

const featuresChangingHandler = (evt) => {
  if(evt.target.matches('input[type="checkbox"]')){
    if(evt.target.checked){
      criteria.features.push(evt.target.value);
    }
    else{
      const index = criteria.features.indexOf(evt.target.value);
      criteria.features.splice(index, 1);
    }
    renderChosen();
    evt.stopPropagation();
  }
};

filtersForm.addEventListener('change', selectorChanginHandler);
featuresSet.addEventListener('change', featuresChangingHandler);
