/* eslint no-param-reassign: off */
/* eslint no-alert: off */
import React from 'react';
import { FormAction, TableAction } from '@delta/common-utils';
import fetchData from '@delta/common-utils/utils/fetchData';
import Request from '../../utils/fetchData';
import { action, addAction, deleteAction, compareAction } from './config';
import TableWrap from './tableWrap';

const clearModal = () => ({
  method: undefined,
  id: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  dialogTitle: undefined,
  singleData: [],
  groupingData: [],
});

export const dataTemplate = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });
  return data;
};
export const onBeforeSubmit = _this => (data, tools) => {
  if (data.operation === 'add') {
    if (!(data.mainMaterialNo) && !(data.materialNo) && !(data.description)) {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入代用料号、规格和主料号',
      });
      return false;
    } else if (!(data.materialNo) || (data.materialNo) === '') {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入代用料号',
      });
      return false;
    } else if (!(data.description) || (data.description) === '') {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入规格',
      });
      return false;
    } else if (!(data.mainMaterialNo) || (data.mainMaterialNo) === '') {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入主料号',
      });
      return false;
    } else if (data.mainMaterialNo && data.materialNo && (data.mainMaterialNo === data.materialNo)) {
      _this.setState({
        SnackBarOpen: true,
        message: '代用料不可以与主料相同，请重新输入代用料号',
      });
      return false;
    }
  } else if (data.operation === 'delete') {
    if (!(data.mainMaterialNo) && !(data.materialNo)) {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入代用料号和主料号',
      });
      return false;
    } else if (!(data.materialNo) || (data.materialNo) === '') {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入代用料号',
      });
      return false;
    } else if (!(data.mainMaterialNo) || (data.mainMaterialNo) === '') {
      _this.setState({
        SnackBarOpen: true,
        message: '请输入主料号',
      });
      return false;
    } else if (data.mainMaterialNo && data.materialNo && (data.mainMaterialNo === data.materialNo)) {
      _this.setState({
        SnackBarOpen: true,
        message: '代用料不可以与主料相同，请重新输入代用料号',
      });
      return false;
    }
  } else {
    const assemble = data.assembleNo;
    const assembleLength = assemble ? assemble.length : 0;
    const assembleNum = Number(assemble);

    if (!assemble) {
      _this.setState({
        snackSwitch: true,
        message: '请输入组合十码',
      });
      return false;
    } else if (assembleLength !== 10) {
      _this.setState({
        snackSwitch: true,
        message: '组合十码必须为十位数字',
      });
      return false;
    } else if (assembleLength === 10 && !assembleNum) {
      _this.setState({
        snackSwitch: true,
        message: '组合十码必须为十位数字',
      });
      return false;
    }
  }
  return true;
}
export const dataTemplateSingle = _this => (data) => {
  const newdata = _this.props.dataSource;
  const idArray = [];
  newdata.forEach((item) => {
    idArray.push(item.id);
  });
  const bomId = idArray.join(',');
  data = { bomId, ...data };
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });
  _this.setState({
    formData: data,
  });

  data = JSON.stringify(data);
  return data;
};
export const dataSourceTemplate = response => response.rows;
export const dataSourceTemplateSingle = response => response;
export const onSuccess = _this => ({ message: data = {} }) => {
  const message = data ? '查询成功' : '未查询到相关結果';
  const single = data.singleList;
  const grouping = data.groupingList;
  _this.setState({
    loading: false,
    singleData: single,
    groupingData: grouping,
    snackSwitch: true,
    groupingDataUpdate: false,
    message,
  });
};
export const onSubmit = _this => (data, tools) => _this.setState({ loading: true, selected: undefined, tools });

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
export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false, SnackBarOpen: false });
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
  message: '提交失败，发生未预期錯誤',
});
export const onModalClose = _this => () => _this.setState({ dialogSwitch: false });
export const onUpdate = _this => () => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  const { data } = _this.state;
  const selectedData = data.find(item => item.id === _this.state.selected);
  if (selectedData) {
    _this.setState({
      method: 'PUT',
      dialogSwitch: true,
      id: selectedData.id,
      groupName: selectedData.groupName,
      code: selectedData.code,
      name: selectedData.name,
      description: selectedData.description,
      dialogTitle: '修改系列別',
    });
  }
};
export const handleClickCancel = _this => (props) => {
  _this.setState({
    tableWrapShow: false,
  })
}
export const changeErrorMsg = _this => (message) => {
  const key = Math.random();
  const { errorMsg } = _this.state;
  errorMsg.push(<li key={key}>{message}</li>);
  _this.setState({
    errorMsg,
    groupingErrorMsg: errorMsg,
    modalErrorMsg: errorMsg,
  })
}
export const handleClickOK = _this => (props) => {
  debugger
  const { formData, errorMsg, bomId } = _this.props;
  const code = formData.operation;
  const arr = ['materialNo', 'description', 'mainMaterialNo'];
  const obj = {};
  arr.forEach((item) => {
    obj[item] = formData[item];
  });
  const dataObj = { bomId, ...obj };
  const data = JSON.stringify(dataObj);
  const headers = new Headers();
  const method = 'POST';
  let url = '';
  if (code === 'add') {
    url = addAction;
  } else if (code === 'delete') {
    url = deleteAction;
  }
  _this.setState({
    tableWrapShow: false,
  });
  const callback = (response) => {
    const { code, message } = response;
    if (code === -1) {
      errorMsg(message);
    }
  };
  Request(url, {
    headers,
    method,
    contentType: 'application/json',
    data,
    callback,
  });
}

