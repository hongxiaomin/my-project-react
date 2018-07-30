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
  title: '序號',
  dataIndex: 'index',
  key: 'index',
  render: (text, record, index) => index + 1,
}, {
  title: '材料代码',
  dataIndex: 'materiel_id',
  key: 'materiel_id',
}, {
  title: '材料批号',
  dataIndex: 'materiel_lot_number',
  key: 'materiel_lot_number',
}, {
  title: '收料仓库',
  dataIndex: 'storage_name',
  key: 'storage_name',
}, {
  title: '收料储位',
  dataIndex: 'bin_name',
  key: 'bin_name',
}, {
  title: '采购单号',
  dataIndex: 'po_id',
  key: 'po_id',
}, {
  title: '采购单项次',
  dataIndex: 'po_item',
  key: 'po_item',
}, {
  title: '实收数量',
  dataIndex: 'item_qty',
  key: 'item_qty',
}, {
  title: 'PO未交量',
  dataIndex: 'open_po_qty',
  key: 'open_po_qty',
}, {
  title: '送货日期',
  dataIndex: 'delivery_date',
  key: 'delivery_date',
}, {
  title: '备注',
  dataIndex: 'cmt',
  key: 'cmt',
}, {
  title: '收料序号',
  dataIndex: 'receive_code',
  key: 'receive_code',
  render: (text, record, index) => (
    <a name="delete">修改材料序号</a>
  ),
}];
const SMMRecWorkLTTable = (props) => {
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
SMMRecWorkLTTable.defaultProps = {

};
SMMRecWorkLTTable.propTypes = {
  onPageChange: PropTypes.func,
};

export default SMMRecWorkLTTable;
