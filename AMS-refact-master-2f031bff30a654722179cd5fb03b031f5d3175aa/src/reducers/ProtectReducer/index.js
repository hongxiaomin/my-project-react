/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import ProtectModel from '../../models/ProtectModel';
import {
  ONUPDATEPROPS,
  ONUPDATEDATASOURCE,
  ONUPDATEUI } from '../../constants/ActionTypes';
import {
  propsName,
  dataSourceName,
  uiName } from '../../constants/Config';

export default handleActions({
  [ONUPDATEPROPS]: (state, { payload }) => (
    state.setIn([payload.name, propsName], payload.props)
  ),
  [ONUPDATEDATASOURCE]: (state, { payload }) => (
    state.setIn([payload.name, dataSourceName], payload.dataSource)
  ),
  [ONUPDATEUI]: (state, { payload }) => (
    state.setIn([payload.id, uiName], payload.ui)
  ),
}, ProtectModel);
