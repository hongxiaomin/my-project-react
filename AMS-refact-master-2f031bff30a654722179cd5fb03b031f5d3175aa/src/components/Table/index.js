/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Table as QueryTable, Button } from 'antd';
// import { GUID } from '../../utils/Common';
import './style.less';


const Table = ({
  columns,
  dataSource,
  onRowSelected,
  selectedRowKeysTable,
  onRowClick,
  onPagiNation,
  tablePage,
  tablePageSize,
  oriDataSource,
  uid,
  noRowSelection,
  isRadio,
  nopagination,
  tableExcel,
  obJectTable,
  isSave,
  saveTableDate,
  columnsArray,
  onRowDoubleClick,
  isCroll,
  crollYnum,
  crollXnum,
}) => {
  // 分页
  // console.log('dataSource', dataSource);
 // debugger;
  const tableTotal = oriDataSource ? oriDataSource.total : 1;
  const pagination = {
    current: tablePage,
    pageSize: tablePageSize,
    showSizeChanger: true,
    total: tableTotal,
    pageSizeOptions: ['10', '20', '30'],
    onChange: (page, pageSize) => { onPagiNation(page, pageSize); },
    onShowSizeChange: (current, size) => { onPagiNation(current, size); },
  };
   // {/* scroll={isCroll ? { y: crollYnum || '', x: crollXnum || '' } : ''} */}
  // 全选
  const rowSelection = {
    type: isRadio ? 'radio' : 'checkbox',
    onChange: (selectedRows, selectedRowKeys) => { onRowSelected(selectedRows, selectedRowKeys); },
    selectedRowKeys: selectedRowKeysTable == null ? [] : selectedRowKeysTable,
  };
  return (
    <div className="tabletop">
      <div className={'topdiv'}>
        {isSave === 'false' ? '' : <Button onClick={() => saveTableDate(obJectTable)} type="primary">全部删除</Button> }
        {/* <Button type="primary">刷新</Button>
        <Button onClick={() => tableExcel(obJectTable)} type="primary">导出</Button> */}
      </div>
      <QueryTable
        columns={columns || columnsArray}
        bordered
        rowKey={uid}
        className={'table'}
        pagination={nopagination === false ? pagination : false}
        dataSource={Object.prototype.toString.call(dataSource) === '[object Array]' ? dataSource : []}
        rowSelection={noRowSelection === false ? rowSelection : ''}
        onRowClick={(record, index) => { onRowClick(record, index); }}
        onRowDoubleClick={(record, index, event) => { onRowDoubleClick(record, index, event); }}
        scroll={isCroll ? { y: crollYnum || '', x: crollXnum || '' } : {}}
      />
    </div>
  );
};
Table.defaultProps = {
  dataSource: [],
  uid: 'id',
  isRadio: false,
  noRowSelection: false,
  tablePage: 1,
  tablePageSize: 10,
  nopagination: false,
  isSave: 'false',
};
Table.propTypes = {
  // columns: PropTypes.arryof(),
  // dataSource: PropTypes.arry,
  onRowSelected: PropTypes.func,
  // selectedRowKeysTable: PropTypes.arry,
  onRowDoubleClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onPagiNation: PropTypes.func,
  tablePage: PropTypes.number,
  tablePageSize: PropTypes.number,
  oriDataSource: PropTypes.objectOf(PropTypes.any),
  uid: PropTypes.string,
  noRowSelection: PropTypes.bool,
  isRadio: PropTypes.bool,
  tableExcel: PropTypes.func,
  obJectTable: PropTypes.objectOf(PropTypes.any),
  isSave: PropTypes.string,
  saveTableDate: PropTypes.func,
};

export default Table;
