// export const UPMIP ='http://172.22.27.84:8081/WebPlugin-BOM-DG5';
// export const action = `${UPMIP}/ams/dg5/bom/queryfor/feeding`;
import {SERVER_IP} from '../../constants/Config'
// export const action = 'http://172.22.27.20:8081/ams/dg5/bom/queryfor/feeding'
export const action = `${SERVER_IP}/ams/dg5/bom/queryfor/feeding`;

export const colunm =[
  { Header: '序号', accessor: 'id' },
  { Header: '程式料表名称', accessor: 'bomReportName' },
  { Header: '组合十码', accessor: 'assembleNo' },
  { Header: 'PCB料号', accessor: 'pcbNo' },
  { Header: '机种', accessor: 'nxtType' },
  { Header: '面别', accessor: 'side' },
];

export const field = [
  { Header: '序号', accessor: 'id', width:50 },
  { Header: '料站', accessor: 'slot' },
  { Header: '料号', accessor: 'materialNo' },
  { Header: '规格', accessor: 'description' },
  { Header: 'MachineType', accessor: 'machineType' },
  { Header: '数量', accessor: 'qty', width:50},
  { Header: '位置', accessor: 'location', width:300 },
];

export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '上料料表',
}];

