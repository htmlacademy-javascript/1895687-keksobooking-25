const debounce = (callback, delay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>callback.apply(this, rest), delay);
  };
};

export { debounce };
