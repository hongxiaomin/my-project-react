/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import { message } from 'antd';
import { createAction } from 'redux-actions';
import { formReducerName, formPropsName, formDataSourceName, formDataName } from '../../constants/Config';
import { defaultRequestFilters, SERVER_IP_LION } from '../../constants/Settings';
import { tableRedecurName, tableSelectedRowKeys, tableResponse } from '../../constants/TableConfig';
import { onFormSubmit, onFormDataChange } from '../FormAction';
import { clearRowsKeys, clearRowId, updateDataSource, onTableInit, getTableRowId, deleteDataRow } from '../TableAction';
import { undoOperation, checkTray, settingPort } from '../SMMMaterialCarMergeOthersAction';

import { uploadMES } from '../SMMAutoUpFeederOthersAction';
import { ONBUTINIT } from '../../constants/ActionTypes';

import Request from '../../utils/Request';
import { onModalUpdateProps } from '../../actions/ModalAction';
import { onFormDataSourceChange } from '../../actions/InputAction';
import { onRoutingShowStateInitial, onRuleShowStateInitial } from '../../actions/UIAction';
import { getRoutingGraphData, dataSave, updateDataSave, cancelGraphOperator, deleteGraphOperator } from '../../actions/RoutingGraphAction';
import { getRuleGraphData, ruleDataSave, ruleUpdateDataSave, cancelRuleGraphOperator, deleteRuleGraphOperator } from '../../actions/RuleGraphAction';
import { graphXmlParseData, graphXmlupdateParseData } from '../../components/RoutingGraph/RoutingGraph';
import { ruleGraphXmlParseData, ruleGraphXmlupdateParseData } from '../../components/RuleGraph/RoutingGraph';

