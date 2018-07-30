/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONCHECKBOXCHANGE } from '../../constants/ActionTypes';
import { onFormDataSourceChange } from '../FormAction';
import Request from '../../utils/Request';

export const onCheckBoxChange = createAction(ONCHECKBOXCHANGE);
export const isCheckBox = ({ e, props }) => (
  (dispatch) => {
    // Do something...

    const isShow = e.target.checked ? 'N' : 'Y';
    const url = props.action;
    const method = props.method;
    const formName = props.formName;
    const filters = props.filters;
    const paramData = props.param ? props.param : {};
    paramData.conditon[0].value = isShow;
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    const callback = (response) => {
      let dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dataSource = dataSource || [];
      dispatch(onFormDataSourceChange({ formName, dataSource, response }));
    };
    Request({
      url,
      method,
      filters,
      param,
      callback,
    });
  }
);
