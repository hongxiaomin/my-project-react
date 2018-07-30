import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';

import Bread from '../Bread';
import Title from '../Title';
import Table from '../../containers/QueryTableContainer';
import { Link } from 'react-router';


import { defaultRequestFilters, defaultDataSourceTemplate, defaultGetParamTemplate2, SERVER_IP_SMM } from '../../constants/Settings';

const SMMMaterialCarMergeApi = `${SERVER_IP_SMM}/smm/mergercontrol/getworkorderlist`;

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
  name: '接料',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '工单号',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '主板',
    dataIndex: 'product_name_main',
    key: 'product_name_main',
  }, {
    title: '小板',
    dataIndex: 'product_name',
    key: 'product_name',
  }, {
    title: '上线时间',
    dataIndex: 'online_plan_time',
    key: 'online_plan_time',
  }, {
    title: '工单负责人',
    dataIndex: 'operator_id',
    key: 'operator_id',
  }, {
    title: '首盘料车',
    dataIndex: 'car_name',
    key: 'car_name',
  }, {
    title: '目前状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      switch (text) {
        case 200:
          return '未开始';
        case 201:
          return '仓库发料完成';
        case 202:
          return '正在接料';
        case 203:
          return '接料完成';
        case 204:
          return '正在上模组';
        case 205:
          return '上模组完成';
        case 206:
          return '正在feeder发料';
        case 207:
          return 'feeder发料完成';
        case 208:
          return '等待上线';
        case 209:
          return '工单上线';
        case 210:
          return '工单下线';
        case 211:
          return '正在下模组';
        case 212:
          return '下模组完成';
        case 213:
          return '正在退料';
        case 214:
          return '正在确认耗损';
        default:
          return '工单关闭';
      }
    },
  }];

const SMMMaterialCarMerge = props => (
  <div>
    <Bread breadMap={breadMap} />

    <Title name="接料" />
    <Row>
          <label htmlFor="port" className={'label'}>设置打印机端口</label>
          <InputContainer type="text" name="port" className={'firstliao Rowinput'} formName="SMMDeleteRecordSearchForm" />
          <ActionBtn
            btnName="设置"
            mode="SettingPort"
          />
        </Row>

    <Table
      name="SMMMaterialCarMergeTable"
      action={SMMMaterialCarMergeApi}
      columns={columns}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      href="smmMaterialCarMergeOthers"
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
