import 'whatwg-fetch';
// import { Alert, message, notification } from 'antd';
import _ from 'lodash';

const defaultRequestHeaders = new Headers();
defaultRequestHeaders.append('Content-Type', 'application/json; charset=UTF-8');
const defaultRequestMethod = 'GET';
const defaultRequestMode = 'cors';
const defaultCache = 'default';
const defaultCallback = () => {};
const defaultError = () => {};
const defaultFilters = [];

const isObject = obj => typeof obj === 'object' && obj !== null;
const isEmptyObject = obj => isObject(obj) && Object.keys(obj).length <= 0;
const isArray = obj => Array.isArray(obj);
const objectToQueryString = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj || '';
  const collection = [];
  Object.keys(obj).forEach(key => collection.push(`${key}=${JSON.stringify(obj[key])}`));
  if (collection.length > 0) {
    return `?${collection.join('&')}`;
  }
  if (_.isEqual(obj, {})) {
    return '';
  }
  return obj;
};
const createBody = (data) => {
  // const body = new URLSearchParams();
  // Object.keys(data).forEach(key => body.append(key, data[key]));
  const body = JSON.stringify(data);
  return body;
};
const dataHandler = (value, filters) => {
  const data = value;
  if (isArray(data)) {
    data.forEach((item, i) => {
      data[i] = dataHandler(item, filters);
      if (isEmptyObject(data[i])) data.splice(i, 1);
    });
  } else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      data[key] = dataHandler(data[key], filters);
      filters.forEach((filter) => {
        if (data[key] === filter) delete data[key];
      });
    });
  }
  return data;
};
const urlHandler = ({ url, param, method = defaultRequestMethod, filters = defaultFilters }) => {
  const filteredParam = dataHandler(param, filters);
  let newUrl;
  switch (method) {
    case 'GET': newUrl = `${url}${objectToQueryString(filteredParam)}`; break;
    case 'POST': newUrl = url; break;
    case 'PUT': newUrl = `${url}${objectToQueryString(filteredParam)}`; break;
    case 'DELETE': newUrl = `${url}${objectToQueryString(filteredParam)}`; break;
    default: break;
  }
  return newUrl;
};
const bodyHandler = ({ data, filters = defaultFilters, method }) => {
  if (method === 'GET' || !isObject(data)) {
    return undefined;
  } else if (data instanceof FormData) {
    return data;
  }
  const filteredValue = dataHandler(data, filters);
  return createBody(filteredValue);
};
const methodHandler = ({ method }) => method || defaultRequestMethod;
const headerHandler = ({ headers }) => headers || defaultRequestHeaders;
const modeHandler = ({ mode }) => mode || defaultRequestMode;
const cacheHandler = ({ cache }) => cache || defaultCache;
const callbackHandler = ({ callback }) => callback || defaultCallback;
const errorHandler = ({ error }) => error || defaultError;
const packageHandler = ({ ...args }) => {
  const method = methodHandler(args);
  const url = urlHandler(args);
  const headers = headerHandler(args);
  const mode = modeHandler(args);
  const cache = cacheHandler(args);
  const body = bodyHandler(args);
  const callback = callbackHandler(args);
  const error = errorHandler(args);
  let opts = { method };
  if (method === 'GET') {
    opts = { cache, ...opts };
  } else if (method === 'POST' || method === 'PUT') {
    opts = { body, headers, mode, ...opts };
  }
  const pack = {
    url,
    opts,
    callback,
    error };
  return pack;
};
const genPackage = ({ ...args }) => packageHandler(args);
const statusHandler = (response) => {
  if (response.ok) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};
const jsonFormatter = response => response.json();
export default ({ ...args }) => {
  const pack = genPackage(args);
  return fetch(pack.url, pack.opts)
    .then(statusHandler)
    .then(jsonFormatter)
    // .then(response => response.json())
    .then((json) => {
      pack.callback(json);
    })
    .catch(e => pack.error(e));
    // .catch(e => e.json().then((res) => {
    //   message.destroy();
    //   notification.destroy();
    //   notification.error({
    //     message: 'Error Message',
    //     description: res.exceptionInfo,
    //     duration: null,
    //     style: {
    //       width: 600,
    //       marginLeft: 335 - 600,
    //     },
    //   });
    // }));
    // // .catch((e) => {
    //   console.log('e', e);
    //   console.log(Object.prototype.toString.call(e.json()));
    //   console.log('e.json', e.json());
    //   const res = typeof e.json === 'function' ? e.json() : e;
    //   console.log('res', res);
    //   message.destroy();
    //   notification.destroy();
    //   notification.error({
    //     message: 'Error Message',
    //     description: res.exceptionInfo || res,
    //     duration: null,
    //     style: {
    //       width: 600,
    //       marginLeft: 335 - 600,
    //     },
    //   });
    // });
};