export const onButInit = createAction(ONBUTINIT);
const onActionFail = e => (
  () => message.error(e || 'submit failed!')
);
const showHide = props => (
  (dispatch) => {
    const data = props.mode === 'hide' ? { mode: 'Hide' } : { mode: 'Show' };
    const url = props.action ? props.action : '';
    const method = props.method ? props.method : 'PUT';
    const paramData = props.selectedId ? { id: props.selectedId } : {};
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    const filters = props.filters;
    const callback = (response) => {
      dispatch(clearRowsKeys(props.tableName));
      dispatch(onFormSubmit(props.formProps));
      if (Object.prototype.toString.call(response) === '[object Object]') {
        if (response.code === 0) {
          message.success(response && response.message ? response.message : 'submit success!', 3);
        } else {
          message.error(response && response.message ? response.message : 'submit fail!', 3);
        }
      } else if (Object.prototype.toString.call(response) === '[object String]') {
        if (JSON.parse(response).code === 0) {
          message.success(response && response.message ? response.message : 'submit success!', 3);
        } else {
          message.error(response && response.message ? response.message : 'submit fail!', 3);
        }
      } else {
        message.error('undefined fail!', 3);
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
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
  });
const submit = props => (
  (dispatch, getState) => {
    const state = getState();
    const formSubmitDate = state.getIn([formReducerName, props.formName, formDataSourceName]);
    const data = props.dataTemplate ? props.dataTemplate(formSubmitDate) : formSubmitDate;
    const url = props.action ? props.action : '';
    const method = props.method ? props.method : 'POST';
    const filters = props.filters ? props.filters : defaultRequestFilters;
    const callback = (response) => {
      if (!response.code) {
        message.destroy();
        message.success(response && response.message ? response.message : 'submit success!', 3);
        if (props.isCheck) {
          const modalName = 'PCBBackUse';
          const visibleNew = false;
          dispatch(onModalUpdateProps({ modalName, visibleNew }));
          const formName = 'PCBDiscardHistoryForm';
          const formProps = state.getIn([formReducerName, formName, 'props']);
          const refreshTableName = 'PCBDiscardHistory';
          dispatch(clearRowsKeys(refreshTableName));
          dispatch(clearRowId(refreshTableName));
          dispatch(onFormSubmit(formProps));
        }
      } else {
        message.destroy();
        message.error(response && response.message ? response.message : 'submit success!', 3);
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    if (props.isCheck) {
      let isAllCheck = true;
      formSubmitDate.map((item) => {
        const bgColor = item.backgroundColor;
        if (!bgColor) {
          isAllCheck = false;
        }
        return null;
      });
      if (isAllCheck) {
        message.destroy();
        message.loading('submiting...', 0);
        Request({
          url,
          method,
          data,
          filters,
          callback,
          error,
        });
      } else {
        message.error('请全部校验通过后再提交', 3);
      }
    } else {
      message.destroy();
      message.loading('submiting...', 0);
      Request({
        url,
        method,
        data,
        filters,
        callback,
        error,
      });
    }
  });
const dataRegroup = ({ rowData, paramData, InfType, dataTemplate, selectedData }) => {
  if (InfType === 'BOM' || !InfType) {
    const nowData = !selectedData ? { ...rowData, ...paramData } : { ...rowData, ...selectedData };
    return dataTemplate ? dataTemplate(nowData) : nowData;
  }
  return rowData;
};
const paramRegroup = ({ paramData, InfType, paramTemplate }) => {
  if (InfType === 'BOM' || !InfType) {
    return paramTemplate ? paramTemplate(paramData) : {};
  }
  return paramTemplate ? paramTemplate(paramData) : paramData;
};
const messageFilter = ({ messageTemplate, response, defaultMessage }) => {
  if (messageTemplate) {
    return response ? messageTemplate(response) : defaultMessage;
  }
  return response && response.message ? response.message : defaultMessage;
};
const update = props => (
  (dispatch, getState) => {
    const state = getState();
    const formdata = state.getIn([formReducerName, props.formName, formDataName]);
    const rowData = formdata ? formdata.toJS() : {};
    const url = props.action ? props.action : '';
    const method = props && props.method ? props.method : 'PUT';
    const paramData = props.selectedId ? { id: props.selectedId } : {};
    const param = paramRegroup({ rowData, paramData, ...props });
    const data = dataRegroup({ rowData, paramData, ...props });
    const filters = props.filters;
    message.destroy();
    message.loading('updating...', 0);
    const callback = (response) => {
      if (response.code === 0) {
        message.destroy();
        const showMessage = messageFilter({ ...props, response, defaultMessage: 'update successed' });
        message.success(showMessage, 3);
        dispatch(clearRowsKeys(props.tableName));
        if (props.noFormTable) {
          const tableName = props.tableName;
          const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) :
            response;
          dispatch(updateDataSource({ dataSource, response, tableName }));
        } else {
          dispatch(onFormSubmit(props.formProps));
        }
      } else {
        message.destroy();
        const showMessage = messageFilter({ ...props, response, defaultMessage: 'update failed' });
        message.error(showMessage, 3);
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
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
  });
const onloadByhand = params => (
  (dispatch, getState) => {
    const state = getState();
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const formName = params.formName || '';
    const props = state.getIn([formReducerName, formName, formPropsName]) ?
      state.getIn([formReducerName, formName, formPropsName]) : '';
    const paramData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS() : '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    const callback = (response) => {
      dispatch(onFormSubmit(props));
      if (response.code === 0) {
        message.destroy();
        const showMessage = messageFilter({ ...params, response, defaultMessage: 'update successed' });
        message.success(showMessage, 3);
      } else {
        message.destroy();
        const showMessage = messageFilter({ ...params, response, defaultMessage: 'update failed' });
        message.error(showMessage, 3);
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
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
const loadRefresh = params => (
  (dispatch, getState) => {
    const state = getState();
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const formName = params.formName || '';
    const props = state.getIn([formReducerName, formName, formPropsName]) ?
      state.getIn([formReducerName, formName, formPropsName]) : '';
    const paramData = state.getIn([formReducerName, formName, formDataSourceName]) ?
      state.getIn([formReducerName, formName, formDataSourceName]) : '';
    const {
          id,
      workOrder,
      side,
      machineType,
      machineName,
      lineNumber } = paramData[params.index];
    const getData = {
      id,
      workOrder,
      side,
      machineType,
      machineName,
      lineNum: lineNumber,
    };
    const param = params.paramTemplate ? params.paramTemplate(getData) : getData;
    const callback = (response) => {
      dispatch(onFormSubmit(props));
      if (response.code === 0) {
        message.destroy();
        const showMessage = messageFilter({ ...params, response, defaultMessage: 'update successed' });
        message.success(showMessage, 3);
      } else {
        message.destroy();
        const showMessage = messageFilter({ ...params, response, defaultMessage: 'update failed' });
        message.error(showMessage, 3);
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
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
const deleteData = params => (
  (dispatch, getState) => {
    const state = getState();
    const { record } = params;
    const { id } = record;
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const Selectprops = state.getIn([tableRedecurName, 'select', params.needSelectName]);
    const props = Selectprops.props;
    const data = params.dataTemplate ? params.dataTemplate({ ids: id }) : id;
    const callback = () => {
      dispatch(clearRowsKeys(params.tableName));
      dispatch(onFormSubmit(props));
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
      error,
    });
  }
);
const cellLibMngDel = params => (
  (dispatch, getState) => {
    const state = getState();
    const tableName = params.tableName;
    let tableData = state.getIn([tableRedecurName, tableName, 'selectedRowKeys']) ?
      state.getIn([tableRedecurName, tableName, 'selectedRowKeys']) : [];
    if (tableData.length === 0) {
      message.error('请至少选择一条数据!', 3);
      return;
    }
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    let Selectprops = '';
    let props = '';
    if (params.needSelectName) {
      Selectprops = state.getIn([tableRedecurName, 'select', params.needSelectName]);
      props = Selectprops.props;
    } else {
      props = state.getIn([tableRedecurName, tableName, 'props']);
      tableData = state.getIn([tableRedecurName, tableName, 'selectedRows']);
    }
    const data = params.dataTemplate ? params.dataTemplate(tableData) : tableData;
    const callback = () => {
      dispatch(clearRowsKeys(tableName));
      params.needSelectName ? dispatch(onFormSubmit(props)) : dispatch(onTableInit(props));
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
      error,
    });
  }
);
const deleteAllData = params => (
  (dispatch, getState) => {
    const state = getState();
    const tableName = params.tableName;
    let tableData = state.getIn([tableRedecurName, tableName, 'selectedRowKeys']) ?
      state.getIn([tableRedecurName, tableName, 'selectedRowKeys']) : [];
    if (tableData.length === 0) {
      message.error('请至少选择一条数据!', 3);
      return;
    }
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    let Selectprops = '';
    let props = '';
    if (params.needSelectName) {
      Selectprops = state.getIn([tableRedecurName, 'select', params.needSelectName]);
      props = Selectprops.props;
    } else {
      props = state.getIn([tableRedecurName, tableName, 'props']);
      tableData = state.getIn([tableRedecurName, tableName, 'selectedRows']);
    }
    const data = params.dataTemplate ? params.dataTemplate(tableData) : tableData;
    const callback = (respone) => {
      if (respone.code === -1) {
        message.destroy();
        message.error(respone.message, 3);
      } else {
        message.destroy();
        message.success(respone.message, 3);
        dispatch(clearRowsKeys(tableName));
        params.needSelectName ? dispatch(onFormSubmit(props)) : dispatch(onTableInit(props));
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
      error,
    });
  }
);
const deleteOneData = params => (
  (dispatch, getState) => {
    const { index } = params;
    const state = getState();
    const tableName = params.tableName || '';
    const rowKeys = state.getIn([tableRedecurName, tableName, 'selectedRowKeys']) ?
      state.getIn([tableRedecurName, tableName, 'selectedRowKeys']) : '';
    const tableProps = state.getIn([tableRedecurName, tableName, 'props']) ?
      state.getIn([tableRedecurName, tableName, 'props']) : '';
    let flag = false;
    let arrIndex = '';
    rowKeys.map((v, i) => {
      if (index === v) {
        arrIndex = i;
        return flag = true;
      }
      return null;
    });
    if (!flag) {
      message.error('请正确选择相应的一条数据!', 3);
      return null;
    }
    const tableRowData = state.getIn([tableRedecurName, tableName, 'selectedRows']) ?
      state.getIn([tableRedecurName, tableName, 'selectedRows']) : '';
    const { lineNum } = tableRowData[arrIndex];
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const data = params.dataTemplate ? params.dataTemplate({ lineNum }) : '';
    const callback = (response) => {
      if (response.code === 0) {
        message.destroy();
        const showMessage = messageFilter({ ...params, response, defaultMessage: 'update successed' });
        message.success(showMessage, 3);
        dispatch(clearRowsKeys(tableName));
        dispatch(onTableInit(tableProps));
      } else {
        message.destroy();
        message.error(response.message, 3);
      }
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
    });
  }
);
// ------退料扣账------
const returnDebitData = params => (
  (dispatch, getState) => {
    const state = getState();
    const defaultTableData = state.getIn([tableRedecurName, params.defaultTableName, 'dataSource']) ?
      state.getIn([tableRedecurName, params.defaultTableName, 'dataSource']) : '';
    const tableData = state.getIn([tableRedecurName, params.tableName, 'selectedRows']) ?
      state.getIn([tableRedecurName, params.tableName, 'selectedRows']) : '';
    const tableProps = state.getIn([tableRedecurName, params.tableName, 'props']) ?
      state.getIn([tableRedecurName, params.tableName, 'props']) : '';
    const dataParam = {
      defaultTableData,
      tableData,
      tableProps,
    };
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const tableName = tableProps.tableName;

    const data = params.dataTemplate ? params.dataTemplate(dataParam) : '';
    const callback = (response) => {
      if (response.code === 0) {
        message.destroy();
        const dataSource = response.rows;
        dispatch(updateDataSource({ tableName, dataSource }));
        const showMessage = messageFilter({ ...params, response, defaultMessage: 'update successed' });
        message.success(showMessage, 3);
      }
    };

    Request({
      url,
      method,
      data,
      filters,
      callback,
    });
  }
);
const onSaveData = params => (
  (dispatch, getState) => {
    const state = getState();
    const formName = params.formName;
    const formDate = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS() : '';
    const data = params.dataTemplate ? params.dataTemplate(formDate) : '';
    if (data === false) {
      return false;
    }
    const callback = (response) => {
      if (response.code === -1) {
        message.error(response.message, 6);
      } else {
        message.success(response.message, 3);
      }
    };
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    Request({
      url,
      method,
      data,
      filters,
      callback,
    });
  }

);
const unbindOrResetAcFeeder = props => (
  (dispatch, getState) => {
    const state = getState();
    const tableData = state.getIn([tableRedecurName, props.tableName, 'selectedRows']) ?
      state.getIn([tableRedecurName, props.tableName, 'selectedRows']) : '';
    let workOrder = '';
    let side = '';
    let feederId = '';
    if (tableData.length) {
      workOrder = tableData[0].work_order ? tableData[0].work_order : '';
      side = tableData[0].side ? tableData[0].side : '';
      feederId = tableData[0].feeder_id ? tableData[0].feeder_id : '';
      const saveData = state.getIn([tableRedecurName, props.tableName, tableResponse]);
      const callback = (response) => {
        if (response.code === -1) {
          const data = {};
          dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response }));
        } else {
          const data = {};
          dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response }));
        }
      };
      let data = {};
      if (props.noNeedWorkOrder) {
        data = {
          value: JSON.stringify([{
            feeder_id: feederId,
          }]),
        };
      } else {
        data = {
          value: JSON.stringify([{
            work_order: workOrder,
            side,
            feeder_id: feederId,
          }]),
        };
      }
      const param = props.paramTemplate ? props.paramTemplate(tableData) : tableData;
      const filters = props.filters;
      const url = props.action ? props.action : '';
      const method = props && props.method ? props.method : 'POST';
      const error = (e) => {
        dispatch(onActionFail(e));
      };
      Request({
        url,
        method,
        data,
        param,
        filters,
        callback,
        error,
      });
    } else {
      const data = {};
      const response = { message: '请选择具体的某一行，在进行操作' };
      dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response }));
    }
  }
);
const unbindOrResetAcWork = props => (
  (dispatch, getState) => {
    const state = getState();
    const tableData = state.getIn([formReducerName, props.formName, 'data']) ?
      state.getIn([formReducerName, props.formName, 'data']).toJS() : '';
    const workOrder = tableData.work_order;
    const side = tableData.side;
    const saveData = state.getIn([tableRedecurName, props.tableName, tableResponse]);
    const callback = (response) => {
      // if (!props.fromTable) {
      //   const recordData = state.getIn([tableRedecurName, props.needTableName, 'rowData']);
      //   const recordNew = { ...recordData, pageSize, page };
      //   const tableProps = state.getIn([tableRedecurName, props.needTableName, 'props']) ?
      // state.getIn([tableRedecurName, props.needTableName, 'props']) : '';
      //   dispatch(getTableRowId({ record: recordNew, props: tableProps }));
      // } else {
      //   const formName = props.formName;
      //   const formPropsOld = state.getIn([formReducerName, formName, 'props']);
      //   const formProps = { ...formPropsOld, pageSize, page };
      //   const refreshTableName = props.tableName;
      //   dispatch(clearRowId(refreshTableName));
      //   dispatch(onFormSubmit(formProps));
      // }
      // dispatch(clearRowsKeys(props.tableName));
      if (response.code === -1) {
        const data = {};
        dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response }));
      } else {
        const data = {};
        dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response }));
      }
    };
    const data = {
      value: JSON.stringify([{
        work_order: workOrder,
        side,
      }]),
    };
    const filters = props.filters;
    const url = props.action ? props.action : '';
    const method = props && props.method ? props.method : 'POST';
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    if (!workOrder) {
      const data = {};
      const response = { message: '请输入工单号，再次进行相关操作' };
      dispatch(onFormDataSourceChange({ formName: 'SMMUnbindFeeder', dataSource: data, response }));
    } else {
      Request({
        url,
        method,
        data,
        filters,
        callback,
        error,
      });
    }
  }
);
const onTurnLight = props => (
  (dispatch, getState) => {
    const state = getState();
    const tableData = state.getIn([tableRedecurName, props.tableName, 'selectedRows']) ?
      state.getIn([tableRedecurName, props.tableName, 'selectedRows']) : '';
    const saveData = state.getIn([tableRedecurName, props.tableName, tableResponse]);
    const pageSize = saveData ? saveData.pageSize : 10;
    const page = saveData ? saveData.pageCurrent : 1;
    const callback = (response) => {
      if (!props.fromTable) {
        const recordData = state.getIn([tableRedecurName, props.needTableName, 'rowData']);
        const recordNew = { ...recordData, pageSize, page };
        const tableProps = state.getIn([tableRedecurName, props.needTableName, 'props']) ?
          state.getIn([tableRedecurName, props.needTableName, 'props']) : '';
        dispatch(getTableRowId({ record: recordNew, props: tableProps }));
      } else {
        const formName = props.formName;
        const formPropsOld = state.getIn([formReducerName, formName, 'props']);
        const formProps = { ...formPropsOld, pageSize, page };
        const refreshTableName = props.tableName;
        dispatch(clearRowId(refreshTableName));
        dispatch(onFormSubmit(formProps));
      }
      dispatch(clearRowsKeys(props.tableName));
      if (response.code === -1) {
        message.error(response.message, 6);
      } else {
        message.success(response.message, 3);
      }
    };
    const param = props.paramTemplate ? props.paramTemplate(tableData) : tableData;
    const filters = props.filters;
    const url = props.action ? props.action : '';
    const method = props && props.method ? props.method : 'GET';
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error,
    });
  });

