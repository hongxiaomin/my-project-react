/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onFormDataChange } from '../../actions/FormAction';
import DatePicker from '../../components/DatePicker';
import { datePiackerName, formReducerName, formDataName } from '../../constants/Config';
import { getDate } from '../../utils/Common';

const mapStateToProps = (state, props) => {
  if (props.oldDate) {
    const value = state.getIn([
      formReducerName,
      props.formName,
      formDataName, props.name]) ?
        state.getIn([
          formReducerName,
          props.formName,
          formDataName, props.name])
          : '';
    return { defaultValue: value };
  }
  return null;
};


const mapDispatchToProps = (dispatch, props) => (
  {
    onChange: (e) => {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : datePiackerName,
        name: props.name,
        value: props.newDate ? (e ? getDate(e.unix() * 1000) : '') : (e ? e.unix() * 1000 : '') }));
    },
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatePicker);
