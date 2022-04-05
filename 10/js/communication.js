const getData = (successHandler, errorHandler) =>
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(successHandler)
    .catch((err) => {
      errorHandler(`Проблема с загрузкой данных : ${err.message}`);
    });


const sendData = (succeessHandler, errorHandler, data) =>
  fetch('https://25.javascript.pages.academy/keksobooking', {
    method : 'POST',
    body : data
  })
    .then((response) => {
      if(response.ok){
        succeessHandler();
      }
      else{
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(errorHandler);

export {getData, sendData};

