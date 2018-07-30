/* eslint no-param-reassign: off */
/* eslint no-alert: off */
import { FormAction } from '@delta/common-utils';
import fetchData from '@delta/common-utils/utils/fetchData';
import Request from '../../../utils/fetchData';
import { action, actionUpdate, lineAction } from './config';

const clearModal = () => ({
  method: undefined,
  id: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  dialogTitle: undefined,
});

export const dataTemplate = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined || data[key] === '') delete data[key];
  });
  return data;
};
export const dataSourceTemplate = response => response.rows;
export const onSuccess = _this => ({ message: data = [] }) => {
  const message = data.length > 0 ? '查询成功' : '未查询到相关結果';
  _this.setState({
    loading: false,
    data,
    snackSwitch: true,
    message,
  });
};
export const onSubmit = _this => (data, tools) =>
  _this.setState({ loading: true, selected: undefined, tools });

export const getRowProps = _this => selected => (state, rowInfo) => (
  {
    onClick: () => _this.setState({ selected: rowInfo.row.id }),
    style: {
      backgroundColor: rowInfo && rowInfo.row.id === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);
export const onCreate = _this => () => {
  _this.setState({
    method: 'POST',
    dialogSwitch: true,
    code: undefined,
    name: undefined,
    description: undefined,
    dialogTitle: '新增系列別',
  });
};
export const dialogDataTemplate = data => JSON.stringify(data);
export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('searchForm');
  return trigger(FormAction.onSubmit(props));
};
export const onDelete = _this => async (tools) => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '請选择一个項目' });
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
      _this.setState({ loading: false, snackSwitch: true, message: '刪除失败，请确认项目是否存在' });
    }
  }
};
export const onModalSubmit = _this => () => {
  _this.setState({ loading: true });
};
export const onModalSuccess = _this => async ({ message: { code } }, tools) => {
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
export const onModalError = _this => () => _this.setState({
  dialogSwitch: false,
  loading: false,
  snackSwitch: true,
  message: '提交失败，发生未预期错误',
});
export const onModalClose = _this => () => _this.setState({ dialogSwitch: false });
export const onUpdate = (_this, tools) => (props) => {
  const { getData } = props;
  const formData = getData('RepairMngForm2').toJS();
  const snData = formData.PCBName;
  const url = actionUpdate;
  const headers = new Headers();
  const method = 'PUT';
  const data = JSON.stringify({ sn: snData });

  const callback = (response) => {
    const { code, message } = response;
    if (code === 0) {
      _this.setState({ snackSwitch: true, message });
      setTimeout(() => {
        const { getProps, trigger } = tools;
        const propss = getProps('RepairMngForm');
        return trigger(FormAction.onSubmit(propss));
      }, 1000);
    }
    _this.setState({ snackSwitch: true, message });
  };
  Request(url, {
    headers,
    method,
    contentType: 'application/json',
    data,
    callback,
  });
};

export const onInitial = _this => async (props, tools) => {
  const { message: { rows } = {} } = await fetchData(action);
  const data = rows
    ? rows.map(({
      id, workOrder, lineName, sn, status, createTime,
    }) => ({
      id, workOrder, lineName, sn, status, createTime,
    }))
    : [];
  const { message: { rows: line } = {} } = await fetchData(lineAction);
  const lineData = line ? line.map(({ id, lineName }) => ({ id, lineName })) : [];
  lineData.splice(0, 0, { id: '', lineName: '<空>' });
  _this.setState({ data, tools, lineData });
};

