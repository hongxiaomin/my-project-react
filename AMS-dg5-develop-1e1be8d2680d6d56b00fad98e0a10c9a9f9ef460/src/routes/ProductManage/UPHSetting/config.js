import { SERVER_IP } from '../../../constants/Config';
// const SERVER_IP = 'http://172.22.27.84:8081';

export const action = `${SERVER_IP}/ams/dg5/component/query`;
export const actionPost = `${SERVER_IP}/ams/dg5/component/query`;
export const actionPut = `${SERVER_IP}/ams/dg5/component/query`;
export const actionDel = `${SERVER_IP}/ams/dg5/component/query`;
export const productAction = `${SERVER_IP}/ams/dg5/component/query`;
export const lineTypeAction = `${SERVER_IP}/ams/dg5/component/query`;
// export const productAction = 'http://172.22.27.13:8081/ams/smt/product/lineNames';
// export const lineTypeAction = 'http://172.22.27.13:8081/ams/smt/product/lineNames';

export const field = [
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '机种', accessor: 'productName' },
  { Header: '线体类型', accessor: 'lineType' },
  { Header: 'UPH-A', accessor: 'upha' },
  { Header: 'UPH-B', accessor: 'uphb' },
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
  name: 'UPH设定',
},
];

export const productData = [
  { id: '1', name: '机种A' },
  { id: '2', name: '机种B' },
];

export const lineData = [
  { id: '1', name: '线体A' },
  { id: '2', name: '线体B' },
];
