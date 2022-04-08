import { setUserAdFormSubmit } from './user-ad-form-set-up.js';
import { createMarkers, activateFiltersForm, initialiseMap } from './user-map.js';
import { getData } from './communication.js';
import { showLoadErrorMessage } from './show-error.js';
import { constructErrorElement, constructSuccessElement } from './user-ad-form-status-toggling.js';
import { getArrayCutTo } from './array-utils.js';
import { dataStorage } from './data-storage.js';

const MARKERS_COUNT = 10;

initialiseMap();

getData(
  (data) => {
    dataStorage.saveData(data);
    createMarkers(getArrayCutTo(dataStorage.getData(), MARKERS_COUNT));
    activateFiltersForm();
  },
  showLoadErrorMessage
);

setUserAdFormSubmit(constructSuccessElement, constructErrorElement);
