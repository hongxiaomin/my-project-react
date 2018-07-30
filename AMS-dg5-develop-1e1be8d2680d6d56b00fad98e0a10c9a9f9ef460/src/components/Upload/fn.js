/**
fileName    : index.js
writer      : Chao.Wang
reviewers   : **Input reviewers here**
*/
import { message } from 'antd';
import Request from '../../utils/fetchData/Request';
import { ACTION, GETUPLOADFILE } from './props';

const objectToQueryString = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const collection = [];
  Object.keys(obj).forEach(key => collection.push(`${key}=${JSON.stringify(obj[key])}`));
  if (collection.length > 0) {
    return `?${collection.join('&')}`;
  }
  return obj;
};
const onUploadError = (props, e) => {
  if (typeof props.onError === 'function') {
    message.destroy();
    props.onError(e);
  }
};

const onUploadSuccess = (props, response) => {
  if (typeof props.onSuccess === 'function') {
    message.destroy();
    props.onSuccess(response);
  }
};

export const customRequest = _this => (file) => {
  const props = { ..._this.props };
  if (typeof props[GETUPLOADFILE] === 'function') {
    try {
      props[GETUPLOADFILE](file, _this);
    } catch (e) {
      throw new Error("Can't get file!");
    }
    return;
  }
  const param = typeof props.paramTemplate === 'function' ?
    props.paramTemplate(file) : undefined;
  const method = 'POST';
  const headers = new Headers();
  let url = param ? `${props[ACTION]}${objectToQueryString(param)}` : props[ACTION];
  url = props.checkActionTemplate ? props.checkActionTemplate(props.action) : url;
  const filters = props.filters ? props.filters : [];
  const data = new FormData();
  data.append('name', file);
  const callback = (response) => {
    onUploadSuccess(props, response);
    message.destroy();
    _this.setState({
      value: '',
    });
  };
  const error = e => onUploadError(props, e);
  message.destroy();
  message.loading('loading..', 0);
  Request({
    url,
    headers,
    method,
    filters,
    data,
    callback,
    error,
  });
};
export const beforeUpload = _this => (file) => {
  const props = { ..._this.props };
  _this.setState({
    value: file.name,
  });
  if ('preload' in props) {
    customRequest(_this)(file);
  }
  return false;
};
