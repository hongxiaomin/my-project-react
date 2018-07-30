/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
// import { /* Add your action here */ } from '../../actions/CheckBoxGroupAction';
import { formReducerName, formDataName, CheckBoxChecked } from '../../constants/Config';
import { checkBoxChangeFunc, onSaveCheckBoxChecked, saveCheckboxData, saveCheckboxDataLoad, saveCheckboxDisabled } from '../../actions/FormAction';
import CheckBox from '../../components/CheckBox';

const mapStateToProps = (state, props) => (
  {

    checkBoxChecked: state.getIn([formReducerName, props.formName, formDataName, CheckBoxChecked, props.name]) ? state.getIn([formReducerName, props.formName, formDataName, CheckBoxChecked, props.name]) : false,
  }
  );
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onCheckBoxChange: (e) => {
      dispatch(checkBoxChangeFunc({ e, props }));
    },
    init: (() => {
      const { tableName, formName, record, name, disabled, ischecktrue, initCheckBox } = props;
      if (!initCheckBox) {
        return null;
      }
      const checked = record && record.checked ? record.checked : '';
      dispatch(onSaveCheckBoxChecked({ formName, checked: disabled ? false : !!ischecktrue, name }));
      record ? dispatch(onSaveCheckBoxChecked({ formName, checked: disabled ? false : !!ischecktrue, name: 'allCheck' })) :
      dispatch(onSaveCheckBoxChecked({ formName, isCheckbox: disabled ? false : '', name: 'allCheck' }));
      if (checked !== '') {
        dispatch(onSaveCheckBoxChecked({ formName, checked: true, name }));
      }
      dispatch(saveCheckboxDisabled({ formName, disabled, name }));
      dispatch(saveCheckboxDataLoad({
        formName,
        record,
        name,
      }));
      (ischecktrue && !disabled) || checked ? dispatch(saveCheckboxData({
        formName,
        name,
        record,
      })) : dispatch(saveCheckboxData({
        formName,
        name,
        record: '',
      }));
    })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckBox);
