import { SERVER_IP } from '../../../constants/Config';
// const SERVER_IP = 'http://172.22.27.84:8081';

export const action = `${SERVER_IP}/ams/dg5/bom/queryall`;
export const actionPut = `${SERVER_IP}/ams/workorder`;
export const field = [
  { Header: '序号', accessor: 'id' },
  { Header: '组合十码', accessor: 'combinationNumber' },
  { Header: '机种名称', accessor: 'productName' },
  { Header: '客户', accessor: 'status' },
  { Header: 'PCB料号', accessor: 'count' },
  { Header: 'PCB尺寸', accessor: 'currentCount' },
  { Header: '条码类型', accessor: 'onlineTimePlan' },
  { Header: '白漆', accessor: 'onlineTimeActual' },
  { Header: '特殊工艺', accessor: 'offlineTimePlan' },
  { Header: '最后修改者', accessor: 'lastUpdateBy' },
  { Header: '最后修改時間', accessor: 'lastUpdateDate', width: 200 },
];


export const barCodeData = [
  { id: '1', name: '二维码不带版本' },
  { id: '2', name: '二维码带版本' },
];

export const optionsData = [
  { id: '1', name: '机种工時-A' },
  { id: '2', name: '机种工時-B' },
  { id: '3', name: '人力工時-A' },
  { id: '4', name: '人力工時-B' },
  { id: '5', name: '生产工具' },
];

export const paintData = [
  { id: '1', name: '无白漆' },
  { id: '2', name: '双面白漆-绿油' },
  { id: '3', name: '双面白漆-铜面' },
  { id: '4', name: '双面白漆-线路' },
  { id: '5', name: '单面白漆-绿油' },
  { id: '6', name: '单面白漆-铜面' },
  { id: '7', name: '单面白漆-线路' },
];

export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '机种管理',
},
{
  path: '',
  name: '机种查询',
},
];

