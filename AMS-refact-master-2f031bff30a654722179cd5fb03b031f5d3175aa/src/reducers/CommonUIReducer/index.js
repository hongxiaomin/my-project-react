/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import CommonUIModel from '../../models/UIModel';
import { ONCOMMONUIUPDATEPROPS } from '../../constants/ActionTypes';

export default handleActions({
  [ONCOMMONUIUPDATEPROPS]: (state, { payload }) => (
    state.setIn([payload.UIName, payload.name, payload.propName], payload.propNew)
    ),
}, CommonUIModel);
