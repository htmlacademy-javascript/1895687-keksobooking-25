const typeToMinPrice = {
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

const getExtremNumberValue = (elements, isMax) => {
  let result = isMax ? -Infinity : Infinity;
  for(const element of elements){
    result = isMax && Number(element.value) > result || !isMax && Number(element.value) < result ?
      Number(element.value) :
      result;
  }
  return result;
};

export {
  typeToMinPrice,
  fillUpStandartPristineAttributes,
  getExtremNumberValue
};
