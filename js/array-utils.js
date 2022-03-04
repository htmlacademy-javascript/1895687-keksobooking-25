import { generateInteger } from './number-generators.js';

const clearArray = (array) => {
  let count = array.length;
  while(count>0){
    array.pop();
    count--;
  }
};

const getAnElement = (array) => array.length ? array[ generateInteger(0, array.length-1) ] : undefined ;

const generateArrayFrom = (count, donor) => {
  const takenIndexes = [];
  const array = [];
  for(let i=0; i<count; i++){
    let index = generateInteger(0, donor.length-1);
    while(takenIndexes.includes(index)){
      index = generateInteger(0, donor.length-1);
    }
    takenIndexes.push(index);
    array.push(donor[index]);
  }
  clearArray(takenIndexes);
  return array;
};

export{
  clearArray,
  getAnElement,
  generateArrayFrom
};
