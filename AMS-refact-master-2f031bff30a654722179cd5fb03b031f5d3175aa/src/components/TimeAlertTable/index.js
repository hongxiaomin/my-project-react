/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.less';

const TimeAlertTable = ({
  columns,
  dataSource,
  onQueryPagiNation,
  tablePage,
  tablePageSize,
  oriDataSource,
  name,
  onRowSelected,
  nopagination,
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
  const AddTableRowClass = (record) => {
    let rowClass;
    const isStatus = record ? record.jigStatus : '';
    if (name === 'JigAlertStencilUpTable') {
      switch (isStatus) {
        case 2:
          rowClass = 'rowClass';
          break;
        case 1:
          rowClass = 'rowClassYellow';
          break;
        default:
      }
    }
    const level = record ? record.level : '';
    if (level) {
      rowClass = 'PCBMonitor';
    }
    rowClass = rowClass || 'defaultClass';
    return rowClass;
  };
  return (
    <div>
      <Table
        pagination={nopagination === false ? pagination : false}
        dataSource={Object.prototype.toString.call(dataSource) === '[object Array]' ? dataSource : []}
        columns={columns || []}
        bordered
        className={'table'}
        rowClassName={AddTableRowClass}
        style={{ color: '#ff0000!important' }}
      />
    </div>
  );
};
TimeAlertTable.defaultProps = {
  nopagination: false,
};
TimeAlertTable.propTypes = {

};

export default TimeAlertTable;
