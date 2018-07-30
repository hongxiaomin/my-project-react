import React from 'react';
import {SERVER_IP} from '../../../../constants/Config';
export const action = `${SERVER_IP}/ams/smt/product/stockout/records`;
// export const action = `http://172.22.27.13:8081/ams/smt/product/stockout/records`;
export const field = [
  { Header: '序号', accessor: 'id' },
  { Header: '线别', accessor: 'lineName' },
  { Header: '工单号', accessor: 'workOrder' },
  { Header: '组合十码', accessor: 'combineId', width: 150 },
  {
    expander: true,
    Header: '框架编号',
    accessor: 'barcode',
    width: 150,
    Expander: ({ isExpanded, ...rest }) => (
      <div>
        {isExpanded
        ? <span><a>&#x2299;{rest.original.barcode}</a></span>
        : <span><a>&#x2295;{rest.original.barcode}</a></span>}
      </div>
    ),
  },
  { Header: 'PCB数量', accessor: 'pcbCount' },
  { Header: '出库人', accessor: 'operator' },
  { Header: '二阶线别', accessor: 'mainLineName' },
  { Header: '二阶接收人', accessor: 'mainLineRecevicer' },
  { Header: '入库时间', accessor: 'operateTime', width: 200 },
];

export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '成品管理',
}, {
  path: '',
  name: '库存管理',
}, {
  path: '',
  name: '出库记录查询',
}];