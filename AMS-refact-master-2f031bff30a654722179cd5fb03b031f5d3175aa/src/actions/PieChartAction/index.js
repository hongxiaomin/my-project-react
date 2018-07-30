/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import React from 'react';
import { createAction } from 'redux-actions';
import {
  XAxis,
  YAxis,
  Pie,
  ReferenceLine,
  CartesianGrid,
  Legend,
  Tooltip
} from 'recharts';
import { ONUPDATECHILDREN } from '../../constants/ActionTypes';
import {
  onUpdateProps,
  onUpdateDataSource
} from '../ProtectAction';
import { onFormDataSourceChange } from '../FormAction';
import Request from '../../utils/Request';
import {
  gridKey,
  legendKey,
  GET,
  tooltipKey,
  formReducerName,
  formOriDataSourceName,
} from '../../constants/Config';

const isObject = obj => typeof obj === 'object' && obj !== null;
const onUpdateChildren = createAction(ONUPDATECHILDREN);
const xAxisGenerator = ({ xAxis }) => (
  () => {
    const result = isObject(xAxis) ? <XAxis key={xAxis.dataKey} {...xAxis} /> : undefined;
    return result;
  }
);
const yAxisGenerator = ({ yAxis }) => (
  () => {
    const result = isObject(yAxis) ? <YAxis key={yAxis.dataKey} {...yAxis} /> : undefined;
    return result;
  }
);
const pieGenerator = ({ pies }) => (
  () => {
    if (Array.isArray(pies)) {
      console.log('pies', pies);
      return pies.map(pie => <Pie {...pie} />);
    }
    return undefined;
  }
);
const gridGenerator = ({ grid }) => (
  () => {
    const result = grid ? <CartesianGrid key={gridKey} {...grid} /> : undefined;
    return result;
  }
);
const refLineGenerator = ({ refs, refData }) => (
  () => {
    const data = isObject(refData) ? refData : {};
    if (Array.isArray(refs)) {
      return refs.map((ref) => {
        if (isObject(ref)) {
          const direction = ref.direction;
          const value = data[ref.dataKey];
          const reassignRef = {
            key: ref.dataKey,
            [direction]: value,
            label: ref.label,
            stroke: ref.stroke,
          };
          return <ReferenceLine {...reassignRef} />;
        }
        return undefined;
      });
    }
    return undefined;
  }
);
const legendGenerator = ({ legend }) => (
  () => {
    const result = legend ? <Legend key={legendKey} {...legend} /> : undefined;
    return result;
  }
);
const tooltipGenerator = ({ tooltip }) => (
  () => {
    const result = tooltip ? <Tooltip key={tooltipKey} {...tooltip} /> : undefined;
    return result;
  }
);
const onPieChartLoadFail = e => (
  () => console.log(e)
);
const onPieChartUpdateRefLines = (children, refData) => (
  () => {
    if (Array.isArray(children) && isObject(refData)) {
      return children.map((child) => {
        if (child.type.name === 'ReferenceLine' && child.props.label in refData) {
          return React.cloneElement(child, { y: refData[child.props.label] });
        }
        return child;
      });
    }
    return [];
  }
);

export const onPieChartLoad = ({ name, action, onSuccess, onError, chartName }) => (
  (dispatch, getState) => {
    if (chartName) {
      const data = chartName ? getState().getIn([formReducerName, name, formOriDataSourceName]) : '';
      const pieData = data.rows;

      const success = typeof onSuccess === 'function' ? onSuccess : () => { };
      dispatch(onUpdateDataSource({ name: chartName, dataSource: pieData }));
      success(data);
      return;

    }
    const url = action;
    const method = GET;
    const Success = typeof onSuccess === 'function' ? onSuccess : () => { };
    const Error = typeof onError === 'function' ? onError : () => { };
    const callback = (response) => {
      const dataSource = response;
      dispatch(onUpdateDataSource({ name, dataSource }));
      Success(dataSource);
    };
    const error = (e) => {
      dispatch(onPieChartLoadFail(e));
      Error(e);
    };
    Request({
      url,
      method,
      callback,
      error,
    });
  }
);
export const onPieChartInitial = (id, props) => (
  (dispatch) => {
    let children = [];
    const name = props.name;
    // children = children.concat(dispatch(xAxisGenerator(props)));
    // children = children.concat(dispatch(yAxisGenerator(props)));
    children = children.concat(dispatch(pieGenerator(props)));
    // children = children.concat(dispatch(refLineGenerator(props)));
    // children = children.concat(dispatch(gridGenerator(props)));
    // children = children.concat(dispatch(legendGenerator(props)));
    // children = children.concat(dispatch(tooltipGenerator(props)));
    children = children.filter(item => item !== undefined);
    dispatch(onUpdateChildren({ id, children }));
    dispatch(onUpdateProps({ name, props }));
    if ('preload' in props) {
      dispatch(onPieChartLoad(props));
    }
  }
);
export const onPieChartRefreshData = (oriChildren, oriData, props) => (
  (dispatch) => {
    const usingData = oriData !== undefined ? oriData : props.data;
    const defaultTemplate = response => response;
    const dataTemplate = props.dataTemplate ? props.dataTemplate : defaultTemplate;
    const refDataTemplate = props.refDataTemplate ? props.refDataTemplate : defaultTemplate;
    const data = dataTemplate(usingData);
    const refData = refDataTemplate(usingData);
    const children = dispatch(onPieChartUpdateRefLines(oriChildren, refData));
    return {
      children,
      data,
    };
  }
);
export const getLocate = ({ htmlFor, name }) => (
  () => {
    if (htmlFor) {
      return htmlFor;
    }
    return name;
  }
);
export const onPieChartDispose = (props) => (
  (dispatch) => {
    const chartName = props.name;
    const pieData = {};
    dispatch(onUpdateDataSource({ name: chartName, dataSource: pieData }));
  }
);

