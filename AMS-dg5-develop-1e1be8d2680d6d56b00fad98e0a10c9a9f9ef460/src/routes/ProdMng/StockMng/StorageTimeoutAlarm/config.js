import { SERVER_IP } from '../../../../constants/Config';

export const storageTimeoutAlarmTableField = [
  { Header: '序号',  accessor: 'id',  Cell: text  => (text.index  +  1) },
  { Header: '线别', accessor: 'lineName' },
  { Header: '工单号', accessor: 'workOrder' },
  { Header: '存放位置', accessor: 'shelfCode' },
  { Header: '框架编号', accessor: 'barcode' },
  { Header: 'PCB数量', accessor: 'pcbCount' },
  { Header: '入库时间', accessor: 'stockInTime' },
  { Header: '超时时间', accessor: 'overtime' },
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
  name: '存放超时预警',
}];
export const action = `${SERVER_IP}/ams/smt/product/alarm/overtime`;
// export const action = ' http://172.22.27.13:8081/ams/smt/product/alarm/overtime';
