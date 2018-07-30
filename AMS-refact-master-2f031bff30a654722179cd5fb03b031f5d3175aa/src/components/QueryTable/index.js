/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.less';


const QueryTable = ({
  columns,
  dataSource,
  onQueryPagiNation,
  tablePage,
  tablePageSize,
  oriDataSource,
  onRowClick,
  uid,
  isRadio,
  onRowSelected,
  nopagination,
  isRowSelection,
  selectedRowKeysTable,
  columnsArray,
  isCroll,
  crollYnum,
  crollXnum,
}) => {
  // 分页
  const tableTotal = oriDataSource ? oriDataSource.total : 1;
  const pagination = {
    current: tablePage || 1,
    pageSize: tablePageSize || 10,
    showSizeChanger: true,
    total: tableTotal,
    pageSizeOptions: ['10', '20', '30'],
    onChange: (page, pageSize) => { onQueryPagiNation(page, pageSize); },
    onShowSizeChange: (current, size) => { onQueryPagiNation(current, size); },
  };
  // 全选
  const rowSelection = {
    type: isRadio ? 'radio' : 'checkbox',
    onChange: (selectedRows, selectedRowKeys) => { onRowSelected(selectedRows, selectedRowKeys); },
    selectedRowKeys: selectedRowKeysTable == null ? [] : selectedRowKeysTable,
  };
  return (<div>
    <Table
      pagination={nopagination === false ? pagination : false}
      className={'table'}
      dataSource={Object.prototype.toString.call(dataSource) === '[object Array]' ? dataSource : []}
      rowKey={uid || 'id'}
      columns={columns || columnsArray}
      bordered
      rowSelection={isRowSelection === false ? rowSelection : ''}
      onRowClick={(record, index) => { onRowClick(record, index); }}
      scroll={isCroll ? { y: crollYnum || '', x: crollXnum || '' } : {}}
    />
  </div>
  );
};
QueryTable.defaultProps = {
  nopagination: false,
  dataSource: [],
  isRadio: false,
  isRowSelection: false,

};
QueryTable.propTypes = {
  nopagination: PropTypes.bool,
  onRowClick: PropTypes.func,
  isRadio: PropTypes.bool,
};

export default QueryTable;
