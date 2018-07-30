/* eslint no-alert: off */
import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import { productAction, statusAction, action } from './config';

const clearModal = () => ({
  method: undefined,
  id: undefined,
  workorder: undefined,
  combinationNumber: undefined,
  productId: undefined,
  count: undefined,
  onlineTimePlan: undefined,
  offlineTimePlan: undefined,
  status: undefined,
  onlineTimeActual: undefined,
  offlineTimeActual: undefined,
  currentCount: undefined,
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
export const onCloseModal = _this => () => _this.setState({ dialogSwitch: false });
export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(productAction);
  const productData = rows.map(({ id, name }) => ({ id, name }));
  const { message: { rows: statusData } = {} } = await fetchData(statusAction);
  _this.setState({ productData, statusData });
};
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
export const onCreate = _this => () => {
  _this.setState({
    ...clearModal(),
    method: 'POST',
    dialogSwitch: true,
    dialogTitle: '新增工单设定',
    displayRows: 'none',
  });
};
export const onUpdate = _this => () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  const { data } = _this.state;
  const selectedData = data.find(item => item.id === _this.state.selected);
  const onlineTimePlan = selectedData.onlineTimePlan ?
    (new Date(selectedData.onlineTimePlan)).getTime() :
    selectedData.onlineTimePlan;
  const offlineTimePlan = selectedData.offlineTimePlan ?
    (new Date(selectedData.offlineTimePlan)).getTime() :
    selectedData.offlineTimePlan;
  const onlineTimeActual = selectedData.onlineTimeActual ?
    (new Date(selectedData.onlineTimeActual)).getTime() :
    selectedData.onlineTimeActual;
  const offlineTimeActual = selectedData.offlineTimeActual ?
    (new Date(selectedData.offlineTimeActual)).getTime() :
    selectedData.offlineTimeActual;
  if (selectedData) {
    _this.setState({
      method: 'PUT',
      dialogSwitch: true,
      id: selectedData.id,
      workorder: selectedData.workorder,
      combinationNumber: selectedData.combinationNumber,
      productId: selectedData.productId,
      count: selectedData.count,
      onlineTimePlan,
      offlineTimePlan,
      status: selectedData.status,
      onlineTimeActual,
      offlineTimeActual,
      currentCount: selectedData.currentCount,
      dialogTitle: '修改工单设定',
      displayRows: undefined,
    });
  }
};
export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('searchForm');
  return trigger(FormAction.onSubmit(props));
};
export const onDelete = _this => async (tools) => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  if (window.confirm && window.confirm('是否确认刪除?')) {
    const options = { param: { id: _this.state.selected }, method: 'DELETE' };
    _this.setState({ loading: true });
    const { message: { code } } = await fetchData(action, options);
    if (code >= 0) {
      await onRefresh(tools);
      _this.setState({
        loading: false,
        snackSwitch: true,
        selected: undefined,
        message: '刪除成功',
      });
    } else {
      _this.setState({ loading: false, snackSwitch: true, message: '刪除失败，请确认項目是否存在' });
    }
  }
};
export const onSubmitModal = _this => () => _this.setState({ loading: true });
export const onSuccesModal = _this => async ({ message: { code } }, tools) => {
  if (code >= 0) {
    await onRefresh(tools);
    _this.setState({ ...clearModal(), loading: false, dialogSwitch: false });
  } else {
    _this.setState({
      dialogSwitch: false,
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交內容是否正确',
    });
  }
};
export const onErrorModal = _this => () => _this.setState({
  dialogSwitch: false,
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
