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

const filtersForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
const mapUnit = document.querySelector('#map-canvas');
const popupSample = document.querySelector('#card').content.querySelector('.popup');

deactivateForm(filtersForm, 'map__filters--disabled');

const mapLoadingHandler = () => {
  activateForm(adForm, 'ad-form--disabled');
};

const map = L.map(mapUnit).
  on('load', mapLoadingHandler).
  setView(TOKYO_LOCATION, INITIAL_ZOOM_LEVEL);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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
}).addTo(map);

const markerDraggingHandler = (evt) => {
  const location = evt.latlng;
  const lat = location.lat.toFixed(ADDRESS_ACCURACY);
  const lng = location.lng.toFixed(ADDRESS_ACCURACY);
  addressField.value = `${lat}, ${lng}`;
};

mainMarker.on('drag', markerDraggingHandler);

addressField.value = `${TOKYO_LOCATION.lat}, ${TOKYO_LOCATION.lng}`;

const resetMainMarker = () => {
  mainMarker.setLatLng(TOKYO_LOCATION);
  addressField.value = `${TOKYO_LOCATION.lat}, ${TOKYO_LOCATION.lng}`;
};

const advertsLayerGroup = L.layerGroup().addTo(map);

const createPopup = (data) => {
  const newPopup = popupSample.cloneNode(true);
  fillAdvertElementWithData(newPopup, data);
  return newPopup;
};

const createMarker = (data) => {
  L.marker(data.location, {
    icon: commonMarkerIcon
  }).bindPopup(createPopup(data)).addTo(advertsLayerGroup);
};

const createMarkers = (data) => {
  data.forEach((item) => createMarker(item));
  activateForm(filtersForm, 'map__filters--disabled');
};
const deleteMarkers = () => advertsLayerGroup.clearLayers();
const closePopup = () => map.closePopup();

export {
  resetMainMarker,
  createMarkers,
  deleteMarkers,
  closePopup
};
