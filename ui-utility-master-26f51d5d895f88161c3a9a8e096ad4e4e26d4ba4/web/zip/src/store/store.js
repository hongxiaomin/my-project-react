import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index';

const middleware = routerMiddleware(hashHistory);

export default createStore(
  reducers,
  applyMiddleware(middleware),
);
