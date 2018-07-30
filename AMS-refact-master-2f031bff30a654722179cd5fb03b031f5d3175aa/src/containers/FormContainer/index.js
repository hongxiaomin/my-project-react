/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onFormInitial } from '../../actions/FormAction';
import Form from '../../components/Form';
import { formReducerName, formChildrenName } from '../../constants/Config';

const mapStateToProps = (state, props) => ({
  children: state.getIn([formReducerName, props.name, formChildrenName]),
});
const mapDispatchToProps = (dispatch, props) => ({
  onInitial: () => dispatch(onFormInitial(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
