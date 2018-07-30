import { SERVER_IP } from '../../constants/Config';
// const SERVER_IP = 'http://172.22.27.84:8081';

export const action = `${SERVER_IP}/ams/dg5/component/query`;
export const actionPut = `${SERVER_IP}/ams/dg5/component/edit`;
export const field = [
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '料号', accessor: 'materialNo' },
  { Header: '规格', accessor: 'description' },
  { Header: '供应商', accessor: 'vendorName' },
  { Header: 'USL', accessor: 'usl' },
  { Header: 'LSL', accessor: 'lsl' },
  { Header: 'MSL', accessor: 'msl' },
  { Header: 'ESD', accessor: 'esd' },
  { Header: '零件类型', accessor: 'componentType' },
  { Header: '可量测', accessor: 'measurable' },
  { Header: '图片', accessor: 'image' },
  { Header: 'Pin脚', accessor: 'pin', show: false },
  { Header: 'Marking', accessor: 'marking', show: false },
  { Header: 'Keywords', accessor: 'keyword', show: false },
  { Header: 'Package', accessor: 'componentPackage', show: false },
  { Header: 'Vendor Code', accessor: 'vendorCode', show: false },
  { Header: 'Vendor Part', accessor: 'vendorPartNum', show: false },
  { Header: '创建者', accessor: 'createBy', show: false },
  { Header: '创建时间', accessor: 'createDate', show: false },
  { Header: '最后更新者', accessor: 'lastUpdateBy', show: false },
  { Header: '最后更新时间', accessor: 'lastUpdateDate', show: false },
];

export const measureData = [
  { id: '', name: '<空>' },
  { id: 'Y', name: 'Y' },
  { id: 'N', name: 'N' },
];

export const typeData = [
  { id: '', name: '<空>' },
  { id: 'R', name: 'R' },
  { id: 'C', name: 'C' },
  { id: 'L', name: 'L' },
  { id: '晶振', name: '晶振' },
  { id: 'LED', name: 'LED' },
  { id: 'SOT', name: 'SOT' },
  { id: '二极管', name: '二极管' },
  { id: 'LF', name: 'LF' },
  { id: 'MOS', name: 'MOS' },
  { id: 'TE', name: 'TE' },
  { id: '其他', name: '其他' },
];


export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '料号管理',
},
];
