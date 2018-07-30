import { combineReducers } from 'redux-immutable';
import routing from './routingReducers';
import fields from './fieldsReducers';

export default combineReducers({
  routing,
  fields,
});
