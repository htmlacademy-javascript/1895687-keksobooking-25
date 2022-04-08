import { resetCriteria } from './ads-filter.js';
import { resetImages } from './upload-images.js';
import { resetPriceInput } from './user-ad-form-set-up.js';
import { resetMainMarker, closePopup } from './user-map.js';

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const description = adForm.querySelector('#description');
const resetButton = adForm.querySelector('.ad-form__reset');

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectsCollection = document.querySelectorAll('select');

const resetSelect = (element) => {
  const INDEX_NO_SELECTED_OPTION = -1;
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
  checkboxes.forEach((checkbox)=>{
    checkbox.checked = false;
  });
  selectsCollection.forEach(resetSelect);
  resetPriceInput();
  title.value = '';
  description.value = '';
  closePopup();
  resetMainMarker();
  resetImages();
  resetCriteria();
};

resetButton.addEventListener('click', (evt)=>{
  evt.preventDefault();
  resetDocument();
});

export { resetDocument };
