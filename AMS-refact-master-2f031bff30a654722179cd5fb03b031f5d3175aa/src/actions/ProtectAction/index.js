/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import {
  ONUPDATEPROPS,
  ONUPDATEUI,
  ONUPDATEDATASOURCE } from '../../constants/ActionTypes';

export const onUpdateProps = createAction(ONUPDATEPROPS);
export const onUpdateUI = createAction(ONUPDATEUI);
export const onUpdateDataSource = createAction(ONUPDATEDATASOURCE);
