/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { upDataRow } from '../../actions/TableAction';
import EditableCell from '../../components/EditableCell';
import { tableRedecurName, tableRowName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => ({

});
const mapDispatchToProps = (dispatch, props) => (
  {
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableCell);
