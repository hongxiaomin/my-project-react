/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onActionClick, onSubmit, onCancel } from '../../actions/ActionBtnShowSureModelAction';
import ActionBtnShowSureModel from '../../components/ActionBtnShowSureModel';

const mapStateToProps = (state, props) => (
  {
    visible: state.getIn(['Modal', 'BtnShowModel', 'visible']),
    message: state.getIn(['Modal', 'ModelMessge', 'message']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onClick: () => { dispatch(onActionClick(props)); },
    handleOk: () => { dispatch(onSubmit(props)); },
    handleCancel: () => { dispatch(onCancel(props)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionBtnShowSureModel);
