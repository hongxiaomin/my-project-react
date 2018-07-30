import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import { pageRouting, piwikLogger } from '../middlewares';

const DEBUG = process.env.NODE_ENV !== 'production';

const middlewares = [
  routerMiddleware(hashHistory),
  pageRouting,
  piwikLogger,
  // @see https://www.npmjs.com/package/redux-logger
  DEBUG && createLogger({ collapsed: true, stateTransformer: state => state.toJS() }),
].filter(Boolean);

export default createStore(
  reducers,
  applyMiddleware(...middlewares),
);