const onCheckDataDel = props => (
  (dispatch, getState) => {
    const state = getState();
    const formName = props.formName;
    const tableName = props.tableName;
    const tableData = state.getIn([tableRedecurName, props.tableName, 'selectedRows']);
    const param = props.dataTemplate ? props.dataTemplate(tableData) : tableData;
    const filters = props.filters;
    const url = props.action ? props.action : '';
    const method = props && props.method ? props.method : 'GET';
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    const callback = (response) => {
      if (response.code === -1) {
        message.error(response.message, 6);
      } else {
        message.success(response.message, 3);
      }
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) :
        response;
      dispatch(clearRowsKeys(tableName));
      props.formName ? dispatch(onFormDataSourceChange({ formName, dataSource, response })) :
        dispatch(updateDataSource({ dataSource, response, tableName }));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error,
    });
  });

// 治工具管理设定
let targetDataSource = [];
let targetDataSourceCmp = [];
const getDefaultData = props => (
  (dispatch, getState) => {
    const formName = props.formName;
    const state = getState();
    const defaultDataSource = state.getIn([formReducerName, formName, formDataSourceName]) ?
      state.getIn([formReducerName, formName, formDataSourceName])
      : '';
    defaultDataSource.map((v) => {
      if (v.jigTypeId) {
        targetDataSourceCmp.push(v.jigTypeId);
      } else if (v.qcItemId) {
        targetDataSourceCmp.push(v.qcItemId);
      } else if (v.maintItemId) {
        targetDataSourceCmp.push(v.maintItemId);
      } else if (v.scItemId) {
        targetDataSourceCmp.push(v.scItemId);
      }
      targetDataSource.push(v);
    });
  }
);

