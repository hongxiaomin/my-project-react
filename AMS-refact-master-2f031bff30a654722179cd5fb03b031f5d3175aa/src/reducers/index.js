/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { combineReducers } from 'redux-immutable';
import SiderReducer from './SiderReducer';
import HeaderReducer from './HeaderReducer';
import SMMRecWorkPageReducer from './SMMRecWorkPageReducer';
import TableReducer from './TableReducer';
import SMMSkipCarManageReducer from './SMMSkipCarManageReducer';
import FormReducer from './FormReducer';
import UIReducer from './UIReducer';
import ModalReducer from './ModalReducer';
import PrivateReducer from './PrivateReducer';
import ProtectReducer from './ProtectReducer';
import SelectyListReducer from './SelectListReducer';
import storeReducer from './storeReducer';
import {
	formReducerName,
	UIReducerName,
	privateReducer,
	protectReducer,
 } from '../constants/Config';
import { modalReducerName } from '../constants/ModalConfig';
import { tableRedecurName, SelectListReducerName } from '../constants/TableConfig';
import PCBShelfMonitorReducer from './PCBShelfMonitorReducer';

export default combineReducers({
  SiderReducer,
  HeaderReducer,
  SMMRecWorkPageReducer,
  SMMSkipCarManageReducer,
  [formReducerName]: FormReducer,
  UI: UIReducer,
  [modalReducerName]: ModalReducer,
  [tableRedecurName]: TableReducer,
  [UIReducerName]: UIReducer,
  [privateReducer]: PrivateReducer,
  [protectReducer]: ProtectReducer,
  [SelectListReducerName]: SelectyListReducer,
  store: storeReducer,
  arrData: PCBShelfMonitorReducer,
});
