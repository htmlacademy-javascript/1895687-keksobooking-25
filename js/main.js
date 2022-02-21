//The function generates a random integer number
// with a value between the minNumber and the maxNumber inclusively.
//Please pay attention:
//the maxNumber must be greater or equal than the minNumber, else the function returns the UNDEFINED value
function generateInteger(minNumber, maxNumber){
  const min= +minNumber;
  const max= +maxNumber;
  if(max > min){
    const amplitude = (max-min)*0.5;
    const outcome = min+Math.round(amplitude*(1+Math.sin(Date.now())));
    if(outcome>max){
      return max;
    }
    if(outcome<min){
      return min;
    }
    return outcome;
  }
  if(max === min){
    return max;
  }
}
//The function generates a random floating point number
// with a value between the minNumber and the maxNumber inclusively.
// digits is the number of digits to appear after the decimal point
//Please pay attention:
//the maxNumber must be greater or equal than the minNumber, else the function returns the UNDEFINED value
function generateFloat(minNumber, maxNumber, digits){
  const min= +minNumber;
  const max= +maxNumber;
  if(max > min){
    const amplitude = (max-min)*0.5;
    let outcome = min+amplitude*(1+Math.sin(Date.now()));
    let scaler = 1;

    for(let i=0; i<digits;i++){
      scaler*=10;
    }
    outcome=Math.round(outcome*scaler)/scaler;
    if(outcome>max){
      return max;
    }
    if(outcome<min){
      return min;
    }
    return outcome;
  }
  if(max === min){
    return max;
  }
}
generateInteger(0,1);
generateFloat(1.0001, 1.0002,7);
