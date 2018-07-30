import fetchData from '../../../utils/fetchData';
import { actionC, actionPM, actionCM, actionAddM } from '../config';
import { FormAction } from '@delta/common-utils';

const clearModal = () => ({
  id: undefined,
  roleDataMSetId: undefined,//*
  descriptionSet: undefined,
});
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
export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(actionC);
  const obj = rows.map(({ id, name }) => ({ id, name }));
  const arr =[];
  const roleData =[];
  obj.map((v)=>{
    arr.push(v.name);
  });
  const res2 = unique(arr);
  const purchaserData =[];
  res2.map((v,i)=>{
    roleData.push({id: i, name: v});
  });
  roleData.unshift({id: -1, name:'请选择...'});
  _this.setState({ roleData, roleDataM: roleData, roleDataMSet: roleData});
};
export const ModelDataTemplate = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });
  return data;
};
export const ModelDataTemplateSet = _this => (data) => {
  console.log(data)
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });
  const newData = Object.assign({},{...data},{id:_this.state.selected})
  return newData;
};
export const onSubmit = _this => () => _this.setState({ selected: undefined });
export const onSuccess = _this => ({ message: data = [] }) => {
  const message = data.length > 0 ? '查询成功' : '未查询到相关结果';
  _this.setState({
    loading: false,
    data1: data,
    snackSwitch: true,
    message,
  });
};
export const dataSourceTemplate = response => response.rows;

export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('CharacterForm');
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
// 修改
  export const getRowProps = _this => selected => (state, rowInfo) => (
    {
      onClick: () => _this.setState({ selected: rowInfo.row.id }),
      style: {
        backgroundColor: rowInfo && rowInfo.row.id === selected ? '#d4dcda' : 'transparent',
        cursor: 'pointer',
      },
    }
  );
  export const shouldModalShow = _this => () => {
    if (_this.state.selected === undefined) {
      _this.setState({ snackSwitch: true, message: '请选择一个项目' });
      return;
    }
    const { data1 } = _this.state;
    const selectedData = data1.find(item => item.id === _this.state.selected);
    if (selectedData) {
      _this.setState({
        id: selectedData.id,
        roleDataMSetId: selectedData.name,// *
        descriptionSet: selectedData.description,
      });
    }
  return true;
  };
export const onSubmitModalSet = _this => () => _this.setState({ loading: true });
export const onSuccesModalSet = _this =>async (response, tools) =>{
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
