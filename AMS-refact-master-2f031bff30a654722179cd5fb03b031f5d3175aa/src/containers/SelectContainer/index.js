/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import {
  onSelectInitial,
  onSelectValueChange } from '../../actions/SelectAction';
import Select from '../../components/Select';
import {
  formReducerName,
  formDataName,
  UIReducerName,
  selectName,
  UISelectOptionName,
  UISelectDisableName } from '../../constants/Config';
import { GUID } from '../../utils/Common';
import { tableRedecurName } from '../../constants/TableConfig';

const mapStateToProps = state => (
  {
    state,
  }
);
const mapDispatchToProps = (dispatch, props) => {
  const id = props.id ? props.id : GUID();
  return {
    id,
    onInitial: (() => dispatch(onSelectInitial(id, props)))(),
    onValueChange: e => dispatch(onSelectValueChange(id, props, e)),
  };
};
const mergeProps = (stateProps, dispatchProps, props) => ({
  value: props.index !== undefined ? stateProps.state.getIn([
    tableRedecurName,
    props.tableName,
    'tableInputData',
    props.index,
    props.name]) : stateProps.state.getIn([
      formReducerName,
      props.formName ? props.formName : selectName,
      formDataName,
      props.name]),
  options: stateProps.state.getIn([
    UIReducerName,
    dispatchProps.id,
    UISelectOptionName]),
  disabled: props.disabled ? props.disabled : stateProps.state.getIn([
    UIReducerName,
    dispatchProps.id,
    UISelectDisableName]),
  mode: props.mode,
  ...dispatchProps,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Select);
