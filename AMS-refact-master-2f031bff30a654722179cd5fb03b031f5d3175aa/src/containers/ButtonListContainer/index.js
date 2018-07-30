/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onClick } from '../../actions/SelectListAction';
import ButtonList from '../../components/ButtonList';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    buttonClick: () => { dispatch(onClick(props)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonList);
