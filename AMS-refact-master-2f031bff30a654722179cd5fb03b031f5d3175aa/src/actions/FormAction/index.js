/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { message } from 'antd';
import { createAction } from 'redux-actions';
import {
  ONFORMUPDATECHILDREN,
  ONFORMDATASOURCECHANGE,
  ONFORMDATACHANGE,
  ONFORMUPDATEPROPS, ONSAVECHECKBOXDATA, ONSAVECHECKBOXCHECKED, ONUPDATEFORMDATA, SAVECHECKBOXDATA, SAVECHECKBOXDATALOAD, SAVECHECKBOXDISABLED, CLEARCHECKBOXDATA,
} from '../../constants/ActionTypes';
import Request from '../../utils/Request';
import RequestSMT from '../../utils/Request4';
import { tableRedecurName } from '../../constants/TableConfig';
import {
  formReducerName,
  formDataName,
  formDataSourceName,
  formSubmitName,
  formMemberType, formOriDataSourceName, CheckBoxChecked,
} from '../../constants/Config';
import { needTablefunc, updateDataSource, onSavePagination, getSaveData, clearRowsKeys } from '../../actions/TableAction';
import { onSelectOptionChange } from '../../actions/SelectAction';
import { onBarChartLoad } from '../../actions/BarChartAction2';
import { onPieChartLoad } from '../../actions/PieChartAction';

export const onFormUpdateChildren = createAction(ONFORMUPDATECHILDREN);
export const onFormDataSourceChange = createAction(ONFORMDATASOURCECHANGE);
export const onFormDataChange = createAction(ONFORMDATACHANGE);
export const onFormUpdateProps = createAction(ONFORMUPDATEPROPS);
export const onSaveCheckBoxData = createAction(ONSAVECHECKBOXDATA);
export const onSaveCheckBoxChecked = createAction(ONSAVECHECKBOXCHECKED);
export const onUpdateFormData = createAction(ONUPDATEFORMDATA);

// ------------------------------------------------------------------------------
// 保存数据
export const saveCheckboxData = createAction(SAVECHECKBOXDATA);
// 初始化保存数据
export const saveCheckboxDataLoad = createAction(SAVECHECKBOXDATALOAD);
// 保存disabled
export const saveCheckboxDisabled = createAction(SAVECHECKBOXDISABLED);
// 清除自定义组件的一行
export const clearCheckBoxData = createAction(CLEARCHECKBOXDATA);

