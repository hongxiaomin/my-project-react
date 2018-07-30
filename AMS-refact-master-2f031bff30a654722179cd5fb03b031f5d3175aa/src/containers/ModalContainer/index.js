/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onModalInitial, showHideModal, onModalOk } from '../../actions/ModalAction';
import Modal from '../../components/Modal';
import { formReducerName, formDataName } from '../../constants/Config';
import { modalReducerName } from '../../constants/ModalConfig';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    visible: state.getIn([modalReducerName, props.name, 'visible']),
  }
);
const mapDispatchToProps = (dispatch, props) => {
  if (!props.cancelInitial) {
    return (
    {
      // dispatcher
      onInitial: (() => dispatch(onModalInitial(props)))(),
      onShow: () => { dispatch(showHideModal({ ...props, visible: true })); },
      onHide: () => {
        if (props.beforeHide) {
          dispatch(props.beforeHide(props));
        }
        dispatch(showHideModal({ ...props, visible: false }));
      },
      onOkClick: () => { dispatch(onModalOk(props)); },
    }
    );
  }
  return (
  {
    // ... dispatcher
    onShow: () => { dispatch(showHideModal({ ...props, visible: true })); },
    onHide: () => { dispatch(showHideModal({ ...props, visible: false })); },
    onOkClick: () => { dispatch(onModalOk(props)); },
  }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
