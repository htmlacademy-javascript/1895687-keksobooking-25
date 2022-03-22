import { generateFloat } from './number-generators.js';

const createLocation = () => {
  const MIN_LATITUDE = 35.65;
  const MAX_LATITUDE = 35.7;
  const MIN_LONGITUDE = 139.7;
  const MAX_LONGITUDE = 139.8;
  const ACCURACY = 7;             //digits after the decimal point

  return {
    lat: generateFloat(MIN_LATITUDE, MAX_LATITUDE, ACCURACY),
    lng: generateFloat(MIN_LONGITUDE, MAX_LONGITUDE, ACCURACY)
  };
};

const createLocations = (count = 10) => Array.from({length: count}, createLocation);

export{
  createLocation,
  createLocations
};
