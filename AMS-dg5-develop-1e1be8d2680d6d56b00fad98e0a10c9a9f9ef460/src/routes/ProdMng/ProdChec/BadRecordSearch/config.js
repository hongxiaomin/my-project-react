import React from 'react';
import { SERVER_IP } from '../../../../constants/Config';
// const SERVER_IP = 'http://172.22.27.13:8081';

export const action = `${SERVER_IP}/ams/smt/product/qc/defective`;
export const phenomenaAction = `${SERVER_IP}/ams/smt/product/defective/phenomena`;
export const unitAction = `${SERVER_IP}/ams/smt/product/responsibility/unit`;
export const lineAction = `${SERVER_IP}/ams/smt/product/lineNames`;
export const actionPut = `${SERVER_IP}/ams/smt/product/qc/defective/reason`;

export const field = [
  { Header: '序号', accessor: 'defectiveDetailId', Cell: text => (text.index + 1) },
  { Header: '线别', accessor: 'lineName' },
  { Header: '工单', accessor: 'workOrder' },
  { Header: 'PCB编号', accessor: 'sn' },
  { Header: '机种', accessor: 'model' },
  { Header: '不良位置', accessor: 'defectivePosition' },
  {
    expander: true,
    Header: '不良现象',
    accessor: 'defectivePhenomena',
    width: 150,
    Expander: ({ isExpanded, ...rest }) => (
      <div>
        {isExpanded
        ? <span><a>&#x2299;{rest.original.defectivePhenomena}</a></span>
        : <span><a>&#x2295;{rest.original.defectivePhenomena}</a></span>}
      </div>
    ),
  },
  { Header: '责任单位', accessor: 'responsibilityUnit' },
  {
    Header: '不良原因录入状态',
    accessor: 'enterStatus',
    Cell: (row) => {
      if (row.original.enterStatus === 1) {
        return '已录入';
      }
      return '待录入';
    },
  },
];

export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '成品管理',
}, {
  path: '',
  name: '成品抽检',
}, {
  path: '',
  name: '不良记录查询',
}];

