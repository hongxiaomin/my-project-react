/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { message } from 'antd';
import Immutable from 'immutable';
import {
  ONROWSELECTEDCHANGE,
  UPDATEDATASOURCE,
  TABLEDOUBLECLICK,
  CLEARROWSKEYS, CLEARROWID,
  DELETEDATAROW, UPDATAROW,
  ONSAVEPAGINATION,
  GETSAVEDATA,
  SAVEROWDATA, CLEARTABLETNPUTDATA,
  SAVEPTABLEROPS, ADDARRAYONELINE, SAVETABLETNPUTDATA
} from '../../constants/ActionTypes';
import Request from '../../utils/Request';
import { onModalUpdateProps } from '../../actions/ModalAction';
import { onFormDataSourceChange, onFormSubmit, onUpdateFormData } from '../../actions/FormAction';
import { modalReducerName } from '../../constants/ModalConfig';
import { formReducerName, formDataName, formPropsName, formDataSourceName, formOriDataSourceName } from '../../constants/Config';
import { tablePropsName, tableRedecurName, tableDataSourec, tableResponse } from '../../constants/TableConfig';
// 复选框变化action
export const onRowSelectedChange = createAction(ONROWSELECTEDCHANGE);
// 获取表格数据
export const getSelectedDate = props => (
  (dispatch, getState) => {
    // console.log(params);
    // Do something...
    const state = getState();
    const selectedData = state.getIn([tableRedecurName, props.name]).toJS();
    return selectedData;
  }
);
// 保存分页
export const onSavePagination = createAction(ONSAVEPAGINATION);
export const getTableDate = params => (
  (dispatch) => {
    // Do something...
    const selectedRowsLength = params.selectedRows.length - 1;
    const dataId = selectedRowsLength >= 0 ? params.selectedRows[selectedRowsLength].id : '';
    dispatch(onRowSelectedChange({ ...params, dataId }));
  }
);
// 更新dataSource
export const updateDataSource = createAction(UPDATEDATASOURCE);
// 清空rowkeys 需要的参数是 tableName
export const clearRowsKeys = createAction(CLEARROWSKEYS);
// 保存数据
export const getSaveData = createAction(GETSAVEDATA);
// 保存一行的数据
export const saveRowData = createAction(SAVEROWDATA);
// 保存props
export const saveTableProps = createAction(SAVEPTABLEROPS);
// 清除一行的id
export const clearRowId = createAction(CLEARROWID);
// 得到表格一行的id
// 获得一个单元格数据
export const upDataRow = createAction(UPDATAROW);
// 删除一行的数据
export const deleteDataRow = createAction(DELETEDATAROW);
// 增加一条数据 在新的组件中
export const addArrayOneLine = createAction(ADDARRAYONELINE);
// 双击table
export const tableDoubleClick = createAction(TABLEDOUBLECLICK);
// 表格中的input 保存数据
export const saveTableInputData = createAction(SAVETABLETNPUTDATA);
// 清除表格中input的数据
export const cleartableInputData = createAction(CLEARTABLETNPUTDATA);

