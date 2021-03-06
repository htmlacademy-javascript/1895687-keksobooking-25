import { setUserAdFormSubmit } from './user-ad-form-set-up.js';
import { createMarkers, activateFiltersForm, initialiseMap } from './user-map.js';
import { getData } from './communication.js';
import { showLoadErrorMessage } from './show-error.js';
import { constructErrorElement, constructSuccessElement } from './user-ad-form-status-toggling.js';
import { getArrayCutTo } from './array-utils.js';
import { dataStorage } from './data-storage.js';
import { MARKERS_COUNT } from './ads-filter.js';

initialiseMap();

getData(
  (data) => {
    dataStorage.save(data);
    createMarkers(getArrayCutTo(dataStorage.get(), MARKERS_COUNT));
    activateFiltersForm();
  },
  showLoadErrorMessage
);

setUserAdFormSubmit(constructSuccessElement, constructErrorElement);
