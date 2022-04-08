import { activateForm, deactivateForm } from './activity-toggling.js';
import { fillAdvertElementWithData } from './ad-element-data-filling.js';

const TOKYO_LOCATION = {
  lat: 35.6838768,
  lng: 139.7547148
};

const MAIN_MARKER_SIZE = 52;
const COMMON_MARKER_SIZE = 40;

const INITIAL_ZOOM_LEVEL = 15;
const ADDRESS_ACCURACY = 7;

const filtersFormElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const addressFieldElement = adFormElement.querySelector('#address');
const mapElement = document.querySelector('#map-canvas');
const popupElementSample = document.querySelector('#card').content.querySelector('.popup');

const map = L.map(mapElement);

const mainMarkerIcon = L.icon({
  iconUrl:    'img/main-pin.svg',
  iconSize:   [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
  iconAnchor: [MAIN_MARKER_SIZE/2, MAIN_MARKER_SIZE]
});

const commonMarkerIcon = L.icon({
  iconUrl:    'img/pin.svg',
  iconSize:   [COMMON_MARKER_SIZE, COMMON_MARKER_SIZE],
  iconAnchor: [COMMON_MARKER_SIZE/2, COMMON_MARKER_SIZE]
});

const mainMarker = L.marker(TOKYO_LOCATION, {
  icon: mainMarkerIcon,
  draggable:true
});

const advertsLayerGroup = L.layerGroup().addTo(map);

deactivateForm(filtersFormElement, 'map__filters--disabled');

const mapLoadingHandler = () => {
  activateForm(adFormElement, 'ad-form--disabled');
};

const markerDraggingHandler = (evt) => {
  const location = evt.latlng;
  const lat = location.lat.toFixed(ADDRESS_ACCURACY);
  const lng = location.lng.toFixed(ADDRESS_ACCURACY);
  addressFieldElement.value = `${lat}, ${lng}`;
};

const initialiseMap = () =>{
  map
    .on('load', mapLoadingHandler)
    .setView(TOKYO_LOCATION, INITIAL_ZOOM_LEVEL);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  mainMarker.on('drag', markerDraggingHandler).addTo(map);

  addressFieldElement.value = `${TOKYO_LOCATION.lat}, ${TOKYO_LOCATION.lng}`;
};

const resetMainMarker = () => {
  mainMarker.setLatLng(TOKYO_LOCATION);
  addressFieldElement.value = `${TOKYO_LOCATION.lat}, ${TOKYO_LOCATION.lng}`;
};

const createPopup = (data) => {
  const newPopupElement = popupElementSample.cloneNode(true);
  fillAdvertElementWithData(newPopupElement, data);
  return newPopupElement;
};

const createMarker = (data) => {
  L.marker(data.location, {
    icon: commonMarkerIcon
  }).bindPopup(createPopup(data)).addTo(advertsLayerGroup);
};

const createMarkers = (data) => data.forEach((item) => createMarker(item));
const activateFiltersForm = () => activateForm(filtersFormElement, 'map__filters--disabled');
const deleteMarkers = () => advertsLayerGroup.clearLayers();
const closePopup = () => map.closePopup();

export {
  initialiseMap,
  resetMainMarker,
  createMarkers,
  activateFiltersForm,
  deleteMarkers,
  closePopup
};
