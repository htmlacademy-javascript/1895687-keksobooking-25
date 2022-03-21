import { activateForm, deactivateForm } from './activity-toggling.js';

const filtersForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const mapUnit = document.querySelector('#map-canvas');

deactivateForm(filtersForm, 'map__filters--disabled');

const locationOfTokyo = {
  lat: 35.6823,
  lng: 139.7437
};
const zoomLevel = 13;

const mapLoadingHandler = () => {
  activateForm(filtersForm, 'map__filters--disabled');
  activateForm(adForm, 'ad-form--disabled');
};

const map = L.map(mapUnit).on('load', mapLoadingHandler).setView(locationOfTokyo, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

