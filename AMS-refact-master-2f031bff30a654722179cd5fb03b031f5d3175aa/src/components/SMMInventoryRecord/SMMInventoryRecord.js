import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import { message } from 'antd';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplate2, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const SmmInventoryAPI = `${SERVER_IP_SMM}/smm/inventory/qwarehinventory`;
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
const columns = [
  {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '数量',
    dataIndex: 'qty',
    key: 'qty',
  }, {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
  }, {
    title: '提供商',
    dataIndex: 'vendor',
    key: 'vendor',
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
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '架位',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
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
  name: '库存查询',
}];
const SMMInventoryRecord = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库存查询" />
    <FormContainer
      name="SMMInventoryRecordForm"
      action={SmmInventoryAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>最后入库时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="startTime" style={{ width: '130px' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>至</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ width: '130px' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>*料号</label>
        <InputContainer type="text" name="material_no" className={'input'}  />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>存放位置</label>
        <span className={'select'}>
          <SelectContainer
            name="area"
            itemKey="id"
            itemValue="name"
            next="bom_status2"
            load="true"
            defaultKey='All'
            defaultValue='全部'
            data={setDate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>周期</label>
        <InputContainer type="text" name="dc" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>架位</label>
        <InputContainer type="text" name="shelf_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>提供商</label>
        <InputContainer type="text" name="vendor" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'ant-btn button'} />
    </FormContainer>
    <TableContainer name="SMMInvent" formName="SMMInventoryRecordForm" columns={columns} />
  </div>
);
SMMInventoryRecord.defaultProps = {

};
SMMInventoryRecord.propTypes = {

};

export default SMMInventoryRecord;
