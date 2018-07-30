/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONUPDATECHILDREN } from '../../constants/ActionTypes';

export const onUpdateChildren = createAction(ONUPDATECHILDREN);
