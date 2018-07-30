/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONPAGECHANGE, ONROWSELECTEDCHANGE } from '../../constants/ActionTypes';

export const onPageChange = createAction(ONPAGECHANGE);
export const onRowSelectedChange = createAction(ONROWSELECTEDCHANGE);
