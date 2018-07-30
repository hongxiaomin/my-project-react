/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onRadioClick, onGRUpdate, onPageInit } from '../../actions/SMMRecWorkPageAction';
import SMMRecWorkPage from '../../components/SMMRecWorkPage';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    isCreate: state.getIn(['SMMRecWorkPageReducer', 'isCreate']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onRadioClick: (page) => { dispatch(onRadioClick(page)); },
    onGRUpdate: () => { dispatch(onRadioClick()); },
    onInitial: (() => dispatch(onPageInit(props)))(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMMRecWorkPage);
