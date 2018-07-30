/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { addArrayDataForInputList, deleteInput } from '../../actions/TableAction';
import ShowInputList from '../../components/ShowInputList';
import { tableRedecurName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
   // selectRows: state.getIn([tableRedecurName, props.tableName, 'selectedRows']) || [],
    datArray: state.getIn([tableRedecurName, props.tableName, 'inputArray']) || [],
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    addArrayData: () => {
      dispatch(addArrayDataForInputList(props));
    },
    deleteInput: (v) => {
      dispatch(deleteInput({ props, v }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowInputList);
