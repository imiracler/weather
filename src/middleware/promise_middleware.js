function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

export default function promiseMiddleware({dispatch, getState}) {
  return (next) => (action) => {
    const {types, promise, ...rest} = action;
    console.log("=== this is middleware");
    if (!isPromise(promise) || !(action.types && action.types.length === 3)) {
      console.log("run into next function")
      return next(action);
    }

    const [PENDING, DONE, FAIL] = types;
    console.log("pass middleware dispatch");
    dispatch({...rest, type: PENDING});
    return action.promise.then(
      (result) => dispatch({...rest, result, type: DONE}),
      (error) => dispatch({...rest, error, type: FAIL})
    );
  };
}

