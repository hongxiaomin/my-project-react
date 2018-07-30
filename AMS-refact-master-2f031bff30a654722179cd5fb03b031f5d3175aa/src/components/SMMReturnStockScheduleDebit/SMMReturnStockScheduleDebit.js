import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import TableContainer from '../../containers/QueryTableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';

import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplate2,
  debitPostDataTemplate,
  SERVER_IP_SMM,
} from '../../constants/Settings';

const SMMReturnStockScheduleWorkApi = `${SERVER_IP_SMM}/smm/warehissue/debit/workorder`;
const SMMReturnStockScheduleListApi = `${SERVER_IP_SMM}/smm/warehissue/getnodebit`;
const SMMReturnStockScheduleDebitApi = `${SERVER_IP_SMM}/smm/warehissue/deduction`;
// localhost:8081/ams/smm/warehissue/debit/workorder?page={"size":10,"current":1}

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '备料区管理',
}, {
  path: '',
  name: '扣账进度',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '工单号',
    dataIndex: 'workOrder',
    key: 'workOrder',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '料站总数',
    dataIndex: 'slotNum',
    key: 'slotNum',
  }, {
    title: '已扣账料站数',
    dataIndex: 'debitNum',
    key: 'debitNum',
  }];

const columnsDebit = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '料站',
    dataIndex: 'slot',
    key: 'slot',
  }, {
    title: '需求量',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '已发数量',
    dataIndex: 'issue_amount',
    key: 'issue_amount',
  }];

const detail = (param) => {
  const data = {
    work_order: param.workOrder,
    side: param.side,
  };
  return data;
};

const SMMReturnStockScheduleDebit = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="扣账进度" />
    <TableContainer
      name="SMMRetrunStockScheduleWorkTable"
      columns={columns}
      action={SMMReturnStockScheduleWorkApi}
      nextAction={SMMReturnStockScheduleListApi}
      nextTableName="SMMRetrunStockScheduleDebitTable"
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      needDataTemplate={detail}
      uid="line_name"
    />
    <div className="modalBtnBottom">


      <ActionBtn
        btnName="扣账"
        mode="returnDebit"
        method="POST"
        action={SMMReturnStockScheduleDebitApi}
        tableName="SMMRetrunStockScheduleDebitTable"
        defaultTableName="SMMRetrunStockScheduleWorkTable"
        paramTemplate={debitPostDataTemplate}
    // selectedTemplate={rows => ({ label_name: rows.label_name })}
        dataTemplate={debitPostDataTemplate}
        onRowClick
      />
    </div>
    <TableContainer
      name="SMMRetrunStockScheduleDebitTable"
      // tableName="SMMRetrunStockScheduleWorkTable"
      // paramTemplate={defaultGetParamTemplate2}
      queryTableName="SMMRetrunStockScheduleWorkTable"
      columns={columnsDebit}
      needDataTemplate={detail}
      isRowSelection="true"
    />

  </div>


);
SMMReturnStockScheduleDebit.defaultProps = {

};
SMMReturnStockScheduleDebit.propTypes = {

};

export default SMMReturnStockScheduleDebit;
