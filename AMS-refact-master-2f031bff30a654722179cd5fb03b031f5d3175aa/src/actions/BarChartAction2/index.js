/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import {
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip
} from 'recharts';
import { isObject } from '../../utils/Common2';
import Request from '../../utils/Request2';
import {
  onUpdateChildren,
  onUpdateProps,
  onUpdateData
} from '../StoreAction';
import {
  GET,
  UNDEFINED,
  barChartDataKey,
  barChartGridKey,
  barChartLegendKey,
  barChartTooltipKey,
  barChartPreload,
  defaultBarChartOnSuccess,
  defaultBarChartOnError,
  defaultBarChartData,
  defaultBarChartDataSourceTemplate,
  formReducerName,
  formPropsName,
  formOriDataSourceName,
} from '../../constants/Config2';

const xAxisGenerator = ({ xAxis }) => (
  () => {
    const result = isObject(xAxis) ?
      <XAxis key={xAxis[barChartDataKey]} {...xAxis} /> : UNDEFINED;
    return result;
  }
);
const yAxisGenerator = ({ yAxis }) => (
  () => {
    const result = isObject(yAxis) ?
      <YAxis key={yAxis[barChartDataKey]} {...yAxis} /> : UNDEFINED;
    return result;
  }
);
const barGenerator = ({ bars }) => (
  () => {
    if (Array.isArray(bars)) {
      return bars.map(bar => <Bar key={bar[barChartDataKey]} {...bar} />);
    }
    return UNDEFINED;
  }
);
const gridGenerator = ({ grid }) => (
  () => {
    const result = grid ? <CartesianGrid key={barChartGridKey} {...grid} /> : UNDEFINED;
    return result;
  }
);
const legendGenerator = ({ legend }) => (
  () => {
    const result = legend ? <Legend key={barChartLegendKey} {...legend} /> : UNDEFINED;
    return result;
  }
);
const tooltipGenerator = ({ tooltip }) => (
  () => {
    const result = tooltip ? <Tooltip key={barChartTooltipKey} {...tooltip} /> : UNDEFINED;
    return result;
  }
);
const onBarChartLoadFail = (e, error) => (
  () => error(e)
);

export const onBarChartUpdateDataSource =
  (oriDataSource, { data, dataSourceTemplate }) => (
    () => {
      let dataSource = defaultBarChartData;
      if (oriDataSource !== UNDEFINED) {
        dataSource = oriDataSource;
      } else if (data !== UNDEFINED) {
        dataSource = data;
      }
      const filtereddDataSourceTemplate = dataSourceTemplate !== UNDEFINED ?
        dataSourceTemplate : defaultBarChartDataSourceTemplate;
      const filteredData = filtereddDataSourceTemplate(dataSource);
      return filteredData;
    }
  );

export const onBarChartLoad =
  ({ id, name, action, paramTemplate, param, filters, onSuccess, onError, chartName }) => (
    (dispatch, getState) => {
      if (chartName) {
        const data = chartName ? getState().getIn([formReducerName, name, formOriDataSourceName]) : '';
        const payload = data;
        const success = typeof onSuccess === 'function' ? onSuccess : defaultBarChartOnSuccess;
        dispatch(onUpdateData({ id: chartName, name: chartName, payload }));
        success(payload);
        return;

      }
      const url = action;
      const method = GET;
      const paramData = paramTemplate ? paramTemplate(param) : param;
      const success = typeof onSuccess === 'function' ? onSuccess : defaultBarChartOnSuccess;
      const err = typeof onError === 'function' ? onError : defaultBarChartOnError;
      const callback = (response) => {
        const payload = response;
        dispatch(onUpdateData({ id, name, payload }));
        success(payload);
      };
      const error = (e) => {
        dispatch(onBarChartLoadFail(e, err));
      };
      Request({
        url,
        param: paramData,
        filters,
        method,
        callback,
        error,
      });
    }
  );

export const onBarChartInitial = props => (
  (dispatch) => {
    let children = [];
    const id = props.id;
    children = children.concat(dispatch(xAxisGenerator(props)));
    children = children.concat(dispatch(yAxisGenerator(props)));
    children = children.concat(dispatch(barGenerator(props)));
    children = children.concat(dispatch(gridGenerator(props)));
    children = children.concat(dispatch(legendGenerator(props)));
    children = children.concat(dispatch(tooltipGenerator(props)));
    children = children.filter(item => item !== UNDEFINED);
    dispatch(onUpdateChildren({ id, payload: children }));
    dispatch(onUpdateProps({ id, payload: props }));
    if (barChartPreload in props) {
      dispatch(onBarChartLoad(props));
    }
  }
);
export const onBarChartDispose = (props) => (
  (dispatch) => {
    const chartName = props.name;
    const payload = {};
    dispatch(onUpdateData({ id: chartName, name: chartName, payload }));
  }
);
