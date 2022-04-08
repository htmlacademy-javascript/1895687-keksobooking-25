import { deactivateForm } from './activity-toggling.js';
import { sendData } from './communication.js';
import {
  typeToMinPrice,
  fillUpStandartPristineAttributes,
  getExtremNumberValue
} from './user-ad-form-validation-utils.js';

const form = document.querySelector('.ad-form');
const fieldsCollection = form.querySelectorAll('input');
const priceField = form.querySelector('#price');
const accomodation = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const sliderElement = form.querySelector('.ad-form__slider');

fieldsCollection.forEach((field) => fillUpStandartPristineAttributes(field));

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error'
});

priceField.setAttribute('min', typeToMinPrice[accomodation.value]);

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

priceField.setAttribute('placeholder', `от ${ typeToMinPrice[accomodation.value] }`);

const accomodationChangingHandler = (evt) => {
  priceField.setAttribute('placeholder', `от ${ typeToMinPrice[evt.target.value] }`);
  priceField.setAttribute('min', typeToMinPrice[evt.target.value]);
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

function timeChangingHandler(evt){
  this.value = evt.target.value;
}

timeIn.addEventListener('change', timeChangingHandler.bind(timeOut));
timeOut.addEventListener('change', timeChangingHandler.bind(timeIn));

const roomsChangingHandler = () => {
  pristine.validate(capacity);
};

rooms.addEventListener('change', roomsChangingHandler);

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled','true');
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Опубликовать';
};

const setUserAdFormSubmit = (successHandler, errorHandler) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      sendData(
        () => {
          successHandler();
          unblockSubmitButton();
        },
        () => {
          errorHandler();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

const resetPriceInput = () => {
  priceField.setAttribute('min', typeToMinPrice[accomodation.value]);
  priceField.setAttribute('placeholder', `от ${ typeToMinPrice[accomodation.value] }`);
  sliderElement.noUiSlider.set(typeToMinPrice[accomodation.value]);
};

deactivateForm(form, 'ad-form--disabled');

export { setUserAdFormSubmit, resetPriceInput };
