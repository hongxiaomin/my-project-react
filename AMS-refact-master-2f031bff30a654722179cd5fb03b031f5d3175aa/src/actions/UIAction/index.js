/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import {
  ONCOLORPICKERDISPLAY,
  ONCOLORPICKERINITIAL,
  ONCOLORPICKERCHANGE, ONSAVETIME, ONROUTINGSHOWSTATE, ONRULESHOWSTATE } from '../../constants/ActionTypes';

export const onColorPickerInitial = createAction(ONCOLORPICKERINITIAL);
export const onColorPickerPisplay = createAction(ONCOLORPICKERDISPLAY);
export const onColorPickerChange = createAction(ONCOLORPICKERCHANGE);
export const onSaveTime = createAction(ONSAVETIME);
export const onRoutingShowStateInitial = createAction(ONROUTINGSHOWSTATE);
export const onRuleShowStateInitial = createAction(ONRULESHOWSTATE);
