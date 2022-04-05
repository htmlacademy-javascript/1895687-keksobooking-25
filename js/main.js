import { setUserAdFormSubmit } from './user-ad-form-set-up.js';
import { createMarkers } from './user-map.js';
import { getData } from './communication.js';
import { showLoadErrorMessage } from './show-error.js';
import { constructErrorElement, constructSuccessElement } from './user-ad-form-status-toggling.js';


const INDEX_TO_START = 19;
const MARKERS_COUNT = 10;

getData(
  (data) => createMarkers(data.slice(INDEX_TO_START, INDEX_TO_START + MARKERS_COUNT)),
  showLoadErrorMessage
);

setUserAdFormSubmit(constructSuccessElement, constructErrorElement);
