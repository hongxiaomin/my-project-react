/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import { connect } from 'react-redux';
import BarChart from '../../components/BarChart';
import {
  onBarChartInitial,
  getLocate,
  onBarChartRefreshData } from '../../actions/BarChartAction';
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
  onInitial: id => dispatch(onBarChartInitial(id, props)),
  onBarChartRefreshData: (children, data) =>
    dispatch(onBarChartRefreshData(children, data, props)),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
  ...dispatchProps.onBarChartRefreshData(
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
)(BarChart);
