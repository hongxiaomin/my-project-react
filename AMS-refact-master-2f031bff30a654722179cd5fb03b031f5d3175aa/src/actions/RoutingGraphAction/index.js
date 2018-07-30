import { message } from 'antd';
import { SERVER_IP_SMT } from '../../constants/Settings';
import Request from '../../utils/Request';
import Request4 from '../../utils/Request4';
import { onRoutingShowStateInitial, deleteGraphData } from '../../actions/UIAction';
import { graphFunc } from '../../components/RoutingGraph/RoutingGraph';

const onActionFail = e => (
  () => message.error(e || 'submit failed!')
);
export const getRoutingGraphStationList = props => (
  (dispatch) => {
    const url = `${SERVER_IP_SMT}/ams/eqm/produceline/setting/assembly/item`;
    const callback = (response) => {
      if (response.code === 0) {
        const stationDate = response.rows;
        dispatch(onRoutingShowStateInitial({ name: 'routingGraphStationData', value: stationDate }));
      }
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      callback,
      error,
    });
  });
export const getRoutingGraphRoutingList = props => (
    (dispatch) => {
      const url = `${SERVER_IP_SMT}/ams/routing`;
      const callback = (response) => {
        if (response.code === 0) {
          const routingDate = response.rows;
          dispatch(onRoutingShowStateInitial({ name: 'routingGraphRoutingData', value: routingDate }));
        }
      };
      const error = (e) => {
        dispatch(onActionFail(e));
      };
      Request({
        url,
        callback,
        error,
      });
    });
export const getRoutingGraphData = props => (
  (dispatch, getState) => {
    const state = getState();
    const selectDate = state.getIn(['Table', props.tableName, 'selectedRows']);
    if (selectDate.length > 0) {
      const routingId = selectDate[0].id;
      const url = `${SERVER_IP_SMT}/ams/routing/info?routingId=${routingId}`;
      const callback = (response) => {
        if (response.code === 0) {
          const graphData = response.rows;
          dispatch(onRoutingShowStateInitial({ name: 'routingGraphData', value: graphData }));
          dispatch(onRoutingShowStateInitial({ name: 'routingGraphShowState', value: 'block' }));
        }
      };
      const error = (e) => {
        dispatch(onActionFail(e));
      };
      Request({
        url,
        callback,
        error,
      });
    }
  }
);
export const dataSave = params => (
  (dispatch, getState) => {
    // debugger;
    const state = getState();
    const method = 'POST';
    const url = `${SERVER_IP_SMT}/ams/routing/info`;
    const selectRows = state.getIn(['Table', 'RoutingSetting1', 'selectedRows']);
    const routingId = selectRows[0].id.toString();
    const savaData = { routingId, nodeList: params.nodeList, edgeList: params.edgeList };
    const callback = (response) => {
      if (response.code === 0) {
        message.success(response.message, 3);
      }
    };
    Request4({
      url,
      method,
      callback,
      data: savaData,
    });
  }
);
export const updateDataSave = params => (
  (dispatch, getState) => {
    // debugger;
    const state = getState();
    const method = 'PUT';
    const url = `${SERVER_IP_SMT}/ams/routing/info`;
    const selectRows = state.getIn(['Table', 'RoutingSetting1', 'selectedRows']);
    const routingId = selectRows[0].id.toString();
    const savaData = { routingId, nodeList: params.nodeList, edgeList: params.edgeList };
    const callback = (response) => {
      if (response.code === 0) {
        message.success(response.message, 3);
      }
    };
    Request4({
      url,
      method,
      callback,
      data: savaData,
    });
  }
);
export const hideGraphModel = () => (
  (dispatch) => {
    dispatch(onRoutingShowStateInitial({ name: 'routingGraphShowState', value: 'none' }));
  }
);

export const cancelGraphOperator = () => (
  (dispatch, getState) => {
    const state = getState();
    const graphData = state.getIn(['UI', 'RoutingGraph', 'routingGraphData']);
    const stationData = state.getIn(['UI', 'RoutingGraph', 'routingGraphStationData']);
    const routingData = state.getIn(['UI', 'RoutingGraph', 'routingGraphRoutingData']);
    graphFunc(graphData, { station: stationData, route: routingData });
  }
);

export const deleteGraphOperator = () => (
  (dispatch, getState) => {
    const state = getState();
    const graphData = '';
    const stationData = state.getIn(['UI', 'RoutingGraph', 'routingGraphStationData']);
    const routingData = state.getIn(['UI', 'RoutingGraph', 'routingGraphRoutingData']);
    graphFunc(graphData, { station: stationData, route: routingData });
    const method = 'DELETE';
    const selectRows = state.getIn(['Table', 'RoutingSetting1', 'selectedRows']);
    const routingId = selectRows[0].id.toString();
    const url = `${SERVER_IP_SMT}/ams/routing/info?routingId=${routingId}`;
    const callback = (response) => {
      if (response.code === 0) {
        message.success(response.message, 3);
      }
    };
    Request4({
      url,
      method,
      callback,
    });
  }
);
