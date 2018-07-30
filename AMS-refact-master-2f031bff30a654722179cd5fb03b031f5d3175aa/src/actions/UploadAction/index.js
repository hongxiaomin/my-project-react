/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/
import { message } from 'antd';
import Request from '../../utils/Request';
import {
  onFormDataSourceChange,
  onFormDataChange } from '../FormAction';

const objectToQueryString = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const collection = [];
  Object.keys(obj).forEach(key => collection.push(`${key}=${JSON.stringify(obj[key])}`));
  if (collection.length > 0) {
    return `?${collection.join('&')}`;
  }
  return obj;
};
const onUploadError = (props, e) => (
  () => {
    if (typeof props.onError === 'function') {
      message.destroy();
      props.onError(e);
    }
  }
);
// const onUploadSuccess = (props, response) => (
//   (dispatch) => {
//     console.log('2222', props);
//     if (typeof props.onSuccess === 'function') {
//       const dataSourcedetailInfo = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
//       const dataSource = dataSourcedetailInfo.detailInfo;
//       console.log('1111', dataSource);
//       dispatch(onFormDataSourceChange({ formName: props.name, dataSource, response }));
//       props.onSuccess(dataSource);
//     }
//   }
// );

const onUploadSuccess = (props, response) => (
  (dispatch) => {
    if (typeof props.onSuccess === 'function') {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(onFormDataSourceChange({ formName: props.name, dataSource, response }));
      message.destroy();
      props.onSuccess(response);
      // props.onSuccess(dataSource);
    }
  }
);

export const customRequest = (props, file) => (
  (dispatch) => {
    const param = typeof props.paramTemplate === 'function' ?
      props.paramTemplate(file) : undefined;
    const method = 'POST';
    const headers = new Headers();
    let url = param ? `${props.action}${objectToQueryString(param)}` : props.action;
    // console.log('url', url);
    url = props.checkActionTemplate ? props.checkActionTemplate(props.action) : url;
    const filters = props.filters ? props.filters : [];
    const data = new FormData();
    data.append('name', file);
    const callback = (response) => {
      dispatch(onUploadSuccess(props, response));
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : props.name,
        name: 'name',
        value: '' }));
    };
    const error = e => dispatch(onUploadError(props, e));
    message.destroy();
    message.loading('loading..', 0);
    Request({
      url,
      headers,
      method,
      filters,
      data,
      callback,
      error });
  }
);
export const beforeUploadSend = (props, file) => (
  (dispatch) => {
    dispatch(onFormDataChange({
      formName: props.formName ? props.formName : props.name,
      name: 'name',
      value: file.name }));
    dispatch(onFormDataChange({
      formName: props.formName ? props.formName : props.name,
      name: 'file',
      value: file }));
    if ('preload' in props) {
      dispatch(customRequest(props, file));
    }
    return false;
  }
);
