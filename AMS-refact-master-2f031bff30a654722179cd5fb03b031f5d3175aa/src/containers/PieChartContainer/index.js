/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import { connect } from 'react-redux';
import PieChart from '../../components/PieChart';
import {
  onPieChartInitial,
  getLocate,
  onPieChartRefreshData,
  onPieChartDispose,
} from '../../actions/PieChartAction';
import { getId } from '../../actions/CommonAction';
import {
  protectReducer,
  privateReducer,
  childrenName,
  dataSourceName,
  formReducerName
} from '../../constants/Config';

const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = (dispatch, props) => ({
  id: dispatch(getId()),
  locate: dispatch(getLocate(props)),
  onInitial: id => dispatch(onPieChartInitial(id, props)),
  onPieChartRefreshData: (children, data) =>
    dispatch(onPieChartRefreshData(children, data, props)),
  onDispose: () => dispatch(onPieChartDispose(props)),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
  ...dispatchProps.onPieChartRefreshData(
    stateProps.state.getIn([privateReducer, dispatchProps.id, childrenName]),
    stateProps.state.getIn([protectReducer, props.name, dataSourceName]),
    stateProps.state.getIn([formReducerName, dispatchProps.locate, dataSourceName]),
  ),
  ...dispatchProps,
  ...props,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PieChart);


