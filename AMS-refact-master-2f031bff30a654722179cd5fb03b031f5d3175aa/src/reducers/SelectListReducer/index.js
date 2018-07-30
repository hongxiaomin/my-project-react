/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import SelectListModel from '../../models/SelectListModel';
import { SelectListPropsName } from '../../constants/TableConfig';
import {
  UPDATEJIGDATASOURCE,
  DATASOURCEONENAME,
  UPDATEJIGSHELFSIDE,
  UPDATEJIGSHELFIAYER,
  UPDATEJIGSHELFLAYERCLICK,
  UPDATEJIGSHELFLAYERLIST, SAVEPARAM, SAVEDATATOWSELECT, SAVEPROPS, UPDATEJIGTYPEID, SAVEOPTION, SAVEOLDOPTION } from '../../constants/ActionTypes';

export default handleActions({
  [UPDATEJIGDATASOURCE]: (state, { payload }) => (
    /* Add your next state here*/
    state.setIn(['dataSource'], payload)
  ),
  [DATASOURCEONENAME]: (state, { payload }) => (
    state.setIn(['dataSourceName'], payload)
  ),
  [UPDATEJIGSHELFSIDE]: (state, { payload }) => (
    state.setIn(['shelfSideList'], payload).setIn(['shelfSide'], payload[0].shelfside)
  ),
  [UPDATEJIGSHELFIAYER]: (state, { payload }) => (
    state.setIn(['shelfLayer'], payload)
  ),
  [UPDATEJIGSHELFLAYERCLICK]: (state, { payload }) => (
    state.setIn(['shelfLayerClick'], payload)
  ),
  [UPDATEJIGSHELFLAYERLIST]: (state, { payload }) => (
    state.setIn(['shelfLayerList', payload.i], payload.dataSource)
  ),
  [SAVEPROPS]: (state, { payload }) => (
    state.setIn([SelectListPropsName, payload.propsName], payload.props)
  ),
  [UPDATEJIGTYPEID]: (state, { payload }) => (
    state.setIn(['JigTypeId'], payload)
  ),
  [SAVEOPTION]: (state, { payload }) => (
    state.setIn([payload.nextSelectName], payload.option)
  ),
  [SAVEOLDOPTION]: (state, { payload }) => (
    state.setIn(['OldOption'], payload)
  ),
  [SAVEDATATOWSELECT]: (state, { payload }) => (
    state.setIn([payload.SelectNeedLoad, 'load'], payload.load)
  ),
  [SAVEPARAM]: (state, { payload }) => (
    state.setIn([payload.SelectNeedLoad, 'data'], payload.data)
  ),
}, SelectListModel);