// 治工具类型群组设定
// 获取下拉框数据
const getTypeSelectedData = props => (
  (dispatch, getState) => {
    const state = getState();
    const formName = props.formName;
    const defaultSelectedData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    const defaultData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    dispatch(getDefaultData(props));
    const targetData = parseInt(defaultSelectedData.jigTypeId);
    if (targetData === -1) {
      message.destroy();
      message.error('请先选择治具类型！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else if (targetDataSourceCmp.indexOf(targetData) !== -1) {
      message.destroy();
      message.error('已存在此治具类型,请重新选择治具类型！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else {
      targetDataSourceCmp.push(targetData);
      if (formName === 'JigTypeGroupSettingUpdate') {
        const tempData = defaultData.jigGroupDtls;
        tempData.push({ jigTypeId: targetData, flag: 1 });
      }
      targetDataSource.push({ jigTypeId: targetData });
      const dataSource = targetDataSource;
      dispatch(onFormDataSourceChange({ formName, dataSource }));
      targetDataSource = [];
      targetDataSourceCmp = [];
    }
  }
);

// 治工具检验群组设定
// 获取下拉框数据
const getCheckSelectedData = props => (
  (dispatch, getState) => {
    const state = getState();
    const formName = props.formName;
    const defaultSelectedData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    const defaultData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    const defaultDataSource = state.getIn([formReducerName, formName, formDataSourceName]) ?
     state.getIn([formReducerName, formName, formDataSourceName])
     : '';
    dispatch(getDefaultData(props));
    const targetData = parseInt(defaultSelectedData.qcItem);
    const targetDataMax = defaultSelectedData.limitMax;
    const targetDataLine = defaultSelectedData.targetLine;
    const targetDataMin = defaultSelectedData.limitMin;
    const targetDatatimes = defaultSelectedData.times;
    const targetDataEditable = false;
    const filters = [null, '', undefined, 'Invalid date', '-1', 'null', 'undefined', 'NAN'];
    if (targetData === -1) {
      message.destroy();
      message.error('请先选择检测项目！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else if (targetDataSourceCmp.indexOf(targetData) !== -1) {
      message.destroy();
      message.error('已存在此检测项目,请重新选择检测项目！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else if ((filters.indexOf(targetDataMax) !== -1) || (filters.indexOf(targetDataLine) !== -1) || (filters.indexOf(targetDataMin) !== -1) || (filters.indexOf(targetDatatimes)) !== -1) {
      message.destroy();
      message.error('请输入检测项目的具体参数！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else {
      if (defaultDataSource.code) {
        const qcGroupDets = defaultData.qcGroupDets;

        if (qcGroupDets) {
          qcGroupDets.map((v) => {
            if (isNaN(v.qcItemlimitMax) || isNaN(v.qcItemTargetLine) || isNaN(v.qcItemLimitMin) || isNaN(v.qcItemTimes)) {
              qcGroupDets.splice(qcGroupDets.indexOf(v), 1);
            }
            if ((v.qcItemlimitMax === '') || (v.qcItemTargetLine === '') || (v.qcItemLimitMin === '') || (v.qcItemTimes === '')) {
              qcGroupDets.splice(qcGroupDets.indexOf(v), 1);
            }
          });
          dispatch(onFormDataChange({
            formName: props.formName ? props.formName : '',
            name: 'qcGroupDets',
            value: qcGroupDets,
          }));
        }
      }
      targetDataSourceCmp.push(targetData);
      if (formName === 'JigCheckGroupSettingUpdate') {
        const tempData = defaultData.qcGroupDets;
        tempData.push({ qcItemId: targetData, qcItemlimitMax: targetDataMax, qcItemTargetLine: targetDataLine, qcItemLimitMin: targetDataMin, qcItemTimes: targetDatatimes, flag: 1 });
      }
      targetDataSource.push({ qcItemId: targetData, qcItemlimitMax: targetDataMax, qcItemTargetLine: targetDataLine, qcItemLimitMin: targetDataMin, qcItemTimes: targetDatatimes, editable: targetDataEditable });
      const dataSource = targetDataSource;
      dispatch(onFormDataSourceChange({ formName, dataSource }));
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : '',
        name: 'limitMax',
        value: '',
      }));
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : '',
        name: 'targetLine',
        value: '',
      }));
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : '',
        name: 'limitMin',
        value: '',
      }));
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : '',
        name: 'times',
        value: '',
      }));
      targetDataSource = [];
      targetDataSourceCmp = [];
    }
  }
);

