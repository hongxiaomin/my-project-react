/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONSUBMITCLICK, ONSHOWMODALCLICK, ONCREATECLICK } from '../../constants/ActionTypes';

export const showHideModal = createAction(ONSHOWMODALCLICK);
export const updateData = createAction(ONSUBMITCLICK);
export const create = createAction(ONCREATECLICK);
export const onShowModalClick = () => (
  (dispatch, getState) => {
    // Do something...
    const visibleOld = getState().toJS().SMMMoveLabelSetRuducer.modalVisible;
    const visibleNew = !visibleOld;
    dispatch(showHideModal(visibleNew));
  }
);
export const onBtnClick = params => (
  (dispatch, getState) => {
    // Do something...
    const typeNew = params;
    const visibleOld = getState().toJS().SMMMoveLabelSetRuducer.modalVisible;
    const visibleNew = !visibleOld;
    dispatch(create({ typeNew, visibleNew }));
  }
);
export const onSearchClick = params => (
  (dispatch, getState) => {
    // Do something...
    console.log(params);
  }
);
export const onOkClick = params => (
  (dispatch, getState) => {
    // Do something...
    console.log(params);
  }
);
