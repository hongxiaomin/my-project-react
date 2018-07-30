/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import Upload from '../../components/Upload';
import {
  beforeUploadSend,
  customRequest } from '../../actions/UploadAction';
import {
  formReducerName,
  formDataName } from '../../constants/Config';

const mapStateToProps = (state, props) => (
  {
    value: state.getIn([formReducerName, props.name, formDataName, 'name']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    customRequest: data => dispatch(customRequest(props, data)),
    beforeUpload: file => dispatch(beforeUploadSend(props, file)),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
