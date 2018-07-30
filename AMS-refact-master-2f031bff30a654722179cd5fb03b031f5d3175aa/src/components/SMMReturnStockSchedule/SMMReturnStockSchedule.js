import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import InputContainer from '../../containers/InputContainer';
import TableContainer from '../../containers/QueryTableContainer';
import { defaultRequestFilters, defaultDataSourceTemplate, defaultGetParamTemplate2, SERVER_IP_SMM } from '../../constants/Settings';
import { defaultcolumnsReturnTemplate } from '../../constants/TableConfig';


const SMMReturnStockScheduleApi = `${SERVER_IP_SMM}/smm/reservecontrol/qreturnmaterialprogresslist`;
const SMMReturnStockScheduleApiDetail = `${SERVER_IP_SMM}/smm/reservecontrol/qreturnmaterialdetaillist`;

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
  name: '退料进度',
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
    title: '当前状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      switch (text) {
        case 200:
          return '等待仓库发料';
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
  }, {
    title: '当前操作完成进度',
    dataIndex: 'progress',
    key: 'progress',
  }, {
    title: '退料计划完成时间',
    dataIndex: 'returned_plan_finish_time',
    key: 'returned_plan_finish_time',
  }, {
    title: '负责人',
    dataIndex: 'operator_id',
    key: 'operator_id',
  }];

const columnsDetail = [
  {
    title: '序号',
    dataIndex: 'material_no2',
    key: 'material_no2',
    render: (text, record, index) => (index + 1),
  }, {
    title: '产线',
    dataIndex: 'line_name',
    key: 'line_name',
  }, {
    title: '工单号',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '当前操作进度',
    dataIndex: 'progress',
    key: 'progress',
  }, {
    title: '退料计划完成时间',
    dataIndex: 'returned_actual_finish_time',
    key: 'returned_actual_finish_time',
  }, {
    title: '退料员',
    dataIndex: 'operator_id',
    key: 'operator_id',
  }, {
    title: '主板',
    dataIndex: 'product_name_main',
    key: 'product_name_main',
  }, {
    title: '小板',
    dataIndex: 'product_name',
    key: 'product_name',
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '需求量',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '应退数量',
    dataIndex: 'rentrun_amount',
    key: 'rentrun_amount',
  }, {
    title: '发料量',
    dataIndex: 'issue_amount',
    key: 'issue_amount',
  }, {
    title: '已退数量',
    dataIndex: 'rentruned_amount',
    key: 'rentruned_amount',
  }, {
    title: '消耗量',
    dataIndex: 'consum_amount',
    key: 'consum_amount',
  }];

const detail = (param) => {
  const data = {
    work_order: param.work_order,
    side: param.side,
    t_status: (param.progress === '100%' ? 1 : 0),
  };
  return data;
};

const SMMReturnStockSchedule = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="退料进度" />
    <TableContainer
      name="SMMRetrunStockScheduleTable"
      columns={columns}
      action={SMMReturnStockScheduleApi}
      nextAction={SMMReturnStockScheduleApiDetail}
      nextTableName="SMMRetrunStockScheduleTableDetail"
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      needDataTemplate={detail}
      uid="amount"
      onNeedData={() => { message.info('暂无数据', 3); }}
      onRowClick
    />


    <TableContainer
      name="SMMRetrunStockScheduleTableDetail"
      queryTableName="SMMRetrunStockScheduleTable"
      needDataTemplate={detail}
      columnsTemplate={defaultcolumnsReturnTemplate}
    />
  </div>


);
SMMReturnStockSchedule.defaultProps = {

};
SMMReturnStockSchedule.propTypes = {

};

export default SMMReturnStockSchedule;
