/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import JigShelfCardRightList from '../../components/JigShelfCardRightList';
import { SelectListReducerName } from '../../constants/TableConfig';

const mapStateToProps = state => ({
    // ... receiver
  name: state.getIn([SelectListReducerName, 'dataSourceName']),
  shelfLayerClick: state.getIn([SelectListReducerName, 'shelfLayerClick']),
  shelflayer: state.getIn([SelectListReducerName, 'shelfLayer']),
  shelfLayerList: state.getIn([SelectListReducerName, 'shelfLayerList']),
});
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher

  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JigShelfCardRightList);
