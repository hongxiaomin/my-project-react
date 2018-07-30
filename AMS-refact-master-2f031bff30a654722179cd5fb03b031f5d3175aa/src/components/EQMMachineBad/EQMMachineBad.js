import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import Input from '../../containers/InputContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';

const EQMMachineBadForm = 'EQMMachineBadForm';
const EQMMachineBadTable = 'EQMMachineBadTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/eqp/alarm`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '生产统计',
}, {
  path: '',
  name: '预警信息',
}];
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    key: 'eqpCode',
  }, {
    title: '异常描述',
    dataIndex: 'eqpDesc',
    index: 'eqpDesc',
  }, {
    title: '是否解决',
    dataIndex: 'active',
    index: 'active',
    render: (text) => {
      if (text === 'Normal') {
        return '是';
      } else if (text === 'Stop') {
        return '否';
      }
      return '';
    },
  }, {
    title: '设备类型',
    dataIndex: 'eqpTypeId',
    index: 'eqpTypeId',
  }, {
    title: '设备型号',
    dataIndex: 'eqpModeId',
    index: 'eqpModeId',
  }, {
    title: '所属站点',
    dataIndex: 'assemblyId',
    index: 'assemblyId',
  }, {
    title: '触发方式',
    dataIndex: 'status',
    index: 'status',
  }, {
    title: '触发时间',
    dataIndex: 'time',
    index: 'time',
  }, {
    title: '异常时长(分钟)',
    dataIndex: 'fstatus',
    index: 'fstatus',
  }, {
    title: '备注',
    dataIndex: 'times',
    index: 'times',
  }];
const EQMParamTemplate = () => ({ size: 10, current: 1 });
const EQMMachineBad = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="预警信息" />
    <FormContainer
      name={EQMMachineBadForm}
      action={EQMSettingApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupName" className={'label'}>厂别</label>
        <Input type="text" name="faultGroupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="lineName" className={'label'}>线别</label>
        <Input type="text" name="lineName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpModeId" className={'label'}>设备型号</label>
        <Input type="text" name="eqpModeId" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpCode" className={'label'}>设备编号</label>
        <Input type="text" name="eqpCode" className={'input'} />
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <TableContainer
      name={EQMMachineBadTable}
      formName={EQMMachineBadForm}
      columns={columns}
      noRowSelection
    />
  </div>
);
EQMMachineBad.defaultProps = {

};
EQMMachineBad.propTypes = {

};

export default EQMMachineBad;
