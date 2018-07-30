/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { /* Add your action here */ } from '../../actions/BreadAction';
import Bread from '../../components/Bread';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
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
)(Bread);
