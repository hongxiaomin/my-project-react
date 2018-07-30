export const action = 'http://172.22.27.216:8081/ams/workorder';
export const statusAction = 'http://172.22.27.216:8081/ams/workorder/status';
export const productAction = 'http://172.22.27.216:8081/ams/product';
export const field = [
  { Header: '序号', accessor: 'id' },
  { Header: 'POS', accessor: 'workorder' },
  { Header: '料号', accessor: 'combinationNumber' },
  { Header: '规格', accessor: 'productName' },
  { Header: 'FeederType', accessor: 'status' },
  { Header: '数量', accessor: 'count' },
  { Header: '位置', accessor: 'currentCount' },
  { Header: '代用料', accessor: 'onlineTimePlan' },
  { Header: 'MSL', accessor: 'onlineTimeActual' },
];
export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '发料料表',
}];
