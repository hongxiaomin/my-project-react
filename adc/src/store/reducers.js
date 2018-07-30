/* eslint no-param-reassign: "off" */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './auth'
import intl from './intl'

export const makeRootReducer = asyncReducers => combineReducers({
  intl,
  auth: authReducer,
  routing: routerReducer,
  ...asyncReducers,
})

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}
