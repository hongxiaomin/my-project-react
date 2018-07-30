
import { SERVER_IP } from '../../../constants/Config';

// const SERVER_IP = 'http://172.22.27.13:8081';

export const action = `${SERVER_IP}/ams/smt/product/repair/statistics`;
export const lineAction = `${SERVER_IP}/ams/smt/product/lineNames`;


export const field = [
  { Header: '序号', accessor: 'id', Cell: text => (text.index + 1) },
  { Header: '线別', accessor: 'lineName' },
  { Header: '工单号', accessor: 'workOrder' },
  { Header: '白班不良數', accessor: 'defectiveCountShiftA' },
  { Header: '白班待維修', accessor: 'waitRepairCountShiftA' },
  { Header: '白班維修中', accessor: 'repairingCountShiftA' },
  { Header: '夜班不良數', accessor: 'defectiveCountShiftB' },
  { Header: '夜班待維修', accessor: 'waitRepairCountShiftB' },
  { Header: '夜班維修中', accessor: 'repairingCountShiftB' },
];
