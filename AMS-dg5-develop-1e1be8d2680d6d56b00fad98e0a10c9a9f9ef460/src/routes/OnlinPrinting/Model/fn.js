import fetchData from '../../../utils/fetchData';
import { actionM, actionPM, actionCM, actionAddM } from '../config';
import { FormAction } from '@delta/common-utils';

export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(actionM);
  const obj = rows.map(({ id, purchaser }) => ({ id, purchaser }));
  const arr =[];
  obj.map((v)=>{
    arr.push(v.purchaser);
  });
  const res2 = unique(arr);
  const purchaserData =[];
  res2.map((v,i)=>{
    purchaserData.push({id: i, purchaser: v});
  });
  purchaserData.unshift({id: -1, purchaser:'请选择...'});
  _this.setState({ purchaserData, purchaserDataM: purchaserData });
};
export const ModelDataTemplate = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });
  return data;
};
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
export const dataSourceTemplate = response => response.rows;
export const onChange =_this =>async (value) => {
  const options = { data:{purchaser: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionM, options);
  const obj = rows.map(({ id, machine }) => ({ id, machine }));
  const arr =[];
  obj.map((v)=>{
    arr.push(v.machine);
  });
  const res2 = unique(arr);
  const machineData =[];
  res2.map((v,i)=>{
    machineData.push({id: i, machine: v});
  });
  machineData.unshift({id: -1, machine:'请选择...'});
  _this.setState({ machineData, formPurchaserData: value });
};
export const onChange1 =_this =>async (value) => {
  const options = { data:{purchaser: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionM, options);
  const obj = rows.map(({ id, machine }) => ({ id, machine }));
  const arr =[];
  obj.map((v)=>{
    arr.push(v.machine);
  });
  const res2 = unique(arr);
  const machineDataM =[];
  res2.map((v,i)=>{
    machineDataM.push({id: i, machine: v});
  });
  machineDataM.unshift({id: -1, machine:'请选择...'});
  _this.setState({ machineDataM, formPurchaserData1: value });
};
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
export const onNextChange =_this =>async (value, tools) => {
  const options = { data:{ purchaser: _this.state.formPurchaserData, machine: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionM, options);
  const obj = rows.map(({ id, country }) => ({ id, country }));
  const arr =[];
  obj.map((v)=>{
    arr.push(v.country);
  });
  const res2 = unique(arr);
  const countryData =[];
  res2.map((v,i)=>{
    countryData.push({id: i, country: v});
  });
  countryData.unshift({id: -1, country:'请选择...'});
  _this.setState({ countryData });
};
export const onNextChange1 =_this =>async (value, tools) => {
  const options = { data:{ purchaser: _this.state.formPurchaserData1, machine: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionM, options);
  const obj = rows.map(({ id, country }) => ({ id, country }));
  const arr =[];
  obj.map((v)=>{
    arr.push(v.country);
  });
  const res2 = unique(arr);
  const countryDataM =[];
  res2.map((v,i)=>{
    countryDataM.push({id: i, country: v});
  });
  countryDataM.unshift({id: -1, country:'请选择...'});
  _this.setState({ countryDataM });
};
export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('modelForm');
  return trigger(FormAction.onSubmit(props));
};
export const onSubmitModal = _this => () => _this.setState({ loading: true });
export const onSuccesModal = _this =>async (response, tools) => {
  if (response.code >= 0) {
      await onRefresh(tools);
      _this.setState({loading: false, shouldModalShow: false, dialogSwitch:false });
    } else {
      _this.setState({
        shouldModalShow: false,
        loading: false,
        snackSwitch: true,
        dialogSwitch:false,
        message: '提交失败，请确认提交内容是否正确',
      });
    };
  };
  export const onCloseModal = _this => () => _this.setState({ dialogSwitch: false });
  export const onErrorModal = _this => () => _this.setState({
    dialogSwitch: false,
    loading: false,
    snackSwitch: true,
    message: '提交失败，发生未预期错误',
  });
  export const onUpdate = _this => () => {
      _this.setState({ dialogSwitch: true});
  };
  export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
