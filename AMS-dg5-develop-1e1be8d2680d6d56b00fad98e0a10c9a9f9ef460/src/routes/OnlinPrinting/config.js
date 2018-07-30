import React from 'react';
/// 查询 character角色管理 Chttp://CNBJDRCPC328:8081'
// export const SERVER_IP_OL = 'http://cnbjdrcpc017:8081';
export const SERVER_IP_OL = 'http://CNBJDRCPC328:8080';
// import { SERVER_IP_OL } from '../../constants/Config';
export const actionC = `${SERVER_IP_OL}/ams/dg5/online/label/auth/role/list`;
export const actionAddC = `${SERVER_IP_OL}/ams/dg5/online/label/auth/role`;
export const actionUpdateC = `${SERVER_IP_OL}/ams/dg5/online/label/auth/role/edit`;

// 查询 Model 机种管理页面 M
export const actionM = `${SERVER_IP_OL}/ams/dg5/online/label/machine/list`;
export const actionAddM = `${SERVER_IP_OL}/ams/dg5/online/label/machine/add`;



// 查询 Manage 参数管理页面 MG
export const actionWorkOrderMG = `${SERVER_IP_OL}/ams/dg5/lable/online/workorder/get`;
export const actionAllMG = `${SERVER_IP_OL}/ams/dg5/lable/online/workorder/properties/get`;
export const actionPurchaserMG = `${SERVER_IP_OL}/ams/dg5/lable/online/purchaser/get`;
export const actionMachineMG = `${SERVER_IP_OL}/ams/dg5/lable/online/machine/get`;
export const actionCountryMG = `${SERVER_IP_OL}/ams/dg5/lable/online/country/get`;
export const actionSpecIdMG = `${SERVER_IP_OL}/ams/dg5/lable/online/specificationId/get`;
export const actionMG = `${SERVER_IP_OL}/ams/dg5/lable/online/workorder/pagecondition`;
export const actionAddOrSetMG = `${SERVER_IP_OL}/ams/dg5/lable/online/workorder/addOrEdit`;
export const actionUptSetMg = `${SERVER_IP_OL}/ams/dg5/lable/online/parameters/edit`;
export const actionParamMG = `${SERVER_IP_OL}/ams/dg5/lable/online/parameters/edit`;

// 查询 Assign 参数分配页面 A
export const actionTbA = `${SERVER_IP_OL}/ams/dg5/lable/online/parameters/getByOrderId`;
export const actionWDA = `${SERVER_IP_OL}/ams/dg5/lable/online/workorder/get`;
export const actionInPA = `${SERVER_IP_OL}/ams/dg5/lable/online/workorder/properties/get`;
export const actionConFA = `${SERVER_IP_OL}/ams/dg5/lable/online/parameter/confirmed`;
export const actionCamcelA = `${SERVER_IP_OL}/ams/dg5/lable/online/parameter/cancel`;


export const breadMap=[{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'label首件程式自动生成',
}];

export const field = [
  { Header: '序号', accessor: 'id' },
  { Header: '角色', accessor: 'name'},
  { Header: '备注', accessor: 'description' },
];
export const modelfield = [
  { Header: '序号', accessor: 'id' },
  { Header: '客户', accessor: 'purchaser' },
  { Header: '机种', accessor: 'machine'},
  { Header: '国别', accessor: 'country' },
];
export const managefield = [
  { Header:'序号', accessor: 'workOrderId' },
  { Header:'客户', accessor: 'purchaser' },
  { Header:'机种', accessor: 'machineName' },
  { Header:'国别', accessor: 'country' },
  { Header:'工单', accessor: 'workOrder' },
];
export const assignfield = [
  { Header: '序号', accessor: 'roleId' },
  { Header: '维护人员', accessor: 'role' },
  { Header: '参数名',
  accessor: 'parameter',
  Cell: (text) => {
   const obj = JSON.parse(text.value);
   const productFromEquip = Object.keys(obj);
   if (productFromEquip) {
     return productFromEquip.length > 1
       ? productFromEquip.map((v, i) => <p className={'relationTab'} key={i}>{v}</p>)
       : productFromEquip.map((v, i) => <p key={i}>{v}</p>);
   }
   return '';
 },
 },
  { Header: '参数值',
   accessor: 'parameter',
   Cell: (text) => {
    const obj = JSON.parse(text.value);
    const productFromEquip = Object.values(obj);
    if (productFromEquip) {
      return productFromEquip.length > 1
        ? productFromEquip.map((v, i) => <p className={'relationTab'} key={i}>{v}</p>)
        : productFromEquip.map((v, i) => <p key={i}>{v}</p>);
    }
    return '';
  },
 },
  { Header: '工程状态',
    accessor: 'status',
    Cell: text => {
      switch (text.value) {
        case 0:
          return '已确认';
        case -1:
          return '未确认';
        default:
          return '';
      };
  }},
];
