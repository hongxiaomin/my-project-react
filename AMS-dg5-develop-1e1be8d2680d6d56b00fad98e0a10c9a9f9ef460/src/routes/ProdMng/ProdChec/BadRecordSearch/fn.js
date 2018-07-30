/* eslint no-alert: off */
import fetchData from '@delta/common-utils/utils/fetchData';
import { action, phenomenaAction, unitAction, lineAction } from './config';

let reasonLen = 0;
let solutionLen = 0;
const clearModal = () => ({
  method: undefined,
  id: undefined,
  lineCode: undefined,
  workorder: undefined,
  frameCode: undefined,
  model: undefined,
  defectivePosition: undefined,
  defectivePhenomena: undefined,
  responsibilityUnit: undefined,
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
  const { reason, solution } = result;
  reasonLen = reason.replace(/[^\x00-\xFF]/g, '**').length;
  solutionLen = solution.replace(/[^\x00-\xFF]/g, '**').length;
  if ((reasonLen > 255) || (reasonLen > 255)) {
    return;
  }
  Object.keys(result).forEach((key) => { result[key] = String(result[key]); });
  return JSON.stringify(result);
};
export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const onCloseModal = _this => () => _this.setState({ dialogSwitch: false });
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
export const onRefresh = (_this) => {
  fetchData(action, null).then((response) => {
    const { message: { rows } = {} } = response;
    _this.setState({
      ...clearModal(),
      loading: false,
      data: rows,
      snackSwitch: true,
      message: '提交成功',
    });
  });
};
export const onSubmitModal = _this => () => _this.setState({ loading: true });
export const onSuccesModal = _this => async ({ message: { code } }, tools) => {
  if (code === 0) {
    await onRefresh(_this);
  } else {
    let mess = '提交失败，提交内容不能为空';
    if ((solutionLen > 255) || (reasonLen > 255)) {
      mess = '提交失败，提交内容不能大于255字节';
    }
    _this.setState({
      dialogSwitch: false,
      loading: false,
      snackSwitch: true,
      message: mess,
    });
  }
};
export const onErrorModal = _this => () => _this.setState({
  dialogSwitch: false,
  loading: false,
  snackSwitch: true,
  message: '提交失败，发生未预期错误',
});

export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(phenomenaAction);
  const phenomenaData = rows.map(({ id, defectivePhenomena }) => ({ id, defectivePhenomena }));
  phenomenaData.splice(0, 0, { id: '', defectivePhenomena: '<空>' });
  const { message: { rows: unit } = {} } = await fetchData(unitAction);
  const unitData = unit.map(({ id, responsibilityUnit }) => ({ id, responsibilityUnit }));
  unitData.splice(0, 0, { id: '', responsibilityUnit: '<空>' });
  const { message: { rows: line } = {} } = await fetchData(lineAction);
  const lineData = line.map(({ id, lineName }) => ({ id, lineName }));
  lineData.splice(0, 0, { id: '', lineName: '<空>' });
  const { message: { rows: result } = {} } = await fetchData(action);
  const data = result.map(({ defectiveDetailId, lineName, workOrder, frameCode, model, defectivePosition, defectivePhenomena, responsibilityUnit, reason, solution, sn, enterStatus }) => ({ defectiveDetailId, lineName, workOrder, frameCode, model, defectivePosition, defectivePhenomena, responsibilityUnit, reason, solution, sn, enterStatus }));
  _this.setState({ phenomenaData, unitData, data, lineData });
};

