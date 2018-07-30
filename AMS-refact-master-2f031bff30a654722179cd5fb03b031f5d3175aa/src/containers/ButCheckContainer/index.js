/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { isCheckBox } from '../../actions/CheckBoxButtonAction';
import ButCheck from '../../components/ButCheck';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    onChangeCheck: (e) => {
      dispatch(isCheckBox({ e, props }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButCheck);
