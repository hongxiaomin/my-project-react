
/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import TimeAlertTable from '../../containers/TimeAlertTableContainer';
import './style.less';
import { defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';

const TabPane = Tabs.TabPane;
const JigAlertPageApi = `${SERVER_IP_JIG}/ams/jig/alert/online/stencil/list`;
const EventAlertPageApi = `${SERVER_IP_JIG}/ams/jig/alert/online/event/list`;
const JigAlertPageICTApi = `${SERVER_IP_JIG}/ams/jig/alert/online/ict/list`;
const Stencilcolumns = [{
  title: '序号',
  dataIndex: 'indedx',
  key: 'index',
  render: (text, render, index) => (index + 1),
}, {
  title: '钢网二维码',
  dataIndex: 'jigCode',
  key: 'jigCode',

}, {
  title: '工单号',
  dataIndex: 'orderName',
  key: 'orderName',
}, {
  title: '工单类型',
  dataIndex: 'orderType',
  key: 'orderType',
  render: (text, record) => {
    let data;
    switch (record.orderType) {
      case 0:
        data = '内部';
        break;
      case 1:
        data = '外部';
        break;
      default:
    }
    return data;
  },
}, {
  title: '组合料号',
  dataIndex: 'compositeMaterial',
  key: 'compositeMaterial',
}, {
  title: 'PCB料号',
  dataIndex: 'pcbMaterial',
  key: 'pcbMaterial',
}, {
  title: '主板',
  dataIndex: 'mainBoardName',
  key: 'mainBoardName',

}, {
  title: '小板',
  dataIndex: 'subBoardName',
  key: 'subBoardName',

}, {
  title: '面别',
  dataIndex: 'side',
  key: 'side',

}, {
  title: '状态',
  dataIndex: 'jigStatus',
  key: 'jigStatus',
  render: (text, record) => {
    let data;
    switch (record.jigStatus) {
      case 0:
        data = '正常信息';
        break;
      case 1:
        data = '预警';
        break;
      case 2:
        data = '报警';
        break;
      default:
    }
    return data;
  },
}, {
  title: '线别',
  dataIndex: 'lineName',
  key: 'lineName',

}, {
  title: '使用开始时间',
  dataIndex: 'startTime',
  key: 'startTime',

}, {
  title: '剩余生产时间',
  dataIndex: 'remaining',
  key: 'remaining',

}, {
  title: '使用时长',
  dataIndex: 'duration',
  key: 'duration',

}];
const Eventcolumns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, render, index) => (index + 1),
}, {
  title: '时间',
  dataIndex: 'createDate',
  key: 'createDate',
}, {
  title: '状态',
  dataIndex: 'eventStatus',
  key: 'eventStatus',
  render: (text, record) => {
    let data;
    switch (record.eventStatus) {
      case 0:
        data = '正常信息';
        break;
      case 1:
        data = '预警';
        break;
      case 2:
        data = '报警';
        break;
      default:
    }
    return data;
  },
}, {
  title: '类型',
  dataIndex: 'eventType',
  key: 'eventType',
  render: (text, record) => {
    let date;
    switch (record.eventType) {
      case 0:
        date = '工单';
        break;
      case 1:
        date = '治具';
        break;
      case 2:
        date = '工单&治具';
        break;
      case 3:
        date = '其他';
        break;
      default:
    }
    return date;
  },
}, {
  title: '钢网二维码',
  dataIndex: 'eventObject',
  key: 'eventObject',
}, {
  title: '信息内容',
  dataIndex: 'eventDetail',
  key: 'eventDetail',
}];
// {
//   title: '处理结果',
//   dataIndex: 'handleDetail',
//   key: 'handleDetail',
// }
const ICTcolumns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, record, index) => (index + 1),
}, {
  title: '二维码',
  dataIndex: 'jigCode',
  key: 'jigCode',
}, {
  title: '工单号',
  dataIndex: 'orderName',
  key: 'orderName',
}, {
  title: '线别',
  dataIndex: 'lineName',
  key: 'lineName',
}, {
  title: '归还时间',
  dataIndex: 'returnTime',
  key: 'returnTime',
}, {
  title: '归还时长',
  dataIndex: 'remainTime',
  key: 'remainTime',
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治具管理',
}, {
  path: '',
  name: '实时监控',
}];
const JigAlertPage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="实时监控" />
    <Tabs type="card">
      <TabPane tab="钢网" key="1" >
        <TimeAlertTable
          action={JigAlertPageApi}
          method="GET"
          name="JigAlertStencilUpTable"
          timeAlert="ok"
          columns={Stencilcolumns}
          dataSourceTemplate={defaultDataSourceTemplate}
          filters={defaultRequestFilters}
          param={{
            condition: [
                { column: 'orderStatus', value: 7, opt: '=', relation: 'AND' },
                { column: 'status', value: [1, 2], opt: '=', relation: 'AND' }],
            sort: [{ column: 'start_time', value: 'DESC' }],
          }}
        />
      </TabPane>
      <TabPane tab="ICT" key="2">
        <TimeAlertTable
          action={JigAlertPageICTApi}
          method="GET"
          timeAlert="ok"
          name="JigAlertICTUpTable"
          columns={ICTcolumns}
          dataSourceTemplate={defaultDataSourceTemplate}
          filters={defaultRequestFilters}
        />
      </TabPane>
    </Tabs>
    <TimeAlertTable
      action={EventAlertPageApi}
      method="GET"
      timeAlert="ok"
      name="EventAlertUpTable"
      columns={Eventcolumns}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      param={{
        condition: [{ column: 'eventStatus', value: 1, opt: '=', relation: 'OR' },
          { column: 'eventStatus', value: 2, opt: '=', relation: 'OR' }],
        sort: [{ column: 'createDate', value: 'DESC' }],
      }}
    />
  </div>
);
JigAlertPage.defaultProps = {

};
JigAlertPage.propTypes = {

};

export default JigAlertPage;
