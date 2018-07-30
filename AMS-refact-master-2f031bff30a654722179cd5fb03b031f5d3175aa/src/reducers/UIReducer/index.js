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
  ONCOLORPICKERCHANGE,
  ONSELECTBASESETTING,
  ONSELECTOPTIONSLOADED,
  ONSELECTDISABLELOADED,
  ONGROUPSELECTUPDATECHILDREN,
  ONGROUPSELECTUPDATECONNECT,
  ONIMGDATACHANGE, ONSAVETIME, ONROUTINGSHOWSTATE, ONRULESHOWSTATE } from '../../constants/ActionTypes';
import {
  UIName,
  UISelectOptionName,
  UISelectDisableName,
  UIColorpickerColor,
  UIColorpickerdisplay,
  UIPropsName,
  UIChildrenName,
  UIConnectName } from '../../constants/Config';

export default handleActions({
  [ONCOLORPICKERINITIAL]: (state, { payload }) => (
    state.setIn([payload.id, UIColorpickerdisplay], payload.displayColorPicker)
      .setIn([payload.id, UIName], payload.name)
  ),
  [ONCOLORPICKERDISPLAY]: (state, { payload }) => (
    state.setIn([payload.id, UIColorpickerdisplay], payload.displayColorPicker)
  ),
  [ONCOLORPICKERCHANGE]: (state, { payload }) => (
    state.setIn([payload.id, UIColorpickerColor], payload.color)
  ),
  [ONSELECTBASESETTING]: (state, { payload }) => (
    state.setIn([payload.id, UIName], payload.name)
      .setIn([payload.id, UIPropsName], payload.props)
  ),
  [ONSELECTOPTIONSLOADED]: (state, { payload }) => (
    state.setIn([payload.id, UISelectOptionName], payload.options)
  ),
  [ONSELECTDISABLELOADED]: (state, { payload }) => (
    state.setIn([payload.id, UISelectDisableName], payload.disable)
  ),
  [ONGROUPSELECTUPDATECHILDREN]: (state, { payload }) => (
    state.setIn([payload.id, UIChildrenName], payload.children)
  ),
  [ONGROUPSELECTUPDATECONNECT]: (state, { payload }) => (
    state.setIn([payload.id, UIConnectName], payload.connect)
  ),
  [ONIMGDATACHANGE]: (state, { payload }) => (
    state.setIn(['Img', payload.name, payload.id], payload.src)
  ),
  [ONSAVETIME]: (state, { payload }) => (
    state.setIn(['timeData', payload.name], payload.time)
  ),
  [ONROUTINGSHOWSTATE]: (state, { payload }) => (
    state.setIn(['RoutingGraph', payload.name], payload.value)
    ),
  [ONRULESHOWSTATE]: (state, { payload }) => (
    state.setIn(['RuleGraph', payload.name], payload.value)
    ),
}, UIModel);
