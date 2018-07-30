/**
fileName    : Common.js
writer      : Yezhi.Chen, ANDY.HX.LEE, Chuck.Wu, Chao.Wang
reviewers   : ANDY.HX.LEE(partial), Yezhi.Chen
*/

/**
 * Create a GUID.
 * @returns {string} GUID
 */
import { InputAction } from '@delta/common-utils';

export const getGUID = () => (
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r && 0x3 | 0x8);
    return v.toString(16);
  })
);
/**
 * Check the input variable is object or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isObject = obj => typeof obj === 'object' && obj !== null;
/**
 * Check if input variable is empty object or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isEmptyObject = obj => (
  isObject(obj) && Object.keys(obj).length <= 0
);
/**
 * Check if input variable is function or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isFunction = obj => typeof obj === 'function';
/**
 * Check if input variable is string or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isString = obj => typeof obj === 'string';
/**
 * Check if input variable is empty string or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isEmptyString = obj => isString(obj) && obj.length <= 0;
/**
 * Check if input variable is number or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isNumber = obj => typeof obj === 'number';
/**
 * Check if input variable is array or not.
 * @param {*} obj Input variable.
 * @returns {boolean} The result of judgement.
 */
export const isArray = obj => Array.isArray(obj);
/**
 * Get sorted data by key and order.
 * @param {array} data Input data.
 * @param {string} key The key of object which is sorted by.
 * @param {number} ascending Sort method.
 * @returns {array} sorted data.
 */
export const getSortedData = (data, key, ascending) => {
  const list = data.slice();
  const multiplier = ascending ? 1 : -1;
  list.sort((prev, curr) => {
    const v1 = prev[key];
    const v2 = curr[key];
    if (typeof v1 === 'number') {
      return (v1 - v2) * multiplier;
    }
    return v1.localeCompare(v2) * multiplier;
  });
  return list;
};
/**
 * Transfer any type to string.
 * @param {*} obj Any type object.
 * @returns {string} Transfered string.
 */
export const getStringFormat = (obj) => {
  let result;
  const type = typeof obj;
  switch (type) {
    case 'string': result = obj.length > 0 ? obj : '\' \''; break;
    case 'boolean': result = (obj).toString(); break;
    case 'object': result = JSON.stringify(obj); break;
    case 'number': result = (obj).toString(); break;
    case 'undefined': result = `${obj}`; break;
    case 'function': result = (obj).toString(); break;
    default: result = ''; break;
  }
  return result;
};
/**
 * Set cookie
 * @param {string} cname The name of cookie.
 * @param {string} cvalue The value of cookie.
 * @param {number} exdays The term of cookie.
 */
export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  document.cookie = `${cname}=${cvalue};expires=${d.toUTCString()};path=/`;
};
/**
 * Get cookie
 * @param {string} cname The name of cookie.
 * @returns {string} The data stored in cookie.
 */
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
};
/**
 * dataHandler function
 * @param {object} rawData The name of data.
 * @returns {object} The filted data.
 */
const filters = [null, '', undefined, 'Invalid date', '-1'];
export const dataHandlerWithEncode = (value) => {
  const data = value;
  if (isArray(data)) {
    data.map(item => dataHandlerWithEncode(item, filters));
  } else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      data[key] = dataHandlerWithEncode(data[key], filters);
      data[key] = encodeURIComponent(data[key]);
      filters.forEach((filter) => {
        if (data[key] === filter) delete data[key];
      });
    });
  }
  return data;
};

const { onClear } = InputAction;
export const clearForm = (formName = '', inputNameArry = [], tools) => {
  const { trigger, getProps } = tools;
  inputNameArry.map((inputName) => {
    const inputProps = getProps(`${formName}-${inputName}`);
    trigger(onClear(inputProps));
  });
};
