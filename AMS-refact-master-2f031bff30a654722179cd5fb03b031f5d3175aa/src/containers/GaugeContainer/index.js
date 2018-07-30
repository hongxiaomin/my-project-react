/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { connect } from 'react-redux';
import Gauge from '../../components/Gauge';
import IdGenerator from '../../components/IdGenerator';
import {
  onGaugeInitial,
  onGaugeDispose,
  onGaugeRefreshData } from '../../actions/GaugeAction';
import {
  storeReducer,
  dataName } from '../../constants/Config2';

const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = (dispatch, props) => ({
  onInitial: () => dispatch(onGaugeInitial(props)),
  onDispose: () => dispatch(onGaugeDispose(props)),
  onRefreshData: dataSource => dispatch(onGaugeRefreshData(dataSource, props)),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
  data: dispatchProps.onRefreshData(
    stateProps.state.getIn([storeReducer, props.id, dataName, props.name]),
  ),
  ...dispatchProps,
  ...props,
});

const GaugeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Gauge);

export default props => (
  <IdGenerator component={GaugeContainer} {...props} />
);
