const typeToMinPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const fillPristineAttributesUp = (element) => {
  if(element.hasAttribute('required')){
    element.dataset.pristineRequiredMessage = 'Это поле должно быть заполнено';
  }
  if(element.hasAttribute('minLength')){
    element.dataset.pristineMinlengthMessage = `Минимальная длина ${element.minLength} символов`;
  }
  if(element.hasAttribute('maxLength')){
    element.dataset.pristineMaxlengthMessage = `Максимальная длина ${element.maxLength} символов`;
  }
  if(element.hasAttribute('max')){
    element.dataset.pristineMaxMessage = `Максимальное допустимое значение: ${element.max}`;
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
  fillPristineAttributesUp,
  getExtremNumberValue
};
