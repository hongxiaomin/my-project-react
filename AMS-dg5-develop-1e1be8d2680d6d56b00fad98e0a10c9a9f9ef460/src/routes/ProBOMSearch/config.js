import { SERVER_IP } from '../../constants/Config';
// export const SERVER_IP = 'http://172.22.27.20:8081';

export const action = `${SERVER_IP}/ams/dg5/bom/queryall`;
export const downloadAction = `${SERVER_IP}/ams/dg5/bom/download`;
export const copyAction = `${SERVER_IP}/ams/dg5/bom/create/doublecheck`;
export const searchAction = `${SERVER_IP}/ams/dg5/bom/exist/reportname?bomReportName=`;
export const detailAction = `${SERVER_IP}/ams/dg5/bom/detail`;
export const detailActionPut = `${SERVER_IP}/ams/dg5/bom/detail/update`;
export const detailActionDel = `${SERVER_IP}/ams/dg5/bom/detail/delete`;
export const detailActionPost = `${SERVER_IP}/ams/dg5/bom/detail/create`;

export const field = [
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '程式料表名称', accessor: 'bomReportName' },
  { Header: '机种名称', accessor: 'productName' },
  { Header: '面別', accessor: 'side' },
  { Header: '版本', accessor: 'version' },
  { Header: '组合十码', accessor: 'assembleNo' },
  { Header: 'NXT类型', accessor: 'nxtType' },
  { Header: '模组', accessor: 'moduleNum' },
  { Header: 'PCB料号', accessor: 'pcbNo', show: false },
  { Header: 'Grouping', accessor: 'grouping', show: false },
  { Header: '创建者', accessor: 'createBy', show: false },
  { Header: '创建日期', accessor: 'createDate', show: false },
];
export const detailField = [
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '站位', accessor: 'pos' },
  { Header: '料号', accessor: 'materialNo' },
  { Header: '规格', accessor: 'description' },
  { Header: 'Feeder类型', accessor: 'feederType' },
  { Header: '用量', accessor: 'qty' },
  { Header: '打件位置', accessor: 'location' },
  { Header: '代用料', accessor: 'alternativeMaterial' },
  { Header: 'MSL等级', accessor: 'msl' },
  { Header: '最后修改人員', accessor: 'lastUpdateBy' },
  { Header: '最后修改时间', accessor: 'lastUpdateDate' },
];

export const sideData = [
  { id: '', name: '<空>' },
  { id: 'A', name: 'A' },
  { id: 'B', name: 'B' },
];

export const moduleData = [
  { id: '', name: '<空>' },
  { id: '2', name: '2' },
  { id: '4', name: '4' },
  { id: '6', name: '6' },
  { id: '8', name: '8' },
  { id: '10', name: '10' },
  { id: '12', name: '12' },
  { id: '14', name: '14' },
  { id: '16', name: '16' },
];
export const NXTData = [
  { id: '', name: '<空>' },
  { id: 'NXT-1', name: 'NXT-1' },
  { id: 'NXT-2', name: 'NXT-2' },
  { id: 'NXT-3', name: 'NXT-3' },
];

export const GroupingData = [
  { id: '', name: '<空>' },
  { id: 'Y', name: 'Y' },
  { id: 'N', name: 'N' },
];


export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '程式料表',
}, {
  path: '',
  name: '程式料表查询',
},
];
