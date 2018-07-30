import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplate2, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import './style.less';
const SMMDeleteRecordSearchAPI = `${SERVER_IP_SMM}/smm/inventory/qoutofwareh`;
const setDate = [{
  id: 'All',
  name: '全部',
}, {
  id: 'Main',
  name: '主仓库',
}, {
  id: 'Mantissa',
  name: '尾数仓',
}, {
  id: 'FeederBuffer',
  name: 'Feeder缓存区',
}];

const setDate1 = [{
  id: 'A',
  name: 'A',
}, {
  id: 'B',
  name: 'B',
}];

const columns = [
  {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '数量',
    dataIndex: 'inventory_out_qty',
    key: 'inventory_out_qty',
  }, {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
  }, {
    title: '周期',
    dataIndex: 'dc',
    key: 'dc',
  }, {
    title: '流水码',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }, {
    title: '存放区域',
    dataIndex: 'source_location',
    key: 'source_location',
  }, {
    title: '存放架位',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
  }, {
    title: '出库时间',
    dataIndex: 'inventory_out_time',
    key: 'inventory_out_time',
  }, {
    title: '使用工单',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '提供商',
    dataIndex: 'vendor',
    key: 'vendor',
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
  name: '出库记录查询',
}];

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
  if (startTime > endTime) {
    message.error('截止时间不能早于开始时间！', 3);
    return false;
  }
  return true;
};

const SMMDeleteRecordSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="出库记录查询" />
    <FormContainer
      name="SMMDeleteRecordSearchForm"
      action={SMMDeleteRecordSearchAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>出库时间</label>
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
        <label htmlFor="area" className={'label'}>存放位置</label>
        <span className={'select'}>
          <SelectContainer
            name="area"
            itemKey="id"
            itemValue="name"
            next="bom_status2"
            load="true"
            data={setDate}
            defaultKey="All"
            defaultValue="全部"
          />
        </span>
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
        <label htmlFor="shelf_no" className={'label'}>架位</label>
        <InputContainer type="text" name="shelf_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="work_order" className={'label'}>*工单号</label>
        <InputContainer type="text" name="work_order" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="side" className={'label'}>*面别</label>
        <span className={'select'}>
          <SelectContainer
            name="side"
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="A"
            defaultValue="A"
            data={setDate1}
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer name="SMMDelete" formName="SMMDeleteRecordSearchForm" columns={columns} />
  </div>
);
SMMDeleteRecordSearch.defaultProps = {

};
SMMDeleteRecordSearch.propTypes = {

};

export default SMMDeleteRecordSearch;
