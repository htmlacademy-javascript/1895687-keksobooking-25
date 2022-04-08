const deactivateSubTree = (root) => {
  root.setAttribute('disabled','');
  const subNodes = root.children;
  for(let i=0; i<subNodes.length; i++){
    deactivateSubTree(subNodes[i]);
  }
};

const activateSubTree = (root) => {
  root.removeAttribute('disabled');
  const subNodes = root.children;
  for(let i=0; i<subNodes.length; i++){
    activateSubTree(subNodes[i]);
  }
};

const activateForm = (form, inactivityClass) => {
  const formSubNodes = form.children;
  form.classList.remove(inactivityClass);
  for(let i=0; i<formSubNodes.length; i++){
    activateSubTree(formSubNodes[i]);
  }
};
const deactivateForm = (form, inactivityClass) => {
  form.classList.add(inactivityClass);
  const formSubNodes = form.children;
  for(let i=0; i<formSubNodes.length; i++){
    deactivateSubTree(formSubNodes[i]);
  }
};

export{
  activateForm,
  deactivateForm
};
