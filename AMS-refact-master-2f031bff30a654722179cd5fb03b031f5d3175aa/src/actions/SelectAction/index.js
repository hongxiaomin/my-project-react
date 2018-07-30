/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { onFormDataChange, onFormDataSourceChange, onFormSubmit } from '../FormAction';
import { saveTableInputData } from '../TableAction';
import { saveOption, saveOldOption, onSelectListChange } from '../SelectListAction';
import { SelectListReducerName, tablePropsName, tableRedecurName } from '../../constants/TableConfig';
import {
  ONSELECTOPTIONSLOADED,
  ONSELECTBASESETTING, SAVESELECTPROPS, ONSAVEPAGINATION, ONSELECTDISABLELOADED
} from '../../constants/ActionTypes';
import {
  selectName,
  defaultOption, formReducerName, formDataName
} from '../../constants/Config';
import { saveDisable } from '../../actions/InputAction';
// import { defaultRequestFilters } from '../../constants/Settings';
import Request from '../../utils/Request';

const saveSelectProps = createAction(SAVESELECTPROPS);
export const onSelectOptionsLoaded = createAction(ONSELECTOPTIONSLOADED);
const onSelectDisableLoaded = createAction(ONSELECTDISABLELOADED);
const onSelectBaseSetting = createAction(ONSELECTBASESETTING);
// const onSavePagination = createAction(ONSAVEPAGINATION);
const onSelectRequestFail = e => (
  () => console.error(e || 'submit failed!')
);
export const onSelectRequestSuccess = (id, props, response) => (
  (dispatch) => {
    const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;

    let options = !props.noDefault ? [defaultOption] : [];
    if (props.mode) {
      options = [];
    }
    options.push();
    dataSource.forEach(
      item => options.push({
        key: item[props.itemKey],
        text: item[props.itemValue]
      }));
    // const nextSelectName = props.nextSelectName || '';
    // if (nextSelectName) {
    //   const option = [...options];
    //   option.splice(0, 1);
    //   dispatch(saveOption({ option, nextSelectName }));
    //   dispatch(saveOldOption(option));
    // }
    dispatch(onSelectOptionsLoaded({
      id,
      options
    }));
    if (props.init || props.noDefault) {
      return null;
    }
    // debugger;
    if (props.noClr) {
      return false;
    }
    // debugger;
    // 表格中的select
    if (props.index !== undefined) {
      const { index, name, tableName } = props;
      dispatch(saveTableInputData({
        tableName,
        index,
        name,
        value: `${options[1].key}`,
      }));
      return null;
    }
    // debugger;
    if (props.showInit) {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : selectName,
        name: props.name,
        value: `${options[0].key}`
      }));
    } else {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : selectName,
        name: props.name,
        value: props.defaultKey ? props.defaultKey : defaultOption.key
      }));
    }
    if (props.initCallBack) {
      dispatch(props.initCallBack(props));
    }
  }
);

