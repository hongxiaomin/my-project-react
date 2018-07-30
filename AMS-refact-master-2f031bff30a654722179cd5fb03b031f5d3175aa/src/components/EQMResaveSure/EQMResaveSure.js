import React from 'react';
import { message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import { createAction } from 'redux-actions';
import Request from '../../utils/Request';
import { formReducerName, formDataName } from '../../constants/Config';
import { onFormSubmit, onFormDataChange } from '../../actions/FormAction';
import { clearRowsKeys, updateDataSource } from '../../actions/TableAction';
import { tableRedecurName } from '../../constants/TableConfig';
import FormContainer from '../../containers/FormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Input from '../../containers/InputContainer';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM,
  dataHandler,
} from '../../constants/Settings';

const EQMResaveSureForm = 'EQMResaveSureForm';
const EQMResaveSureTable = 'EQMResaveSureTable';
const EQMResaveSureAddForm = 'EQMResaveSureAddForm';
const EQMResaveSureGridConfTable = 'EQMResaveSureGridConfTable';
const EQMResaveSureGridConfNextTable = 'EQMResaveSureGridConfNextTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/repair/application`;
const EQMMaintMngServiceItemApi = `${SERVER_IP_EQM}/ams/eqm/repair/service`;
const EQMMaintMngServiceApi = `${SERVER_IP_EQM}/ams/eqm/repair/solution/actual`;
const EQMMaintMngSubApi = `${SERVER_IP_EQM}/ams/eqm/repair/verify`;
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '故障及维修',
}, {
  path: '',
  name: '验收确认',
}];
const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
}, {
  title: '报修编号',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '设备编号',
  dataIndex: 'eqmCode',
  key: 'eqmCode',
}, {
  title: '所在厂别',
  dataIndex: 'factoryName',
  key: 'factoryName',
}, {
  title: '所在线别',
  dataIndex: 'lineName',
  key: 'lineName',
}, {
  title: '所在工作站',
  dataIndex: 'assemblyName',
  key: 'assemblyName',
}, {
  title: '报修说明',
  dataIndex: 'repairDesc',
  key: 'repairDesc',
}, {
  title: '报修时间',
  dataIndex: 'createDate',
  key: 'createDate',
  render: (text, record) => {
    const { createDate } = record;
    if (createDate === null) {
      return '';
    }
    const date = new Date(createDate);
    function add0(m) { return m < 10 ? `0${m}` : m; }
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
  },
}, {
  title: '报修人',
  dataIndex: 'createBy',
  key: 'createBy',
}, {
  title: '最后一次维修时间',
  dataIndex: 'lastServiceDate',
  key: 'lastServiceDate',
  render: (text, record) => {
    const { lastServiceDate } = record;
    if (lastServiceDate === null) {
      return '';
    }
    const date = new Date(lastServiceDate);
    function add0(m) { return m < 10 ? `0${m}` : m; }
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
  },
}, {
  title: '最后一次维修人',
  dataIndex: 'lastServiceBy',
  key: 'lastServiceBy',
}];
const columns1 = [
  {
    title: '序号',
    dataIndex: 'name2',
    key: 'name2',
    render: (text, record, index) => index + 1,
  }, {
    title: '维修时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
    render: (text, record) => {
      const { lastUpdateDate } = record;
      if (lastUpdateDate === null) {
        return '';
      }
      const date = new Date(lastUpdateDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
    },
  }, {
    title: '维修人',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }, {
    title: '维修描述',
    dataIndex: 'serviceDesc',
    key: 'serviceDesc',
  }, {
    title: '是否验收通过',
    dataIndex: 'verifyResultName',
    key: 'verifyResultName',
  },
];
const columns2 = [
  {
    title: '序号',
    dataIndex: 'name2',
    key: 'name2',
    render: (text, record, index) => index + 1,
    width: 50,
  }, {
    title: '故障项代码',
    dataIndex: 'faultitemcode',
    key: 'faultitemcode',
    width: 100,
  }, {
    title: '故障项名称',
    dataIndex: 'faultitemname',
    key: 'faultitemname',
    width: 100,
  }, {
    title: '故障项描述',
    dataIndex: 'faultitmedesc',
    key: 'faultitmedesc',
    width: 100,
  }, {
    title: '采用解决方案项代码',
    dataIndex: 'solitemcode',
    key: 'solitemcode',
    width: 100,
  }, {
    title: '采用解决方案项名称',
    dataIndex: 'solitemname',
    key: 'solitemname',
    width: 100,
  }, {
    title: '采用解决方案项描述',
    dataIndex: 'solitemdesc',
    key: 'solitemdesc',
    width: 100,
  },
];
const showData = [{
  id: '0',
  ckbmType: '是',
}, {
  id: '1',
  ckbmType: '否',
}];
const EQMParamTemplate = (param) => {
  const {
    size = 10,
    current = 1,
    ...data1 } = param;
  const obj = { ...data1, queryStatus: '2' };
  const data = dataHandler(obj);
  const condition = { ...data };
  return { condition, size, current };
};
const EQMDefaultGetParamTemplateBom = (params) => {
  const {
    size = 10,
    current = 1,
    ...param } = params;
  const { ...data } = { repairId: param.id };
  return {
    condition: data,
    size,
    current,

  };
};
const EQMDefaultGetParamTemplateBom1 = param => (
  { repairId: param.repairId?param.repairId:'', serviceId: param.id?param.id:'' });
const onActionFail = e => (
  () => message.error(e || 'submit failed!')
);
const EQMcustomFunc = params => (
  (dispatch, getState) => {
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const formdata = getState().getIn([formReducerName, params.formName, formDataName]) ?
     getState().getIn([formReducerName, params.formName, formDataName]).toJS() : '';
    const tableData = getState().getIn([tableRedecurName, params.tableName, 'selectedRows']) ?
    getState().getIn([tableRedecurName, params.tableName, 'selectedRows']) : '';
    const tableSelectedId = getState().getIn([tableRedecurName, params.needTableName, 'selectedRowKeys']) ?
    getState().getIn([tableRedecurName, params.needTableName, 'selectedRowKeys']) : [];
    if (tableData.length === 0) {
      message.error('请至少选择一条数据!', 3);
      return;
    }
    const data = params.dataTemplate({ formdata, tableData, tableSelectedId });
    const callback = (response) => {
      if (response.code === 1) {
        message.error(response.message, 6);
      } else {
        message.success(response.message, 3);
      }
      dispatch(clearRowsKeys(params.tableName));
      // 刷新表格props.param
      const props = getState().getIn([formReducerName, params.needFormName, 'props']);
      dispatch(onFormSubmit(props))
      dispatch(updateDataSource({ dataSource:[], response:{}, tableName: 'EQMResaveSureGridConfTable'}));
      dispatch(updateDataSource({ dataSource:[], response:{}, tableName: 'EQMResaveSureTable'}));
      dispatch(onFormDataChange({
        formName: EQMResaveSureAddForm,
        name: 'verifyDesc',
        value: '',
      }));
      dispatch(onFormDataChange({
        formName: EQMResaveSureAddForm,
        name: 'result',
        value: '',
      }));
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
const EQMDefaultPutDataTemplate = (param) => {
  const { formdata, tableData, tableSelectedId } = param;
  let dataTableNew = {};
  dataTableNew = {
    repairId: tableSelectedId[0],
    result: formdata.result,
    verifyDesc: formdata.verifyDesc,
    lastUpdateBy: tableData[0].lastUpdateBy,
  };
  const dataStrNew = JSON.stringify(dataTableNew);
  return {
    value: dataStrNew || [],
  };
};
const EQMResaveSure = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="验收确认" />
    <FormContainer
      name={EQMResaveSureForm}
      action={EQMSettingApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>设备编号</label>
        <Input type="text" name="eqmCode" className={'input'} />
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <TableContainer
      name={EQMResaveSureTable}
      action={EQMMaintMngServiceItemApi}
      formName={EQMResaveSureForm}
      columns={columns}
      needDataTemplate={EQMDefaultGetParamTemplateBom}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      isRadio
      filters={defaultRequestFilters}
      isGetDate
    />
    <QueryTableContainer
      name={EQMResaveSureGridConfTable}
      nextAction={EQMMaintMngServiceApi}
      tableName={EQMResaveSureTable}
      needDataTemplate={EQMDefaultGetParamTemplateBom1}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      columns={columns1}
      onRowClick
      isRowSelection
      nopagination
    />
    <QueryTableContainer
      name={EQMResaveSureGridConfNextTable}
      tableName={EQMResaveSureGridConfTable}
      columns={columns2}
      isRowSelection
      nopagination
      isCroll
      crollYnum="650"
      uid="faultitemid"
    />
    <FormContainer
      name={EQMResaveSureAddForm}
      action={''}
    >
      <div className={'areaCondition'} style={{ marginTop: '20px' }}>
        <label htmlFor="verifyDesc" className={'label'}>验收描述</label>
        <Input type="text" name="verifyDesc" className={'textarea'} textarea />
      </div>
      <br />
      <div className={'searchCondition'}>
        <label htmlFor="result" className={'label'}>验收通过</label>
        <span className={'select'}>
          <Select
            name="result"
            className={'select'}
            itemKey="id"
            itemValue="ckbmType"
            data={showData}
            load="true"
          />
        </span>
      </div>
    </FormContainer>
    <br />
    <div style={{ width: '100%', textAlign: 'center' }}>
      <ActionBtn
        btnName="提交"
        mode="custom"
        method="PUT"
        customFunc={EQMcustomFunc}
        action={EQMMaintMngSubApi}
        formName={EQMResaveSureAddForm}
        needFormName={EQMResaveSureForm}
        tableName={EQMResaveSureTable}
        needTableName={EQMResaveSureTable}
        paramTemplate={() => ({})}
        dataTemplate={EQMDefaultPutDataTemplate}
      />
    </div>
  </div>
);
EQMResaveSure.defaultProps = {

};
EQMResaveSure.propTypes = {

};

export default EQMResaveSure;
