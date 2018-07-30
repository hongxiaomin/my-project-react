/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { getTableDate, getTableRowId, onRowDoubleClickAction, TableRefresh, clearRowsKeys, onPagiNation, onTableExcel, onSaveTableData, onSavePagination, getSelectedDate } from '../../actions/TableAction';
import Table from '../../components/Table';
import { checkBoxUnique, unique } from '../../constants/Settings';
import { formReducerName } from '../../constants/Config';
import { tableRedecurName } from '../../constants/TableConfig';
import { saveRoutingGraphFromData, saveRuleGraphFromData } from '../../actions/ActionBtnAction';

const mapStateToProps = (state, props) => {
  const columnsArray = state.getIn([formReducerName, props.formName, 'oriDataSource']);
  const formData = state.getIn([formReducerName, props.formName, 'data']) ? state.getIn([formReducerName, props.formName, 'data']).toJS() : '';
  // console.log('dataCCCCC', props.dataSourceTemplate(state.getIn([formReducerName, props.formName, 'dataSource'])));

  return {  // ... receiver
    dataSource: props.dataSourceTemplate ? props.dataSourceTemplate(state.getIn([formReducerName, props.formName, 'dataSource'])) : state.getIn([formReducerName, props.formName, 'dataSource']),
    selectedRowKeysTable: state.getIn([tableRedecurName, props.name, 'selectedRowKeys']),
    tablePage: state.getIn([tableRedecurName, props.name, 'page']),
    tablePageSize: state.getIn([tableRedecurName, props.name, 'pageSize']),
    oriDataSource: state.getIn([formReducerName, props.formName, 'oriDataSource']),
    columnsArray: props.columnsTemplate ? props.columnsTemplate({ columnsArray, formData }) : '',
  };
};
const mapDispatchToProps = (dispatch, props) => (
  {
    inintal: (() => {
      const tableName = props.name;
      // table初始化
      dispatch(TableRefresh(props));
      // 清除复选框
      dispatch(clearRowsKeys(tableName));
      dispatch(onSavePagination({ page: 1, pageSize: 10, tableName }));
    })(),
    onRowSelected: (selectedRowKeys, selectedRows) => {
      dispatch(getTableDate({ selectedRowKeys, selectedRows, props }));
      const selectedRowsLength = selectedRows.length - 1;
      const record = selectedRowsLength >= 0 ? selectedRows[selectedRowsLength] : '';
      if (props.onRowClick) {
        dispatch(getTableRowId({ record, props }));
      }
    },
    onRowClick: (record, index) => {
      if (props.onRowDoubleClick) {
        return null;
      }
      if (props.isRadio) {
        dispatch(
          getTableDate({ selectedRowKeys: [record.id] || [index], selectedRows: [record], props }),
        );
      } else {
        const selectedDate = dispatch(getSelectedDate(props));
        const selectedRowKeysOld = selectedDate.selectedRowKeys || [];
        const selectedRowsOld = selectedDate.selectedRows || [];
        selectedRowKeysOld.push(record.id || index);
        selectedRowsOld.push(record);
        const selectedRowKeys = checkBoxUnique(selectedRowKeysOld);
        const selectedRows = checkBoxUnique(selectedRowsOld);
        dispatch(getTableDate({ selectedRowKeys, selectedRows, props }));
      }
      if (props.onRowClick) {
        dispatch(getTableRowId({ record, props, index }));
      }
      if (props.onRowClick && props.showRouting) {
        const pos = props.location;
        if (pos === 'RoutingPos') {
          dispatch(saveRoutingGraphFromData({ formName: props.formName, tableName: props.name }));
        }
        if (pos === 'RulePos') {
          dispatch(saveRuleGraphFromData({ formName: props.formName, tableName: props.name }));
        }
        const handleScroll = () => {
          setTimeout(function() {
            const divHeight = document.getElementById(pos).offsetTop;
            scrollTo(0, divHeight + 60);
          }, 1000);
        };
        handleScroll();
      }
    },
    onRowDoubleClick: (record, index, event) => {
      if (!props.onRowDoubleClick) {
        return null;
      }
      dispatch(onRowDoubleClickAction({ record, index, event, props }));
    },
    onPagiNation: (page, pageSize) => {
      dispatch(onPagiNation({ page, pageSize, props }));
    },
    tableExcel: (obJectTable) => {
      dispatch(onTableExcel({ obJectTable, props }));
    },
    saveTableDate: (obJectTable) => {
      dispatch(onSaveTableData({ obJectTable, props }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
