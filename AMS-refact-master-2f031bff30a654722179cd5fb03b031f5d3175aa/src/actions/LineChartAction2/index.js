/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import React from 'react';
import {
  XAxis,
  YAxis,
  Line,
  ReferenceLine,
  CartesianGrid,
  Legend,
  Tooltip } from 'recharts';
import Request from '../../utils/Request2';
import {
  isObject,
  emptyObject } from '../../utils/Common2';
import {
  onUpdateProps,
  onUpdateData,
  onUpdateChildren,
  onDelete } from '../StoreAction';
import {
  GET,
  UNDEFINED,
  linechartGridKey,
  linechartLegendKey,
  linechartTooltipKey,
  linechartPreload,
  linechartDataKey,
  referenceLineLabel,
  referenceLineStroke,
  referenceLineKey,
  defaultRefLines,
  defaultLineChartOnSuccess,
  defaultLineChartOnError,
  defaultLineChartDataSourceTemplate } from '../../constants/Config2';

const xAxisGenerator = ({ xAxis }) => (
  () => {
    const result = isObject(xAxis) ?
      <XAxis key={xAxis[linechartDataKey]} {...xAxis} /> : UNDEFINED;
    return result;
  }
);
const yAxisGenerator = ({ yAxis }) => (
  () => {
    const result = isObject(yAxis) ?
      <YAxis key={yAxis[linechartDataKey]} {...yAxis} /> : UNDEFINED;
    return result;
  }
);
const lineGenerator = ({ lines }) => (
  () => {
    if (Array.isArray(lines)) {
      return lines.map(line => <Line key={line[linechartDataKey]} {...line} />);
    }
    return UNDEFINED;
  }
);
const gridGenerator = ({ grid }) => (
  () => {
    const result = grid ? <CartesianGrid key={linechartGridKey} {...grid} /> : UNDEFINED;
    return result;
  }
);
const refLineGenerator = ({ refs, refData }) => (
  () => {
    const data = isObject(refData) ? refData : emptyObject();
    if (Array.isArray(refs)) {
      return refs.map((ref) => {
        if (isObject(ref)) {
          const directionName = ref.direction;
          const value = data[ref[linechartDataKey]];
          const reassignRef = {
            name: ref.dataKey,
            key: referenceLineKey,
            [directionName]: value,
            [referenceLineLabel]: ref.label,
            [referenceLineStroke]: ref.stroke,
          };
          return <ReferenceLine {...reassignRef} />;
        }
        return UNDEFINED;
      });
    }
    return UNDEFINED;
  }
);
const legendGenerator = ({ legend }) => (
  () => {
    const result = legend ? <Legend key={linechartLegendKey} {...legend} /> : UNDEFINED;
    return result;
  }
);
const tooltipGenerator = ({ tooltip }) => (
  () => {
    const result = tooltip ? <Tooltip key={linechartTooltipKey} {...tooltip} /> : UNDEFINED;
    return result;
  }
);
const onLineChartLoadFail = (e, err) => (
  () => err(e)
);
const onLineChartUpdateRefLines = (children, refData) => (
  () => {
    if (Array.isArray(children) && isObject(refData)) {
      return children.map((child) => {
        if (child.key === referenceLineKey && child.props.name in refData) {
          return React.cloneElement(child, { y: refData[child.props.name] });
        }
        return child;
      });
    }
    return defaultRefLines;
  }
);

export const onLineChartLoad =
  ({ id, name, action, param, filters, paramTemplate, onSuccess, onError }) => (
  (dispatch) => {
    const url = action;
    const method = GET;
    const paramData = paramTemplate ? paramTemplate(param) : param;
    const success = typeof onSuccess === 'function' ? onSuccess : defaultLineChartOnSuccess;
    const err = typeof onError === 'function' ? onError : defaultLineChartOnError;
    const callback = (response) => {
      const payload = response;
      dispatch(onUpdateData({ id, name, payload }));
      success(payload);
    };
    const error = (e) => {
      dispatch(onLineChartLoadFail(e, err));
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
export const onLineChartInitial = props => (
  (dispatch) => {
    let children = [];
    const id = props.id;
    children = children.concat(dispatch(xAxisGenerator(props)));
    children = children.concat(dispatch(yAxisGenerator(props)));
    children = children.concat(dispatch(lineGenerator(props)));
    children = children.concat(dispatch(refLineGenerator(props)));
    children = children.concat(dispatch(gridGenerator(props)));
    children = children.concat(dispatch(legendGenerator(props)));
    children = children.concat(dispatch(tooltipGenerator(props)));
    children = children.filter(item => item !== UNDEFINED);
    dispatch(onUpdateChildren({ id, payload: children }));
    dispatch(onUpdateProps({ id, payload: props }));
    if (linechartPreload in props) {
      dispatch(onLineChartLoad(props));
    }
  }
);
export const onLineChartRefreshData =
  (oriChildren, oriDataSource, { data, dataSourceTemplate, refDataTemplate }) => (
  (dispatch) => {
    const dataSource = oriDataSource !== UNDEFINED ? oriDataSource : data;
    const filtereddDataSourceTemplate = dataSourceTemplate !== UNDEFINED ?
      dataSourceTemplate : defaultLineChartDataSourceTemplate;
    const filteredRefDataTemplate = refDataTemplate !== UNDEFINED ?
      refDataTemplate : defaultLineChartDataSourceTemplate;
    const filteredData = filtereddDataSourceTemplate(dataSource);
    const refData = filteredRefDataTemplate(dataSource);
    const children = dispatch(onLineChartUpdateRefLines(oriChildren, refData));
    const result = Object.assign({}, { children, data: filteredData });
    return result;
  }
);
export const onLineChartDispose = ({ id }) => (
  (dispatch) => {
    dispatch(onDelete({ id }));
  }
);
