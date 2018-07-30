/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.less';

const self = this;
    // 收料作业
const columns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, record, index) => index + 1,
}, {
  title: '批号',
  dataIndex: 'materiel_id',
  key: 'materiel_id',
}];
const SMMRecWorkRTTable = (props) => {
  const pagination = {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 50,
    pageSizeOptions: ['10', '20', '30'],
    onChange: props.onPageChange,
  };
  return (
    <Table
      columns={columns}
      bordered
      className={'table'}
      pagination={pagination}
      dataSource={props.dataSource}
    />
  );
};
SMMRecWorkRTTable.defaultProps = {

};
SMMRecWorkRTTable.propTypes = {
  onPageChange: PropTypes.func,
};

export default SMMRecWorkRTTable;