export const onSelectClear = (id, props) => (
  (dispatch) => {
    if (props.onClear) {
      return null;
    }
    const options = [];
    dispatch(onSelectOptionsLoaded({
      id,
      options
    }));
    dispatch(onFormDataChange({
      formName: props.formName ? props.formName : selectName,
      name: props.name,
      value: undefined
    }));
  }
);
export const onSelectDisable = ({ id, disable }) => (
  (dispatch) => {
    dispatch(onSelectDisableLoaded({
      id,
      disable
    }));
  }
);
export const onSelectValueChange = (id, props, e) => (
  (dispatch, getState) => {
    // 表格中的select
    if (props.index !== undefined) {
      const { index, name, tableName } = props;
      dispatch(saveTableInputData({
        tableName,
        index,
        name,
        value: e,
      }));
      // return null;
    } else {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : selectName,
        name: props.name,
        value: e
      }));
    }
    // 判断是否有回调函数cb
    if (props.cb) {
      //  console.log('props', props);
      const state = getState();
      const formData = state.getIn([formReducerName, props.formName, formDataName]) ?
        state.getIn([formReducerName, props.formName, formDataName]).toJS() : {};
      dispatch(props.cb({ formData, props, id }));
    }
    if (props.disabledInput) {
      const inputArr = props.disabledInput;
      const pcOrplc = e.split(',')[1];
      inputArr.map((v) => {
        dispatch(saveDisable({
          formName: props.formName,
          inputName: 'InputDisable',
          name: v,
          disabled: pcOrplc === '1',
        }));
        if (pcOrplc === '1') {
          dispatch(onFormDataChange({
            formName: props.formName,
            name: v,
            value: ''
          }));
        }
        return null;
      });
    }
    if (typeof props.onChange === 'function') dispatch(props.onChange(id, e));
    if (typeof props.onSelectChange === 'function') props.onSelectChange(props.name, e);
    const state = getState();
    if (props.nextSelectName) {
      const options = state.getIn([SelectListReducerName, 'OldOption']);
      const option = options.filter(v => !(v.text === e));
      const nextSelectName = props.nextSelectName;
      dispatch(saveOption({ option, nextSelectName }));
    }
    const clearTableData = props.clearTableData || '';
    if (clearTableData) {
      dispatch(onFormDataSourceChange({ formName: props.formName, dataSource: [], response: {} }));
    }
    const needTowSelect = props.needTowSelect ? props.needTowSelect : '';
    // const selectData = state.getIn([formReducerName, props.formName, formPropsData]);
    if (needTowSelect) {
      dispatch(onSelectListChange({ e, props }));
    }
    if (props.emitRequest) {
      dispatch(onFormSubmit(props.emitRequest));
      // dispatch(onSavePagination({ page: 1, pageSize: 10, tableName: props.emitRequest.tableName }));
    }
  }
);
export const onSelectOptionChange = (id, props) => (
  (dispatch, getState) => {
    //  console.error(props);
    const url = props.action;
    const method = props.method || 'GET';
    let param = '';
    const paramData = props.param ? props.param : '';
    const formData = getState().getIn([formReducerName, props.formName, formDataName]) ? getState().getIn([formReducerName, props.formName, formDataName]).toJS() : '';
    // EQM 入库管理
    if (props.onWithType) {
      param = props.paramTemplate ? props.paramTemplate(formData.partTypeId) : formData.partTypeId;
    } else {
      param = props.paramTemplate ? props.paramTemplate(paramData, formData) : paramData;
    }
    // EQM 使用管理
    if (props.onWithPart) {
      param = props.paramTemplate ? props.paramTemplate(formData.partModelId) : formData.partModelId;
    } else {
      param = props.paramTemplate ? props.paramTemplate(paramData, formData) : paramData;
    }
    // EQM 设备登记、工作站配置
    if (props.prev) {
      if (props.prev === 'factoryId') {
        param = props.paramTemplate ? props.paramTemplate(formData.factoryId) : formData.factoryId;
      } else if (props.prev === 'eqpTypeId') {
        param = props.paramTemplate ? props.paramTemplate(formData.eqpTypeId) : formData.eqpTypeId;
      } else if (props.prev === 'factoryIdAndZoneId') {
        param = props.paramTemplate ? props.paramTemplate(formData.zoneId) : formData.zoneId;  //wrong
      } else {
        param = props.paramTemplate ? props.paramTemplate(paramData, formData) : paramData;
      }
    }
    const filters = props.filters ? props.filters : [];
    const error = (e) => { dispatch(onSelectRequestFail(e)); };
    const callback = (res) => {
      const response = props.responseFormatter ? props.responseFormatter(res) : res;
      if (props.afterOptChange) {
        dispatch(props.afterOptChange(response));
      }
      dispatch(onSelectRequestSuccess(id, props, response));
      if (props.prev && !formData.lineId) {
        dispatch(onFormDataChange({
          formName: props.formName ? props.formName : selectName,
          name: props.name,
          value: '-1'
        }));
      }
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error
    });
  }
);
export const onSelectInitial = (id, props) => (
  (dispatch) => {
    dispatch(saveSelectProps(props));
    dispatch(onSelectBaseSetting({ id, name: props.name, props }));
    if (props.data) {
      dispatch(onSelectRequestSuccess(id, props, props.data));
    } else if (props.load) {
      dispatch(onSelectOptionChange(id, props));
    } else {
      dispatch(onSelectClear(id, props));
    }
  }
);
