import { getArrayCutTo } from './array-utils.js';
import { createMarkers, deleteMarkers, closePopup } from './user-map.js';
import { debounce } from './async-utils.js';
import { dataStorage } from './data-storage.js';

const MARKERS_COUNT = 10;
const RERENDER_DELAY = 500;
const MIDDLE_PRICE_LINE = 10000;
const HIGH_PRICE_LINE = 50000;

const criteria = (() => {
  let type = 'any';
  let price = 'any';
  let rooms = 'any';
  let guests = 'any';
  const features = [];
  return {
    isAnyType : () => type === 'any',
    isAnyRoomsCount: () => rooms === 'any',
    isAnyGuestsCount: () => guests === 'any',
    areFeaturesUnnecessary: () => features.length === 0,
    setType : (value) => { type = value; },
    getType : () => type,
    setPrice : (value) => { price = value; },
    getPrice : () => price,
    setRooms : (value) => { rooms = value; },
    getRooms : () => rooms,
    setGuests : (value) => { guests = value; },
    getGuests : () => guests,
    appendFeature : (feature) => { features.push(feature); },
    removeFeature : (feature) => {
      const index = features.indexOf(feature);
      if(index !== -1){
        features.splice(index, 1);
      }
    },
    getFeatures : () => features,
    reset : () => {
      type = 'any';
      price = 'any';
      rooms = 'any';
      guests = 'any';
      if(features.length){
        features.splice(0, features.length);
      }
    }
  };
})();

const filtersForm = document.querySelector('.map__filters');
const featuresSet = filtersForm.querySelector('#housing-features');

const filterAccomodationType = (element) => criteria.isAnyType() ||
  element.offer.type === criteria.getType();

const filterPrice = (element) => {
  const price = element.offer.price;
  switch(criteria.getPrice()){
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

const filterRooms = (element) => criteria.isAnyRoomsCount() ||
  Number(criteria.getRooms()) === element.offer.rooms;

const filterGuests = (element) => criteria.isAnyGuestsCount() ||
  Number(criteria.getGuests()) === element.offer.guests;

const filterFeatures = (element) => criteria.areFeaturesUnnecessary() ||
  criteria.getFeatures().reduce(
    (result, feature) => result && element.offer.features && element.offer.features.includes(feature),
    true
  );

const filterDataWithTheCriteria = (data) => data.filter(filterAccomodationType)
  .filter(filterPrice)
  .filter(filterRooms)
  .filter(filterGuests)
  .filter(filterFeatures);

const prepareRendering = () => {
  closePopup();
  deleteMarkers();
};

const renderingHandler = () => {
  prepareRendering();
  const filteredData = filterDataWithTheCriteria(dataStorage.getData());
  createMarkers(getArrayCutTo(filteredData, MARKERS_COUNT));
};

const renderChosen = debounce(renderingHandler, RERENDER_DELAY);

const renderUnfiltered = () => {
  prepareRendering();
  createMarkers(getArrayCutTo(dataStorage.getData(), MARKERS_COUNT));
};

const selectorChanginHandler = (evt) => {
  const target = evt.target;
  if(target.matches('select')){
    if(target.matches('#housing-type')){
      criteria.setType(target.value);
    }
    if(target.matches('#housing-price')){
      criteria.setPrice(target.value);
    }
    if(target.matches('#housing-rooms')){
      criteria.setRooms(target.value);
    }
    if(target.matches('#housing-guests')){
      criteria.setGuests(target.value);
    }
    renderChosen();
    evt.stopPropagation();
  }
};

const featuresChangingHandler = (evt) => {
  if(evt.target.matches('input[type="checkbox"]')){
    if(evt.target.checked){
      criteria.appendFeature(evt.target.value);
    }
    else{
      criteria.removeFeature(evt.target.value);
    }
    renderChosen();
    evt.stopPropagation();
  }
};

filtersForm.addEventListener('change', selectorChanginHandler);
featuresSet.addEventListener('change', featuresChangingHandler);

const resetCriteria = () => {
  criteria.reset();
  renderUnfiltered();
};

export {
  resetCriteria
};
