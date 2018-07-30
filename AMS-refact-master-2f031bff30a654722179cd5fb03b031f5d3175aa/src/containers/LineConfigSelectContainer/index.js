/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import LineConfigSelect from '../../components/LineConfigSelect';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    data: state.getIn([SelectListReducerName, props.selectName]),
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
)(LineConfigSelect);
