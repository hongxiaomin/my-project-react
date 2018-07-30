import { FormAction } from '@delta/common-utils';
import React from 'react';
import { Popconfirm } from 'antd';
import Request from '../../../utils/fetchData';
import { SERVER_IP } from '../../../constants/Config';

// const SERVER_IP = 'http://172.22.27.13:8081';

export const scrapAction = `${SERVER_IP}/ams/smt/product/repair/status/scrap`;
export const action = `${SERVER_IP}/ams/smt/product/repair`;
export const actionUpdate = `${SERVER_IP}/ams/smt/product/repair/status`;
export const lineAction = `${SERVER_IP}/ams/smt/product/lineNames`;


const headers = new Headers();
const method = 'PUT';


export const status = [
  { id: '', name: '<空>' },
  { id: '0', name: '待维修' },
  { id: '1', name: '维修中' },
  { id: '2', name: '维修结束' },
  { id: '3', name: '制程报废' },
];
export const field = (_this, tools) => ([
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '工单号', accessor: 'workOrder' },
  { Header: '线別', accessor: 'lineName' },
  { Header: 'PCB编号', accessor: 'sn' },
  {
    Header: '维修状态',
    accessor: 'status',
    Cell: (text) => {
      const statusData = text.original.status;
      switch (statusData) {
        case '0':
          return '待维修';
        case '1':
          return '维修中';
        case '2':
          return '维修结束';
        case '3':
          return '制程报废';
        default:
          return '--';
      }
    }
  },
  { Header: '创建时间', accessor: 'createTime' },
  {
    Header: '操作',
    accessor: 'id',
    Cell: (text) => {
      const snData = text.original.id;
      const snStatus = text.original.status;
      const data = JSON.stringify({ id: snData });
      const callback = (response) => {
        const { code, message } = response;
        if (code === 0) {
          _this.setState({ snackSwitch: true, message });
          setTimeout(() => {
            const { getProps, trigger } = tools;
            const props = getProps('RepairMngForm');
            return trigger(FormAction.onSubmit(props));
          }, 1000);
        }
        _this.setState({ snackSwitch: true, message });
      };
      return (
        snStatus !== '3' ?
          (
            <Popconfirm
              title="确定要做报废处理吗?"
              onConfirm={() => {
                Request(scrapAction, {
                  headers,
                  method,
                  contentType: 'application/json',
                  data,
                  callback,
                });
              }}
            >
              <a href="#">报废</a>
            </Popconfirm >
          ) : <span>报废</span>
      );
    },
  },
]);
