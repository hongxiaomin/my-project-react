/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onDeltaMeterChartInitial } from '../../actions/DeltaMeterChartAction';
import DeltaMeterChart from '../../components/DeltaMeterChart';

import { UIName, DeltaMeterChartData } from '../../constants/Config';


const mapStateToProps = (state, props) => ({
    state,
    props
});

const mapDispatchToProps = (dispatch, props) => ({
    onInitial: (() => { dispatch(onDeltaMeterChartInitial(props)) })(),
});

const mergeProps = (stateProps, dispatchProps, props) => ({
	  percent: stateProps.state.getIn([UIName, props.name, DeltaMeterChartData]), 
	  action: stateProps.props.action,
  	name: stateProps.props.name,
  	...dispatchProps,
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeltaMeterChart);
