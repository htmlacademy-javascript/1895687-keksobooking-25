import {
  MAX_PRICE,
  MAX_ROOMS_COUNT,
  MAX_GUESTS_COUNT,
  ACCOMMODATION_TYPES,
  CHECK_IN_TIME,
  CHECK_OUT_TIME,
  POSSIBLE_FEATURES,
  POSSIBLE_PHOTOS,
  POSSIBLE_TITLES,
  POSSIBLE_DESCRIPTIONS
} from './data.js';
import { getAnElement, generateArrayFrom } from './array-utils.js';
import { createLocation } from './create-location.js';
import { generateInteger } from './number-generators.js';

const createAnOffer = (location = createLocation()) => {
  const featuresCount = generateInteger(0, POSSIBLE_FEATURES.length);
  const features = generateArrayFrom(featuresCount, POSSIBLE_FEATURES);
  const photosCount = generateInteger(0, POSSIBLE_PHOTOS.length);
  const photos = generateArrayFrom(photosCount, POSSIBLE_PHOTOS);
  const address = ''.concat(location.lat, ', ', location.lng);
  return {
    title: getAnElement(POSSIBLE_TITLES),
    address,
    price: generateInteger(1, MAX_PRICE),
    type: getAnElement(ACCOMMODATION_TYPES),
    rooms: generateInteger(1, MAX_ROOMS_COUNT),
    guests: generateInteger(0, MAX_GUESTS_COUNT),
    checkIn: getAnElement(CHECK_IN_TIME),
    checkOut: getAnElement(CHECK_OUT_TIME),
    features,
    description: getAnElement(POSSIBLE_DESCRIPTIONS),
    photos
  };
};

const createOffers = (count = 10) => Array.from({length: count}, createAnOffer);

export{
  createAnOffer,
  createOffers
};
