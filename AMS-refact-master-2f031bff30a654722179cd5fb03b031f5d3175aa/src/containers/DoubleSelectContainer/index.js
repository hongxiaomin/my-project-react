/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import {
  onSelectInitial,
  onSelectValueChange } from '../../actions/SelectAction';
import { onFormDataChange } from '../../actions/FormAction';
import DoubleSelect from '../../components/DoubleSelect';
import {
  formReducerName,
  formDataName,
  UIReducerName,
  selectName,
  UISelectOptionName } from '../../constants/Config';
import { GUID } from '../../utils/Common';

const mapStateToProps = state => (
  {
    state,
  }
);
const mapDispatchToProps = (dispatch, props) => {
  const id = props.id ? props.id : GUID();
  const formName = props.formName ? props.formName : selectName;
  const name = props.name ? props.name : '';
  return {
    id,
    onInitial: (() => dispatch(onSelectInitial(id, props)))(),
    onValueChange: (e) => {
      e = e.join();
      dispatch(
      onFormDataChange({
        formName,
        name,
        value: e || '-1' }));
    },
  };
};
const mergeProps = (stateProps, dispatchProps, props) => ({
  value: stateProps.state.getIn([
    formReducerName,
    props.formName ? props.formName : selectName,
    formDataName,
    props.name]),
  options: stateProps.state.getIn([
    UIReducerName,
    dispatchProps.id,
    UISelectOptionName]),
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DoubleSelect);
