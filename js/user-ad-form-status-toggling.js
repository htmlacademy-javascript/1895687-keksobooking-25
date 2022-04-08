import { resetDocument } from './document-reset.js';

const ESC_CODE = 27;

const successElementSample = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorElementSample = document.querySelector('#error')
  .content
  .querySelector('.error');

const createStatusElementConstructor = (statusElementSample, isSuccessStatus) => () => {
  const statusElement = statusElementSample.cloneNode(true);

  const destructStatusElement = () => {
    statusElement.remove();
    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickingHandler);
  };

  function documentKeydownHandler(evt){
    if(evt.keyCode === ESC_CODE){
      destructStatusElement();
    }
  }

  function documentClickingHandler(){
    destructStatusElement();
  }

  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickingHandler);

  if(isSuccessStatus){
    resetDocument();
  }
  else{
    const closeButtonElement = statusElement.querySelector('.error__button');
    closeButtonElement.addEventListener('click', () => destructStatusElement());
  }
  document.body.appendChild(statusElement);
};

const constructSuccessElement = createStatusElementConstructor(successElementSample, true);
const constructErrorElement = createStatusElementConstructor(errorElementSample, false);

export {
  constructSuccessElement,
  constructErrorElement
};
