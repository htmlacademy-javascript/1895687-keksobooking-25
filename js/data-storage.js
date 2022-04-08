const dataStorage = (()=>{
  let savedData;
  return {
    save : (data) => { savedData = data.slice(); },
    get : () => savedData
  };
})();

export { dataStorage };
