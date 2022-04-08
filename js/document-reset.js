import { resetCriteria } from './ads-filter.js';
import { resetImages } from './upload-images.js';
import { resetPriceInput } from './user-ad-form-set-up.js';
import { resetMainMarker, closePopup } from './user-map.js';

const INDEX_NO_SELECTED_OPTION = -1;

const adFormElement = document.querySelector('.ad-form');
const titleElement = adFormElement.querySelector('#title');
const descriptionElement = adFormElement.querySelector('#description');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');

const checkboxesCollection = document.querySelectorAll('input[type="checkbox"]');
const selectsCollection = document.querySelectorAll('select');

const resetSelect = (element) => {
  const options = element.options;
  for(let i = 0; i < options.length; i++){
    if(options[i].defaultSelected){
      element.selectedIndex = i;
      return;
    }
  }
  element.selectedIndex = INDEX_NO_SELECTED_OPTION;
};

const resetDocument = () => {
  checkboxesCollection.forEach((checkbox)=>{
    checkbox.checked = false;
  });
  selectsCollection.forEach(resetSelect);
  resetPriceInput();
  titleElement.value = '';
  descriptionElement.value = '';
  closePopup();
  resetMainMarker();
  resetImages();
  resetCriteria();
};

const resetButtonClickingHandler = (evt)=>{
  evt.preventDefault();
  resetDocument();
};

resetButtonElement.addEventListener('click', resetButtonClickingHandler);

export { resetDocument };
