/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/
import {
  onUpdateData,
  onUpdateEvent,
  onDelete } from '../StoreAction';
import Request from '../../utils/Request2';
import {
  GET,
  UNDEFINED,
  storeReducer,
  eventName,
  defaultGaugeOnSuccess,
  defaultGaugeOnError,
  defaultGaugeDataSourceTemplate,
  gaugePreload,
  gaugeWebsocket } from '../../constants/Config2';

const onGaugeLoadFail = (e, error) => (
  () => error(e)
);

export const onGaugeRefreshData = (oriDataSource, { data, dataSourceTemplate }) => (
  () => {
    const dataSource = oriDataSource !== UNDEFINED ? oriDataSource : data;
    const filteredDataSourceTemplate = dataSourceTemplate !== UNDEFINED ?
      dataSourceTemplate : defaultGaugeDataSourceTemplate;
    const filteredDataSource = Number(filteredDataSourceTemplate(dataSource));
    return filteredDataSource;
  }
);
export const onGaugeLoad =
  ({ id, name, action, paramTemplate, param, filters, onSuccess, onError, htmlTo }) => (
  (dispatch) => {
    const url = action;
    const method = GET;
    const paramData = paramTemplate ? paramTemplate(param) : param;
    const success = typeof onSuccess === 'function' ? onSuccess : defaultGaugeOnSuccess;
    const err = typeof onError === 'function' ? onError : defaultGaugeOnError;
    const callback = (response) => {
      const payload = response;
      if (htmlTo !== UNDEFINED) {
        dispatch(onUpdateData({ htmlTo, id, payload }));
      }
      dispatch(onUpdateData({ id, name, payload }));
      success(payload);
    };
    const error = (e) => {
      dispatch(onGaugeLoadFail(e, err));
    };
    Request({
      url,
      param: paramData,
      filters,
      method,
      callback,
      error,
    });
  }
);
export const onGaugeKeepLoading = props => (
  (dispatch) => {
    const id = props.id;
    const payload = setInterval(() => dispatch(onGaugeLoad(props)), 5000);
    dispatch(onUpdateEvent({ id, payload }));
  }
);
export const onGaugeInitial = props => (
  (dispatch) => {
    if (gaugePreload in props && !(gaugeWebsocket in props)) {
      dispatch(onGaugeLoad(props));
    } else if (gaugePreload in props && gaugeWebsocket in props) {
      dispatch(onGaugeKeepLoading(props));
    }
  }
);
export const onGaugeDispose = ({ id }) => (
  (dispatch, getState) => {
    const state = getState();
    const event = state.getIn([storeReducer, id, eventName]);
    if (event !== UNDEFINED) {
      clearInterval(event);
    }
    dispatch(onDelete({ id }));
  }
);
