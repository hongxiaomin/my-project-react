// /**
// fileName    : index.js
// writer      : **Input your name here**
// reviewers   : **Input reviewers here**
// */

import { connect } from 'react-redux';
// import { onActionClick, onButInit } from '../../actions/ActionBtnAction';
import { ImgReducerName, UIReducerName } from '../../constants/Config';
import { onImgInitial } from '../../actions/ImgAction';
import Image from '../../components/Image';

const mapStateToProps = (state, props) => ({
    // ... receiver
  src: state.getIn([UIReducerName, ImgReducerName, props.name, props.id]),
});
const mapDispatchToProps = (dispatch, props) => ({
  onInitial: (() => dispatch(onImgInitial(props)))(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Image);
