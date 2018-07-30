import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_PCB } from '../../constants/Settings';
import TimeAlertTable from '../../containers/TimeAlertTableContainer';
import './style.less';

const PCBKWMonitorAPI = `${SERVER_IP_PCB}/ams/pcb/monitor/capacity`;
// (<p style={{ background: record.level }} className={'inlineTable'}>{record.subShelfSerial}</p>)
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => (<p style={{ background: record.level }} className={'inlineTable'}>{(index + 1)}</p>),
  }, {
    title: 'PCB料号',
    dataIndex: 'partNum',
    key: 'partNum',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.partNum}</p>),
  }, {
    title: '架位',
    dataIndex: 'subShelfSerial',
    key: 'subShelfSerial',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>
      {record.subShelfSerial.length > 1 ? record.subShelfSerial.map((v, i) => <span key={i} style={{ margin: '0 10px' }}>{v}</span>) : record.subShelfSerial}
    </p>),
  }, {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.amount}</p>),
  }];
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
  name: '库位监控',
}];
const PCBKWMonitor = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库位监控" />
    <TimeAlertTable
      action={PCBKWMonitorAPI}
      method="GET"
      timeAlert="ok"
      name="PCBKWMonitorTable"
      columns={columns}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      param={{ condition: [{}] }}
      needClear
    />
  </div>
);
PCBKWMonitor.defaultProps = {

};
PCBKWMonitor.propTypes = {

};

export default PCBKWMonitor;