// 删除table数据行（群组、检验、保养、报废）
const delTableData = props => (
  (dispatch, getState) => {
    // debugger
    const state = getState();
    const formName = props.formName;
    const tableName = props.tableName;
    const rowKeys = state.getIn([tableRedecurName, tableName, tableSelectedRowKeys]) ?
      state.getIn([tableRedecurName, tableName, tableSelectedRowKeys]) :
      '';
    const tableData = state.getIn([formReducerName, formName, formDataSourceName]) ?
      state.getIn([formReducerName, formName, formDataSourceName])
      : '';
    const defaultData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    let index = null;
    rowKeys.map((rowKey) => {
      if (formName === 'JigCheckGroupSettingUpdate') {
        const tempData = defaultData.qcGroupDets;
        tempData.map((v) => {
          if (typeof rowKey === 'string' && v.flag !== null) {
            index = tempData.indexOf(v);
            v.flag = 3;
          }
          if (typeof rowKey !== 'string' && v.qcItemId === tableData[rowKey].qcItemId) {
            v.flag = 3;
          }
        });
      }
      if (formName === 'JigTypeGroupSettingUpdate') {
        const tempData = defaultData.jigGroupDtls;
        tempData.map((v) => {
          if (v.jigTypeId === tableData[rowKey].jigTypeId) {
            v.flag = 3;
          }
        });
      }
      if (formName === 'JigMaintainGroupSettingUpdate') {
        const tempData = defaultData.maintGroupDtls;
        tempData.map((v) => {
          if (v.maintItemId === tableData[rowKey].maintItemId) {
            v.flag = 3;
          }
        });
      }
      if (formName === 'JigScrapGroupSettingUpdate') {
        const tempData = defaultData.scrapGroupDtls;
        tempData.map((v) => {
          if (v.scItemId === tableData[rowKey].scItemId) {
            v.flag = 3;
          }
        });
      }
      delete tableData[rowKey];
      delete tableData[index];
    });
    const length = tableData.length;
    const newTableData = [];
    for (let i = 0; i < length; i++) {
      if (tableData[i] === undefined) {
        newTableData.push('');
      } else {
        newTableData.push(tableData[i]);
      }
    }
    const filterTableData = newTableData.filter(v => v !== '');
    const dataSource = filterTableData;
    dispatch(onFormDataSourceChange({ formName, dataSource }));
    dispatch(clearRowsKeys(tableName));
  }
);

