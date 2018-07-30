/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import HeaderModel from '../../models/HeaderModel';
import { ONHIDECLICK } from '../../constants/ActionTypes';

export default handleActions({
  [ONHIDECLICK]: (state, { payload }) =>
     state.setIn(['siderWidth'], payload),
}, HeaderModel);
