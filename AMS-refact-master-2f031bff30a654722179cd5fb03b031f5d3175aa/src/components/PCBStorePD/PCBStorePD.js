import React from 'react';
import { message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import Select from '../../containers/SelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  defaultDataTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplate2,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';

const MainTableName = 'PCBStorePD';
const MainFormName = 'PCBStorePDForm';
const PCBInventoryAPI = `${SERVER_IP_PCB}/ams/pcb/inventory`;
const PCBInventoryDetailAPI = `${SERVER_IP_PCB}/ams/pcb/inventoried/detail`;
export const defalultPageSize = (param) => {
  const { id } = param;
  return ({ inventoryId: id });
};
const columns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, render, index) => (index + 1),
}, {
  title: '盘点开始时间',
  dataIndex: 'startTime',
  key: 'startTime',
}, {
  title: '盘点结束时间',
  dataIndex: 'endTime',
  key: 'endTime',
}, {
  title: '盘点人',
  dataIndex: 'userName',
  key: 'userName',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}];
const columnsTable = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, render, index) => (index + 1),
}, {
  title: 'PCB料号',
  dataIndex: 'partNum',
  key: 'partNum',
}, {
  title: '标签',
  dataIndex: 'labelCode',
  key: 'labelCode',
}, {
  title: 'PCB Code',
  dataIndex: 'pcbCode',
  key: 'pcbCode',
}, {
  title: 'Date Code',
  dataIndex: 'dateCode',
  key: 'dateCode',
}, {
  title: '库存数量',
  dataIndex: 'boundCount',
  key: 'boundCount',
}, {
  title: '盘点数量',
  dataIndex: 'realCount',
  key: 'realCount',
}, {
  title: '盘点时间',
  dataIndex: 'date',
  key: 'date',
}, {
  title: '盘点员',
  dataIndex: 'userName',
  key: 'userName',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '备注',
  dataIndex: 'description',
  key: 'description',
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
  name: '库存盘点',
}];

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
    if(startTime>endTime){
      message.error('结束时间不能早于起始时间！',3);
      return false;
    }
    return true;
 };

const PCBStorePD = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库存盘点" />
    <FormContainer
      name="PCBStorePDForm"
      action={PCBInventoryAPI}
      method="GET"
      dataTemplate={defaultDataTemplate}
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="operator" className={'label'}>盘点人</label>
        <InputContainer type="text" name="operator" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>起始时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>结束时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    {/* <ActionBtn
      btnName="更新"
      mode="update"
      action=""
      tableName={MainTableName}
      formName={MainFormName}
      paramTemplate={defaultPutParamTemplate}
    /> */}
    <TableContainer
      name="PCBPDTableName"
      formName={MainFormName}
      columns={columns}
      action={PCBInventoryDetailAPI}
      paramTemplate={defaultGetParamTemplate2}
      needData="id"
      aliasName="inventoryId"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      nextTableName={MainTableName}
      isGetDate="ok"
      onRowClick
    />
    <Title name="盘点明细" />
    {/* <FormContainer
      name="PCBStorePDDetailForm"
      action={PCBInventoryDetailAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="subShelfCode" className={'label'}>二维码</label>
        <InputContainer type="text" name="subShelfCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="partNum" className={'label'}>PCB料号</label>
        <InputContainer type="text" name="partNum" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="subShelfSerial" className={'label'}>架位</label>
        <InputContainer type="text" name="subShelfSerial" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>起始时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>结束时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer> */}
    {/* <TableContainer
      name={MainTableName}
      columns={columnsTable}
      action={PCBInventoryDetailAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      formName="PCBStorePDDetailForm"
    /> */}
    <QueryTableContainer
      name={MainTableName}
      columns={columnsTable}
      tableName="PCBPDTableName"
      needDataTemplate={defalultPageSize}
    />
  </div>
);
PCBStorePD.defaultProps = {

};
PCBStorePD.propTypes = {

};

export default PCBStorePD;
