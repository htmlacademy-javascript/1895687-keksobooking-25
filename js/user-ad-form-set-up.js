import { deactivateForm } from './activity-toggling.js';
import { sendData } from './communication.js';
import {
  typeToMinPrice,
  fillUpStandartPristineAttributes,
  getExtremNumberValue
} from './user-ad-form-validation-utils.js';

const adFormElement = document.querySelector('.ad-form');
const fieldsCollection = adFormElement.querySelectorAll('input');
const priceFieldElement = adFormElement.querySelector('#price');
const accomodationElement = adFormElement.querySelector('#type');
const roomsElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const sliderElement = adFormElement.querySelector('.ad-form__slider');

fieldsCollection.forEach((field) => fillUpStandartPristineAttributes(field));

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error'
});

priceFieldElement.setAttribute('min', typeToMinPrice[accomodationElement.value]);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: Number(priceFieldElement.max)
  },
  start: Number(priceFieldElement.min),
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
  priceFieldElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceFieldElement);
});

const validatePrice = (value) => Number(value) >= Number(priceFieldElement.min);

const warnPriceValidation = () => `Цена слишком низкая, минимальная: ${ priceFieldElement.min }`;

pristine.addValidator(priceFieldElement, validatePrice, warnPriceValidation);

const roomsHighLimit = getExtremNumberValue(roomsElement.children, true);
const capacityLowLimit = getExtremNumberValue(capacityElement.children, false);

const validateCapacity = (value) => {
  const notForGuests = Number(roomsElement.value) === roomsHighLimit && Number(value) === capacityLowLimit;
  const forGuests = Number(roomsElement.value) !== roomsHighLimit && Number(value) !== capacityLowLimit;
  return notForGuests || forGuests && Number(value) <= Number(roomsElement.value);
};

const warnCapacityValidation = () => {
  if(Number(capacityElement.value) > Number(roomsElement.value)){
    return 'Гостей не должно быть больше, чем комнат';
  }
  if(Number(capacityElement.value) === 0){
    return 'Должен быть хоть 1 гость';
  }
  return 'Данная конфигурация не для гостей';
};

pristine.addValidator(capacityElement, validateCapacity, warnCapacityValidation);

priceFieldElement.setAttribute('placeholder', `от ${ typeToMinPrice[accomodationElement.value] }`);

const accomodationChangingHandler = (evt) => {
  priceFieldElement.setAttribute('placeholder', `от ${ typeToMinPrice[evt.target.value] }`);
  priceFieldElement.setAttribute('min', typeToMinPrice[evt.target.value]);
  if (priceFieldElement.value !== ''){
    pristine.validate(priceFieldElement);
  }
};

accomodationElement.addEventListener('change', accomodationChangingHandler);

const priceChangingHandler = (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
  pristine.validate(priceFieldElement);
};

priceFieldElement.addEventListener('change', priceChangingHandler);

const createTimeChangingHandler = (boundElement) => (evt) => {
  boundElement.value = evt.target.value;
};

const timeInChangingHandler = createTimeChangingHandler(timeOutElement);
const timeOutChangingHandler = createTimeChangingHandler(timeInElement);

timeInElement.addEventListener('change', timeInChangingHandler);
timeOutElement.addEventListener('change', timeOutChangingHandler);

const roomsChangingHandler = () => {
  pristine.validate(capacityElement);
};

roomsElement.addEventListener('change', roomsChangingHandler);

const blockSubmitButton = () => {
  submitButtonElement.setAttribute('disabled','true');
  submitButtonElement.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButtonElement.removeAttribute('disabled');
  submitButtonElement.textContent = 'Опубликовать';
};

const setUserAdFormSubmit = (successHandler, errorHandler) => {
  adFormElement.addEventListener('submit', (evt) => {
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
  priceFieldElement.setAttribute('min', typeToMinPrice[accomodationElement.value]);
  priceFieldElement.setAttribute('placeholder', `от ${ typeToMinPrice[accomodationElement.value] }`);
  sliderElement.noUiSlider.set(typeToMinPrice[accomodationElement.value]);
};

deactivateForm(adFormElement, 'ad-form--disabled');

export { setUserAdFormSubmit, resetPriceInput };
