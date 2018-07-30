/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import React from 'react';
import { connect } from 'react-redux';
import LineChart from '../../components/LineChart2';
import IdGenerator from '../../components/IdGenerator';
import {
  onLineChartInitial,
  onLineChartRefreshData,
  onLineChartDispose } from '../../actions/LineChartAction2';
import {
  storeReducer,
  childrenName,
  dataName } from '../../constants/Config2';

const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = (dispatch, props) => ({
  onInitial: () => dispatch(onLineChartInitial(props)),
  onRefreshData: (children, dataSource) =>
    dispatch(onLineChartRefreshData(children, dataSource, props)),
  onDispose: () => dispatch(onLineChartDispose(props)),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
  ...dispatchProps.onRefreshData(
    stateProps.state.getIn([storeReducer, props.id, childrenName]),
    stateProps.state.getIn([storeReducer, props.id, dataName, props.name]),
  ),
  ...dispatchProps,
  ...props,
});

const LineChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LineChart);

export default props => (
  <IdGenerator component={LineChartContainer} {...props} />
);
