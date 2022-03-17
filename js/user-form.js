const form = document.querySelector('.ad-form');
const fieldsCollection = form.querySelectorAll('input');
const priceField = form.querySelector('#price');
const accomodation = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const addressField = form.querySelector('#address');

const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

fieldsCollection.forEach((field)=>{
  if(field.hasAttribute('required')){
    field.dataset.pristineRequiredMessage='Это поле должно быть заполнено';
  }
  if(field.hasAttribute('minLength')){
    field.dataset.pristineMinlengthMessage=`Минимальная длина ${field.minLength} символов`;
  }
  if(field.hasAttribute('maxLength')){
    field.dataset.pristineMaxlengthMessage=`Максимальная длина ${field.maxLength} символов`;
  }
  if(field.hasAttribute('max')){
    field.dataset.pristineMaxMessage=`Максимальное допустимое значение: ${field.max}`;
  }
});
addressField.removeAttribute('pattern');
addressField.dataset.pristinePattern=
  '/^-?[0-8]?[0-9]([.][0-9]{1,7})?,-?([0-1]?[0-7][0-9]|[0-9]{1,2})([.][0-9]{1,7})?$/';
addressField.dataset.pristinePatternMessage=
  'Формат адреса: -89.9999999,-179.9999999 знак - и дробная часть не обязательны';

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error'
});

const validatePrice = (value)=>(value>=minPrice[accomodation.value]);
const warnPriceValidation = ()=>`Цена слишком низкая, минимальная: ${minPrice[accomodation.value]}`;

pristine.addValidator(priceField, validatePrice, warnPriceValidation);

const validateCapacity = (value) => Number(rooms.value)===100 && Number(value)===0 ||
Number(value) <= Number(rooms.value) && Number(value)>0 && Number(rooms.value)<100;
const warnCapacityValidation = ()=>{
  if(Number(capacity.value)>Number(rooms.value)){
    return 'Гостей не должно быть больше, чем комнат';
  }
  if(Number(capacity.value)===0){
    return 'Должен быть хоть 1 гость';
  }
  return 'Данная конфигурация не для гостей';
};

pristine.addValidator(capacity, validateCapacity, warnCapacityValidation);

pristine.validate();

priceField.setAttribute('placeholder',`от ${minPrice[accomodation.value]}`);

const accomodationChangingHandler = (evt)=>{
  priceField.setAttribute('placeholder',`от ${minPrice[evt.target.value]}`);
  pristine.validate(priceField);
};

accomodation.addEventListener('change', accomodationChangingHandler);

const roomsChangingHandler = ()=>{
  pristine.validate(capacity);
};
rooms.addEventListener('change', roomsChangingHandler);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid){
    evt.preventDefault();
  }
});
