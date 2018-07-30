/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import {
  ONIMGDATACHANGE } from '../../constants/ActionTypes';
import Request from '../../utils/Request';

export const onImgSourceChange = createAction(ONIMGDATACHANGE);

const loadImg = props => (
  (dispatch) => {
    const error = (e) => {
      console.error(e);
    };
    const callback = (res) => {
      dispatch(onImgSourceChange({ name: props.name, id: props.id, src: res.rows }));
    };
    const url = `${props.action}?id=${props.id}`;
    Request({
      url,
      callback,
      error,
    });
  }
);
export const onImgInitial = props => (
  (dispatch) => {
    dispatch(loadImg(props));
  }
);
