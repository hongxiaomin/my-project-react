/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import PrivateModel from '../../models/PrivateModel';
import { ONUPDATECHILDREN } from '../../constants/ActionTypes';
import { childrenName } from '../../constants/Config';

export default handleActions({
  [ONUPDATECHILDREN]: (state, { payload }) => (
    state.setIn([payload.id, childrenName], payload.children)
  ),
}, PrivateModel);
