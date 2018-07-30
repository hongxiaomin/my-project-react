1

;/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { formReducerName, formDataSourceName } from '../../constants/Config';
import CheckBoxGroup from '../../components/CheckBoxGroup';

const mapStateToProps = (state, props) => {
  console.log('props', props);
  return (
  {
    // ... receiver
    data: props.dataSourceTemplate ? props.dataSourceTemplate(state.getIn([formReducerName, props.formName, formDataSourceName])) : state.getIn([formReducerName, props.formName, formDataSourceName]),
  }
  )
 ;
};
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckBoxGroup);
