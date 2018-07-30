/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import StoreModel from '../../models/StoreModel';
import {
  ONUPDATEDATA,
  ONUPDATEUICONTROL,
  ONUPDATEEVENT,
  ONUPDATEPROPS,
  ONUPDATECHILDREN,
  ONDELETE } from '../../constants/ActionTypes2';
import {
  dataName,
  uiControlName,
  eventName,
  childrenName,
  propsName } from '../../constants/Config2';

export default handleActions({
  [ONUPDATEDATA]: (state, { payload }) => (
    state.setIn([payload.id, dataName, payload.name], payload.payload)
  ),
  [ONUPDATEUICONTROL]: (state, { payload }) => (
    state.setIn([payload.id, uiControlName], payload.payload)
  ),
  [ONUPDATEEVENT]: (state, { payload }) => (
    state.setIn([payload.id, eventName], payload.payload)
  ),
  [ONUPDATEPROPS]: (state, { payload }) => (
    state.setIn([payload.id, propsName], payload.payload)
  ),
  [ONUPDATECHILDREN]: (state, { payload }) => (
    state.setIn([payload.id, childrenName], payload.payload)
  ),
  [ONDELETE]: (state, { payload }) => (
    state.delete(payload.id)
  ),
}, StoreModel);
