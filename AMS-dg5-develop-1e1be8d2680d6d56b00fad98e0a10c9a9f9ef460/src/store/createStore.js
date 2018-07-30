import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const createStore = (rootReducer, initialState, enhancers = []) => {
  const middleware = [thunk];
  const composeEnhancers = __DEV__ ? composeWithDevTools : compose;
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers),
  );
  return store;
};

export default createStore;
