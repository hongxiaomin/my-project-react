/**
fileName    : index.js
writer      : ANDY.HX.LEE
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onDeltaLineChartInitial } from '../../actions/DeltaLineChartAction';
import DeltaLineChart from '../../components/DeltaLineChart';

import { UIName, DeltaLineChartData } from '../../constants/Config';


const mapStateToProps = (state, props) => ({
  state,
  props,
});

const mapDispatchToProps = (dispatch, props) => ({
    onInitial: (() => { dispatch(onDeltaLineChartInitial(props)) })(),
});

const mergeProps = (stateProps, dispatchProps, props) => ({
  data: stateProps.state.getIn([UIName, props.name, DeltaLineChartData]),
  action: stateProps.props.action,
  name: stateProps.props.name,
  width: stateProps.props.width,
  height: stateProps.props.height,
  ...dispatchProps,
}) ;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeltaLineChart);
