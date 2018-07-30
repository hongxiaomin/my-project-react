/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import ButtonLeft from '../../components/ButtonLeft';
import { onButtonLeftClick } from '../../actions/SelectListAction';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = state => (
  {
    // ... receiver
    dataSourceName: state.getIn([SelectListReducerName, 'dataSourceName']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onLeftClick: () => { dispatch(onButtonLeftClick(props)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonLeft);
