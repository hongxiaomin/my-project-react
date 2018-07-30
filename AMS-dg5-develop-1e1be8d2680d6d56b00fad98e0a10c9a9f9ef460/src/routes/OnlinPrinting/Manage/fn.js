import React from 'react';
import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import { actionWorkOrderMG, actionMachineMG, actionPurchaserMG, actionCountryMG, actionSpecIdMG, actionTbA } from '../config';

export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });

// const clearModal = () => ({
//   method: undefined,
// });

//公共定义
export const unique = (arr) => {
  const uniqueObj = {};
  let returnArr = [];
  arr.forEach((item) => {
    uniqueObj[JSON.stringify(item)] = item;
  });
  returnArr = Object.keys(uniqueObj).map(u =>
  JSON.parse(u));
  return returnArr;
};

export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('manageForm');
  return trigger(FormAction.onSubmit(props));
};

export const onInitialVal = () =>{

}

//初始化接口
export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(actionWorkOrderMG);
  const WorkOrderVal = rows.map(({ workOrder }) => ({ workOrder }));
  _this.setState({ workOrderData: WorkOrderVal});
};

export const onInitialQuest = _this => async () => {
  const { message: { rows } = {} } = await fetchData(actionPurchaserMG);
  const QuestVal =  rows.map(({ purchaserId, purchaser }) => ({ purchaserId, purchaser }));
  _this.setState({ questData: QuestVal });
};

//联动接口
export const onQuestChange =_this =>async (value) => {
  const options = { data:{ purchaser: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionMachineMG, options);
  const obj = rows.map(({ machineName, purchaserMachineId }) => ({ machineName, purchaserMachineId }));
  _this.setState({ machineData: obj, questVal: value});
};

export const onMachineChange =_this =>async (value) => {
  const options = { data:{ machineId: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionCountryMG, options);
  const obj = rows.map(({ country, machineCountryId }) => ({ country, machineCountryId }));
  _this.setState({ countryData: obj, machineVal: value});
};

export const onCountryChange =_this =>async (value) => {
  const options = { data:{machineCountryId: _this.state.machineVal, purchaserMachineId: _this.state.questVal },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionSpecIdMG, options);
  _this.setState({ specId: rows.specificationId });
};

//查询Table数据
export const dataSourceTemplate = response => response.rows;

export const onSubmit = _this => () => _this.setState({ selected: undefined });
export const onSuccess = _this => ({ message: data = [] }) => {
  const message = data.length > 0 ? '查询成功' : '未查询到相关结果';
  _this.setState({
    loading: false,
    data3: data,
    snackSwitch: true,
    message,
  });
};
export const onParamSuccess = _this => async (response) =>{
  if (response.message.code >= 0) {
    _this.setState({ open: false, dialogSwitch: false, snackSwitch: true,  message: '修改成功'});
  } else {
    _this.setState({
      dialogSwitch: false,
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交内容是否正确',
    });
  }
};

//弹框公共方法
export const onSubmitModal = _this => () => _this.setState({ loading: true });
export const onSuccesModal = _this => async ({ message: { code } }, tools) => {
  if (code >= 0) {
    await onRefresh(tools);
    _this.setState({ loading: false, dialogSwitch: false });
  } else {
    _this.setState({
      dialogSwitch: false,
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交内容是否正确',
    });
  }
};
export const onErrorModal = _this => () => _this.setState({
  dialogSwitch: false,
  loading: false,
  snackSwitch: true,
  message: '提交失敗，發生未預期錯誤',
});
export const onCloseModal = _this => () => _this.setState({ dialogSwitch: false });

export const onCloseDialog = _this => () => _this.setState({ open: false });

//新增弹框
export const onCreate = _this => () => {
  _this.setState({
    workOrder: undefined,
    dialogSwitch: true,
  });
};
export const AdddialogDataTemplate = _this => (data) => {
  const workOrder = data.workOrder;
  const specificationId  = _this.state.specId;
  const datas = {workOrder, specificationId };
  return datas;
};
export const ParamDialogTemplate = _this => (data) => {
  const parameterId = _this.state.parameterId;
  const val1 = Object.values(data);
  const num = val1.length;
  const val2 = [];
  let obj1 = {};
  val1.map((v,i)=>{
    if(i%2===0){
        obj1[v] = val1[i+1];
    }
  });
  const paramRep = (JSON.stringify(obj1).replace(/\"/g, '%22').replace(/\{/g, '%7b')).replace(/\}/g, '%7d');
  const datas ={parameterId,parameter:paramRep};
  return datas;
};
//更新弹框
export const onUpdate = _this => () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '請選擇一個項目' });
    return;
  }
  const { data3 } = _this.state;
  const selectedData = data3.find(item => item.workOrderId === _this.state.selected);
  if (selectedData) {
    const workOrder = selectedData.workOrder;
    const purchaserId = selectedData.purchaserId;
    const purchaserMachineId = selectedData.purchaserMachineId;
    const machineCountryId = selectedData.machineCountryId;
    const specificationId = selectedData.specificationId;
    _this.setState({
      workOrder: workOrder,
      purchaserId: purchaserId,
      purchaserMachineId: purchaserMachineId,
      machineCountryId: machineCountryId,
      specificationId: specificationId,
    });
  }
  return true;
};

