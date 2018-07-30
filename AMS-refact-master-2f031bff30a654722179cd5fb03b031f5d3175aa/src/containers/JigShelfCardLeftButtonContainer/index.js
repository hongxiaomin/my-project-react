/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { cardRightInit } from '../../actions/SelectListAction';
import JigShelfCardLeftButton from '../../components/JigShelfCardLeftButton';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = state => ({
    // ... receiver
  shelfSide: state.getIn([SelectListReducerName, 'shelfSideList']),
});
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    init: (() => { dispatch(cardRightInit(props)); })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JigShelfCardLeftButton);
