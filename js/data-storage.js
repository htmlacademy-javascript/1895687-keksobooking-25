const dataStorage = (()=>{
  let savedData;
  return {
    saveData : (data) => { savedData = data.slice(); },
    getData : () => savedData
  };
})();

export { dataStorage };