export const onSingleUpdate = _this => ({ message: data = {} }) => {
  const { formData } = _this.state;
  const { props } = _this;
  const p_this = props.p_this;
  p_this.setState({
    groupingDataUpdate: false,
  });

  _this.setState({
    open: false,
    dialogOpen: false,
    groupingDialogOpen: false,
    SnackBarOpen: false,
    errorMsg: [],
    groupingErrorMsg: [],
    modalErrorMsg: [],
  });
  const { code, message } = data;
  if (code === -1) {
    const newMSG = message.toString();
    _this.setState({
      message: newMSG,
      SnackBarOpen: true,
    });
  } else if (code === -3) {
    _this.setState({
      message,
      open: true,
    });
  } else if (code === 0) {
    const singleData = data.rows;
    const singleArr = [];
    singleData.forEach((item) => {
      singleArr.push(<TableWrap key={item.bomId} bomId={item.bomId} title={item.bomReportName} dataSource={item.compare_info} formData={formData} errorMsg={_this.changeErrorMsg} />);
    });
    _this.setState({
      dialogOpen: true,
      arrData: singleArr,
      groupingDialogOpen: true,
    });
  } else if (code === -2) {
    const groupingDatas = data.rows;
    const groupingArr = [];
    groupingDatas.forEach((item) => {
      groupingArr.push(<TableWrap key={item.id} bomId={item.id} title={item.bomReportName} dataSource={item.compare_info} formData={formData} errorMsg={_this.changeErrorMsg} G_this={_this} />);
    });

    _this.setState({
      message: '以上程式料表中含有相同主料，请选择需要变更的程式料表。',
      arrData: groupingArr,
      formData,
    });
    p_this.setState({
      groupingData: groupingDatas,
      groupingDataUpdate: true,
    });
  }
};
export const shouldModalShow = (_this, tools) => async (props) => {
  const { getProps, trigger } = tools;
  const tableProps = getProps('checkboxTable');
  const checkedRows = trigger(TableAction.getCheckedRow(tableProps));
  const dataArr = [];
  checkedRows.forEach((item) => {
    dataArr.push(item.data.id);
  });
  const bomId = dataArr.join();
  _this.setState({
    modalErrorMsg: [],
    errorMsg: [],
    groupingDialogOpen: false,
  });
  const { formData } = _this.state;
  const arr = ['description', 'mainMaterialNo', 'materialNo', 'operation'];
  const obj = {};
  arr.forEach((item) => {
    obj[item] = formData[item];
  });
  const dataObj = { bomId, ...obj }
  const data = JSON.stringify(dataObj);
  const action = compareAction;
  const options = { data, method: 'POST', contentType: 'application/json' };
  const { message: { code, rows } } = await fetchData(action, options);
  if (code === 0) {
    const groupingDatas = rows;
    const groupingArr = [];
    groupingDatas.forEach((item) => {
      groupingArr.push(<TableWrap key={item.bomId} bomId={item.bomId} title={item.bomReportName} dataSource={item.compare_info} formData={formData} errorMsg={_this.changeErrorMsg} G_this={_this} />);
    });
    _this.setState({
      arrData: groupingArr,
      groupingDialogOpen: true,
    });
    return true;
  }
};

