import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMParamTemplate,
  SERVER_IP_EQM,
} from '../../constants/Settings';

const EQMListSearchForm = 'EQMListSearchForm';
const EQMListSearchTable = 'EQMListSearchTable';
const EQMListSearchGridConfTable = 'EQMListSearchGridConfTable';
const EQMListSearchGridConfNextTable = 'EQMListSearchGridConfNextTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/repair/application`;
const EQMMaintMngServiceItemApi = `${SERVER_IP_EQM}/ams/eqm/repair/service`;
const EQMMaintMngServiceApi = `${SERVER_IP_EQM}/ams/eqm/repair/solution/actual`;
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
  name: '记录查询',
}];
const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
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
    title: '维修补充说明',
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
const EQMDefaultGetParamTemplateBom = (param) => {
  const { ...data } = { repairId: param.id, result: param.status };
  return {
    condition: data,
  };
};
const EQMDefaultGetParamTemplateBom1 = param => (
  { repairId: param.repairId ? param.repairId : '', serviceId: param.id ? param.id : '' });
const EQMListSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="记录查询" />
    <FormContainer
      name={EQMListSearchForm}
      action={EQMSettingApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="factoryName" className={'label'}>厂别名称</label>
        <Input type="text" name="factoryName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="lineName" className={'label'}>线别名称</label>
        <Input type="text" name="lineName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>设备编号</label>
        <Input type="text" name="eqmCode" className={'input'} />
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <TableContainer
      name={EQMListSearchTable}
      action={EQMSettingApi}
      nextAction={EQMMaintMngServiceItemApi}
      formName={EQMListSearchForm}
      columns={columns}
      needDataTemplate={EQMDefaultGetParamTemplateBom}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      noRowSelection
      filters={defaultRequestFilters}
    />
    <QueryTableContainer
      name={EQMListSearchGridConfTable}
      nextAction={EQMMaintMngServiceApi}
      tableName={EQMListSearchTable}
      needDataTemplate={EQMDefaultGetParamTemplateBom1}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      columns={columns1}
      onRowClick
      isRowSelection
      nopagination
    />
    <QueryTableContainer
      name={EQMListSearchGridConfNextTable}
      tableName={EQMListSearchGridConfTable}
      columns={columns2}
      isRowSelection
      nopagination
      isCroll
      crollYnum="650"
    />
  </div>
);
EQMListSearch.defaultProps = {

};
EQMListSearch.propTypes = {

};

export default EQMListSearch;
