/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import { connect } from 'react-redux';
import LineChart from '../../components/LineChart';
import {
  onLineChartInitial,
  getLocate,
  onLineChartRefreshData } from '../../actions/LineChartAction';
import { getId } from '../../actions/CommonAction';
import {
  protectReducer,
  privateReducer,
  childrenName,
  dataSourceName,
  formReducerName } from '../../constants/Config';

const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = (dispatch, props) => ({
  id: dispatch(getId()),
  locate: dispatch(getLocate(props)),
  onInitial: id => dispatch(onLineChartInitial(id, props)),
  onLineChartRefreshData: (children, data) =>
    dispatch(onLineChartRefreshData(children, data, props)),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
  ...dispatchProps.onLineChartRefreshData(
    stateProps.state.getIn([privateReducer, dispatchProps.id, childrenName]),
    stateProps.state.getIn([formReducerName, dispatchProps.locate, dataSourceName]),
  ),
  ...dispatchProps,
  ...props,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LineChart);
