/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { message } from 'antd';
import { showHideModal } from '../../actions/ModalAction';
import { refreshDataSource } from '../../actions/ModalFormAction';
import ModalForm from '../../components/ModalForm';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    // onInitial: (() => dispatch(onModalFormInitial(props)))(),
    hideRefreshModal: (response) => {
      // dispatch(refreshDataSource(props));
      // dispatch(showHideModal({ ...props, visible: false }));
      if (!response.code) {
        message.destroy();
        message.success(response && response.message ? response.message : 'submit success!', 3);
        dispatch(refreshDataSource(props));
        dispatch(showHideModal({ ...props, visible: false }));
      } else {
        message.destroy();
        message.error(response && response.message ? response.message : 'submit failed!', 3);
      }
    },
    hideModal: () => {
      dispatch(showHideModal({ ...props, visible: false }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalForm);
