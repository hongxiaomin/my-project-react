/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import {
  ONUPDATEDATA,
  ONUPDATEUICONTROL,
  ONUPDATEEVENT,
  ONUPDATEPROPS,
  ONUPDATECHILDREN,
  ONDELETE } from '../../constants/ActionTypes2';

export const onUpdateData = createAction(ONUPDATEDATA);
export const onUpdateUIControl = createAction(ONUPDATEUICONTROL);
export const onUpdateEvent = createAction(ONUPDATEEVENT);
export const onUpdateProps = createAction(ONUPDATEPROPS);
export const onUpdateChildren = createAction(ONUPDATECHILDREN);
export const onDelete = createAction(ONDELETE);
