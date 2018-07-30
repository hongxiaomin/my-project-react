/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const initialState = Immutable.Map();
let middleWare = null;

if (!__PROD__) {
  const Logger = createLogger({ stateTransformer: state => console.log(state.toJS()) });
  middleWare = applyMiddleware(Thunk, Logger);
} else {
  middleWare = applyMiddleware(Thunk);
}

export default createStore(
  rootReducer,
  initialState,
  middleWare,
);
