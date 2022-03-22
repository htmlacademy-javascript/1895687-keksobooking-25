import { deactivateForm } from './activity-toggling.js';

const MIN_PRICE = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const form = document.querySelector('.ad-form');
const fieldsCollection = form.querySelectorAll('input');
const priceField = form.querySelector('#price');
const accomodation = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const sliderElement = form.querySelector('.ad-form__slider');

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

priceField.setAttribute('min', MIN_PRICE[accomodation.value]);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: Number(priceField.max)
  },
  start: Number(priceField.min),
  connect: 'lower',
  format: {
    to: function(value){
      return value.toFixed(0);
    },
    from: function(value){
      return Number(value);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate(priceField);
});

const validatePrice = (value) => Number(value) >= Number(priceField.min);

const warnPriceValidation = () => `Цена слишком низкая, минимальная: ${ priceField.min }`;

pristine.addValidator(priceField, validatePrice, warnPriceValidation);

const getExtremNumberValue = (elements, high) => {
  let result = high ? -Infinity : Infinity;
  for(const element of elements){
    result = high && Number(element.value) > result || !high && Number(element.value) < result ?
      Number(element.value) :
      result;
  }
  return result;
};

const roomsHighLimit = getExtremNumberValue(rooms.children, true);
const capacityLowLimit = getExtremNumberValue(capacity.children, false);

const validateCapacity = (value) => {
  const notForGuests = Number(rooms.value) === roomsHighLimit && Number(value) === capacityLowLimit;
  const forGuests = Number(rooms.value) !== roomsHighLimit && Number(value) !== capacityLowLimit;
  return notForGuests || forGuests && Number(value) <= Number(rooms.value);
};

const warnCapacityValidation = () => {
  if(Number(capacity.value) > Number(rooms.value)){
    return 'Гостей не должно быть больше, чем комнат';
  }
  if(Number(capacity.value) === 0){
    return 'Должен быть хоть 1 гость';
  }
  return 'Данная конфигурация не для гостей';
};

pristine.addValidator(capacity, validateCapacity, warnCapacityValidation);

priceField.setAttribute('placeholder', `от ${ MIN_PRICE[accomodation.value] }`);

const accomodationChangingHandler = (evt) => {
  priceField.setAttribute('placeholder', `от ${ MIN_PRICE[evt.target.value] }`);
  priceField.setAttribute('min', MIN_PRICE[evt.target.value]);
  if (priceField.value !== ''){
    pristine.validate(priceField);
  }
};

accomodation.addEventListener('change', accomodationChangingHandler);

const priceChangingHandler = (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
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
  const isValid = pristine.validate();
  if(!isValid){
    evt.preventDefault();
  }
});

deactivateForm(form, 'ad-form--disabled');
