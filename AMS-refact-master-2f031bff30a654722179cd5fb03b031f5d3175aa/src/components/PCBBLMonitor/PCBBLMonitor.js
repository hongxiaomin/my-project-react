import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_PCB } from '../../constants/Settings';
import TimeAlertTable from '../../containers/TimeAlertTableContainer';

const PCBBLMonitorAPI = `${SERVER_IP_PCB}/ams/pcb/monitor/preparation`;
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => (<p style={{ background: record.level }} className={'inlineTable'}>{(index + 1)}</p>),
  }, {
    title: '工单',
    dataIndex: 'sapWorkOrderId',
    key: 'sapWorkOrderId',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.sapWorkOrderId}</p>),
  }, {
    title: '主板',
    dataIndex: 'mainBoard',
    key: 'mainBoard',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.mainBoard}</p>),
  }, {
    title: '小板',
    dataIndex: 'subBoard',
    key: 'subBoard',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.subBoard}</p>),
  }, {
    title: '线别',
    dataIndex: 'productLine',
    key: 'productLine',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.productLine}</p>),
  }, {
    title: 'PCB料号',
    dataIndex: 'partNum',
    key: 'partNum',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.partNum}</p>),
  }, {
    title: '工单数量',
    dataIndex: 'amount',
    key: 'amount',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.amount}</p>),
  }, {
    title: '上线时间',
    dataIndex: 'onLineTime',
    key: 'onLineTime',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.onLineTime}</p>),
  }, {
    title: '距离上线时间',
    dataIndex: 'remainTime',
    key: 'remainTime',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.remainTime}</p>),
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.status}</p>),
  },
];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '监控平台',
}, {
  path: '',
  name: '备料监控',
}];
const PCBBLMonitor = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="备料监控" />
    <TimeAlertTable
      action={PCBBLMonitorAPI}
      method="GET"
      timeAlert="ok"
      name="PCBOuttimeMonitorTable"
      columns={columns}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      param={{ condition: [{}] }}
      needClear
    />
  </div>
);
PCBBLMonitor.defaultProps = {

};
PCBBLMonitor.propTypes = {

};

export default PCBBLMonitor;
