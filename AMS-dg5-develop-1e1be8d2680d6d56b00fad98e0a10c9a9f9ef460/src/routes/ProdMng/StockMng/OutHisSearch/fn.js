/* eslint no-alert: off */
import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import { action } from './config';

export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(action);
  const data = rows.map(({
    id, workOrder, lineName, mainLineRecevicer, operateTime, pcbCount, operator, mainLineName, combineId, barcode
  }) => ({
    id, workOrder, lineName, mainLineRecevicer, operateTime, pcbCount, operator, mainLineName, combineId, barcode
  }));
  _this.setState({ data });
};
export const dataTemplate = (data) => {
  const result = data;
  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) delete result[key];
  });
  return result;
};
export const dataSourceTemplate = response => response.rows;

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

export const getRowProps = _this => (selected, barclick) => (state, rowInfo) => (
  {
    onClick: () => {
      console.log(rowInfo);
      _this.setState({ selected:  rowInfo.row.id, barclick: rowInfo.original.barcode });
    },
    style: {
      backgroundColor: rowInfo &&  rowInfo.row.id === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);