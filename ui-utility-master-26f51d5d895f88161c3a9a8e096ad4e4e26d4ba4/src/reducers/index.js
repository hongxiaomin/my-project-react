import { combineReducers } from 'redux-immutable';
import { routing, stencilTree } from 'ui-utility-core/lib/reducers';
import options from './optionsReducers';
import fields from './fieldsReducers';

export default combineReducers({
  routing,
  stencilTree,
  options,
  fields,
});
