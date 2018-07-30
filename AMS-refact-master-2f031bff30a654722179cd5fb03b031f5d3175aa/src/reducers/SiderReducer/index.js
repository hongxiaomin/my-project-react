/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import SiderModel from '../../models/SiderModel';
import { ONSIDERPROPSCHANGE } from '../../constants/ActionTypes';

export default handleActions({
  [ONSIDERPROPSCHANGE]: (state, { payload }) => {
    let nextState = state;
    Object.keys(payload).forEach(key => nextState = nextState.set(key, payload[key]));
    return nextState;
  },
}, SiderModel);
