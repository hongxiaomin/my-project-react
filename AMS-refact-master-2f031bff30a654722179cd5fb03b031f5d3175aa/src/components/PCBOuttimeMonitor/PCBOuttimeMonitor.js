import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  SERVER_IP_PCB } from '../../constants/Settings';
import TimeAlertTable from '../../containers/TimeAlertTableContainer';

const PCBOuttimeMonitorAPI = `${SERVER_IP_PCB}/ams/pcb/monitor/expired`;
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
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.subShelfSerial}</p>),
  }, {
    title: 'PCB Code',
    dataIndex: 'pcbCode',
    key: 'pcbCode',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.pcbCode}</p>),
  }, {
    title: 'Date Code',
    dataIndex: 'dataCode',
    key: 'dataCode',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.dataCode}</p>),
  }, {
    title: '库存数量',
    dataIndex: 'amount',
    key: 'amount',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.amount}</p>),
  }, {
    title: '剩余有效时间',
    dataIndex: 'effectTime',
    key: 'effectTime',
    render: (text, record) => (<p style={{ background: record.level }} className={'inlineTable'}>{record.effectTime}</p>),
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
  name: '超期监控',
}];
const PCBOuttimeMonitor = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="超期监控" />
    <TimeAlertTable
      action={PCBOuttimeMonitorAPI}
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
PCBOuttimeMonitor.defaultProps = {

};
PCBOuttimeMonitor.propTypes = {

};

export default PCBOuttimeMonitor;
