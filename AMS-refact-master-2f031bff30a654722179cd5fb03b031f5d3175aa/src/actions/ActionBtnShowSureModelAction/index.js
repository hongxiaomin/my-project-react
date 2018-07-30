/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import { message } from 'antd';
import { createAction } from 'redux-actions';
import { formReducerName, formDataSourceName } from '../../constants/Config';
import { tableRedecurName } from '../../constants/TableConfig';
import { onFormDataSourceChange } from '../FormAction';
import { clearRowsKeys } from '../TableAction';
import Request from '../../utils/Request';
import { MODELSHOWHIDE, MODELMESSAGE } from '../../constants/ActionTypes';
import { graphFunc } from '../../components/RuleGraph/RoutingGraph';

const modelShowHide = createAction(MODELSHOWHIDE);
const modelMessage = createAction(MODELMESSAGE);
export const onSubmit = props => (
  (dispatch, getState) => {
    const state = getState();
    const { tableName } = props;
    const formName = props.formName;
    let url = props.action ? props.action : '';
    const method = props.method ? props.method : 'DELETE';
    const dataSourceOld = state.getIn([formReducerName, formName, formDataSourceName]);
    let id = state.getIn([tableRedecurName, tableName, 'id']);
    id += '';
    const dataSource = [];
    dataSourceOld.map((v, i) => {
      if ((v.id += '') !== id) {
        dataSource.push(v);
      }
      return null;
    });
    let param;
    if (props.newDeleteMethod) {
      param = props.dataTemplate ? props.dataTemplate(id) : { id };
    } else if (props.newDeleteMethodUrl) {
      url = `${url}?id=${id}`;
    } else if (props.ruleGraph) {
      const graphData = '';
      const ruleData = state.getIn(['UI', 'RuleGraph', 'ruleGraphRuleData']);
      graphFunc(graphData, { rule: ruleData });
      url = `${url}?routingId=${id}`;
    } else {
      param = props.dataTemplate ? props.dataTemplate(props) : { id };
    }
    const callback = (res) => {
      const response = props.responseFormatter ? props.responseFormatter(res) : res;
      if (response.code === 0) {
        message.success(response && response.message ? response.message : 'submit success!', 3);
        dispatch(modelShowHide(false));
        dispatch(modelMessage(''));
        if (!props.ruleGraph) {
          dispatch(onFormDataSourceChange({ formName, dataSource, response }));
          dispatch(clearRowsKeys(props.tableName));
        }
      } else {
        message.error(response && response.message ? response.message : 'submit fail!', 3);
      }
    };
    Request({
      method,
      url,
      param,
      callback,
    });
  }
);

export const onCancel = props => (
  (dispatch) => {
    dispatch(modelShowHide(false));
    dispatch(modelMessage(''));
  }
);
export const onActionClick = props => (
  (dispatch, getState) => {
    const { tableName } = props;
    const state = getState();
    const selectedId = state.getIn([tableRedecurName, tableName, 'id']);
    const visible = true;
    const messages = '您确认要删除此信息吗 ???';
    if (selectedId) {
      dispatch(modelShowHide(visible));
      dispatch(modelMessage(messages));
    } else {
      message.error('请选中具体内容！', 3);
    }
  }
);
