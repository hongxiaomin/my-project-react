/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONHIDECLICK } from '../../constants/ActionTypes';

export const HeaderAction = createAction(ONHIDECLICK);
export const onHideClick = () => (
  (dispatch, getState) => {
    // Do something...
    const siderWidthOld = getState().toJS().HeaderReducer.siderWidth;
    const siderWidthNew = siderWidthOld ? 0 : 4;
    dispatch(HeaderAction(siderWidthNew));
  }
  );
