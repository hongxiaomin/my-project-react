/* eslint no-alert: off */
import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import { actionDel, productAction } from './config';

const clearModal = () => ({
  method: undefined,
  id: undefined,
  productName: undefined,
  materialNo: undefined,
  length: undefined,
  width: undefined,
  height: undefined,
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
export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(productAction);
  const productData = rows.map(({ id, lineName }) => ({ id, lineName }));
  _this.setState({ productData });
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

// export const shouldModalShowAdd = _this => () => {
//   return true;
// };
export const shouldModalShowUpdate = _this => () => {
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
      productName: selectedData.productName,
      materialNo: selectedData.materialNo,
      length: selectedData.length,
      width: selectedData.width,
      height: selectedData.height,
    });
  }
  return true;
};
export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('PCBSettingForm');
  return trigger(FormAction.onSubmit(props));
};

export const onDelete = _this => async () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  if (window.confirm && window.confirm('是否确认删除?')) {
    const options = { param: { id: _this.state.selected }, method: 'DELETE' };
    _this.setState({ loading: true });
    const { message: { code } } = await fetchData(actionDel, options);
    if (code >= 0) {
      const { id } = _this.state;
      await onRefresh(_this, id);
      _this.setState({
        loading: false,
        snackSwitch: true,
        selected: undefined,
        message: '刪除成功',
      });
    } else {
      _this.setState({ loading: false, snackSwitch: true, message: '刪除失败，请确认项目是否存在' });
    }
  }
};

export const onSubmitModal = _this => () => _this.setState({ loading: true });
export const onSuccesModal = _this => async ({ message: { code } }, tools) => {
  if (code >= 0) {
    await onRefresh(tools);
    _this.setState({ ...clearModal(), loading: false });
  } else {
    _this.setState({
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交内容是否正确',
    });
  }
};
export const onErrorModal = _this => () => _this.setState({
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
