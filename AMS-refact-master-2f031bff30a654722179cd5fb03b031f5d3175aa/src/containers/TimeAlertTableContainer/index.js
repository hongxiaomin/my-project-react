/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { TableRefresh, onQueryPagiNation } from '../../actions/TableAction';
import TimeAlertTable from '../../components/TimeAlertTable';
import { tableRedecurName, tableResponse } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => ({
  dataSource: state.getIn([tableRedecurName, props.name, 'dataSource']),
  tablePage: state.getIn([tableRedecurName, props.name, 'page']),
  tablePageSize: state.getIn([tableRedecurName, props.name, 'pageSize']),
  oriDataSource: state.getIn([tableRedecurName, props.name, tableResponse]),
});
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    initial: (() => {
      dispatch(TableRefresh(props));
    })(),
    onQueryPagiNation: (page, pageSize) => {
      dispatch(onQueryPagiNation({ page, pageSize, props }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAlertTable);
