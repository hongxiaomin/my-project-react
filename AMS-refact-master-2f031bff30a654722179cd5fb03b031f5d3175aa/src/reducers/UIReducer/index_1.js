/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import UIModel from '../../models/UIModel';
import {
  ONCOLORPICKERDISPLAY,
  ONCOLORPICKERINITIAL,
  ONCOLORPICKERCHANGE } from '../../constants/ActionTypes';

export default handleActions({
  [ONCOLORPICKERINITIAL]: (state, { payload }) => (
    state.setIn([payload.id, 'displayColorPicker'], payload.displayColorPicker)
      .setIn([payload.id, 'name'], payload.name)
  ),
  [ONCOLORPICKERDISPLAY]: (state, { payload }) => (
    state.setIn([payload.id, 'displayColorPicker'], payload.displayColorPicker)
  ),
  [ONCOLORPICKERCHANGE]: (state, { payload }) => (
    state.setIn([payload.id, 'color'], payload.color)
  ),
}, UIModel);
