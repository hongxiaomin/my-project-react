/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONRADIOCLICK } from '../../constants/ActionTypes';
import {
  defaultGetParamTemplate,
  defaultRequestFilters } from '../../constants/Settings';
import Request from '../../utils/Request';

export const RadioaAtion = createAction(ONRADIOCLICK);
export const onRadioClick = params => (
  (dispatch, getState) => {
    // Do something...
    const selValue = params.target.value;
    dispatch(RadioaAtion(selValue));
  }
);
export const onPageInit = props => (
  (dispatch, getState) => {
    // Do something...
    const url = 'http://172.22.40.115:80/ams/warehouse/gr/querygrlist';
    const method = 'GET';
    const paramData = { number: '201704200006' };
    const param = defaultGetParamTemplate(paramData);
    const filters = defaultRequestFilters;
    const callback = (response) => {
      const dataSource = response;
      console.log(dataSource);
      // dispatch(onFormDataSourceChange({ formName, dataSource }));
      // onSubmit(dataSource);
    };
    const error = (e) => {
      // dispatch(onFormSubmitFail(e));
      onError(e);
    };
    console.log('INIT');
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error,
    });
  }
);
