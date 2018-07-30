import { connect } from 'react-redux';
import RoutingGraphGroup from '../../components/RoutingGraphGroup';
import { onRoutingShowStateInitial } from '../../actions/UIAction';
import { getRoutingGraphRoutingList, getRoutingGraphStationList } from '../../actions/RoutingGraphAction';

const mapStateToProps = (state, props) => (
  {
    showState: state.getIn(['UI', 'RoutingGraph', 'routingGraphShowState']),
    routingToolBarStationData: state.getIn(['UI', 'RoutingGraph', 'routingGraphStationData']),
    routingToolBarRouteData: state.getIn(['UI', 'RoutingGraph', 'routingGraphRoutingData']),
    routingDate: state.getIn(['UI', 'RoutingGraph', 'routingGraphRoutingData']),
    stationDate: state.getIn(['UI', 'RoutingGraph', 'routingGraphStationData']),
    routingGraphData: state.getIn(['UI', 'RoutingGraph', 'routingGraphData']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    init: (() => {
      dispatch(onRoutingShowStateInitial({ name: 'routingGraphShowState', value: 'none' }));
      dispatch(getRoutingGraphRoutingList());
      dispatch(getRoutingGraphStationList());
    })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingGraphGroup);
