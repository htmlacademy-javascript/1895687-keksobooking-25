const deactivateSubTree = (rootElement) => {
  rootElement.setAttribute('disabled','true');
  const subElements = rootElement.children;
  for(let i = 0; i < subElements.length; i++){
    deactivateSubTree(subElements[i]);
  }
};

const activateSubTree = (rootElement) => {
  rootElement.removeAttribute('disabled');
  const subElements = rootElement.children;
  for(let i = 0; i < subElements.length; i++){
    activateSubTree(subElements[i]);
  }
};

const activateForm = (formElement, inactivityClass) => {
  const subElements = formElement.children;
  formElement.classList.remove(inactivityClass);
  for(let i = 0; i < subElements.length; i++){
    activateSubTree(subElements[i]);
  }
};
const deactivateForm = (formElement, inactivityClass) => {
  formElement.classList.add(inactivityClass);
  const subElements = formElement.children;
  for(let i = 0; i < subElements.length; i++){
    deactivateSubTree(subElements[i]);
  }
};

export{
  activateForm,
  deactivateForm
};
