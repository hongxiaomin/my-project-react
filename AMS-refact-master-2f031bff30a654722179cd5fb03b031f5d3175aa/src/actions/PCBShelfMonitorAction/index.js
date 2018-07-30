
import React from 'react';
import { message } from 'antd';
import { createAction } from 'redux-actions';
import Request from '../../utils/Request';
import { GETARR, GETRIGHTARR, GETLEFTARR, CLOSEBOX, SAVAPROPS } from '../../constants/ActionTypes';
import { SERVER_IP_PCB } from '../../constants/Settings';

const getArr = createAction(GETARR);
const getRightArr = createAction(GETRIGHTARR);
const getLeftArr = createAction(GETLEFTARR);
const saveProps = createAction(SAVAPROPS);
export const closeBox = createAction(CLOSEBOX);

export const initial = props => (
  (dispatch) => {
    const method = 'GET';
    const url = props.action ? props.action : '';
    const callback = (response) => {
      let data = [];
      const dataSource = response.rows;
      dataSource.map(x => (
        Object.keys(x).forEach(key => (
          key === 'floor' ? data.push(x[key]) : null
        ))
      ));
      data = [...new Set(data)].map(v => ({ floor: v }));
      dispatch(getArr(data));
    };
    const error = (e) => {
      console.log('error');
    };
    Request({
      url,
      method,
      callback,
      error,
    });
  }
);

const rightOperate = params => (
  (dispatch) => {
    const { props, floorObj } = params;
    const method = 'GET';
    const url = props.action ? props.action : '';
    const param = props.paramTemplate ? props.paramTemplate(floorObj[0]) : '';
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(getRightArr(dataSource));
    };
    Request({
      method,
      url,
      param,
      callback,
    });
  }
);

export const rightInitial = props => (
  (dispatch, getState) => {
    let state = getState();
    let floorObj = state.getIn(['arrData', 'data']);
    let Timer = null;
    if (floorObj) {
      clearInterval(Timer);
      Timer = null;
      dispatch(rightOperate({ props, floorObj }));
    } else {
      Timer = setInterval(() => {
        state = getState();
        floorObj = state.getIn(['arrData', 'data']);
        if (floorObj) {
          dispatch(rightOperate({ props, floorObj }));
          clearInterval(Timer);
          Timer = null;
        }
      }, 1000);
    }
  }
);


const leftOperate = params => (
  (dispatch) => {
    const { props, serialObj } = params;
    const method = 'GET';
    let url = '';
    let param = '';
    if (props.nextAction) {
      url = props.nextAction;
      const paramNextAction = { floor: props.value, shelfSerial: serialObj[0].serial };
      param = props.paramTemplate ? props.paramTemplate(paramNextAction) : '';
    } else {
      url = props.action ? props.action : '';
      param = props.paramTemplate ? props.paramTemplate(serialObj[0]) : '';
    }
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(getLeftArr(dataSource));
    };
    Request({
      method,
      url,
      param,
      callback,
    });
  }
);

export const leftInitial = props => (
  (dispatch, getState) => {
    let state = getState();
    let serialObj = state.getIn(['arrData', 'rightDate']);
    let Timer = null;
    if (serialObj) {
      clearInterval(Timer);
      Timer = null;
      dispatch(leftOperate({ props, serialObj }));
    } else {
      Timer = setInterval(() => {
        state = getState();
        serialObj = state.getIn(['arrData', 'rightDate']);
        if (serialObj) {
          dispatch(leftOperate({ props, serialObj }));
          clearInterval(Timer);
          Timer = null;
          dispatch(saveProps({ props, serialObj }));
        }
      }, 1000);
    }
  }
);

export const floorBtnClick = props => (
  (dispatch) => {
    const { ...data } = props;
    // console.log('222', data);
    data.nextAction = `${SERVER_IP_PCB}/ams/pcb/subshelf`;
    const floor = { floor: props.value };
    const method = 'GET';
    const url = props.action ? props.action : '';
    const param = props.paramTemplate ? props.paramTemplate(floor) : '';
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(getRightArr(dataSource));
      dispatch(leftInitial(data));
    };
    Request({
      method,
      url,
      param,
      callback,
    });
  }
);

export const shelfBtnClick = props => (
  (dispatch, getState) => {
    const state = getState();
    const floors = state.getIn(['arrData', 'rightDate'])[0].floor;
    const shelf = props.value;
    const paramss = { floor: floors, shelfSerial: shelf };
    const method = 'GET';
    const url = props.action ? props.action : '';
    const param = props.paramTemplate ? props.paramTemplate(paramss) : '';
    dispatch(closeBox('block'));
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(getLeftArr(dataSource));
    };
    Request({
      method,
      url,
      param,
      callback,
    });
  }
);

export const closeAllBtnClick = props => (
  (dispatch, getState) => {
    let url = props.action ? props.action : '';
    let method = props.method ? props.method : '';
    const lightParam = props.param ? props.param : '';
    let param = props.paramTemplate ? props.paramTemplate(lightParam) : '';
    const state = getState();
    let callback = (response) => {
      if (!response.code) {
        message.destroy();
        message.success(response && response.message ? response.message : 'submit success!', 3);
        const data = state.getIn(['arrData', 'leftInitialProps']);
        if (!props.closeAll) {
          url = data.props.action;
          method = 'GET';
          param = props.freshparamTemplate ? props.freshparamTemplate(lightParam) : '';
          callback = (response) => {
            const dataSource = props.dataSourceTemplate
            ? props.dataSourceTemplate(response) : response;
            dispatch(getLeftArr(dataSource));
          };
          Request({
            method,
            url,
            param,
            callback,
          });
        }
      } else {
        message.destroy();
        message.error(response && response.message ? response.message : 'submit success!', 3);
      }
    };
    Request({
      method,
      url,
      param,
      callback,
    });
  }
);