export const ModelDataTemplateSet = _this => (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });
  const preSpecificationId = _this.state.specificationId;
  const {workOrder} = data;
  const purchaserMachineId = data.purchaser;
  const machineCountryId = data.machineName;
  const newData = Object.assign({workOrder, preSpecificationId, purchaserMachineId, machineCountryId},{workOrderId:_this.state.selected});
  return newData;
};

export const onSubmitModalSet = _this => () => _this.setState({ loading: true });
export const onSuccesModalSet = _this => async ({ message: { code } }, tools) => {
  if (code >= 0) {
    await onRefresh(tools);
    _this.setState({ loading: false, dialogSwitch: false });
  } else {
    _this.setState({
      dialogSwitch: false,
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交内容是否正确',
    });
  }
};
export const onErrorModalSet = _this => () => _this.setState({
  dialogSwitch: false,
  loading: false,
  snackSwitch: true,
  message: '提交失敗，發生未預期錯誤',
});

//获取表格数据
export const getRowProps = _this => selected => (state, rowInfo) => (
  {
    onClick: () => {console.log(rowInfo); return _this.setState({ selected: rowInfo.row.workOrderId });},
    onDoubleClick:()=>{
      _this.setState({ open: true,});
    const options = { data:{ workOrderId: rowInfo.row.workOrderId },method: 'GET'};
    fetchData(actionTbA, options).then((response) => {
      const { message: { rows } = {} } = response;
      const roleData = rows.map(({ role, roleId }) => ({ role, roleId }));
      _this.setState({ roleData,});
    });

    },
    style: {
      backgroundColor: rowInfo && rowInfo.row.workOrderId === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);
// 获取参数
export const onParametersChange =_this =>async (value) => {
  const options = { data:{ workOrderId: _this.state.selected, roleId: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionTbA, options);
  const objData = rows ? JSON.parse(rows[0].parameter) : {};
  const parameterId = rows ? rows[0].parameterId : '';
  const parameterData = objData;
  const key = Object.keys(objData);
  const val = Object.values(objData);
  const arr = [];
  key.map((v,i)=>{
    arr.push({i: v,v: val[i]});
  })
  _this.setState({ ParamListData: [...arr], parameterId: parameterId, parameterData: parameterData});
};

export const onAddParameter = _this =>() => {
  const addArr = [..._this.state.ParamListData];
  addArr.push({i:'',v:''});
  _this.setState({ ParamListData: [...addArr]});
};
export const onCelParameter = _this => (i) => (tools) => {
  const delData =_this.state.ParamListData;
  if(delData){
    delData.splice(i,1);
  }
  _this.setState({ ParamListData: [...delData] });
};



