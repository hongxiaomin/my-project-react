import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import {
  bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import Input from '../../containers/InputContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';

const EQMDatasSearchForm = 'EQMDatasSearchForm';
const EQMDatasSearchTable = 'EQMDatasSearchTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/fault/group`;

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
  name: '数据查询',
}];
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备编号',
    dataIndex: 'faultGroupName',
    key: 'faultGroupName',
  }, {
    title: '状态',
    dataIndex: 'faultGroupCode',
    index: 'faultGroupCode',
  }, {
    title: '设备类型',
    dataIndex: 'faroupDesc',
    index: 'fauroupDesc',
  }, {
    title: '设备型号',
    dataIndex: 'faultGrousc',
    index: 'faultGrousc',
  }, {
    title: '所属站点',
    dataIndex: 'faGwupDesc',
    index: 'faGrwpDesc',
  }, {
    title: '起始时间',
    dataIndex: 'fas',
    index: 'fas',
  }, {
    title: '结束时间',
    dataIndex: 'faw',
    index: 'faw',
  }, {
    title: '持续时长',
    dataIndex: 'fa',
    index: 'fa',
  }, {
    title: '备注',
    dataIndex: 'cfa',
    index: 'cfa',
  }];
const EQMDatasSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="数据查询" />
    <FormContainer
      name={EQMDatasSearchForm}
      action={EQMSettingApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupName" className={'label'}>厂别</label>
        <Input type="text" name="faultGroupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupCode" className={'label'}>线别</label>
        <Input type="text" name="faultGroupCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupCode" className={'label'}>设备型号</label>
        <Input type="text" name="faultGroupCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupCode" className={'label'}>设备编号</label>
        <Input type="text" name="faultGroupCode" className={'input'} />
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <TableContainer
      name={EQMDatasSearchTable}
      formName={EQMDatasSearchForm}
      columns={columns}
      noRowSelection
    />
  </div>
);
EQMDatasSearch.defaultProps = {

};
EQMDatasSearch.propTypes = {

};

export default EQMDatasSearch;
