/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onTableButtonClick } from '../../actions/TableAction';
import EditableCellButton from '../../components/EditableCellButton';

const mapStateToProps = state => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onTableButtonClick: (index, record, type) => {
      dispatch(
      onTableButtonClick({ index, record, props, type }));
    },
    canCelBut: (index, type) => {
      dispatch(
      onTableButtonClick({ index, props, type }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableCellButton);
