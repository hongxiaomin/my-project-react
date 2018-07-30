/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

  import { createAction } from 'redux-actions';
  import { onFormDataChange } from '../FormAction';
  import { onSelectRequestSuccess } from '../SelectAction';
  import {
  ONSELECTOPTIONSLOADED,
  ONSELECTBASESETTING, SAVESELECTPROPS } from '../../constants/ActionTypes';
  import {
  UIReducerName,
  UIPropsName,
  autoInputName,
  defaultOption, formReducerName, formDataName } from '../../constants/Config';
  import Request from '../../utils/Request';

  const saveSelectProps = createAction(SAVESELECTPROPS);
  const onAutoInputOptionsLoaded = createAction(ONSELECTOPTIONSLOADED);
  const onSelectBaseSetting = createAction(ONSELECTBASESETTING);
  const onSelectRequestFail = e => (
    () => {
      console.log(e);
    });
  const onAutoInputRequestSuccess = (id, props, response) => (
  (dispatch) => {
    const dataSource = props && props.dataSourceTemplate
    ? props.dataSourceTemplate(response) : response;
    const options = dataSource || [defaultOption];
    dispatch(onAutoInputOptionsLoaded({
      id,
      options }));
    if (props.showInit) {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : autoInputName,
        name: props.name,
        value: options[0] ? `${options[0]}` : '' }));
    } else {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : autoInputName,
        name: props.name,
        value: props.defaultValue ? props.defaultValue : '' }));
    }
    if (props.initCallBack) {
      dispatch(props.initCallBack(props));
    }
  }
);
  const onSelectOptionChange = (id, props, parentValue, nextType) => (
  (dispatch) => {
    const url = props.action;
    const method = props.method || 'GET';
    const paramData = parentValue || '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    const filters = props.filters ? props.filters : [];
    const error = (e) => { dispatch(onSelectRequestFail(e)); };
    const callback = (response) => {
      if (response.code === -1) {
        return null;
      }
      const fullOptions = response;
      if (nextType === 'select') {
        dispatch(onSelectRequestSuccess(id, props, fullOptions));
      } else {
        dispatch(onAutoInputRequestSuccess(id, props, fullOptions));
      }
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error });
  }
);
  const loadNextSelectOptions = (nextId, parentValue, nextType) => (
  (dispatch, getState) => {
    const state = getState();
    const props = state.getIn([UIReducerName, nextId, UIPropsName]);
    dispatch(onSelectOptionChange(nextId, props, parentValue, nextType));
  });

  export const onValueChange = (id, props, e) => (
  (dispatch, getState) => {
    dispatch(onFormDataChange({
      formName: props.formName ? props.formName : autoInputName,
      name: props.name,
      value: e }));
    if (typeof props.onChange === 'function') dispatch(props.onChange(id, e));
    if (typeof props.onSelectChange === 'function') props.onSelectChange(props.name, e);
    if (props.nextId) {
      const nextType = props.nextType || 'select';
      props.nextId.map((nextId) => {
        dispatch(loadNextSelectOptions(nextId, e, nextType));
        return null;
      });
    }
    // 判断是否有回调函数cb
    if (props.cb) {
      const state = getState();
      const formData = state.getIn([formReducerName, props.formName, formDataName]) ?
        state.getIn([formReducerName, props.formName, formDataName]).toJS() : {};
      dispatch(props.cb({ formData, props, id }));
    }
  }
);
  export const onAutoInputOptionChange = (id, props, e) => (
  (dispatch) => {
    const url = props.action;
    const method = props.method || 'GET';
    const paramData = props.param ? props.param : '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    const filters = props.filters ? props.filters : [];
    const error = (e) => {
      dispatch(onSelectRequestFail(e));
    };
    const callback = (response) => {
      dispatch(onAutoInputRequestSuccess(id, props, response));
      if (props.afterOptChange) {
        dispatch(props.afterOptChange(response));
      }
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error });
  }
);
  export const onAutoInputInitial = (id, props) => (
  (dispatch) => {
    dispatch(saveSelectProps(props));
    dispatch(onSelectBaseSetting({ id, name: props.name, props }));
    if (props.data) {
      dispatch(onAutoInputRequestSuccess(id, props, props.data));
    } else if (props.load) {
      dispatch(onAutoInputOptionChange(id, props));
    }
  }
);
