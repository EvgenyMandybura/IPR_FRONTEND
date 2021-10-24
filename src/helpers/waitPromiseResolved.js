const waitPromiseResolved = (fn) => {
  let promise = null;

  return async (...args) => {
    let result;
    if (!promise) {
      promise = fn(...args);
    }

    result = await promise;
    promise = null;

    return result;
  };
};

export default waitPromiseResolved;
