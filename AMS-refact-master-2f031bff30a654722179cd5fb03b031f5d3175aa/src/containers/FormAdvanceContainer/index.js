/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import FormAdvance from '../../components/FormAdvance';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    onSubmit: () => console.log('in'),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormAdvance);
