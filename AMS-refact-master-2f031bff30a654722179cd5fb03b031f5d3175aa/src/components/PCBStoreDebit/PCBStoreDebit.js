import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplate2,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const PCBStoreDebitAPI = `${SERVER_IP_PCB}/ams/pcb/debit/get`;
const PCBDebitUpdateAPI = `${SERVER_IP_PCB}/ams/pcb/debit/submit`;
const selDate = [
  { id: 0,
    name: '可扣账',
  }, { id: 1,
    name: '扣账完成',
  }];
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, render, index) => (index + 1),
  }, {
    title: '工单',
    dataIndex: 'sapWorkOrderId',
    key: 'sapWorkOrderId',
  }, {
    title: 'PCB料号',
    dataIndex: 'partNum',
    key: 'partNum',
  }, {
    title: '线别',
    dataIndex: 'productLine',
    key: 'productLine',
  }, {
    title: '主板',
    dataIndex: 'mainBoard',
    key: 'mainBoard',
  }, {
    title: '小板',
    dataIndex: 'subBoard',
    key: 'subBoard',
  }, {
    title: '工单数量',
    dataIndex: 'requireAmount',
    key: 'requireAmount',
  }, {
    title: '实发数量',
    dataIndex: 'debitAmount',
    key: 'debitAmount',
  }, {
    title: '扣账编号',
    dataIndex: 'debitNo',
    key: 'debitNo',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      if (record.status === '0') {
        return '可扣账';
      } else if (record.status === '1') {
        return '扣账完成';
      }
    },
  }];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '仓库管理',
}, {
  path: '',
  name: '库存扣账',
}];
const PCBStoreDebit = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库存扣账" />
    <FormContainer
      name="PCBStoreDebitForm"
      action={PCBStoreDebitAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="sapWorkOrderId" className={'label'}>工单</label>
        <InputContainer type="text" name="sapWorkOrderId" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="partNum" className={'label'}>PCB料号</label>
        <InputContainer type="text" name="partNum" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="productLine" className={'label'}>线别</label>
        <InputContainer type="text" name="productLine" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="mainBoard" className={'label'}>主板</label>
        <InputContainer type="text" name="mainBoard" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="subBoard" className={'label'}>小板</label>
        <InputContainer type="text" name="subBoard" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="status" className={'label'}>状态</label>
        <span className={'select'}>
          <Select
            name="status"
            itemKey="id"
            itemValue="name"
            load="true"
            data={selDate}
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <ActionBtn
      btnName="扣账"
      mode="update"
      action={PCBDebitUpdateAPI}
      tableName="PCBStoreDebit"
      formName="PCBStoreDebitForm"
      paramTemplate={(param) => {
        const { ...data } = param;
        return {
          value: [data] };
      }}
      messageTemplate={(param) => {
        const { ...data1 } = param;
        const data2 = data1.rows[0];
        // return `[${data2}]`;
        return (<div><p>message:{data1.message}</p><p>code:{data2.code}</p>
          <p>reason:{data2.reason}</p><p>itemWono:{data2.item[0].wono}</p>
          <p>itemMatnr:{data2.item[0].matnr}</p><p>itemAqty:{data2.item[0].aqty}</p>
          <p>itemMvt:{data2.item[0].mvt}</p></div>);
      }}
    />
    <TableContainer name="PCBStoreDebit" formName="PCBStoreDebitForm" columns={columns} />
  </div>
);
PCBStoreDebit.defaultProps = {

};
PCBStoreDebit.propTypes = {

};

export default PCBStoreDebit;
