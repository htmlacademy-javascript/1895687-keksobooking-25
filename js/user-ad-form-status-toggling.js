import { resetDocument } from './document-reset.js';

const ESC_CODE = 27;

const successMessageSample = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageSample = document.querySelector('#error')
  .content
  .querySelector('.error');

const constructSuccessElement = () => {
  const successElement = successMessageSample.cloneNode(true);

  const destructSuccessElement = () => {
    successElement.remove();
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('click', clickingHandler);
  };

  function keydownHandler(evt){
    if(evt.keyCode === ESC_CODE){
      destructSuccessElement();
    }
  }

  function clickingHandler(){
    destructSuccessElement();
  }

  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('click', clickingHandler);

  resetDocument();
  document.body.appendChild(successElement);
};

const constructErrorElement = () => {
  const errorElement = errorMessageSample.cloneNode(true);
  const closeButton = errorElement.querySelector('.error__button');

  const destructErrorElement = () => {
    errorElement.remove();
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('click', clickingHandler);
  };

  function clickingHandler(){
    destructErrorElement();
  }

  function keydownHandler(evt){
    if(evt.keyCode === ESC_CODE){
      destructErrorElement();
    }
  }

  closeButton.addEventListener('click', clickingHandler);
  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('click', clickingHandler);

  document.body.appendChild(errorElement);
};

export {
  constructSuccessElement,
  constructErrorElement
};
