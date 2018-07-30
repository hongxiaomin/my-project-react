import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Table from '../../containers/QueryTableContainer';
import { Link } from 'react-router';


import { defaultRequestFilters, defaultDataSourceTemplate, defaultGetParamTemplate2, SERVER_IP_SMM } from '../../constants/Settings';

const SMMAutoUpFeederApi = `${SERVER_IP_SMM}/smm/plugmodcontroller/getproductionlines`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '备料区管理',
}, {
  path: '',
  name: '自动上Feeder',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '线别',
    dataIndex: 'line_name',
    key: 'line_name',
  }, {
    title: '工单号',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '主线板',
    dataIndex: 'product_name_main',
    key: 'product_name_main',
  }, {
    title: '小板',
    dataIndex: 'product_name',
    key: 'product_name',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '计划上线时间',
    dataIndex: 'online_plan_start_time',
    key: 'online_plan_start_time',
    render: (text, record, index) => {
      const newText = new Date(text);
      const Y = `${newText.getFullYear()}-`;
      const M = (newText.getMonth() + 1) < 10 ? `0${(newText.getMonth() + 1)}-` : `${(newText.getMonth() + 1)}-`;
      const D = newText.getDate() < 10 ? `0${newText.getDate()} ` : `${newText.getDate()} `;
      const h = newText.getHours() < 10 ? `0${newText.getHours()}:` : `${newText.getHours()}:`;
      const m = newText.getMinutes() < 10 ? `0${newText.getMinutes()}:` : `${newText.getMinutes()}:`;
      const s = newText.getSeconds() < 10 ? `0${newText.getSeconds()}` : `${newText.getSeconds()}`;
      return (`${Y}${M}${D}${h}${m}${s}`);
    },
  }];

const SMMMaterialCarMerge = () => (
  <div>
    <Bread breadMap={breadMap} />

    <Title name="自动上Feeder" />

    <Table
      name="SMMAutoUpFeederTable"
      action={SMMAutoUpFeederApi}
      columns={columns}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      href="smmAutoUpFeederOthers"
      onRowClick
      isRowSelection
    />
  </div>
);
SMMMaterialCarMerge.defaultProps = {

};
SMMMaterialCarMerge.propTypes = {

};

export default SMMMaterialCarMerge;
