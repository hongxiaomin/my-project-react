/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { connect } from 'react-redux';
import BarChart from '../../components/BarChart2';
import IdGenerator from '../../components/IdGenerator';
import {
  onBarChartInitial,
  onBarChartDispose,
  onBarChartUpdateDataSource } from '../../actions/BarChartAction2';
import {
  storeReducer,
  dataName,
  childrenName } from '../../constants/Config2';

const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = (dispatch, props) => ({
  onInitial: () => dispatch(onBarChartInitial(props)),
  onUpdateDataSource: dataSource => dispatch(onBarChartUpdateDataSource(dataSource, props)),
  onDispose: () => dispatch(onBarChartDispose(props)),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
  data: dispatchProps.onUpdateDataSource(
    stateProps.state.getIn([storeReducer, props.id, dataName, props.name]),
  ),
  children: stateProps.state.getIn([storeReducer, props.id, childrenName]),
  ...dispatchProps,
  ...props,
});

const BarChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(BarChart);

export default props => (
  <IdGenerator component={BarChartContainer} {...props} />
);