const isFormMember = elem => (
  formMemberType.some((type) => {
    const elemType = elem.type;
    if (typeof elemType === 'function' && elemType.displayName === type) {
      return true;
    } else if (type === elemType) {
      return true;
    }
    return false;
  })
);
const isFormSubmit = (elem) => {
  if (elem.props) {
    return elem.props.type === formSubmitName;
  }
  return false;
};
const onFormSubmitFail = e => (
  () => console.log(e)
);
let timer;
export const onFormSubmit = props => (
  (dispatch, getState) => {
    const data = {};
    const responseDefault = { message: '' };
    dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response: responseDefault }));
    const tableReducer = getState().getIn([tableRedecurName]) ? getState().getIn([tableRedecurName]).toJS() : '';
    if (!props.updateSavePagination) {
      Object.keys(tableReducer).forEach((key) => {
        const tablePage = tableReducer[key].page ? tableReducer[key].page = 1 : '';
        const tableFormName = (tableReducer[key].props && tableReducer[key].props.formName) ? tableReducer[key].props.formName : '';
        if ((tablePage) && (tableFormName === props.name)) {
          const tableName = key;
          dispatch(onSavePagination({ page: 1, pageSize: 10, tableName }));
        }
      });
    }
    const formDataNeedWorkOrder = getState().getIn([formReducerName, props.name, 'data']) ? getState().getIn([formReducerName, props.name, 'data']).toJS() : '';
    const isTrue = props && props.nextSelectName ? props.nextSelectName : '';
    if (isTrue) {
      dispatch(needTablefunc(props));
    } else {
      let formName = props.name;
      const tableName = props.tableName ? props.tableName : '';
      const defaultParam = props.defaultParam ? props.defaultParam : {};
      const onSubmit = typeof props.onSubmit === 'function' ? props.onSubmit : () => { };
      const onError = typeof props.onError === 'function' ? props.onError : () => { };
      const state = getState();
      const imuteData = state.getIn([formReducerName, formName, formDataName]);
      const tableData = state.getIn([tableRedecurName, props.tableName, 'selectedRows']) ?
        state.getIn([tableRedecurName, props.tableName, 'selectedRows']) : '';
      let jsonData = imuteData ? imuteData.toJS() : {};
      jsonData = {
        ...defaultParam,
        ...jsonData,
      };
      const checkRes = props.checkTemplate ? props.checkTemplate({ jsonData, tableData }) : true;
      if (!checkRes) {
        return null;
      }
      formName = (props && props.needForName) ? props.needForName : '';
      const formData = props.needForName ? state.getIn([formReducerName, formName, formDataName]).toJS() : '';
      const setData = {
        ...formData,
        ...jsonData,
      };
      const setDataSource = state.getIn([formReducerName, formName, formDataSourceName]) ? state.getIn([formReducerName, formName, formDataSourceName]) : '';
      formName = props.name;
      const data = props.dataTemplate ? props.dataTemplate(setData, setDataSource) : setData;

      let url = formDataNeedWorkOrder.work_order && props.nextAction ? props.nextAction : props.action;
      const method = props.method ? props.method : 'GET';
      // const paramData = props.param ? props.param : data;
      const paramData = props.param ? props.param : jsonData;
      const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
      // console.log('====================================');
      // console.log('param',param);
      // console.log('====================================');
      url = props.urlTemplate ? props.urlTemplate(paramData) : url;
      if (props.page) {
        param.page = {
          size: props.pageSize,
          current: props.page,
        };
      }
      const filters = props.filters;
      const callback = (res) => {
        const response = props.responseFormatter ? props.responseFormatter(res) : res;
        // console.log('====================================');
        // console.log('responseddddddddddddd', response);
        // console.log('====================================');
        message.destroy();
        if (response.code === -1) {
          message.destroy();
          message.error(response.message, 3);
          for (let i = 0; i <= timer; i++) {
            clearInterval(i);
          }
          return null;
        }
        let dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
        dispatch(onSavePagination({ page: response.pageCurrent, pageSize: response.pageSize, tableName: props.tableName }));
        dispatch(getSaveData({ tableName: props.tableName, response }));
        if (!props.onDatasource) {
          // Object.assign(response, { ...setData });
          // console.log('response', response);
          const mergeRes = { ...response, ...setData };
          // console.log('resmergeResponse', mergeRes);
          dispatch(onFormDataSourceChange({ formName, dataSource, response: mergeRes }));
          if (props.chartName) {
            dispatch(onBarChartLoad(props));
            dispatch(onPieChartLoad(props));
          }
          if (props.SendFunc) {
            if (response.code === 0) {
              message.destroy();
              message.success(response.message, 3);
            }
          }
          if (props.needName) {
            const tableName = props.needName;
            dispatch(updateDataSource({ dataSource: [], response, tableName }));
          }
        }
        if (props.noFormTable) {
          const tableName = props.needTableName;
          dispatch(updateDataSource({ dataSource, response, tableName }));
        }
        if (props.updateSelect) {
          dispatch(onSelectOptionChange('456', props.updateSelect));
        }
        if (props.updateSelectCode) {
          dispatch(onSelectOptionChange('123', props.updateSelectCode));
        }
        if (props.cb) {
          dispatch(props.cb(props));
        }
        onSubmit(dataSource, response);
        if (!response.code) {
          // debugger;
          dispatch(clearRowsKeys(tableName));
        }
        if (props.getLocalData) {
          if (response.code) {
            dataSource = JSON.parse(localStorage.getItem('localDataSource'));
            dispatch(onFormDataSourceChange({ formName, dataSource }));
          }
        }
      };
      const error = (e) => {
        dispatch(onFormSubmitFail(e));
        onError(e);
      };
      if (props.isRefresh) {
        for (let i = 0; i <= timer; i++) {
          clearInterval(i);
        }
        timer = setInterval(() => {
          const urlName = window.location.href.split('#');
          if (urlName[1] === '/LineChangeInformation') {
            Request({
              url,
              method,
              param,
              data,
              filters,
              callback,
              error,
            });
          } else {
            for (let i = 0; i <= timer; i++) {
              clearInterval(i);
            }
          }
        }, 2000);
      }
      if (props.body === 'raw') {
        RequestSMT({
          url,
          method,
          param,
          data,
          filters,
          callback,
          error,
        });
      } else {
        Request({
          url,
          method,
          param,
          data,
          filters,
          callback,
          error,
        });
      }
    }
  }
);
export const onFormChildrenSubscribe = (topProps, props = topProps) => (
  dispatch => (
    React.Children.map(props.children,
      (child) => {
        if (isFormMember(child)) {
          const formName = topProps.name;
          return React.cloneElement(child, { formName });
        } else if (isFormSubmit(child)) {
          return React.cloneElement(child, {
            onClick: () => dispatch(onFormSubmit(topProps)),
          });
        } else if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            children: dispatch(onFormChildrenSubscribe(topProps, child.props)),
          });
        }
        return child;
      })
  )
);
export const onFormInitial = props => (
  (dispatch) => {
    const formName = props.name;
    const dataSource = [];
    const children = dispatch(onFormChildrenSubscribe(props));
    dispatch(onFormUpdateProps({ formName, props }));
    dispatch(onFormUpdateChildren({ formName, children }));
    if (!props.keepDataSource && !props.load) {
      dispatch(onFormDataSourceChange({ formName, dataSource }));
    }
    if (props.load) {
    //  console.log('props', props);
      dispatch(onFormSubmit(props));
    }
  }
);
// 多选按钮
export const checkBoxChangeFunc = params => (
  (dispatch, getState) => {
    const { e, props } = params;
    const { tableName, formName, record, name, allCheck, id, radio, checkGroup } = props;
    const state = getState();
    let checked = e.target.checked;
    if (props.initCheckBox) {
      const Tabledisabled = state.getIn([formReducerName, formName, 'CheckedDisabled']) ? state.getIn([formReducerName, formName, 'CheckedDisabled']).toJS() : {};
      checked ?
        dispatch(saveCheckboxData({ formName, record, name }))
        :
        dispatch(saveCheckboxData({ formName, record: '', name }));
      // 保存checked
      dispatch(onSaveCheckBoxChecked({ formName, checked, name }));
      let flag = true;
      let flag2 = true;
      const NameCheckbox = state.getIn([formReducerName, props.formName, formDataName, CheckBoxChecked, props.name]) ?
        state.getIn([formReducerName, props.formName, formDataName, CheckBoxChecked, props.name]).toJS() : {};
      if (name !== 'allCheck') {
        Object.keys(NameCheckbox).forEach((key) => {
          if (key !== 'allCheck') {
            const CheckedDisabled = Tabledisabled[key];
            if (CheckedDisabled) {
              return null;
            }
            if (!NameCheckbox[key]) {
              flag = false;
              return null;
            }
            flag2 = true;
          }
          return null;
        });
        checked = flag && flag2;
        dispatch(onSaveCheckBoxChecked({ formName, checked, name: 'allCheck' }));
      }
    } else {
      const oldCheckBoxArry = state.getIn([formReducerName, formName, formDataName, 'checkboxId']) || [];
      let datarray = JSON.parse(JSON.stringify(oldCheckBoxArry));
      if (!e.target.checked) {
        datarray = datarray.filter(v => v !== id);
      } else {
        datarray.push(e.target.id);
      }
      const dat = new Set(datarray);
      const newCheckBoxArry = [...dat];
      dispatch(onSaveCheckBoxData({ formName, newCheckBoxArry }));
      dispatch(onSaveCheckBoxChecked({ formName, name, checked }));
      const oldDataSource = state.getIn([formReducerName, 'LineForm', formOriDataSourceName]) || {};
      const oldupdateDataSource = state.getIn([formReducerName, formName, formDataSourceName]) || [];
      const newDataSource = JSON.parse(JSON.stringify(oldDataSource));
      const { rows } = newDataSource;
      const newDat = [];
      if (rows) {
        newCheckBoxArry.map((v) => {
          let flag = true;
          rows.map((key) => {
            if (v === key.machineType) {
              flag = false;
              Object.assign(key, { sequence: newDat.length + 1 });
              newDat.push(key);
            }
            return null;
          });
          if (flag) {
            oldupdateDataSource.map((akey) => {
              if (akey.machineType === v) {
                Object.assign(akey, { sequence: newDat.length + 1 });
                newDat.push(akey);
              }
              return null;
            });
          }
          return null;
        });

        dispatch(onFormDataSourceChange({ formName: 'LineForm', dataSource: newDat, response: newDataSource }));
      }
    }
  }
);
