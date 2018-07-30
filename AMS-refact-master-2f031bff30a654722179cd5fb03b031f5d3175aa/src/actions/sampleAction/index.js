/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { /* Add ActionTypes here */ } from '../../constants/ActionTypes';

export const action = createAction(/* Add ActionTypes here */);
export const middleware = (params) => (
  (dispatch, getState) => {
    // Do something...
  }
);
