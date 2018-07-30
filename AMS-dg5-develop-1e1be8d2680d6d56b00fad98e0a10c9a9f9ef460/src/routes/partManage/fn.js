import { FormAction } from '@delta/common-utils';


const clearModal = () => ({
  method: undefined,
  id: undefined,
  materialNo: undefined,
  msl: undefined,
  esd: undefined,
  usl: undefined,
  lsl: undefined,
  componentType: undefined,
  vendorName: undefined,
  vendorCode: undefined,
  vendorPartNum: undefined,
  marking: undefined,
  description: undefined,
  pin: undefined,
  keyword: undefined,
  componentPackage: undefined,
  image: undefined,
  develop: undefined,
  measurable: undefined,
  dialogTitle: undefined,
  displayRows: undefined,
});

export const dataTemplate = (data) => {
  const result = data;
  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) delete result[key];
  });
  return result;
};
export const dataSourceTemplate = response => response.rows;
export const dialogDataTemplate = (data) => {
  const result = data;
  Object.keys(result).forEach((key) => { result[key] = String(result[key]); });
  return JSON.stringify(result);
};
export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const onSubmit = _this => () => _this.setState({ loading: true, selected: undefined });
export const onSuccess = _this => ({ message: data = [] }) => {
  const message = data.length > 0 ? '查询成功' : '未查询到相关结果';
  _this.setState({
    loading: false,
    data,
    snackSwitch: true,
    message,
  });
};
export const shouldModalShow = _this => () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  const { data } = _this.state;
  const selectedData = data.find(item => item.id === _this.state.selected);
  if (selectedData) {
    _this.setState({
      method: 'PUT',
      id: selectedData.id,
      materialNo: selectedData.materialNo,
      msl: selectedData.msl,
      esd: selectedData.esd,
      usl: selectedData.usl,
      lsl: selectedData.lsl,
      componentType: selectedData.componentType,
      vendorName: selectedData.vendorName,
      vendorCode: selectedData.vendorCode,
      vendorPartNum: selectedData.vendorPartNum,
      marking: selectedData.marking,
      description: selectedData.description,
      pin: selectedData.pin,
      keyword: selectedData.keyword,
      componentPackage: selectedData.componentPackage,
      develop: selectedData.develop,
      measurable: selectedData.measurable,
      image: selectedData.image,
    });
  }
return true;
};
export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('PartManageForm');
  return trigger(FormAction.onSubmit(props));
};
export const onSubmitModal = _this => () => _this.setState({ loading: true });
export const onSuccesModal = _this => async ({ message: { code } }, tools) => {
  if (code === 0) {
    await onRefresh(tools);
    _this.setState({
      ...clearModal(),
      loading: false,
      shouldModalShow: false,
      snackSwitch: true,
      message: '修改成功',
    });
  } else {
    _this.setState({
      shouldModalShow: false,
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交内容是否正确',
    });
  }
};
export const onErrorModal = _this => () => _this.setState({
  shouldModalShow: false,
  loading: false,
  snackSwitch: true,
  message: '提交失败，发生未预期错误',
});
export const getRowProps = _this => selected => (state, rowInfo) => (
  {
    onClick: () => _this.setState({ selected: rowInfo.row.id }),
    style: {
      backgroundColor: rowInfo && rowInfo.row.id === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);
