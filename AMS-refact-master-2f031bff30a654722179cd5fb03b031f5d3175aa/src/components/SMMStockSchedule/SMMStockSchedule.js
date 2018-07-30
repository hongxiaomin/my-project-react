import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Table from '../../containers/QueryTableContainer';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import InputContainer from '../../containers/InputContainer';

import { defaultRequestFilters, defaultDataSourceTemplate, defaultGetParamTemplate2, SERVER_IP_SMM } from '../../constants/Settings';

const SMMStockScheduleApi = `${SERVER_IP_SMM}/smm/reservecontrol/qIssureprogresslist`;

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
  name: '备料进度',
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
    title: '主板',
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
  },  {
    title: '预计换线时间',
    dataIndex: 'change_line_time',
    key: 'change_line_time',
  }, {
    title: '计划完成时间',
    dataIndex: 'prep_plan_finish_time',
    key: 'prep_plan_finish_time',
  }, {
    title: '距离换线时长',
    dataIndex: 'change_line_time_duration',
    key: 'change_line_time_duration',
    render: (text) => {
      const theTime = text < 0 ? -parseInt(text) : parseInt(text);// 秒
      //  const theTime = -4000;// 秒
      let theTime1 = 0;// 分
      let theTime2 = 0;// 小时
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);

          theTime1 = parseInt(theTime1 % 60);
        }
      }
      let result = 0;
      if (theTime2 < 10) {
        result = `0${theTime2}`;
        if (theTime1 < 10) {
          result = `0${theTime2}:0${theTime1}`;
        } else {
          result = `0${theTime2}:${theTime1}`;
        }
      } else {
        result = theTime2;
        if (theTime1 < 10) {
          result = `${theTime2}:0${theTime1}`;
        } else {
          result = `${theTime2}:${theTime1}`;
        }
      }
      return result;
    },
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
    title: '负责人',
    dataIndex: 'operator_id',
    key: 'operator_id',
  }];

const SMMStockSchedule = props => (
  <div>
    <Bread breadMap={breadMap} />

    <Title name="备料区工单进度" />

    <Table
      name="SMMStockScheduleTable"
      action={SMMStockScheduleApi}
      columns={columns}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      isRowSelection
    />
  </div>
);
SMMStockSchedule.defaultProps = {

};
SMMStockSchedule.propTypes = {

};

export default SMMStockSchedule;
