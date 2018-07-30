/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { onFormSubmit } from '../FormAction';
import { onTableInit } from '../TableAction';
import { formReducerName, formPropsName } from '../../constants/Config';
import { tableRedecurName } from '../../constants/TableConfig';
// import { SERVER_IP_LION } from '../../constants/Settings';

export const refreshDataSource = param => (
  (dispatch, getState) => {
    // Do something...
    const formName = param.formName;
    const state = getState();
    let props;
    if (param.needSelectName) {
      const Selectprops = state.getIn([tableRedecurName, 'select', param.needSelectName]);
      props = Selectprops.props;
    } else {
      props = state.getIn([formReducerName, formName, formPropsName]);
      if (param.updateSelect) {
        props = { ...props, ...{ updateSelect: param.updateSelect, updateSelectCode: param.updateSelectCode } };
      }
    }


    if (!param.onRefresh) {
      dispatch(onFormSubmit(props));
    } else {
      const tableName = param.tableName;
      const tableProps = state.getIn([tableRedecurName, tableName, 'props']);
      dispatch(onTableInit(tableProps));
    }
  }
);
