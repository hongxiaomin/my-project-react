/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
// import { /* Add your action here */ } from '../../actions/JigShelfCardAction';
import JigShelfCard from '../../components/JigShelfCard';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = state => (
  {
    // ... receiver
    name: state.getIn([SelectListReducerName, 'dataSourceName']),
  });
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JigShelfCard);
