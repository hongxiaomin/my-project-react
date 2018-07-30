/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import JigShelfManageList from '../../components/JigShelfManageList';
import { buttonLeftInit } from '../../actions/SelectListAction';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = state => (
  {
    areacode: state.getIn([SelectListReducerName, 'dataSource']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    init: (() => { dispatch(buttonLeftInit(props)); })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JigShelfManageList);
