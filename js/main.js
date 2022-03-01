//The function generates a random integer number
// with a value between the min and the max inclusively.
//Please pay attention:
//the limits mustn't be negative and
//the max must be greater or equal than the min, else the function generates an exception
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
//The function generates a random floating point number
// with a value between the min and the max inclusively.
// digits is the number of digits to appear after the decimal point
//Please pay attention:
//the limits mustn't be negative and
//the max must be greater or equal than the min, else the function generates an exception
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

const MAX_AUTHORS_COUNT = 10;
const MAX_PRICE = 200;
const MAX_ROOMS_COUNT = 20;
const MAX_GUESTS_COUNT = 20;
const authorsIds = []; //to exclude repeatitions

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

const checkIdExistance = (id, ids) => {
  let flag = false;
  for(let i = 0; i<ids.length && !flag; i++){
    flag = ids[i]===id;
  }
  return flag;
};

const createAnAuthor = () => {
  let avatarPath = 'img/avatars/user';
  let id = generateInteger(1,MAX_AUTHORS_COUNT);
  if (authorsIds.length === MAX_AUTHORS_COUNT){
    throw 'Достигнуто максимальное количество авторов';
  }
  while(checkIdExistance(id, authorsIds)){
    id = generateInteger(1,MAX_AUTHORS_COUNT);
  }
  authorsIds[authorsIds.length]=id;
  id = (id>=10) ? String(id) : '0'.concat(String(id));
  avatarPath = avatarPath.concat(id, '.png');
  const author = {
    avatar: avatarPath
  };

  return author;
};

const generateArray = (count, values) => {
  const declaredIds = [];
  const array = [];
  for(let i=0; i<count; i++){
    let id = generateInteger(1, values.length);
    while(checkIdExistance(id, declaredIds)){
      id = generateInteger(1, values.length);
    }
    declaredIds[declaredIds.length]=id;
    array[array.length] = values[id-1];
  }
  return array;
};

const createLocation = () => {
  const MIN_LATITUDE = 35.65;
  const MAX_LATITUDE = 35.7;
  const MIN_LONGITUDE = 139.7;
  const MAX_LONGITUDE = 139.8;
  const accuracy = 5;             //digits after the decimal point

  return {
    lat: generateFloat(MIN_LATITUDE, MAX_LATITUDE, accuracy),
    lng: generateFloat(MIN_LONGITUDE, MAX_LONGITUDE, accuracy)
  };
};

const createAnOffer = () => {
  const featuresCount = generateInteger(0, POSSIBLE_FEATURES.length);
  const offersFeatures = generateArray(featuresCount, POSSIBLE_FEATURES);
  const photosCount = generateInteger(0, POSSIBLE_PHOTOS.length);
  const offersPhotos = generateArray(photosCount, POSSIBLE_PHOTOS);
  const location = createLocation();
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


const authors = Array.from({length: 10}, createAnAuthor);
const offers = Array.from({length: 10}, createAnOffer);
const locations = Array.from({length: 10}, createLocation);

console.table(authors);
console.table(offers);
console.table(locations);
