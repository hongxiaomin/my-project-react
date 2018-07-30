/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onShowModalClick, onSearchClick, onOkClick, onBtnClick } from '../../actions/SMMSkipCarManageAction';
import SMMSkipCarManage from '../../components/SMMSkipCarManage';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    modalVisible: state.getIn(['SMMSkipCarManageReducer', 'modalVisible']),
    modalType: state.getIn(['SMMSkipCarManageReducer', 'modalType']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onShowModalClick: () => { dispatch(onShowModalClick()); },
    onSearchClick: (data) => { dispatch(onSearchClick(data)); },
    onOkClick: (data) => { dispatch(onOkClick(data)); },
    onBtnClick: (data) => { dispatch(onBtnClick(data)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMMSkipCarManage);