export const getTableRowId = ({ record, props }) => (
  (dispatch, getState) => {
    const state = getState();
    const data = {};
    const needData = props ? props.needData : '';
    if (needData) {
      const rowId = record[props.needData];
      const rowNeedData = props.needData;
      const aliasName = props.aliasName || '';
      if (aliasName) {
        data[aliasName] = rowId;
      } else {
        data[rowNeedData] = rowId;
      }
    }
    // 点击一行实现页面跳转
    if (props.href) {
      const windowLocation = window.location;
      const href = windowLocation.href;
      const origin = windowLocation.origin;
      const propsHref = props.href ? props.href : '';
      let newHref = '';
      if (href.indexOf !== '-1') {
        newHref = `${origin}#/${propsHref}`;
      } else {
        newHref = `${origin}/${propsHref}`;
      }
      window.open(newHref, '_self');
    }

    // 双击
    const tableDouble = (props && props.isDouble) ? props.isDouble : '';
    let isDou = state.getIn([tableRedecurName, 'tableTowClick']);
    const paramData = props.needDataTemplate ? props.needDataTemplate(record) : data;
    const url = props.nextAction ? props.nextAction : props.action;
    const method = props.method;
    let tableName = props.name;
    const nextTableName = props.nextTableName || '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    if (record.page) {
      param.page = {
        size: record.pageSize,
        current: record.page,
      };
    }
    const naxtTable = state.getIn([tableRedecurName, nextTableName, tablePropsName]);
    const formName = naxtTable ? naxtTable.formName : props.formName;
    const onNeedData = typeof props.onNeedData === 'function' ? props.onNeedData : () => { };
    dispatch(saveRowData({ tableName, record }));
    const callback = (res) => {
      const response = props.responseFormatter ? props.responseFormatter(res) : res;
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      // dispatch(updateDataSource({ dataSource, tableName, response }));
      if (nextTableName) {
        if (formName) {
          // 有form的table联动
          dispatch(updateDataSource({ dataSource, response, tableName }));
        }
        tableName = nextTableName;
        dispatch(getSaveData({ tableName, response }));
        dispatch(updateDataSource({ dataSource, response, tableName }));
        if (!record.page) {
          dispatch(onSavePagination({ page: 1, pageSize: 10, tableName }));
        }
        if (dataSource.length === 0) {
          onNeedData();
        }
      } else {
        dispatch(updateDataSource({ dataSource, response, tableName }));
      }
    };
    // 双击一行
    if (tableDouble) {
      if (isDou) {
        // 这里是进行操作的
        const modalName = (props && props.modalName) ? props.modalName : '';
        const visibleNew = true;
        if (modalName) {
          dispatch(onModalUpdateProps({ modalReducerName, modalName, visibleNew }));
        }
        isDou = false;
        dispatch(tableDoubleClick(isDou));
      } else {
        isDou = true;
        dispatch(tableDoubleClick(isDou));
      }
    } else {
      Request({
        url,
        method,
        param,
        callback,
      });
    }
  }
);
// --------------------预加工排程-------------------
export const defaultDataSourceTemplatePre = ({ response, dispatch }) => {
  let dataSource;
  if (Object.prototype.toString.call(response) === '[object Object]') {
    dataSource = response.rows ? response.rows : response;
    const tableNameArray = ['name1', 'name2', 'name3', 'name4', 'name5'];
    dataSource.map((v, i) => {
      const tableName = tableNameArray[i];
      dataSource = [v];
      dispatch(updateDataSource({ dataSource, tableName }));
      return null;
    });
  }
};

// 表格初始化;
export const onTableInit = props => (
  (dispatch, getState) => {
    const url = props.action || '';
    const state = getState();
    const formName = props.formName ? props.formName : '';
    const method = props.method || 'GET';
    const tableName = props.name || '';
    const filters = props.filters || '';
    const paramData = props.param ? props.param : '';
    const tablePagition = state.getIn([tableRedecurName, tableName, 'page']) || 1;
    const tablepageSize = state.getIn([tableRedecurName, tableName, 'pageSize']) || 10;
    let param = props.paramTemplate ? props.paramTemplate(paramData, tablePagition, tablepageSize) : paramData;
    if (props.timeAlert === 'ok') {
      param = {
        ...paramData,
        page: { size: tablepageSize, current: tablePagition },
      };
    }
    if (props.page) {
      param.page = {
        size: props.pageSize,
        current: props.page,
      };
    }
    dispatch(saveTableProps({ tableName, props }));
    const callback = (response) => {
      if (props.showTitle) {
        defaultDataSourceTemplatePre({ response, props, dispatch });
      } else {
        const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
        dispatch(getSaveData({ tableName, response }));
        props.formName ? dispatch(onFormDataSourceChange({ formName, dataSource, response })) : dispatch(updateDataSource({ dataSource, tableName }));
      }
    };
    const isDouble = false;
    dispatch(tableDoubleClick(isDouble));
    // 是否初始化的时候进行发送请求
    if (!props.isGetDate) {
      Request({
        url,
        method,
        filters,
        param,
        callback,
      });
    }
  }
);
// 实时监控表格刷新
let timerFunc;
export const TableRefresh = props => (
  (dispatch, getState) => {
    dispatch(onTableInit(props));
    if (props.name === 'SMMPMCTable') {
      if (props.timeAlert) {
        if (props.needClear) {
          for (let i = 0; i <= timerFunc; i++) {
            clearInterval(i);
          }
        }
        timerFunc = setInterval(() => {
          const saveData = getState().getIn([tableRedecurName, props.name, tableResponse]);
          const pageSize = saveData ? saveData.pageSize : 10;
          const page = saveData ? saveData.pageCurrent : 1;
          const propsSave = { ...props, pageSize, page };
          dispatch(onTableInit(propsSave));
          const dataSource = [];
          const response = [];
          const tableName = 'SMMPMCTableDetail';
          dispatch(updateDataSource({ dataSource, tableName }));
          dispatch(getSaveData({ tableName, response }));
        }, 30000);
      } else {
        dispatch(onTableInit(props));
        for (let i = 0; i <= timerFunc; i++) {
          clearInterval(i);
        }
      }
    } else if (props.timeAlert === 'SMMWorkOrderSearch') {
      if (props.needClear) {
        for (let i = 0; i <= timerFunc; i++) {
          clearInterval(i);
        }
      }
      timerFunc = setInterval(() => {
        dispatch(onTableInit(props));
      }, 300000);
    } else if (props.timeAlert) {
      if (props.needClear) {
        for (let i = 0; i <= timerFunc; i++) {
          clearInterval(i);
        }
      }
      timerFunc = setInterval(() => {
        dispatch(onTableInit(props));
      }, 5000);
    } else {
      //  dispatch(onTableInit(props));
      for (let i = 0; i <= timerFunc; i++) {
        clearInterval(i);
      }
    }
  });
