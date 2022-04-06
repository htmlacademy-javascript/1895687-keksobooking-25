import { setUserAdFormSubmit } from './user-ad-form-set-up.js';
import { createMarkers, activateFiltersForm } from './user-map.js';
import { getData } from './communication.js';
import { showLoadErrorMessage } from './show-error.js';
import { constructErrorElement, constructSuccessElement } from './user-ad-form-status-toggling.js';
import { getArrayCutTo } from './array-utils.js';
import './ads-filter.js';

const MARKERS_COUNT = 10;

getData(
  (data) => {
    createMarkers(getArrayCutTo(data, MARKERS_COUNT));
    activateFiltersForm();
  },
  showLoadErrorMessage
);

setUserAdFormSubmit(constructSuccessElement, constructErrorElement);
