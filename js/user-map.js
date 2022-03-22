import { activateForm, deactivateForm } from './activity-toggling.js';
import { createAdverts } from './create-advert.js';
import { fillAdvertElementWithData } from './ad-element-data-filling.js';

const filtersForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
const mapUnit = document.querySelector('#map-canvas');

deactivateForm(filtersForm, 'map__filters--disabled');

const TOKYO_LOCATION = {
  lat: 35.6815574,
  lng: 139.7433043
};
const INITIAL_ZOOM_LEVEL = 15;

const mapLoadingHandler = () => {
  activateForm(filtersForm, 'map__filters--disabled');
  activateForm(adForm, 'ad-form--disabled');
};

const map = L.map(mapUnit).
  on('load', mapLoadingHandler).
  setView(TOKYO_LOCATION, INITIAL_ZOOM_LEVEL);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl:    '../img/main-pin.svg',
  iconSize:   [42, 42],
  iconAnchor: [21, 42]
});

const commonMarkerIcon = L.icon({
  iconUrl:    '../img/pin.svg',
  iconSize:   [42, 42],
  iconAnchor: [21, 42]
});

const mainMarker = L.marker(TOKYO_LOCATION, {
  icon: mainMarkerIcon,
  draggable:true
}).addTo(map);

const markerDraggingHandler = (evt) => {
  const location = evt.latlng;
  const lat = location.lat.toFixed(7);
  const lng = location.lng.toFixed(7);
  addressField.value = `${lat}, ${lng}`;
};

mainMarker.on('drag', markerDraggingHandler);

addressField.value = `${TOKYO_LOCATION.lat}, ${TOKYO_LOCATION.lng}`;

const advertsLayerGroup = L.layerGroup().addTo(map);

const createPopup = (data) => {
  const popupSample = document.querySelector('#card').content.querySelector('.popup');
  const newPopup = popupSample.cloneNode(true);
  fillAdvertElementWithData(newPopup, data);
  return newPopup;
};

const createMarker = (data) => {
  L.marker(data.location, {
    icon: commonMarkerIcon
  }).bindPopup(createPopup(data)).addTo(advertsLayerGroup);
};

const adverts = createAdverts();

adverts.forEach((advert) => createMarker(advert));