// 治工具保养群组设定
// 获取下拉框数据
const getMaintainSelectedData = props => (
  (dispatch, getState) => {
    const state = getState();
    const formName = props.formName;
    const defaultSelectedData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    const defaultData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    dispatch(getDefaultData(props));
    const targetData = parseInt(defaultSelectedData.maintItemId);
    if (targetData === -1) {
      message.destroy();
      message.error('请先选择保养项目！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else if (targetDataSourceCmp.indexOf(targetData) !== -1) {
      message.destroy();
      message.error('已存在此保养项目,请重新选择保养项目！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else {
      targetDataSourceCmp.push(targetData);
      if (formName === 'JigMaintainGroupSettingUpdate') {
        const tempData = defaultData.maintGroupDtls;
        tempData.push({ maintItemId: targetData, flag: 1 });
      }
      targetDataSource.push({ maintItemId: targetData });
      const dataSource = targetDataSource;
      dispatch(onFormDataSourceChange({ formName, dataSource }));
      targetDataSource = [];
      targetDataSourceCmp = [];
    }
  }
);

// 治工具报废群组设定
// 获取下拉框数据
const getScrapSelectedData = props => (
  (dispatch, getState) => {
    const state = getState();
    const formName = props.formName;
    const defaultSelectedData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    const defaultData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS()
      : '';
    dispatch(getDefaultData(props));
    const targetData = parseInt(defaultSelectedData.scItemId);
    if (targetData === -1) {
      message.destroy();
      message.error('请先选择报废项目！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else if (targetDataSourceCmp.indexOf(targetData) !== -1) {
      message.destroy();
      message.error('已存在此报废项目,请重新选择报废项目！', 3);
      targetDataSource = [];
      targetDataSourceCmp = [];
    } else {
      targetDataSourceCmp.push(targetData);
      if (formName === 'JigScrapGroupSettingUpdate') {
        const tempData = defaultData.scrapGroupDtls;
        tempData.push({ scItemId: targetData, flag: 1 });
      }
      targetDataSource.push({ scItemId: targetData });
      const dataSource = targetDataSource;
      dispatch(onFormDataSourceChange({ formName, dataSource }));
      targetDataSource = [];
      targetDataSourceCmp = [];
    }
  }
);
// // 单个换线
// const LineOneStratChange = params => (
//   (dispatch, getState) => {
//     const { arrayOne } = params;
//     const state = getState();
//     const dat = state.getIn([formReducerName, 'LineChangeInformationForm', formDataSourceName]) ?
//     state.getIn([formReducerName, 'LineChangeInformationForm', formDataSourceName]) : [];
//     const newArray = JSON.parse(JSON.stringify(dat));
//     newArray.map((v) => {
//       if (v.machineType === arrayOne) {
//         Object.assign(v, { status: 3 });
//       }
//       return null;
//     });
//     dispatch(onFormDataSourceChange({
//       formName: 'LineChangeInformationForm',
//       dataSource: newArray,
//     }));
//   }
// );

// EQMEqReg
const searchData = props => (
  (dispatch, getState) => {
    const state = getState();
    const formName = props.formName;
    const needData = state.getIn([formReducerName, formName, formDataName]) ?
    state.getIn([formReducerName, formName, formDataName]).toJS() : [];
    const paramData = { lineId: needData.lineId,
      sectionId: needData.sectionId,
      groupId: needData.groupId,
      stationId: needData.stationId };
    const url = props.action;
    const method = props.method ? props.method : 'GET';
    const data = '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : '';
    const filters = defaultRequestFilters;
    const callback = (response) => {
      let id = '';
      const result = response.rows;
      const length = result.length;
      const lineId = param.condition.lineId;
      const sectionId = param.condition.sectionId;
      const groupId = param.condition.groupId;
      const stationId = param.condition.stationId;
      if (length && length === 1 && lineId && sectionId && groupId && stationId) {
        id = result[0].id;
      }
      dispatch(onFormDataChange(
        { formName: props.formName ? props.formName : '',
          name: props.name,
          value: id,
        }));
    };
    const error = (e) => {
      dispatch(onActionFail(e));
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
  // 设备报修 EQMFaultRepMng
const FaultRepMngSubmit = props => (
      (dispatch, getState) => {
        const { formName } = props;
        const state = getState();
        const formProps = state.getIn([formReducerName, formName]) ?
        state.getIn([formReducerName, formName]).toJS() : {};
        const method = props.method ? props.method : 'POST';
        const url = props.action ? props.action : '';
        const data = props.dataTemplate ? props.dataTemplate(formProps) : '';
        const filters = props.filters ? props.filters : defaultRequestFilters;
        message.destroy();
        message.loading('submiting...', 0);
        const callback = (response) => {
          if (!response.code) {
            message.destroy();
            message.success(response && response.message ? response.message : 'submit success!', 3);
            dispatch(onFormDataSourceChange({ formName, dataSource: [], response: {} }));
          } else {
            message.destroy();
            message.error(response && response.message ? response.message : 'submit error!', 3);
          }
        };
        const error = (e) => {
          dispatch(onActionFail(e));
        };
        Request({
          url,
          method,
          data,
          callback,
          filters,
          error,
        });
      });
// 单个换线的回调函数
const LineOneStratChangeCallBack = params => (
  (dispatch, getState) => {
    let timer2 = '';
    const formData = getState().getIn([formReducerName, 'LineChangeInformationForm', formDataName]) ?
    getState().getIn([formReducerName, 'LineChangeInformationForm', formDataName]).toJS() : [];
    const { combinationNumber, side, line } = formData;
    const param = {
      condition: [{
        combinationNumber,
        side,
        line,
      }],
    };
    const url = `${SERVER_IP_LION}/scm/monitor`;
    const method = 'GET';
    const callback = (response) => {
      // console.log('response', response);
      const { rows } = response;
      if (rows && rows.length > 1) {
        dispatch(onFormDataSourceChange({ formName: 'LineChangeInformationForm', dataSource: rows, response }));
        rows.map((v) => {
          if (v.id === params) {
            if (v.status === 4 || v.status === 3) {
              // for (let i = 0; i <= timer2; i++) {
              //   clearInterval(i);
              // }
              clearInterval(timer2);
            }
          }
          return null;
        });
      }
    };
    timer2 = setInterval(() => {
      Request({
        url,
        method,
        param,
        callback,
      });
      // const hrefUrl = window.location.href;
      // const pathName = hrefUrl.split('#')[1];
      // if (pathName !== '/LineChangeInformation') {
      //   for (let index = 0; index <= timer2; index++) {
      //     clearInterval(timer2);
      //   }
      // }
    }, 1000);
  }
);
// 单个换线
const LineOneStratChange = params => (
  (dispatch, getState) => {
    const { arrayOne } = params;
    const state = getState();
    const dat = state.getIn([formReducerName, 'LineChangeInformationForm', formDataSourceName]) ?
    state.getIn([formReducerName, 'LineChangeInformationForm', formDataSourceName]) : [];
    const newArray = JSON.parse(JSON.stringify(dat));
    const pqmLineConfigId = newArray[0].pqmLineConfigId;
    const url = `${SERVER_IP_LION}/scm/monitor/manual`;
    const method = 'GET';
    const param = {
      condition: [{
        id: arrayOne,
        pqmLineConfigId,
      }],
    };
    dispatch(LineOneStratChangeCallBack(arrayOne));
    const callback = (respone) => {
      const { code } = respone;
      if (code === -1) {
        message.destroy();
        message.error(respone.message, 5);
      }
    };
    Request({
      url,
      method,
      param,
      callback,
    });
    // newArray.map((v) => {
    //   if (v.machineType === arrayOne) {
    //     Object.assign(v, { status: 3 });
    //   }
    //   return null;
    // });
    // dispatch(onFormDataSourceChange({
    //   formName: 'LineChangeInformationForm',
    //   dataSource: newArray,
    // }));
  }
);
// 途程设定获取制作途程数据
export const saveRoutingGraphFromData = props => (
  (dispatch, getState) => {
    // debugger;
    const state = getState();
    const tableName = props.tableName;
    const getSelectData = state.getIn(['Table', tableName, 'selectedRows']);
    if (getSelectData.length > 0) {
      dispatch(onFormDataChange({
        formName: 'routingGraphFrom',
        name: 'routingCode',
        value: getSelectData[0].code ? getSelectData[0].code : '',
      }));
      dispatch(onFormDataChange({
        formName: 'routingGraphFrom',
        name: 'routingName',
        value: getSelectData[0].name ? getSelectData[0].name : '',
      }));
      dispatch(onFormDataChange({
        formName: 'routingGraphFrom',
        name: 'routingVersion',
        value: getSelectData[0].version ? getSelectData[0].version : '',
      }));
      dispatch(onFormDataChange({
        formName: 'routingGraphFrom',
        name: 'routingType',
        value: getSelectData[0].category ? getSelectData[0].category : '',
      }));
      dispatch(onFormDataChange({
        formName: 'routingGraphFrom',
        name: 'routingDes',
        value: getSelectData[0].description ? getSelectData[0].description : '',
      }));
      dispatch(getRoutingGraphData(props));
      dispatch(onRoutingShowStateInitial({ name: 'routingGraphData', value: null }));
    }
  }
);

// 规则设定获取制作规则数据
export const saveRuleGraphFromData = props => (
  (dispatch, getState) => {
    const state = getState();
    const tableName = props.tableName;
    const getSelectData = state.getIn(['Table', tableName, 'selectedRows']);
    if (getSelectData.length > 0) {
      dispatch(onFormDataChange({
        formName: 'RuleSettingFrom',
        name: 'ruleCode',
        value: getSelectData[0].code ? getSelectData[0].code : '',
      }));
      dispatch(onFormDataChange({
        formName: 'RuleSettingFrom',
        name: 'ruleName',
        value: getSelectData[0].name ? getSelectData[0].name : '',
      }));
      dispatch(onFormDataChange({
        formName: 'RuleSettingFrom',
        name: 'ruleVersion',
        value: getSelectData[0].version ? getSelectData[0].version : '',
      }));
      dispatch(onFormDataChange({
        formName: 'RuleSettingFrom',
        name: 'ruleType',
        value: getSelectData[0].category ? getSelectData[0].category : '',
      }));
      dispatch(onFormDataChange({
        formName: 'RuleSettingFrom',
        name: 'ruleDes',
        value: getSelectData[0].description ? getSelectData[0].description : '',
      }));
      dispatch(getRuleGraphData(props));
      dispatch(onRuleShowStateInitial({ name: 'ruleGraphData', value: null }));   //  每次获取后清空store
    }
  }
);


export const onActionClick = props => (
  (dispatch, getState) => {
    // Do something...
    const { mode, formName, formNameMain, tableName, action, paramTemplate, InfType } = props;
    const state = getState();
    const formProps = formNameMain ?
      state.getIn([formReducerName, formNameMain, formPropsName])
      : state.getIn([formReducerName, formName, formPropsName]);
    const tableObj = state.getIn([tableRedecurName, tableName]) ?
      state.getIn([tableRedecurName, tableName]).toJS() : {};

    const selectedRows = tableObj.selectedRows ? tableObj.selectedRows[0] : {};
    const selectedData = props.selectedTemplate ?
      props.selectedTemplate(selectedRows) : null;
    let selectedId = state.getIn([tableRedecurName, tableName, 'id']);
    if (props.pcbNewConfigDoubleSelect) {
      selectedId = state.getIn([tableRedecurName, tableName, 'selectedRowKeys']);
    }
    const method = props.method;
    switch (mode) {
      case 'hide': case 'show': {
        if (!selectedId || selectedId === '' || selectedId.length === 0) {
          message.destroy();
          message.error('请选中具体内容！', 3);
          break;
        } else {
          dispatch(
            showHide({ selectedId, mode, formProps, action, paramTemplate, tableName, InfType, method }),
          );
          dispatch(clearRowId(props.tableName));
          break;
        }
      }
      case 'refresh': {
        dispatch(onFormSubmit(formProps));
        dispatch(clearRowsKeys(props.tableName));
        break;
      }
      case 'submit': {
        dispatch(
          submit(props),
        );
        break;
      }
      case 'custom': {
        dispatch(
          props.customFunc(props),
        );
        break;
      }
      case 'update': {
        if (!selectedId && !selectedData || (selectedId === '') || (selectedId.length === 0)) {
          message.destroy();
          message.error('请选中具体内容！', 3);
          break;
        } else {
          dispatch(
            update({ ...props, selectedId, formProps, selectedData }),
          );
          dispatch(clearRowId(props.tableName));
          if (props.clearDatasourceOnUnselected) {
            dispatch(updateDataSource({ dataSource: '', tableName }));
          }
          break;
        }
      }
      case 'onloadByhand': {
        dispatch(
          onloadByhand(props),
        );
        break;
      }
      case 'delete': {
        dispatch(
          deleteData(props),
        );
        break;
      }
      case 'deleteOne':
        dispatch(
          deleteOneData(props),
        );
        break;
      case 'loadRefresh':
        dispatch(
          loadRefresh(props),
        );
        break;
      case 'returnDebit':
        dispatch(
          returnDebitData(props),
        );
        break;
      case 'UndoOperation':
        dispatch(
          undoOperation(props),
        );
        break;
      case 'SettingPort':
        dispatch(
          settingPort(props),
        );
        break;
      case 'uploadMES':
        dispatch(
          uploadMES(props),
        );
        break;
      case 'deleteAllData':
        dispatch(
          deleteAllData(props),
        );
        break;
      case 'saveDate':
        dispatch(
          onSaveData(props),
        );
        break;
      case 'typeAddData':
        dispatch(getTypeSelectedData(props));
        break;
      case 'checkAddData':
        dispatch(getCheckSelectedData(props));
        break;
      case 'maintainAddData':
        dispatch(getMaintainSelectedData(props));
        break;
      case 'unbindOrResetAcFeeder':
        dispatch(unbindOrResetAcFeeder(props));
        break;
      case 'unbindOrResetAcWork':
        dispatch(unbindOrResetAcWork(props));
        break;
      case 'scrapAddData':
        dispatch(getScrapSelectedData(props));
        break;
      case 'delData':
        dispatch(delTableData(props));
        break;
      case 'cellLibMngDel':
        dispatch(cellLibMngDel(props));
        break;
      case 'checkDataDel':
        dispatch(onCheckDataDel(props));
        break;
      case 'LineOneStratChange':
        dispatch(LineOneStratChange(props));
        break;
        // EQMMaintMng 设备维修
      case 'FaultRepMngSubmit': {
        dispatch(
              FaultRepMngSubmit(props),
          );
        break;
      }
      case 'turnLight':
        if (!selectedId || selectedId === '' || selectedId.length === 0) {
          message.destroy();
          message.error('请选中具体内容！', 3);
          break;
        } else {
          dispatch(onTurnLight(props),
          );
          break;
        }
      // case 'showRouttingState':
      //   if (!selectedId || selectedId === '' || selectedId.length === 0) {
      //     message.destroy();
      //     message.error('请选中具体内容！', 3);
      //     break;
      //   } else {
      //     dispatch(saveRoutingGraphFromData(props));
      //     break;
      //   }
      case 'graphDataSave':
        dispatch(dataSave(graphXmlParseData));
        break;
      case 'graphDataUpdate':
        dispatch(updateDataSave(graphXmlupdateParseData));
        break;
      case 'graphCancelBtn':
        dispatch(cancelGraphOperator(props));
        break;
      case 'graphDeleteBtn':
        dispatch(deleteGraphOperator(props));
        break;
      case 'ruleGraphDataSave':
        dispatch(ruleDataSave(ruleGraphXmlParseData));
        break;
      case 'ruleGraphDataUpdate':
        dispatch(ruleUpdateDataSave(ruleGraphXmlupdateParseData));
        break;
      case 'ruleGraphCancelBtn':
        dispatch(cancelRuleGraphOperator(props));
        break;
      case 'ruleGraphDeleteBtn':
        dispatch(deleteRuleGraphOperator(props));
        break;
      case 'search':
        dispatch(searchData(props));
        break;
      default:
        break;
    }
  }
);
