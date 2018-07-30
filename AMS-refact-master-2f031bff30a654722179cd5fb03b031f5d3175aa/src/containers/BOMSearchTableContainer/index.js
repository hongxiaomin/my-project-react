/**
fileName    : index.js
writer      : **刘石磊**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onPageChange, onRowSelectedChange } from '../../actions/BOMSearchTableAction';
import BOMSearchTable from '../../components/BOMSearchTable';

const mapStateToProps = state => ({
  dataSource: state.getIn(['BOMSearchTableReducer', 'dataSource']).toJS(),
  selectedRowKeystabw: state.getIn(['BOMSearchTableReducer', 'selectedRowKeystable']),
});
const mapDispatchToProps = dispatch => (
  {
    // ... dispatcher
    onPageChange: (page) => { dispatch(onPageChange(page)); },
    onRowSelected: (selectedRowKeys, selectedRows) => {
      dispatch(onRowSelectedChange({ selectedRows, selectedRowKeys }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BOMSearchTable);
