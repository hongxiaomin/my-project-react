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
  Bar,
  ReferenceLine,
  CartesianGrid,
  Legend,
  Tooltip } from 'recharts';
import { ONUPDATECHILDREN } from '../../constants/ActionTypes';
import {
  onUpdateProps,
  onUpdateDataSource } from '../ProtectAction';
import { onFormDataSourceChange } from '../FormAction';
import Request from '../../utils/Request';
import {
  gridKey,
  legendKey,
  GET,
  tooltipKey } from '../../constants/Config';

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
const barGenerator = ({ bars }) => (
  () => {
    if (Array.isArray(bars)) {
      return bars.map(bar => <Bar key={bar.dataKey} {...bar} />);
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
const onBarChartLoadFail = e => (
  () => console.log(e)
);
const onBarChartUpdateRefLines = (children, refData) => (
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

export const onBarChartLoad = ({ name, action, onSuccess, onError }) => (
  (dispatch) => {
    const url = action;
    const method = GET;
    const Success = typeof onSuccess === 'function' ? onSuccess : () => {};
    const Error = typeof onError === 'function' ? onError : () => {};
    const callback = (response) => {
      const dataSource = response;
      dispatch(onUpdateDataSource({ name, dataSource }));
      Success(dataSource);
    };
    const error = (e) => {
      dispatch(onBarChartLoadFail(e));
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
export const onBarChartInitial = (id, props) => (
  (dispatch) => {
    let children = [];
    const name = props.name;
    children = children.concat(dispatch(xAxisGenerator(props)));
    children = children.concat(dispatch(yAxisGenerator(props)));
    children = children.concat(dispatch(barGenerator(props)));
    children = children.concat(dispatch(refLineGenerator(props)));
    children = children.concat(dispatch(gridGenerator(props)));
    children = children.concat(dispatch(legendGenerator(props)));
    children = children.concat(dispatch(tooltipGenerator(props)));
    children = children.filter(item => item !== undefined);
    dispatch(onUpdateChildren({ id, children }));
    dispatch(onUpdateProps({ name, props }));
    if ('preload' in props) {
      dispatch(onBarChartLoad(props));
    }
  }
);
export const onBarChartRefreshData = (oriChildren, oriData, props) => (
  (dispatch) => {
    const usingData = oriData !== undefined ? oriData : props.data;
    const defaultTemplate = response => response;
    const dataTemplate = props.dataTemplate ? props.dataTemplate : defaultTemplate;
    const refDataTemplate = props.refDataTemplate ? props.refDataTemplate : defaultTemplate;
    const data = dataTemplate(usingData);
    const refData = refDataTemplate(usingData);
    const children = dispatch(onBarChartUpdateRefLines(oriChildren, refData));
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
