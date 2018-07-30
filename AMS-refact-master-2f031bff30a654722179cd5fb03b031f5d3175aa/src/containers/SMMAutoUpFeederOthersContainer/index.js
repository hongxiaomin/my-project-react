/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { getDefaultData } from '../../actions/SMMAutoUpFeederOthersAction';
import SMMAutoUpFeederOthers from '../../components/SMMAutoUpFeederOthers';
import { tableRedecurName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => {
  return {
    dataSource: state.getIn([tableRedecurName, 'SMMAutoUpFeederTable', 'rowData']),
  };
};
const mapDispatchToProps = (dispatch, props) => (
  {
    inintal: (() => {
      // table初始化
      dispatch(getDefaultData(props));
    })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMMAutoUpFeederOthers);
