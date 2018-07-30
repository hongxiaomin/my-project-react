/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import React from 'react';
import { createAction } from 'redux-actions';
import { message } from 'antd';
import { onCommonUIUpdateProps } from '../CommonUIAction';
import { PopConfirmName, CommonUIReducerName } from '../../constants/ModalConfig';
import {
  formReducerName,
  formDataName } from '../../constants/Config';
// import { saveDisable } from '../../actions/InputAction';

export const onPopConfOk = props => (
    // Do something...
    (dispatch) => {
      // Do something...
      const name = props.name;
      const propNew = false;
      const UIName = PopConfirmName;
      const propName = 'visible';
      dispatch(onCommonUIUpdateProps({ UIName, name, propName, propNew }));
    }
);
export const showHidePopConf = props => (
  (dispatch) => {
    // Do something...
    const name = props.name;
    const propNew = props.visible ? props.visible : false;
    const UIName = PopConfirmName;
    const propName = 'visible';
    dispatch(onCommonUIUpdateProps({ UIName, name, propName, propNew }));
  }

);
const check1 = (props, e, getState, dispatch) => {
  const value = e ? e.target.value : '';
  if (value.substr(0, 5) !== '39413') {
    message.destroy();
    message.error('组合料号前5位数必须为"39413"', 3);
    return;
  }
  if (value.length !== 10) {
    message.destroy();
    message.error('组合料号长度必须为10位', 3);
    return;
  }
  const state = getState();
  const UIName = PopConfirmName;
  const propName = 'options';
  const options = state.getIn([CommonUIReducerName, UIName, props.linkId, propName]);

  const len = options && options.length ? options.length : 0;
  if (len < 1) {
    dispatch(showHidePopConf({ ...props, visible: true }));
  }
};
let oldValue = '-1';
const check2 = (props, e, getState, dispatch) => {
  const state = getState();
  const value = state.getIn([
    formReducerName,
    props.formName ? props.formName : 'selectName',
    formDataName,
    props.linkName]);
  const UIName = PopConfirmName;
  const propName = 'options';
  const options = state.getIn([CommonUIReducerName, UIName, props.linkId, propName]);
  if (value === oldValue || value === '-1') {
    return null;
  } else if (options && (options.includes(value) === false)) {
    dispatch(showHidePopConf({ ...props, visible: true }));
  }
  oldValue = value;
  return null;
};
export const onCheckShow = (props, e) => (
    // Do something...
    (dispatch, getState) => {
      // Do something...
      const mode = props.mode;
      switch (mode) {
        case '1': {
          check1(props, e, getState, dispatch);
          break;
        }
        case '2': {
          check2(props, e, getState, dispatch);
          break;
        }
        default:
          break;
      }
    }
);

export const onPopConfInitial = props => (
  (dispatch) => {
    const name = props.name;
    const propName = 'visible';
    const propNew = false;
    const UIName = PopConfirmName;
    dispatch(onCommonUIUpdateProps({ UIName, name, propName, propNew }));
  }
);
