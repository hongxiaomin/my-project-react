import { SERVER_IP } from '../../../constants/Config';
// const SERVER_IP = 'http://172.22.27.84:8081';

export const action = `${SERVER_IP}/ams/dg5/component/query`;
export const actionPost = `${SERVER_IP}/ams/dg5/component/query`;
export const actionPut = `${SERVER_IP}/ams/dg5/component/query`;
export const actionDel = `${SERVER_IP}/ams/dg5/component/query`;
export const productAction = `${SERVER_IP}/ams/workorder/status`;
// export const productAction = 'http://172.22.27.13:8081/ams/smt/product/lineNames';

export const field = [
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '机种', accessor: 'productName' },
  { Header: 'PCB料号', accessor: 'materialNo' },
  { Header: '长度', accessor: 'length' },
  { Header: '宽度', accessor: 'width' },
  { Header: '高度', accessor: 'height' },
  { Header: '最后修改者', accessor: 'lastUpdateBy' },
  { Header: '最后修改时间', accessor: 'lastUpdateDate', width: 200 },
];

export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '机种管理',
}, {
  path: '',
  name: 'PCB设定',
},
];
