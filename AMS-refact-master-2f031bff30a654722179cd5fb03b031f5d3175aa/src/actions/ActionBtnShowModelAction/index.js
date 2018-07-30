/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import { message } from 'antd';
import { createAction } from 'redux-actions';
import { formReducerName, formPropsName, formDataSourceName, formDataName } from '../../constants/Config';
import { tableRedecurName } from '../../constants/TableConfig';
import { onFormSubmit } from '../FormAction';
import { clearRowsKeys } from '../TableAction';
import Request from '../../utils/Request';
import { MODELSHOWHIDE, MODELMESSAGE } from '../../constants/ActionTypes';

const modelShowHide = createAction(MODELSHOWHIDE);
const modelMessage = createAction(MODELMESSAGE);
export const onSubmit = props => (
  (dispatch, getState) => {
    const state = getState();
    const { tableName } = props;
    const url = props.action ? props.action : '';
    const method = props.method ? props.method : 'PUT';
    const selectedId = state.getIn([tableRedecurName, tableName, 'id']);
    const Idparam = { id: selectedId };
    const param = props.paramTemplates ? props.paramTemplates(Idparam) : '';
    const callback = (response) => {
      if (response.code === 0) {
        message.success(response && response.message ? response.message : 'submit success!', 3);
        dispatch(modelShowHide(false));
        dispatch(modelMessage(''));
        dispatch(clearRowsKeys(props.tableName));
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
    const url = props.action ? props.action : '';
    const method = props.method ? props.method : 'PUT';
    const selectedId = state.getIn([tableRedecurName, tableName, 'id']);
    const Idparam = { id: selectedId };
    const param = props.paramTemplate ? props.paramTemplate(Idparam) : '';
    const callback = (response) => {
      if (response.code === -1) {
        const visible = true;
        const messages = response.message;
        if (selectedId) {
          if (messages.indexOf('material') > 0) {
            message.error(response && response.message ? response.message : 'submit fail!', 3);
          } else {
            dispatch(modelShowHide(visible));
            dispatch(modelMessage(messages));
          }
        } else {
          message.error('请选中具体内容！', 3);
        }
      } else {
        message.success(response && response.message ? response.message : 'submit success!', 3);
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
