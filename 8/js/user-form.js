import { createLocation } from './create-location.js';

const form = document.querySelector('.ad-form');
const fieldsCollection = form.querySelectorAll('input');
const priceField = form.querySelector('#price');
const accomodation = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const addressField = form.querySelector('#address');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const fillUpStandartPristineAttributes = (field) => {
  if(field.hasAttribute('required')){
    field.dataset.pristineRequiredMessage = 'Это поле должно быть заполнено';
  }
  if(field.hasAttribute('minLength')){
    field.dataset.pristineMinlengthMessage = `Минимальная длина ${field.minLength} символов`;
  }
  if(field.hasAttribute('maxLength')){
    field.dataset.pristineMaxlengthMessage = `Максимальная длина ${field.maxLength} символов`;
  }
  if(field.hasAttribute('max')){
    field.dataset.pristineMaxMessage = `Максимальное допустимое значение: ${field.max}`;
  }
};

fieldsCollection.forEach((field) => fillUpStandartPristineAttributes(field));

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error'
});

priceField.setAttribute('min', minPrice[accomodation.value]);

const validatePrice = (value) => Number(value) >= Number(priceField.min);

const warnPriceValidation = () => `Цена слишком низкая, минимальная: ${ priceField.min }`;

pristine.addValidator(priceField, validatePrice, warnPriceValidation);

// I would have done a couple below via .reduce() if there had been the opportunity
const roomsOptions = rooms.children;
let roomsHighLimit = -Infinity;
for(const option of roomsOptions){
  if(Number(option.value) > roomsHighLimit){
    roomsHighLimit = Number(option.value);
  }
}

const capacityOptions = capacity.children;
let capacityLowLimit = Infinity;
for(const option of capacityOptions){
  if(Number(option.value) < capacityLowLimit){
    capacityLowLimit = Number(option.value);
  }
}

const validateCapacity = (value) => {
  const notForGuests = Number(rooms.value) === roomsHighLimit && Number(value) === capacityLowLimit;
  // forGuests != !notForGuests ( !(a & b) = !a | !b )
  const forGuests = Number(rooms.value) !== roomsHighLimit && Number(value) !== capacityLowLimit;
  return notForGuests || forGuests && Number(value) <= Number(rooms.value);
};

const warnCapacityValidation = () => {
  if(+capacity.value > +rooms.value){
    return 'Гостей не должно быть больше, чем комнат';
  }
  if(+capacity.value === 0){
    return 'Должен быть хоть 1 гость';
  }
  return 'Данная конфигурация не для гостей';
};

pristine.addValidator(capacity, validateCapacity, warnCapacityValidation);

priceField.setAttribute('placeholder', `от ${ minPrice[accomodation.value] }`);

const accomodationChangingHandler = (evt) => {
  priceField.setAttribute('placeholder', `от ${ minPrice[evt.target.value] }`);
  priceField.setAttribute('min', minPrice[evt.target.value]);
  if (priceField.value !== ''){
    pristine.validate(priceField);
  }
};

accomodation.addEventListener('change', accomodationChangingHandler);

const priceChangingHandler = () => {
  pristine.validate(priceField);
};

priceField.addEventListener('change', priceChangingHandler);

const timeChangingHandler = function(evt){
  this.value = evt.target.value;
};

timeIn.addEventListener('change', timeChangingHandler.bind(timeOut));
timeOut.addEventListener('change', timeChangingHandler.bind(timeIn));

const roomsChangingHandler = () => {
  pristine.validate(capacity);
};

rooms.addEventListener('change', roomsChangingHandler);

form.addEventListener('submit', (evt) => {
  const address = createLocation();
  addressField.value = `${ address.lat }, ${ address.lng }`;
  const isValid = pristine.validate();
  if(!isValid){
    evt.preventDefault();
  }
});
