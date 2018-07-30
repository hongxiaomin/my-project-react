/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import Display from '../../components/Display';
import { tableRedecurName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => {
  const newProps = state.getIn([tableRedecurName, props.name]) ? state.getIn([tableRedecurName, props.name]).toJS() : '';
  const newDis = newProps && newProps.props && newProps.props.noDisplay || '';
  return (
    { noDisplay: newDis }
  );
};

export default connect(
  mapStateToProps,
)(Display);
