import { handleActions } from 'redux-actions';
import TableModel from '../../models/TableModel';
import { GETARR, GETRIGHTARR, GETLEFTARR, CLOSEBOX, SAVAPROPS } from '../../constants/ActionTypes';

export default handleActions({
  [GETARR]: (state, { payload }) => (
    state.setIn(['data'], payload)
  ),
  [GETRIGHTARR]: (state, { payload }) => (
    state.setIn(['rightDate'], payload)
  ),
  [GETLEFTARR]: (state, { payload }) => (
    state.setIn(['leftDate'], payload)
  ),
  [CLOSEBOX]: (state, { payload }) => (
      state.setIn(['nodeHide'], payload)
  ),
  [SAVAPROPS]: (state, { payload }) => (
    state.setIn(['leftInitialProps'], payload)
  ),
}, TableModel);
