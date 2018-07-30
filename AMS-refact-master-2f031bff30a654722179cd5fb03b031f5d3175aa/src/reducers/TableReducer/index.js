/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import TableModel from '../../models/TableModel';
import {
  ONROWSELECTEDCHANGE,
  UPDATEDATASOURCE,
  CLEARROWSKEYS,
  CLEARROWID,
  ONSAVEPAGINATION,
  GETSAVEDATA,
  SAVEROWDATA,
  SAVEPTABLEROPS,
  UPDATAROW,
  TABLEDOUBLECLICK,
  DELETEDATAROW, ONSELECTBASESETTING, ONBUTINIT, ADDARRAYONELINE, SAVETABLETNPUTDATA, CLEARTABLETNPUTDATA,
} from '../../constants/ActionTypes';
import { tableResponse, tablePropsName, tableRowName } from '../../constants/TableConfig';

export default handleActions({
  [ONROWSELECTEDCHANGE]: (state, { payload }) => (
    /* Add your next state here*/
    state.setIn([payload.props.name, 'selectedRowKeys'], payload.selectedRowKeys).setIn([payload.props.name, 'selectedRows'], payload.selectedRows).setIn([payload.props.name, 'id'], payload.dataId)
  ),
  [UPDATEDATASOURCE]: (state, { payload }) => (
    state.setIn([payload.tableName, 'dataSource'], payload.dataSource)
  ),
  [CLEARROWSKEYS]: (state, { payload }) => (
    state.setIn([payload, 'selectedRowKeys'], []).setIn([payload, 'selectedRows'], [])
  ),
  [ONSAVEPAGINATION]: (state, { payload }) => (
    state.setIn([payload.tableName, 'page'], payload.page).setIn([payload.tableName, 'pageSize'], payload.pageSize)
  ),
  [GETSAVEDATA]: (state, { payload }) => (
    state.setIn([payload.tableName, tableResponse], payload.response)
  ),
  [SAVEROWDATA]: (state, { payload }) => (
    state.setIn([payload.tableName, 'rowData'], payload.record)
  ),
  [SAVEPTABLEROPS]: (state, { payload }) => (
    state.setIn([payload.tableName, tablePropsName], payload.props)
  ),
  [CLEARROWID]: (state, { payload }) => (
    state.setIn([payload, 'id'], '').setIn([payload, 'selectedRows'], '')
  ),
  [UPDATAROW]: (state, { payload }) => (
    state.setIn([payload.tableName, tableRowName, payload.index, payload.rowKey],
      payload.inputValue)
  ),
  [DELETEDATAROW]: (state, { payload }) => (
    state.setIn([payload.tableName, tableRowName, payload.index], '')
  ),
  [TABLEDOUBLECLICK]: (state, { payload }) => (
    state.setIn(['tableTowClick'], payload)
  ),
  [ONSELECTBASESETTING]: (state, { payload }) => (
    state.setIn(['select', payload.name], payload)
  ),
  [ONBUTINIT]: (state, { payload }) => (
    state.setIn([payload.mode, 'disabled'], payload.disabled)
  ),
  [ADDARRAYONELINE]: (state, { payload }) => (
    state.setIn([payload.tableName, 'inputArray'], payload.newArray)
  ),
  [SAVETABLETNPUTDATA]: (state, { payload }) => {
    console.error('payload', payload);
    console.error('state', state.toJS());
    return (
    state.setIn([payload.tableName, 'tableInputData', payload.index, payload.name], payload.value)
    );
  },
  [CLEARTABLETNPUTDATA]: (state, { payload }) => (
    state.setIn([payload.firstName, payload.secondName], payload.value)
  ),
}, TableModel);
