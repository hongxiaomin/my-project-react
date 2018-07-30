/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import SMMRecWorkPageModel from '../../models/SMMRecWorkPageModel';
import { ONRADIOCLICK } from '../../constants/ActionTypes';

export default handleActions({
  [ONRADIOCLICK]: (state, { payload }) =>
    state.setIn(['isCreate'], payload),
}, SMMRecWorkPageModel);
