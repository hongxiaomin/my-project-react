/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { message } from 'antd';
import { SERVER_IP_RULE1 } from '../../constants/Settings';
import Request from '../../utils/Request';
import Request4 from '../../utils/Request4';
import { onRuleShowStateInitial } from '../../actions/UIAction';
import { graphFunc } from '../../components/RuleGraph/RoutingGraph';

const onActionFail = e => (
  () => message.error(e || 'submit failed!')
);
export const getRuleGraphRuleList = props => (
  (dispatch) => {
    const url = `${SERVER_IP_RULE1}/ams/rule/node`;
    const callback = (response) => {
      if (response.code === 0) {
        const ruleDate = response.rows;
        dispatch(onRuleShowStateInitial({ name: 'ruleGraphRuleData', value: ruleDate }));
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
export const getRuleGraphData = props => (
  (dispatch, getState) => {
    const state = getState();
    const selectDate = state.getIn(['Table', props.tableName, 'selectedRows']);
    if (selectDate.length > 0) {
      const ruleId = selectDate[0].id;
      const url = `${SERVER_IP_RULE1}/ams/routing/info?routingId=${ruleId}`;
      const callback = (response) => {
        if (response.code === 0) {
          const graphData = response.rows;
          dispatch(onRuleShowStateInitial({ name: 'ruleGraphData', value: graphData }));
          dispatch(onRuleShowStateInitial({ name: 'ruleGraphShowState', value: 'block' }));
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
export const ruleDataSave = params => (
  (dispatch, getState) => {
    const state = getState();
    const method = 'POST';
    const url = `${SERVER_IP_RULE1}/ams/routing/info`;
    const selectRows = state.getIn(['Table', 'RuleSettingTable', 'selectedRows']);
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
export const ruleUpdateDataSave = params => (
  (dispatch, getState) => {
    const state = getState();
    const method = 'PUT';
    const url = `${SERVER_IP_RULE1}/ams/routing/info`;
    const selectRows = state.getIn(['Table', 'RuleSettingTable', 'selectedRows']);
    const routingId = selectRows[0].id.toString();
    const nodeListData = params.nodeList;
    const edgeListData = params.edgeList;
    if (params && edgeListData.length === 0 && nodeListData.length !== 0) {
      message.error('没有连线！', 3);
      return false;
    }
    const savaData = { routingId, nodeList: nodeListData, edgeList: edgeListData };
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
    dispatch(onRuleShowStateInitial({ name: 'ruleGraphShowState', value: 'none' }));
  }
);

export const cancelRuleGraphOperator = () => (
  (dispatch, getState) => {
    const state = getState();
    const graphData = state.getIn(['UI', 'RuleGraph', 'ruleGraphData']);
    const ruleData = state.getIn(['UI', 'RuleGraph', 'ruleGraphRuleData']);
    graphFunc(graphData, { rule: ruleData });
  }
);

// export const deleteRuleGraphOperator = () => (
//   (dispatch, getState) => {
//     const state = getState();
//     const graphData = '';
//     const ruleData = state.getIn(['UI', 'RuleGraph', 'ruleGraphRuleData']);
//     graphFunc(graphData, { rule: ruleData });
//     const method = 'DELETE';
//     const selectRows = state.getIn(['Table', 'RuleSettingTable', 'selectedRows']);
//     const ruleId = selectRows[0].id.toString();
//     const url = `${SERVER_IP_RULE1}/ams/routing/info?routingId=${ruleId}`;
//     const callback = (response) => {
//       if (response.code === 0) {
//         message.success(response.message, 3);
//       }
//     };
//     Request4({
//       url,
//       method,
//       callback,
//     });
//   }
// );
