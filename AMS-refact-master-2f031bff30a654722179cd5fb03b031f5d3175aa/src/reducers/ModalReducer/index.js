/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import ModalModel from '../../models/ModalModel';
import { ONMODALUPDATEPROPS,
         ONMODALOKCLICK,
          MODELSHOWHIDE,
          MODELMESSAGE } from '../../constants/ActionTypes';

export default handleActions({
  [ONMODALUPDATEPROPS]: (state, { payload }) => (
    /* Add your next state here*/
    state.setIn([payload.modalName, 'visible'], payload.visibleNew)
  ),
  [ONMODALOKCLICK]: (state, { payload }) => (
    /* Add your next state here*/
    state.setIn([payload.modalName, 'visible'], payload.visibleNew)
  ),
  [MODELSHOWHIDE]: (state, { payload }) => (
    state.setIn(['BtnShowModel', 'visible'], payload)
  ),
  [MODELMESSAGE]: (state, { payload }) => (
    state.setIn(['ModelMessge', 'message'], payload)
  ),
}, ModalModel);
