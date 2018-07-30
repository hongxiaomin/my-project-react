/**
fileName    : Request.js
writer      : Chuck Wu
reviewers   : Yezhi Chen
*/
import { isObject, isEmptyString } from '../Common';

/** Default settings */
const defaultMethod = 'GET';
const defaultContentType = undefined;
const defaultMode = 'cors';
const defaultCache = 'default';
const queryDelimiter = '&';
/**
 * Transfer query object to query string.
 * @param {*} param The uri param object.
 * @returns {string} The query string.
 */
const getQueryString = (param) => {
  let queryString = '';
  if (isObject(param)) {
    const collection = Object.keys(param).map(key => `${key}=${param[key]}`);
    const query = collection.join(queryDelimiter);
    queryString = isEmptyString(query) ? queryString : `?${query}`;
  }
  return queryString;
};
/**
 * Compose uri by params and url by querying method.
 * @param {*} url The destination url.
 * @param {*} param Parameters in uri. It would be used in GET, PUT and DELETE method and ignored by POST.
 * @param {*} method Query method, now supported GET, POST, PUT and DELETE method.
 * @returns {*} Return uri or default url.
 */
const getURI = (url, param, method) => {
  let action;
  switch (method) {
    case 'GET': action = `${url}${getQueryString(param)}`; break;
    case 'POST': action = url; break;
    case 'PUT': action = `${url}${getQueryString(param)}`; break;
    case 'DELETE': action = `${url}${getQueryString(param)}`; break;
    default: action = url; break;
  }
  return action;
};
/**
 * Transfer data into assignment content-type
 * @param {*} data The data putted in request body.
 * @param {*} contentType Content-type in query body.
 * @returns {*} Return body object or undefined.
 */
const getBody = (data, contentType) => {
  let body;
  switch (contentType) {
    case 'text/plain':
      body = data;
      break;
    case 'application/json':
      body = data;
      break;
    case 'application/javascript':
      body = data;
      break;
    case 'application/xml':
      body = data;
      break;
    case 'text/xml':
      body = data;
      break;
    case 'text/html':
      body = data;
      break;
    case 'application/x-www-form-urlencoded':
      body = new URLSearchParams(data);
      break;
    case 'multipart/form-data':
      body = new FormData();
      Object.keys(data).forEach(key => body.append(key, data[key]));
      break;
    default:
      body = undefined;
      break;
  }
  return body;
};
/**
 * Compose necessary information for querying.
 * @param {*} args The arguments from user.
 * @returns {object} The object including url, headers, body etc.
 */
const getPackage = (args) => {
  const {
    url: inputURL,
    param, data,
    headers,
    method = defaultMethod,
    contentType = defaultContentType,
    mode = defaultMode,
    cache = defaultCache,
  } = args;
  const url = getURI(inputURL, param, method);
  const body = method !== 'GET' ? getBody(data, contentType) : undefined;
  return {
    url, method, headers, body, cache, mode,
  };
};

export default (args) => {
  const { url, ...options } = getPackage(args);
  return (
    fetch(url, options).then(response => (response.ok ?
      Promise.resolve(response) :
      Promise.reject(response)))
  );
};
