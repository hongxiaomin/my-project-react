/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onDeltaStackedBarChartInitial } from '../../actions/DeltaStackedBarChartAction';
import DeltaStackedBarChart from '../../components/DeltaStackedBarChart';


import { UIName, DeltaStackedBarChartData } from '../../constants/Config';

const mapStateToProps = (state, props) => ({
    state, 
    props
});

const mapDispatchToProps = (dispatch, props) => ({
	onInitial: (() => { dispatch(onDeltaStackedBarChartInitial(props)) })(),
});

const mergeProps = (stateProps, dispatchProps, props) => ({
  data: stateProps.state.getIn([UIName, props.name, DeltaStackedBarChartData]),
  action: stateProps.props.action,
  name: stateProps.props.name,
  width: stateProps.props.width,
  height: stateProps.props.height,
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeltaStackedBarChart);
