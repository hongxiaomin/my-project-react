/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import SMMSkipCarManageModel from '../../models/SMMSkipCarManageModel';
import { ONSHOWMODALCLICK, ONCREATECLICK } from '../../constants/ActionTypes';

export default handleActions({
  [ONSHOWMODALCLICK]: (state, { payload }) => (
    /* Add your next state here*/
    state.setIn(['modalVisible'], payload)
),
  [ONCREATECLICK]: (state, { payload }) => (
    /* Add your next state here*/
    state.setIn(['modalType'], payload.typeNew).setIn(['modalVisible'], payload.visibleNew)
  ),
}, SMMSkipCarManageModel);
