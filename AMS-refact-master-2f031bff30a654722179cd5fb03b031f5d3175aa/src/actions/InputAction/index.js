/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import {
  ONINPUTCLICK,
  ONFORMDATASOURCECHANGE, SAVEDISABLE } from '../../constants/ActionTypes';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  SERVER_IP_SMM,
  SERVER_IP_PCB,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
       } from '../../constants/Settings';
import Request from '../../utils/Request';
import { formReducerName } from '../../constants/Config';
import { onFormDataChange } from '../FormAction';

export const onFormDataSourceChange = createAction(ONFORMDATASOURCECHANGE);
export const onInputClick = createAction(ONINPUTCLICK);
export const saveDisable = createAction(SAVEDISABLE);

const SMMPickMaterialSearchAPI = `${SERVER_IP_SMM}/smm/mergerinventory/qtrayslist`;
const PCBIndividualDiscardAPI = `${SERVER_IP_PCB}/ams/pcb/scrapped/get`;
const paramTemplate = defaultGetParamTemplate2;
const filters = defaultRequestFilters;
const dataSourceTemplate = defaultDataSourceTemplate;
const inputEnterFail = e => (
  () => console.log(e)
);
export const inputEnter = params => (
  (dispatch, getState) => {
    const inputVal = params;
    const inputValArray = inputVal.split('{');
    console.log('needDataNew', inputValArray);
    const material_no = inputValArray[0];
    const serial_no = inputValArray[8];
    const formName = 'SMMPickMaterialSearchForm';
    const jsonData = { material_no, serial_no, side: '-1' };
    const setData = {
      ...jsonData,
    };
    const data = setData;
    const url = SMMPickMaterialSearchAPI;
    const method = 'GET';
    const paramData = jsonData;
    const callback = (response) => {
      const dataSource = dataSourceTemplate ? dataSourceTemplate(response) : response;
      console.log(dataSource);
      dispatch(onFormDataSourceChange({ formName, dataSource, response }));
    };
    const param = paramTemplate ? paramTemplate(paramData) : paramData;
    const error = (e) => {
      dispatch(inputEnterFail(e));
    };
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
);

export const inputEnterNoRequest = params => (
  (dispatch, getState) => {
    const inputVal = params;
    const inputValArray = inputVal.split('{');
    const needCode = inputValArray[inputValArray.length - 1];
    const state = getState();
    const formName = 'PCBBackUse';
    const comPareData = state.getIn([formReducerName, formName, 'dataSource']);
    console.log('comPareData', comPareData);
    const newDate = comPareData.map((item) => {
      if (needCode === item.serial) {
        const { ...items } = item;
        items.backgroundColor = 'rgb(236, 151, 31)';
        return items;
      }
      return item;
    });
    const dataSource = newDate;
    const response = newDate;
    dispatch(onFormDataSourceChange({ formName, dataSource, response }));
    console.log('4444', newDate);
  }
);
// PCB单项报废
export const inputEnterShowData = params => (
  (dispatch) => {
    const inputVal = params;
    const inputValArray = inputVal.split('{');
    const serial = inputValArray[inputValArray.length - 1];
    const jsonData = { serial };
    const url = PCBIndividualDiscardAPI;
    const method = 'GET';
    const paramData = jsonData;
    const callback = (response) => {
      const dataSource = dataSourceTemplate ? dataSourceTemplate(response) : response;
      dispatch(onFormDataChange({
        formName: 'JigCheckGroupSettingAdd',
        name: 'serial',
        value: dataSource[0].serial ? dataSource[0].serial : '',
      }));
      dispatch(onFormDataChange({
        formName: 'JigCheckGroupSettingAdd',
        name: 'partNum',
        value: dataSource[0].partNum ? dataSource[0].partNum : '',
      }));

      dispatch(onFormDataChange({
        formName: 'JigCheckGroupSettingAdd',
        name: 'pcbCode',
        value: dataSource[0].pcbCode ? dataSource[0].pcbCode : '',
      }));

      dispatch(onFormDataChange({
        formName: 'JigCheckGroupSettingAdd',
        name: 'dateCode',
        value: dataSource[0].dateCode ? dataSource[0].dateCode : '',
      }));
      dispatch(onFormDataChange({
        formName: 'JigCheckGroupSettingAdd',
        name: 'subShelfSerial',
        value: dataSource[0].subShelfSerial ? dataSource[0].subShelfSerial : '',
      }));
      dispatch(onFormDataChange({
        formName: 'JigCheckGroupSettingAdd',
        name: 'amounts',
        value: dataSource[0].count ? dataSource[0].count : '',
      }));
    };
    const param = defaultPutParamTemplate(paramData);
    const error = (e) => {
      dispatch(inputEnterFail(e));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error,
    });
  }
);
