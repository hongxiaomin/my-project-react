import React from 'react';
import { message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultDataTemplate,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';

const PCBStoreDetailAPI = `${SERVER_IP_PCB}/ams/pcb/report/details`;
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, render, index) => (index + 1),
  }, {
    title: 'PCB料号',
    dataIndex: 'partNum',
    key: 'partNum',
  }, {
    title: '架位',
    dataIndex: 'subShelfSerial',
    key: 'subShelfSerial',
  }, {
    title: 'Date Code',
    dataIndex: 'DateCode',
    key: 'DateCode',
  }, {
    title: 'PCB Code',
    dataIndex: 'pcbCode',
    key: 'pcbCode',
  }, {
    title: '库存数量',
    dataIndex: 'count',
    key: 'count',
  }, {
    title: '入库时间',
    dataIndex: 'date',
    key: 'date',
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
  name: '报表查询',
}, {
  path: '',
  name: '库存详情查询',
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
const PCBStoreDetail = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库存详情查询" />
    <FormContainer
      name="PCBStoreDetailForm"
      action={PCBStoreDetailAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      dataTemplate={defaultDataTemplate}
      checkTemplate={checkTemplate}
    >
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
    </FormContainer>
    <TableContainer name="PCBStoreDetail" formName="PCBStoreDetailForm" columns={columns} />
  </div>
);
PCBStoreDetail.defaultProps = {

};
PCBStoreDetail.propTypes = {

};

export default PCBStoreDetail;
