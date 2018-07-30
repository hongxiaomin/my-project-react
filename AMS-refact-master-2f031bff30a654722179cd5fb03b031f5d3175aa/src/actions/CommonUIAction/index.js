/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONCOMMONUIUPDATEPROPS } from '../../constants/ActionTypes';

export const onCommonUIUpdateProps = createAction(ONCOMMONUIUPDATEPROPS);
// export const onColorPickerInitial = createAction(ONCOLORPICKERINITIAL);
// export const onColorPickerPisplay = createAction(ONCOLORPICKERDISPLAY);
// export const onColorPickerChange = createAction(ONCOLORPICKERCHANGE);
