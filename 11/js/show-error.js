const showLoadErrorMessage = (message) => {
  const SHOW_TIME = 3000;

  const errorElement = document.createElement('div');
  errorElement.classList.add('load-error');
  errorElement.textContent = message;
  document.querySelector('#map-canvas').insertAdjacentElement('beforebegin',errorElement);

  setTimeout(() => errorElement.remove(), SHOW_TIME);
};

export { showLoadErrorMessage };
