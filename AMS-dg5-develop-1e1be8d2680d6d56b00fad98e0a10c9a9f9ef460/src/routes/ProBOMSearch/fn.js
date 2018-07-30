import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import Request from '../../utils/fetchData';

import { dataHandlerWithEncode } from '../../utils/Common';
import { searchAction, downloadAction, detailAction, detailActionDel } from './config';

const clearModal = () => ({
  method: undefined,
  id: undefined,
  pos: undefined,
  materialNo: undefined,
  description: undefined,
  qty: undefined,
  location: undefined,
  feederType: undefined,
  alternativeMaterial: undefined,
  msl: undefined,
});

// 检查程式料表名是否存在
const exist = _this => async (value) => {
  _this.setState({ loading: true });
  const method = 'GET';
  const headers = new Headers();
  const values = dataHandlerWithEncode(value);
  const url = `${searchAction}${values}`;
  let requestRow = null;
  const callback = (response) => {
    if (response.code === 0) {
      requestRow = response.rows;
      if (requestRow === 'true') {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: '复制失败，此料表名已存在',
        });
      }
    }
  };
  await Request(url, {
    headers,
    method,
    callback,
  });
  return requestRow;
};

export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const dataTemplate = (data) => {
  const result = data;
  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) delete result[key];
  });
  return result;
};
export const dataSourceTemplate = response => response.rows;
export const onClickRow = (_this, rowInfo) => {
  const { id } = rowInfo.row;
  if (id) {
    const options = { data: { bomId: id } };
    fetchData(detailAction, options).then((response) => {
      const { message: { rows } = {} } = response;
      _this.setState({ detail: rows });
    });
    _this.setState({ selected: id, bomId: id, downloadAction: `${downloadAction}?id=${id}` });
  }
};
export const getRowProps = _this => selected => (state, rowInfo) => (
  {
    onClick: () => onClickRow(_this, rowInfo),
    style: {
      backgroundColor: rowInfo && rowInfo.row.id === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);
export const getDetailRowProps = _this => detailSelected => (state, rowInfo) => (
  {
    onClick: () => _this.setState({ detailSelected: rowInfo.row.id }),
    style: {
      backgroundColor: rowInfo && rowInfo.row.id === detailSelected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);
export const onSubmit = _this => () => (
  _this.setState({
    loading: true,
    selected: undefined,
    data: undefined,
    detail: undefined,
  })
);
export const onSuccess = _this => ({ message: data = [] }) => {
  const message = data.length > 0 ? '查询成功' : '未查询到相关结果';
  _this.setState({
    loading: false,
    data,
    snackSwitch: true,
    message,
  });
};
export const dialogDataTemplate = data => JSON.stringify(data);
export const copyDataTemplate = _this => (data) => {
  const { bomReportName } = data;
  const common = _this.state.selectedRowData;
  delete common.id;
  delete common.serialId;
  common.moduleNum = JSON.stringify(common.moduleNum);
  common.bomReportName = bomReportName;
  const detailList = _this.state.detail;
  const value = JSON.stringify({ common, detailList });
  return value;
};
export const shouldModalSubmit = _this => async (data4Form, tools) => {
  const { bomReportName } = data4Form;
  const result = await exist(_this)(bomReportName);
  if (result === 'true') {
    return false;
  } else if (result === 'false') {
    _this.setState({ bomId: undefined });
    return true;
  }
};
export const onRefresh = _this => (tools) => {
  if (_this.state.bomId) {
    const options = { data: { bomId: _this.state.bomId } };
    fetchData(detailAction, options).then((response) => {
      const { message: { rows } = {} } = response;
      _this.setState({ detail: rows });
    });
  }
  const { getProps, trigger } = tools;
  const props = getProps('ProBOMSearchForm');
  return trigger(FormAction.onSubmit(props));
};
export const onDelete = _this => async (tools) => {
  if (_this.state.detailSelected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  if (window.confirm && window.confirm('是否确认删除?')) {
    const options = { param: { id: _this.state.detailSelected }, method: 'DELETE' };
    _this.setState({ loading: true });
    const { message: { code } } = await fetchData(detailActionDel, options);
    if (code >= 0) {
      _this.setState({ bomId: _this.state.bomId });
      await onRefresh(_this)(tools);
      _this.setState({
        loading: false,
        snackSwitch: true,
        detailSelected: undefined,
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
export const onCopyModalSuccess = _this => async ({ message: { code } }, tools) => {
  if (code === 0) {
    await onRefresh(_this)(tools);
    _this.setState({
      ...clearModal(),
      loading: false,
      snackSwitch: true,
      message: '复制成功',
    });
  } else {
    _this.setState({
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交內容是否正确',
    });
  }
};
export const onModalSuccess = _this => async ({ message: { code } }, tools) => {
  if (code === 0) {
    await onRefresh(_this)(tools);
    const { method } = _this.state;
    let mess = '';
    if (method === 'POST') {
      mess = '新增成功';
    } else if (method === 'PUT') {
      mess = '修改成功';
    }
    _this.setState({
      ...clearModal(),
      loading: false,
      snackSwitch: true,
      message: mess,
    });
  } else {
    _this.setState({
      loading: false,
      snackSwitch: true,
      message: '提交失败，请确认提交內容是否正确',
    });
  }
};
export const onModalError = _this => () => _this.setState({
  loading: false,
  snackSwitch: true,
  message: '提交失败，发生未预期错误',
});

export const shouldModalShowUpdate = _this => () => {
  if (_this.state.detailSelected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  const { detail } = _this.state;
  const selectedData = detail.find(item => item.id === _this.state.detailSelected);
  if (selectedData) {
    _this.setState({
      method: 'PUT',
      id: selectedData.id,
      pos: selectedData.pos,
      materialNo: selectedData.materialNo,
      description: selectedData.description,
      qty: selectedData.qty,
      location: selectedData.location,
      feederType: selectedData.feederType,
      alternativeMaterial: selectedData.alternativeMaterial,
      msl: selectedData.msl,
    });
  }
  return true;
};

export const shouldModalShowAdd = _this => () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个程式料表' });
    return;
  }
  _this.setState({
    method: 'POST',
    id: _this.state.selected,
    pos: undefined,
    materialNo: undefined,
    description: undefined,
    qty: undefined,
    location: undefined,
    feederType: undefined,
    alternativeMaterial: undefined,
    msl: undefined,
  });
  return true;
};


export const shouldModalShowCopy = _this => () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个程式料表' });
    return;
  }
  const { data } = _this.state;
  const selectedData = data.find(item => item.id === _this.state.selected);
  _this.setState({
    method: 'POST',
    selectedRowData: selectedData,
  });
  return true;
};
