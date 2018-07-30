/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { TableRefresh, getTableDate, getTableRowId, clearRowsKeys, updateDataSource, onQueryPagiNation, getSaveData, onSavePagination } from '../../actions/TableAction';
import QueryTable from '../../components/QueryTable';
import { tableRedecurName, tableResponse } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => {
  const dataSource0 = props.tableName ? state.getIn([tableRedecurName, props.tableName, 'dataSource']) : state.getIn([tableRedecurName, props.name, 'dataSource']);
  const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(dataSource0) : dataSource0;
  const clickTableData = props.queryTableName ? state.getIn([tableRedecurName, props.queryTableName, 'rowData']) : state.getIn([tableRedecurName, props.tableName, 'rowData']);
  return ({
    dataSource,
    selectedRowKeysTable: state.getIn([tableRedecurName, props.name, 'selectedRowKeys']),
    tablePage: state.getIn([tableRedecurName, props.name, 'page']),
    tablePageSize: state.getIn([tableRedecurName, props.name, 'pageSize']),
    oriDataSource: state.getIn([tableRedecurName, props.name, tableResponse]),
    columnsArray: props.columnsTemplate ? props.columnsTemplate({ dataSource, clickTableData }) : '',

  });
};
const mapDispatchToProps = (dispatch, props) => (
  {
    init: (() => {
      let tableName = props.tableName ? props.tableName : props.name;
      const dataSource = [];
      const response = '';
      // 清除复选框
      dispatch(clearRowsKeys(props.name));
      dispatch(onSavePagination({ page: 1, pageSize: 10, tableName: props.name}));

      if (props.action) {
        dispatch(TableRefresh(props));
      } else {
        dispatch(updateDataSource({ dataSource, props, tableName }));
        dispatch(getSaveData({
          tableName: props.tableName,
          tableResponse,
          response,
        }));
        tableName = props.name ? props.name : '';
        dispatch(onSavePagination({ page: 1, pageSize: 10, tableName }));
        dispatch(getSaveData({
          tableName,
          tableResponse,
          response,
        }));
      }
    })(),
    onRowSelected: (selectedRowKeys, selectedRows) => {
      dispatch(getTableDate({ selectedRowKeys, selectedRows, props }));
    },
    onQueryPagiNation: (page, pageSize) => {
      dispatch(onQueryPagiNation({ page, pageSize, props }));
    },
    onRowClick: (record) => {
      props.onRowClick ? dispatch(getTableRowId({ record, props })) : '';
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryTable);
