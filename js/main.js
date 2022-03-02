const generateInteger = (min, max) => {
  const minNumber = Number(min);
  const maxNumber = Number(max);
  if (maxNumber<0 || minNumber<0){
    throw 'Invalid range: the limits mustn\'t be negative';
  }
  if(maxNumber > minNumber){
    const distance = maxNumber-minNumber+1;
    const offset = distance*Math.random();
    const outcome = minNumber+Math.floor(offset);
    return outcome;
  }
  if(maxNumber === minNumber){
    return maxNumber;
  }
  throw 'Invalid range: the max must be greater than or equal the min';
};

const generateFloat = (min, max, digits) => {
  const minNumber = Number(min);
  const maxNumber = Number(max);
  if (maxNumber<0 || minNumber<0){
    throw 'Invalid range: the limits mustn\'t be negative';
  }
  if(maxNumber > minNumber){
    const distance = maxNumber-minNumber;
    const offset = distance*Math.random();
    const outcome = minNumber+offset;
    return Number(outcome.toFixed(digits));
  }
  if(maxNumber === minNumber){
    return maxNumber;
  }
  throw 'Invalid range: the max must be greater than or equal the min';
};

generateInteger(0,1);
generateFloat(1.0001, 1.0002,7);

const MAX_PRICE = 200;
const MAX_ROOMS_COUNT = 20;
const MAX_GUESTS_COUNT = 20;

const authorsInfo = {      //to exclude repeatitions
  packSize: 10,
  lastPackIds: [],
  currentBorder:10
};

const ACCOMMODATION_TYPE = {
  1: 'palace',
  2: 'flat',
  3: 'house',
  4: 'bungalow',
  5: 'hotel'
};

const CHECK_IN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECK_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
const POSSIBLE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const POSSIBLE_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const POSSIBLE_TITLES = [
  'Такого вы еще не видели',
  'Попробуйте что-то новое',
  'Хорошее предложение'
];
const POSSIBLE_DESCRIPTIONS =[
  'Предложение говорит само за себя',
  'Станция метро в 5 минутах пешком',
  'Из окна открываются отличные виды, большой потенциал для активного отдыха'
];

const clearArray = (array) => {
  let count = array.length;
  while(count>0){
    array.pop();
    count--;
  }
};

const checkElementPresence = (element, values) => {
  let flag = false;
  for(let i = 0; i<values.length && !flag; i++){
    flag = values[i]===element;
  }
  return flag;
};

const createAnAuthor = () => {
  let avatar = 'img/avatars/user';
  if (authorsInfo.lastPackIds.length === authorsInfo.packSize){
    clearArray(authorsInfo.lastPackIds);
    authorsInfo.currentBorder+=authorsInfo.packSize;
  }
  const min = authorsInfo.currentBorder - authorsInfo.packSize + 1;
  const max = authorsInfo.currentBorder;
  let id = generateInteger(min, max);
  while(checkElementPresence(id, authorsInfo.lastPackIds)){
    id = generateInteger(min, max);
  }
  authorsInfo.lastPackIds.push(id);
  id = String(id).padStart(2,'0');
  avatar = avatar.concat(id, '.png');
  return {
    avatar
  };
};

const generateArrayFrom = (count, donor) => {
  const takenIndexes = [];
  const array = [];
  for(let i=0; i<count; i++){
    let index = generateInteger(0, donor.length-1);
    while(checkElementPresence(index, takenIndexes)){
      index = generateInteger(0, donor.length-1);
    }
    takenIndexes.push(index);
    array.push(donor[index]);
  }
  return array;
};

const createLocation = () => {
  const MIN_LATITUDE = 35.65;
  const MAX_LATITUDE = 35.7;
  const MIN_LONGITUDE = 139.7;
  const MAX_LONGITUDE = 139.8;
  const ACCURACY = 5;             //digits after the decimal point

  return {
    lat: generateFloat(MIN_LATITUDE, MAX_LATITUDE, ACCURACY),
    lng: generateFloat(MIN_LONGITUDE, MAX_LONGITUDE, ACCURACY)
  };
};

const createAnOffer = (location = createLocation()) => {
  const featuresCount = generateInteger(0, POSSIBLE_FEATURES.length);
  const offersFeatures = generateArrayFrom(featuresCount, POSSIBLE_FEATURES);
  const photosCount = generateInteger(0, POSSIBLE_PHOTOS.length);
  const offersPhotos = generateArrayFrom(photosCount, POSSIBLE_PHOTOS);
  const someAddress = ''.concat(location.lat, ', ', location.lng);
  return {
    title: POSSIBLE_TITLES[generateInteger(0,POSSIBLE_TITLES.length-1)],
    address: someAddress,
    price: generateInteger(1, MAX_PRICE),
    type: ACCOMMODATION_TYPE[generateInteger(1,5)],
    rooms: generateInteger(1, MAX_ROOMS_COUNT),
    guests: generateInteger(0, MAX_GUESTS_COUNT),
    checkIn: CHECK_IN_TIMES[generateInteger(0, CHECK_IN_TIMES.length-1)],
    checkOut: CHECK_OUT_TIMES[generateInteger(0, CHECK_OUT_TIMES.length-1)],
    features: offersFeatures,
    description: POSSIBLE_DESCRIPTIONS[generateInteger(0, POSSIBLE_DESCRIPTIONS.length-1)],
    photos: offersPhotos
  };
};

const createAnAdvert = () => {
  const location = createLocation();
  return {
    author: createAnAuthor(),
    offer: createAnOffer(location),
    location
  };
};

const createAdverts = (count = 10) => Array.from({length:count}, createAnAdvert);
const createAuthors = (count = 10) => Array.from({length: count}, createAnAuthor);
const createOffers = (count = 10) => Array.from({length: count}, createAnOffer);
const createLocations = (count = 10) => Array.from({length: count}, createLocation);

const doNothing = (flag = true) => {
  if(!flag){
    createAdverts();
    createAuthors();
    createOffers();
    createLocations();
  }
};
doNothing();
