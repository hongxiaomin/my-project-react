/* eslint no-throw-literal: off */
/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : Yezhi Chen
*/
import lodash from 'lodash';
import getRequest from './Request';
import { GET } from '../../constants/Config';
import {
  defaultProps,
  DATA,
  PARAM,
  DATATEMPLATE,
  PARAMTEMPLATE,
  DATASOURCETEMPLATE,
  MODE,
  METHOD,
  CACHE,
  CONTENTTYPE,
  HEADERS,
  CALLBACK,
} from './props';

/**
 * Get content of body in packet.
 * @param {object} response Response from querying.
 * @returns {*} Content message of body.
 */
const getMessage = async (response) => {
  let message = response;
  const resultContentType = response.headers.get('content-type');
  if (resultContentType !== null) {
    if (resultContentType.includes('application/json')) {
      message = await response.json();
    } else if (
      resultContentType.includes('text/html') ||
      resultContentType.includes('text/plain')
    ) {
      message = await response.text();
    } else if (resultContentType.includes('multipart/form-data')) {
      message = await response.formData();
    }
  }
  return message;
};

export default async (url, props = {}) => {
  const {
    [DATA]: inputData,
    [PARAM]: inputParam,
    [DATATEMPLATE]: dataTemplate,
    [PARAMTEMPLATE]: paramTemplate,
    [DATASOURCETEMPLATE]: dataSourceTemplate,
    [MODE]: mode,
    [METHOD]: method,
    [CACHE]: cache,
    [CONTENTTYPE]: contentType,
    [HEADERS]: headers,
    [CALLBACK]: callback,
  } = lodash.assign({}, defaultProps, props);
  const data = dataTemplate(inputData);
  const param = method === GET ? data : paramTemplate(inputParam);
  try {
    const response = await getRequest({
      url,
      method,
      param,
      data,
      mode,
      cache,
      contentType,
      headers,
    });
    const code = response.status;
    let message = await getMessage(response);
    message = dataSourceTemplate(message);
    if (callback) {
      callback(message);
    }
    return { code, message };
  } catch (e) {
    const code = e.status;
    const message = await getMessage(e);
    throw { code, message };
  }
};
