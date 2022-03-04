const generateInteger = (min, max) => {
  const minNumber = Number(min);
  const maxNumber = Number(max);
  if (maxNumber<0 || minNumber<0){
    throw 'Invalid range: the limits mustn\'t be negative';
  }
  if(maxNumber > minNumber){
    const distance = maxNumber-minNumber+1;
    const offset = distance*Math.random();
    const outcome = minNumber+Math.floor(offset);
    return outcome;
  }
  if(maxNumber === minNumber){
    return maxNumber;
  }
  throw 'Invalid range: the max must be greater than or equal the min';
};

const generateFloat = (min, max, digits) => {
  const minNumber = Number(min);
  const maxNumber = Number(max);
  if (maxNumber<0 || minNumber<0){
    throw 'Invalid range: the limits mustn\'t be negative';
  }
  if(maxNumber > minNumber){
    const distance = maxNumber-minNumber;
    const offset = distance*Math.random();
    const outcome = minNumber+offset;
    return Number(outcome.toFixed(digits));
  }
  if(maxNumber === minNumber){
    return maxNumber;
  }
  throw 'Invalid range: the max must be greater than or equal the min';
};

export{
  generateInteger,
  generateFloat
};
