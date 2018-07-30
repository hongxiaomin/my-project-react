import React from 'react';
import { message } from 'antd';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import TableContainer from '../../containers/TableContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import { defaultGetParamTemplate2, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_SMM } from '../../constants/Settings';

const SMMAddRecordSearchAPI = `${SERVER_IP_SMM}/smm/inventory/qwarehstorage`;
const SMMAddRecordSearchClearApi = `${SERVER_IP_SMM}/smm/inventory/storagedetail`;
const columns = [{
  title: '序号',
  dataIndex: 'serialNum',
  key: 'serialNum',
  render: (text, record, index) => (index + 1),
}, {
  title: '入库编号',
  dataIndex: 'inventory_in_no',
  key: 'inventory_in_no',
}, {
  title: '入库开始时间',
  dataIndex: 'inventory_start_time',
  key: 'inventory_start_time',
}, {
  title: '操作人',
  dataIndex: 'operator_id',
  index: 'operator_id',
}, {
  title: '入库人员',
  dataIndex: 'shelf_user',
  index: 'shelf_user',
}, {
  title: '入库料盘数',
  dataIndex: 'inventory_tray_num',
  index: 'inventory_tray_num',
}];
const columnsTable = [{
  title: '序号',
  dataIndex: 'serialNum2',
  key: 'serialNum2',
  render: (text, record, index) => (index + 1),
}, {
  title: '料号',
  dataIndex: 'material_no',
  key: 'material_no',
}, {
  title: '数量',
  dataIndex: 'inventory_in_qty',
  key: 'inventory_in_qty',
}, {
  title: '单位',
  dataIndex: 'unit',
  index: 'unit',
}, {
  title: '提供商',
  dataIndex: 'vendor',
  index: 'vendor',
}, {
  title: '周期',
  dataIndex: 'dc',
  index: 'dc',
}, {
  title: '流水码',
  dataIndex: 'serial_no',
  index: 'serial_no',
}, {
  title: '入库时间',
  dataIndex: 'inventory_in_time',
  index: 'inventory_in_time',
}, {
  title: '架位',
  dataIndex: 'shelf_no',
  index: 'shelf_no',
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '仓库管理',
}, {
  path: '',
  name: '报表',
}, {
  path: '',
  name: '入库记录查询',
}];

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
    if(startTime>endTime){
      message.error('截止时间不能早于开始时间！',3);
      return false;
    }
    return true;
 };

const SMMAddRecordSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="入库记录查询" />
    <FormContainer
      name="SMMDeleteRecordSearchForm"
      action={SMMAddRecordSearchAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>入库时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>至</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="operator_id" className={'label'}>操作人</label>
        <InputContainer type="text" name="operator_id" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="dc" className={'label'}>周期</label>
        <InputContainer type="text" name="dc" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="material_no" className={'label'}>料号</label>
        <InputContainer type="text" name="material_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="shelves_no" className={'label'}>架位</label>
        <InputContainer type="text" name="shelves_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="vendor" className={'label'}>提供商</label>
        <InputContainer type="text" name="vendor" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer
      name="queryTable"
      action={SMMAddRecordSearchClearApi}
      formName="SMMDeleteRecordSearchForm"
      columns={columns}
      paramTemplate={defaultGetParamTemplate2}
      needData="inventory_in_no"
      isGetDate="ok"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      nextTableName="queryTable2"
      onRowClick
    />
    <Title name="入库记录详情" />
    <QueryTableContainer
      name="queryTable2"
      tableName="queryTable"
      columns={columnsTable}
    />
  </div>
);
SMMAddRecordSearch.defaultProps = {

};
SMMAddRecordSearch.propTypes = {

};

export default SMMAddRecordSearch;
