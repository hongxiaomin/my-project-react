/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { getDataSelectList, onSlectChange } from '../../actions/SelectListAction';
import SelectList from '../../components/SelectList';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    init: (() => { dispatch(getDataSelectList(props)); })(),
    onChange: (name, e) => { dispatch(onSlectChange({ name, e, props })); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectList);
