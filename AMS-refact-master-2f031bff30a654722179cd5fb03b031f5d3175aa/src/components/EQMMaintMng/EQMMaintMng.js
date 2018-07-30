import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { createAction } from 'redux-actions';
import Request from '../../utils/Request';
import Bread from '../Bread';
import Title from '../Title';
import { formReducerName, formDataName } from '../../constants/Config';
import { onFormSubmit, onFormDataChange } from '../../actions/FormAction';
import { clearRowsKeys, updateDataSource } from '../../actions/TableAction';
import { tableRedecurName } from '../../constants/TableConfig';
import FormContainer from '../../containers/FormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Input from '../../containers/InputContainer';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM,
  dataHandler,
} from '../../constants/Settings';

const EQMMaintMngForm = 'EQMMaintMngForm';
const EQMMaintMngTable = 'EQMMaintMngTable';
const EQMMaintMngGridConfTable = 'EQMMaintMngGridConfTable';
const EQMMaintMngAddForm = 'EQMMaintMngAddForm';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/repair/application`;
const EQMMaintMngServiceStartApi = `${SERVER_IP_EQM}/ams/eqm/repair/service/start`;
const EQMMaintMngServiceFinishApi = `${SERVER_IP_EQM}/ams/eqm/repair/service/finish`;
const EQMMaintMngServiceItemApi = `${SERVER_IP_EQM}/ams/eqm/repair/solution/recommend`;
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
  name: '设备维修',
}];
const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
}, {
  title: '报修单号',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '设备编号',
  dataIndex: 'eqmCode',
  key: 'eqmCode',
}, {
  title: '维修状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => {
    if (text === 0) {
      return '等待维修';
    } else if (text === 1) {
      return '维修开始';
    } else if (text === 2) {
      return '等待确认';
    } else if (text === 3) {
      return '维修完成';
    }
    return '';
  },
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
  title: '报修描述',
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
}];
const columns1 = [
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
    title: '推荐解决方案项代码',
    dataIndex: 'solitemcode',
    key: 'solitemcode',
    width: 100,
  }, {
    title: '推荐解决方案项名称',
    dataIndex: 'solitemname',
    key: 'solitemname',
    width: 100,
  }, {
    title: '推荐解决方案项描述',
    dataIndex: 'solitemdesc',
    key: 'solitemdesc',
    width: 100,
  },
];
const EQMParamTemplate = (param) => {
  const {
    size = 10,
    current = 1,
    ...data1 } = param;
  const obj = { ...data1, queryStatus: '0,1' };
  const data = dataHandler(obj);
  const condition = { ...data };
  return { condition, size, current };
};
const EQMDefaultGetParamTemplateBom = param => ({ repairId: param.id });
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
      const props = getState().getIn([formReducerName, params.formName, 'props']);
      dispatch(onFormSubmit(props));
      dispatch(updateDataSource({ dataSource: '', response: '', tableName: EQMMaintMngTable }));
      dispatch(onFormDataChange({
        formName: EQMMaintMngAddForm,
        name: 'remark',
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
const EQMDefaultPutParamTemplate = (param) => {
  const { formdata, tableData, tableSelectedId } = param;
  const data = {
    repairId: tableData[0].id,
    createBy: 'admin',
  };
  const dataStrNew = JSON.stringify(data);
  return {
    value: dataStrNew || [],
  };
};
const EQMDefaultPutDataTemplate = (param) => {
  const { formdata, tableData, tableSelectedId } = param;
  const dataTableNew = [];
  tableData.map((item) => {
    dataTableNew.push({
      solutionItemId: item.solitemid,
    });
  });
  const list = { repairId: tableSelectedId[0], repairSolutionList: dataTableNew, serviceDesc: formdata.remark, createBy: 'admin' };
  const dataStrNew = JSON.stringify(list);
  return {
    value: dataStrNew || [],
  };
};
const EQMMaintMng = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="设备维修" />
    <FormContainer
      name={EQMMaintMngForm}
      action={EQMSettingApi}
      method="GET"
      tableName={EQMMaintMngTable}
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
      name={EQMMaintMngTable}
      action={EQMMaintMngServiceItemApi}
      formName={EQMMaintMngForm}
      columns={columns}
      paramTemplate={EQMDefaultGetParamTemplateBom}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      isRadio
      isGetDate
      filters={defaultRequestFilters}
    />
    <div style={{ width: '100%', textAlign: 'center', marginBottom: '5px' }}>
      <ActionBtn
        name="startBtn"
        btnName="维修开始确认"
        method="POST"
        mode="custom"
        customFunc={EQMcustomFunc}
        action={EQMMaintMngServiceStartApi}
        tableName={EQMMaintMngTable}
        formName={EQMMaintMngForm}
        paramTemplate={() => ({})}
        dataTemplate={EQMDefaultPutParamTemplate}
      />
    </div>
    <QueryTableContainer
      name={EQMMaintMngGridConfTable}
      tableName={EQMMaintMngTable}
      columns={columns1}
      nopagination
      isCroll
      crollYnum="650"
    />
    <FormContainer
      name={EQMMaintMngAddForm}
      action={''}
    >
      <div className={'areaCondition'} style={{ marginTop: '20px' }}>
        <label htmlFor="remark" className={'label'}>维修描述</label>
        <Input type="text" name="remark" className={'textarea'} textarea />
      </div>
    </FormContainer>
    <br />
    <div style={{ width: '100%', textAlign: 'center' }}>
      <ActionBtn
        btnName="维修结束确认"
        mode="custom"
        method="POST"
        customFunc={EQMcustomFunc}
        action={EQMMaintMngServiceFinishApi}
        formName={EQMMaintMngForm}
        tableName={EQMMaintMngGridConfTable}
        needTableName={EQMMaintMngTable}
        paramTemplate={() => ({})}
        dataTemplate={EQMDefaultPutDataTemplate}
      />
    </div>
  </div>
);
EQMMaintMng.defaultProps = {

};
EQMMaintMng.propTypes = {

};

export default EQMMaintMng;
