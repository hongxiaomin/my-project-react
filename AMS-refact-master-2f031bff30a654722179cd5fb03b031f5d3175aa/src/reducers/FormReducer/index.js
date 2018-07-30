/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { handleActions } from 'redux-actions';
import FormModel from '../../models/FormModel';
import { ONFORMUPDATECHILDREN,
         ONFORMDATACHANGE,
         ONFORMDATASOURCECHANGE,
         ONFORMUPDATEPROPS,
         ONFORMINPUTSAVEDATA, SAVEDISABLE, ONSAVECHECKBOXDATA, ONSAVECHECKBOXCHECKED, ONUPDATEFORMDATA, SAVECHECKBOXDATA, SAVECHECKBOXDATALOAD, SAVECHECKBOXDISABLED, CLEARCHECKBOXDATA } from '../../constants/ActionTypes';
import { formDataSourceName,
         formDataName,
         formChildrenName,
         formPropsName,
         formOriDataSourceName, checkBoxId, CheckBoxChecked } from '../../constants/Config';

export default handleActions({
  [ONFORMUPDATECHILDREN]: (state, { payload }) => (
    state.setIn([payload.formName, formChildrenName], payload.children)
  ),
  [ONFORMUPDATEPROPS]: (state, { payload }) => (
    state.setIn([payload.formName, formPropsName], payload.props)
  ),
  [ONFORMDATACHANGE]: (state, { payload }) => (
    state.setIn([payload.formName, formDataName, payload.name], payload.value)
  ),
  [ONFORMDATASOURCECHANGE]: (state, { payload }) => (
    state.setIn([payload.formName, formDataSourceName], payload.dataSource)
      .setIn([payload.formName, formOriDataSourceName], payload.response)
  ),
  [ONFORMINPUTSAVEDATA]: (state, { payload }) => (
    state.setIn([payload.labelName, payload.name], payload.value)
    ),
  [SAVEDISABLE]: (state, { payload }) => (
      state.setIn([payload.formName, payload.inputName, payload.name, 'disabled'], payload.disabled)
  ),
  [ONSAVECHECKBOXDATA]: (state, { payload }) => (
      state.setIn([payload.formName, formDataName, checkBoxId], payload.newCheckBoxArry)
  ),
  [ONSAVECHECKBOXCHECKED]: (state, { payload }) => (
      state.setIn([payload.formName, formDataName, CheckBoxChecked, payload.name], payload.checked)
  ),
  [ONUPDATEFORMDATA]: (state, { payload }) => (
    state.setIn([payload.formName, formDataName], payload.newState)
  ),
  // -------------------------------------------------------------------------------
  [SAVECHECKBOXDATA]: (state, { payload }) => (
      state.setIn([payload.formName, 'CheckedData', payload.name], payload.record)
  ),
  [SAVECHECKBOXDATALOAD]: (state, { payload }) => (
      state.setIn([payload.formName, 'CheckedDataLoad', payload.name], payload.record)
  ),
  [SAVECHECKBOXDISABLED]: (state, { payload }) => (
    state.setIn([payload.formName, 'CheckedDisabled', payload.name], payload.disabled)
  ),
  [CLEARCHECKBOXDATA]: (state, { payload }) => (
      state.setIn([payload.name, 'CheckedData'], payload.record)
  ),
}, FormModel);
