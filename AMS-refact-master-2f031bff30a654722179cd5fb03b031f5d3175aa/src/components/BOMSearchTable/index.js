/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.less';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '学校',
  dataIndex: 'school',
  key: 'school',
}, {
  title: '家',
  dataIndex: 'home',
  index: 'home',
}];
const BOMSearchTable = (props) => {
  console.log(props);
  // 分页
  const pagination = {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 50,
    pageSizeOptions: ['10', '20', '30'],
    onChange: props.onPageChange,
  };
  // 全选
  const rowSelection = {
    type: 'checkbox',
    onChange: props.onRowSelected,
    selectedRowKeys: props.selectedRowKeystabw == null ? [] : props.selectedRowKeystabw,
  };
  return (
    <Table
      columns={columns}
      bordered
      className={'table'}
      pagination={pagination}
      dataSource={props.dataSource}
      rowSelection={rowSelection}
    />
  );
};
BOMSearchTable.defaultProps = {

};
BOMSearchTable.propTypes = {

};

export default BOMSearchTable;