// 分页设置有form
// console.log(page, pageSize);// 当前页 每页多少数据
export const onPagiNation = ({ page, pageSize, props }) => (
  (dispatch, getState) => {
    const formName = props.formName ? props.formName : '';
    const tableName = props.name || '';
    dispatch(onSavePagination({ page, pageSize, tableName }));
    if (!props.isPaginLocal) {
      const formPropsData = getState().getIn([formReducerName, formName, formDataName]) ? getState().getIn([formReducerName, formName, formDataName]).toJS() : '';
      const formProps = props.noForm ?
        getState().getIn([tableRedecurName, tableName, tablePropsName])
        :
        getState().getIn([formReducerName, formName, formPropsName]);
      let url = formProps.action || '';
      const method = formProps.method || 'GET';
      const filters = formProps.filters || '';
      url = formProps.urlTemplate ? formProps.urlTemplate(formPropsData) : url;
      const paramData = {
        size: pageSize,
        current: page,
        ...formPropsData,
      };
      const param = formProps.paramTemplate ? formProps.paramTemplate(paramData) : paramData;
      const callback = (res) => {
        const response = props.responseFormatter ? props.responseFormatter(res) : res;
        const dataSource = formProps.dataSourceTemplate ?
          formProps.dataSourceTemplate(response)
          :
          response;
        dispatch(getSaveData({ tableName, response }));
        props.formName ?
          dispatch(onFormDataSourceChange({ formName, dataSource, response }))
          :
          dispatch(updateDataSource({ dataSource, tableName }));
      };
      Request({
        url,
        method,
        filters,
        param,
        callback,
      });
    }
  }
);
// 联动table的分页设置
export const onQueryPagiNation = params => (
  (dispatch, getState) => {
    const { page, pageSize, props } = params;
    let tableProps;
    if (props.tableName) {
      tableProps = getState().getIn([tableRedecurName, props.tableName, tablePropsName]);
    } else if (props.queryTableName) {
      tableProps = getState().getIn([tableRedecurName, props.queryTableName, tablePropsName]);
    } else {
      tableProps = props;
    }

    let data = {};
    if (props.tableName) {
      if (props.btnName) {
        const partName = tableProps.part;
        const tableRecord = getState().getIn([tableRedecurName, props.tableName, 'rowData']);
        tableRecord.part = partName;
        data = props.needDataTemplate ? props.needDataTemplate(tableRecord) : data;
      } else {
        const tableRecord = getState().getIn([tableRedecurName, props.tableName, 'rowData']);
        const rowId = tableRecord[tableProps.needData];
        const rowNeedData = tableProps.needData;
        data[rowNeedData] = rowId;
        data = props.needDataTemplate ? props.needDataTemplate(tableRecord) : data;
      }
    } else if (props.queryTableName) {
      const tableRecord = getState().getIn([tableRedecurName, props.queryTableName, 'rowData']);
      data = props.needDataTemplate ? props.needDataTemplate(tableRecord) : data;
    }
    const url = tableProps.nextAction ? tableProps.nextAction : tableProps.action;
    const method = tableProps.method || 'GET';
    let tableName = props.btnName ? props.tableName : props.name;
    dispatch(onSavePagination({ page, pageSize, tableName }));
    const paramData = {
      size: pageSize,
      current: page,
      ...data,
    };
    let param = tableProps.paramTemplate ? tableProps.paramTemplate(paramData) : paramData;
    if (props.param) {
      const dataParam = props.param;
      param = {
        ...dataParam,
        page: { size: pageSize, current: page },
      };
    }
    const callback = (response) => {
      dispatch(getSaveData({ tableName, response }));
      const dataSource = tableProps.dataSourceTemplate ? tableProps.dataSourceTemplate(response) : response;
      dispatch(updateDataSource({ dataSource, tableName }));
      if (props.tableName) {
        tableName = tableProps.name;
        dispatch(getSaveData({ tableName, response }));
        dispatch(updateDataSource({ dataSource, tableName }));
      }
    };
    // 不发请求 本地分页
    if (!props.isPaginLocal) {
      Request({
        url,
        method,
        param,
        callback,
      });
    }
  }
);
export const needTablefunc = params => (
  (dispatch, getState) => {
    const state = getState();
    const props = state.getIn([tableRedecurName, params.tableName, tablePropsName]);
    const formName = params.formName;
    const formData = state.getIn([formReducerName, params.formName, formDataName]).toJS();
    const param = props.paramTemplate ? props.paramTemplate(formData) : formData;
    const url = props.action;
    const method = props.method || 'GET';
    const filters = props.filters || '';
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(onFormDataSourceChange({ formName, dataSource, response }));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);
// table编辑
export const onTableButtonClick = params => (
  (dispatch, getState) => {
    const { index, props, type, record } = params;
    const state = getState();
    const formName = props.formName;
    const tableName = props.tableName;
    const needForName = props.needForName;
    const dataSource = [];
    let formDataName2;
    if (!props.noResponse) {
      formDataName2 = state.getIn([formReducerName, formName, formDataName]) ? state.getIn([formReducerName, formName, formDataName]).toJS() : '';
    }
    if (props.noResponse) {
      formDataName2 = state.getIn([tableRedecurName, tableName, tableDataSourec]) ? state.getIn([tableRedecurName, tableName, tableDataSourec]).toJS() : '';
    }

    const defaultFormDataSource = props.formName ?
      state.getIn([formReducerName, formName, formDataSourceName])
      :
      state.getIn([tableRedecurName, tableName, tableDataSourec]);
    const tablePagition = state.getIn([tableRedecurName, tableName, 'page']) || '';
    const tablepageSize = state.getIn([tableRedecurName, tableName, 'pageSize']) || '';
    const formDataSource = defaultFormDataSource && defaultFormDataSource[0].list
      ? defaultFormDataSource[0].list
      : defaultFormDataSource;
    const needDataSources = defaultFormDataSource && defaultFormDataSource[0].car_name
      ? defaultFormDataSource[0].car_name
      : '';
    formDataSource.map((v, i) => {
      if (i === index) {
        v.editable = true;
        if (needDataSources) {
          v.car_name = needDataSources;
        }
        if (type === 'Cancel') {
          v.editable = false;
          dataSource.push(v);
        } else if (type === 'Save') {
          v.editable = false;
          const allNewData = needForName ?
            state.getIn([formReducerName, needForName, formDataName]).toJS() : state.getIn([formReducerName, 'input', formDataName]).toJS();
          if (!props.noRequest) {
            const dataParam = {
              ...record,
              ...allNewData,
              ...formDataName2,
              tablePagition,
              tablepageSize,
            };
            let data;
            if (!props.isColorBtn) {
              data = props.paramTemplate ?
                props.paramTemplate({ dataParam, record })
                :
                dataParam;
            } else {
              const colorDate = state.getIn([formReducerName, 'input', 'newTableData']);
              data = props.paramTemplate ?
                props.paramTemplate({ dataParam, record, colorDate })
                :
                dataParam;
            }
            if (data === false) {
              return null;
            }
            const param = props.dataTemplate ?
              props.dataTemplate({ dataParam, record }) : dataParam;
            const url = props.action;
            const method = props.method ? props.method : 'GET';
            const filters = props.filters || '';
            const tableProps = state.getIn([tableRedecurName, props.tableName, tablePropsName]);
            const formProps = state.getIn([formReducerName, props.formName, formPropsName]);
            const callback = (response) => {
              const { code } = response;
              if (code === -1) {
                message.error(response.message, 3);
              }
              if (props.needSelectName) {
                const formProps2 = state.getIn([tableRedecurName, 'select', props.needSelectName]) ?
                  state.getIn([tableRedecurName, 'select', props.needSelectName])
                  : '';
                const tableProps2 = formProps2.props;
                dispatch(needTablefunc(tableProps2));
                return;
              }
              if (tableName === 'SMMWarehousePartition') {
                // Table修改后更新Table
                props.formName ? dispatch(onFormSubmit(formProps)) : dispatch(onTableInit(tableProps));
              }
            };
            props.dataTemplate ?
              Request({
                url,
                method,
                data,
                param,
                filters,
                callback,
              }) :
              Request({
                url,
                method,
                data,
                filters,
                callback,
              });
          }
          const allData = props.formName ?
            state.getIn([formReducerName, formName, formDataSourceName])
            :
            state.getIn([tableRedecurName, tableName, tableDataSourec]);
          allData.map((dat, j) => {
            if (j === index) {
              const a = Object.assign(dat, allNewData);
              dataSource.push(a);
            }
            return null;
          });
        } else {
          dataSource.push(v);
        }
      } else {
        v.editable = false;
        dataSource.push(v);
      }
      return null;
    });
    if (!props.noResponse) {
      const response = state.getIn([formReducerName, formName, formOriDataSourceName]);
      props.formName ?
        dispatch(onFormDataSourceChange({ formName, dataSource, response }))
        :
        dispatch(updateDataSource({ tableName, dataSource }));
    }
    if (props.noResponse) {
      const response = state.getIn([tableRedecurName, tableName, tableDataSourec]);
      dataSource.map((v) => {
        const qcItemId = parseInt(v.qcItemId);
        let qcItemlimitMax = parseInt(v.qcItemlimitMax);
        let qcItemTargetLine = parseInt(v.qcItemTargetLine);
        let qcItemLimitMin = parseInt(v.qcItemLimitMin);
        let qcItemTimes = parseInt(v.qcItemTimes);
        if (isNaN(qcItemlimitMax)) {
          qcItemlimitMax = '';
        }
        if (isNaN(qcItemTargetLine)) {
          qcItemTargetLine = '';
        }
        if (isNaN(qcItemLimitMin)) {
          qcItemLimitMin = '';
        }
        if (isNaN(qcItemTimes)) {
          qcItemTimes = '';
        }
        delete v.qcItemId;
        delete v.qcItemlimitMax;
        delete v.qcItemTargetLine;
        delete v.qcItemLimitMin;
        delete v.qcItemTimes;
        const a = { qcItemId };
        const b = { qcItemlimitMax };
        const c = { qcItemTargetLine };
        const d = { qcItemLimitMin };
        const e = { qcItemTimes };
        Object.assign(v, a, b, c, d, e);
      });
      props.tableName ?
        dispatch(updateDataSource({ tableName, dataSource }))
        :
        dispatch(onFormDataSourceChange({ formName, dataSource, response }));

      if (formName === 'JigCheckGroupSettingUpdate' && type === 'Save') {
        const defaultData = state.getIn([formReducerName, formName, formDataName]) ?
          state.getIn([formReducerName, formName, formDataName]).toJS()
          : '';
        const defaultDataSouce = state.getIn([formReducerName, formName, formDataSourceName]) ?
          state.getIn([formReducerName, formName, formDataSourceName])
          : '';
        const tempData = defaultData.qcGroupDets;
        let qcItemlimitMax = parseInt(defaultData.qcItemlimitMax);
        let qcItemTargetLine = parseInt(defaultData.qcItemTargetLine);
        let qcItemLimitMin = parseInt(defaultData.qcItemLimitMin);
        let qcItemTimes = parseInt(defaultData.qcItemTimes);
        if (isNaN(qcItemlimitMax)) {
          qcItemlimitMax = '';
        }
        if (isNaN(qcItemTargetLine)) {
          qcItemTargetLine = '';
        }
        if (isNaN(qcItemLimitMin)) {
          qcItemLimitMin = '';
        }
        if (isNaN(qcItemTimes)) {
          qcItemTimes = '';
        }
        tempData.map((v) => {
          if (tempData.indexOf(v) === index) {
            if (v.qcItemlimitMax !== qcItemlimitMax || v.qcItemTargetLine !== qcItemTargetLine || v.qcItemLimitMin !== qcItemLimitMin || v.qcItemTimes !== qcItemTimes) {
              if (v.flag === null) {
                v.flag = 2;
              }
              v.qcItemlimitMax = qcItemlimitMax;
              v.qcItemTargetLine = qcItemTargetLine;
              v.qcItemLimitMin = qcItemLimitMin;
              v.qcItemTimes = qcItemTimes;
              defaultDataSouce[index].id = index;
              if (isNaN(defaultDataSouce[index].qcItemlimitMax)) {
                qcItemlimitMax = '';
              }
              if (isNaN(defaultDataSouce[index].qcItemTargetLine)) {
                v.qcItemTargetLine = '';
              }
              if (isNaN(defaultDataSouce[index].qcItemLimitMin)) {
                v.qcItemLimitMin = '';
              }
              if (isNaN(defaultDataSouce[index].qcItemTimes)) {
                defaultDataSouce[index].qcItemTimes = '';
              }
            }
          }
        },

        );
      }
    }
  }
);
// 导出表格
export const onTableExcel = param => (
  (dispatch) => {
    console.log(2222);
    console.log(param);
  }
);
// 机台参数配置 页面中 增加一行数据
export const addArrayDataForInputList = params => (
  (dispatch, getState) => {
    const state = getState();
    const { tableName } = params;
    const oldArray = state.getIn([tableRedecurName, tableName, 'inputArray']) ? state.getIn([tableRedecurName, tableName, 'inputArray']) : [];
    oldArray.push('addNewDataForTable');
    const newArray = [...oldArray];
    dispatch(addArrayOneLine({
      tableName,
      newArray,
    }));
  }
);
// 表格的双击一行
export const onRowDoubleClickAction = params => (
  (dispatch, getState) => {
    const { props, index } = params;
    const state = getState();
    const { formName } = props;
    const formDataSource = state.getIn([formReducerName, formName, formDataSourceName]) || [];
    const newFormDataSource = [...formDataSource];
    newFormDataSource.map((v, i) => {
      if (i === index) {
        Object.assign(v, { editable: true });
      }
      return null;
    });
    dispatch(onFormDataSourceChange({ formName, dataSource: newFormDataSource }));
  }
);
// 弹出框 删除 input
export const deleteInput = params => (
  (dispatch, getState) => {
    console.log('params', params);
    const { props, v } = params;
    const state = getState();
    const formData = state.getIn([formReducerName, 'patternForm', formDataName]) ? state.getIn([formReducerName, 'patternForm', formDataName]).toJS() : '';
    const dat = state.getIn([tableRedecurName, props.tableName, 'inputArray']) || [];
    // const newDat = [...dat];
    const newDat = dat.filter((oneDat, index) => index !== v);
    // console.log('newDat', newDat);
    dispatch(addArrayOneLine({
      tableName: 'LineConfigurationTwoTable',
      newArray: newDat,
    }));
    Object.keys(formData).forEach((key) => {
      const dat = key.split(',')[0];
      const datNum = key.split(',')[1];
      if (dat === 'paramName' && Number(datNum) === v) {
        delete formData[key];
      }
    });
    const newFormData = Immutable.fromJS({ ...formData });
    dispatch(onUpdateFormData({
      formName: 'patternForm',
      newState: newFormData,
    }));
  }
);

// 双击图片
const onImgDoubleClick = params => (
  (dispatch, getState) => {
    console.log('params', params);
  }
);
