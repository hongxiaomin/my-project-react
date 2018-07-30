/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onValueChange, onAutoInputInitial } from '../../actions/AutoInputAction';
import {
  formReducerName,
  formDataName,
  formDataSourceName,
  UIReducerName,
  UISelectOptionName,
  autoInputName } from '../../constants/Config';
import AutoInput from '../../components/AutoInput';
import { GUID } from '../../utils/Common';

const mapStateToProps = state => (
  {
    // ... receiver
    state,
  }
);
const mapDispatchToProps = (dispatch, props) => {
  const id = props.id ? props.id : GUID();
  return {
    id,
    onInitial: (() => dispatch(onAutoInputInitial(id, props)))(),
    onValueChange: e => dispatch(onValueChange(id, props, e)),
  };
};
const mergeProps = (stateProps, dispatchProps, props) => ({
  value: stateProps.state.getIn([
    formReducerName,
    props.formName ? props.formName : autoInputName,
    formDataName,
    props.name]),
  options: stateProps.state.getIn([
    UIReducerName,
    dispatchProps.id,
    UISelectOptionName]),
  ...props,
  ...dispatchProps,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AutoInput);
