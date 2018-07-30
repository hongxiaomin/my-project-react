/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
// import { TowSelectInital } from '../../actions/SelectListAction';
import TowSelect from '../../components/TowSelect';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    load: props.load ? props.load : state.getIn([SelectListReducerName, props.name, 'load']),
    data: state.getIn([SelectListReducerName, props.name, 'data']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
  //  init: (() => { props.load ? dispatch(TowSelectInital(props)) : ''; })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TowSelect);
