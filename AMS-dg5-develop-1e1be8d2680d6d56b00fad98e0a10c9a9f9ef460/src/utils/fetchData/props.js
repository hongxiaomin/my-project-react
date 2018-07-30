/**
fileName    : props.js
writer      : Chuck Wu
reviewers   : Yezhi Chen
*/
import PropTypes from 'prop-types';

/** Properties name */
export const METHOD = 'method';
export const HEADERS = 'headers';
export const CONTENTTYPE = 'contentType';
export const PARAM = 'param';
export const DATA = 'data';
export const MODE = 'mode';
export const CACHE = 'cache';
export const PARAMTEMPLATE = 'paramTemplate';
export const DATATEMPLATE = 'dataTemplate';
export const DATASOURCETEMPLATE = 'dataSourceTemplate';
export const ONCLIENTSUBMIT = 'onClientSubmit';
export const GETREQUEST = 'getRequest';
export const GETFETCHDATA = 'getFetchData';
export const CALLBACK = 'callback';
/** Default props */
export const defaultProps = {
  [METHOD]: 'GET',
  [HEADERS]: undefined,
  [CONTENTTYPE]: undefined,
  [PARAM]: undefined,
  [DATA]: undefined,
  [MODE]: 'cors',
  [CACHE]: 'default',
  [PARAMTEMPLATE]: response => response,
  [DATATEMPLATE]: response => response,
  [DATASOURCETEMPLATE]: response => response,
  [CALLBACK]: undefined,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The url of the request site.
   */
  [METHOD]: PropTypes.oneOf(['GET', 'POST', 'PUT', 'DELETE']),
  /**
   * @Props
   * The header of the request.
   * */
  [HEADERS]: PropTypes.object,
  /**
   * @Props
   * The content-type of the fetch body.
   * */
  [CONTENTTYPE]: PropTypes.string,
  /**
   * @Props
   * The uri param of request. It would be used when the request method of GET and PUT was selected.
   * */
  [PARAM]: PropTypes.object,
  /**
   * @Props
   * The data of body.
   * */
  [DATA]: PropTypes.any,
  /**
   * @Props
   * The mode of requesting.
   * */
  [MODE]: PropTypes.oneOf(['same-origin', 'no-cors', 'cors', 'navigate']),
  /**
   * @Props
   * The mechanism of cache.
   * */
  [CACHE]: PropTypes.oneOf([
    'default',
    'no-store',
    'reload',
    'no-cache',
    'force-cache',
    'only-if-cached',
  ]),
  /**
   * @Props
   * The template of param. It would be used if there is any operation on param you want.
   * */
  [PARAMTEMPLATE]: PropTypes.func,
  /**
   * @Props
   * Callback function fired when starting of fetching data. It would be used if there is any operation on data you want.
   * */
  [DATATEMPLATE]: PropTypes.func,
  /**
   * @Props
   * Callback function fired when fetching data successfully. It would be used if there is any operation on response of request you want.
   * */
  [DATASOURCETEMPLATE]: PropTypes.func,
  /**
   * @Action
   * Action function for requesting data.
   * @param {*} args The arguments from user.
   * @returns {promise} A promise for request.
   */
  [GETREQUEST]: PropTypes.func,
  /**
   * @Action
   * Action function for fetching data.
   * @param {*} url The query url.
   * @param {*} props The setting of querying.
   */
  [GETFETCHDATA]: PropTypes.func,
  /**
   * @Action
   * Action function for fetching data.
   * @param {*} response The response of the fetch.
   */
  [CALLBACK]: PropTypes.func,
};
