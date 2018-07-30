/* eslint no-alert: off */
import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import { action, LineAction } from './config';

export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(LineAction);
  const LineData = rows.map(({ id, lineName }) => ({ id, lineName }));
  LineData.unshift({id: -1, lineName: "(空)"})
  _this.setState({ LineData });
};
export const onTabInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(action);
  const data = rows.map(({
    id, lineName, workOrder, combineId, shelfCode, barcode, pcbCount, mainLineName, operateTime,
  }) => ({
    id, lineName, workOrder, combineId, shelfCode, barcode, pcbCount, mainLineName, operateTime,
  }));
  _this.setState({ data });
};

export const dataTemplate = (data) => {
  const result = data;
  const TimeDiff =  result.endTime - result.startTime;
  if(TimeDiff < 1){
      this.onError();
  }else{
    Object.keys(result).forEach((key) => {
      if ((result[key] === undefined)||(result[key] === -1)) delete result[key];
    });
    return result;
  }
};
export const dataSourceTemplate = response => response.rows;

export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });

export const onSubmit = _this => () => {
  _this.setState({ 
    loading: true, 
    selected: undefined
  });
};

export const onError = _this => (data) => {
  const message =  '起始时间必须小于结束时间，请修改后查询！';
  _this.setState({ 
    loading: false,
    snackSwitch: true,
    message,
  });
};

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
      _this.setState({ selected:  rowInfo.row.id, barclick: rowInfo.original.barcode });
    },
    style: {
      backgroundColor: rowInfo &&  rowInfo.row.id === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);

