/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { UIReducerName } from '../../constants/Config';
import ShowTime from '../../components/ShowTime';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    showTime: state.getIn([UIReducerName, 'timeData', props.name]),
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
)(ShowTime);
