/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import LineChangeCard from '../../components/LineChangeCard';
import { formReducerName, formDataSourceName, formDataName } from '../../constants/Config';


const mapStateToProps = (state, props) => (
  {
    // ... receiver
    data: state.getIn([formReducerName, props.formName, formDataSourceName]),
    dataForm: state.getIn([formReducerName, props.formName, formDataName]) ? state.getIn([formReducerName, props.formName, formDataName]).toJS() : '',
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LineChangeCard);
