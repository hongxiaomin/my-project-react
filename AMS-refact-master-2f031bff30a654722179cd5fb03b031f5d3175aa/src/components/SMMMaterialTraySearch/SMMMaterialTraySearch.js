import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import ModalFormContainer from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import InputContainer from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import SelectContainer from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters, defaultDataSourceTemplate, defaultPutParamTemplate, SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const SMMMaterialTraySearchAPI = `${SERVER_IP_SMM}/smm/material/getmateriallogs`;
const SMMMaterialTraySearchLifeAPI = `${SERVER_IP_SMM}/smm/material/getmateriallifecycle`;
const SMMMaterialTraySearchAreaAPI = `${SERVER_IP_SMM}/smm/material/getmaterialarea`;

const MainFormName = 'SMMMaterialTraySearchForm';
const MainTableName = 'SMMMaterialTraySearchTable';

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
  name: '料盘查询',
}];


const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
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
  title: '周期',
  dataIndex: 'dc',
  key: 'dc',
}, {
  title: '流水码',
  dataIndex: 'serial_no',
  key: 'serial_no',
}, {
  title: '存放区域',
  dataIndex: 'area',
  key: 'area',
}, {
  title: '存放架位',
  dataIndex: 'slot',
  key: 'slot',
}];


const columnsQtraylife = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '料号',
  dataIndex: 'material_no',
  key: 'material_no',
}, {
  title: '流水码',
  dataIndex: 'serial_no',
  key: 'serial_no',
}, {
  title: '数量',
  dataIndex: 'qty',
  key: 'qty',
}, {
  title: '周期',
  dataIndex: 'dc',
  key: 'dc',
}, {
  title: '存放区域',
  dataIndex: 'area',
  key: 'area',
}, {
  title: '存放架位',
  dataIndex: 'slot',
  key: 'slot',
}, {
  title: '操作',
  dataIndex: 'operation_name',
  key: 'operation_name',
}, {
  title: '时间',
  dataIndex: 'create_date',
  key: 'create_date',
}, {
  title: '使用工单',
  dataIndex: 'work_order',
  key: 'work_order',
}, {
  title: '面别',
  dataIndex: 'side',
  key: 'side',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
}];
const detail = (param) => {
  const data = {
    material_no: param.material_no,
    serial_no: param.serial_no,
  };
  return data;
};

const selDataYN = [{
  id: 'Y',
  name: '是',
}, {
  id: 'N',
  name: '否',
}];


const SMMMaterialTraySearch = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="料盘查询" />
    <FormContainer
      name={MainFormName}
      action={SMMMaterialTraySearchAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="material_no" className={'label'}>料号</label>
        <InputContainer type="text" name="material_no" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{display:'none'}}>
        <label htmlFor="material_no" className={'label'}>all</label>
        <InputContainer type="text" name="all" className={'input'} value="a" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="serial_no" className={'label'}>流水号</label>
        <InputContainer type="text" name="serial_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="dc" className={'label'}>周期</label>
        <InputContainer type="text" name="dc" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>存放区域</label>
        <span className={'select'}>
          <SelectContainer
            name="area"
            itemKey="id"
            itemValue="name"
            load="true"
            action={SMMMaterialTraySearchAreaAPI}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>是否在库</label>
        <span className={'select'}>
          <SelectContainer
            name="isInHouse"
            itemKey="id"
            itemValue="name"
            // load="true"
            data={selDataYN}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="slot" className={'label'}>架位</label>
        <InputContainer type="text" name="slot" className={'input'} />
      </div>

      <input type="submit" value="查询" className={'button'} />

    </FormContainer>
    <div className={'searchCondition'}>
      <label htmlFor="input" className={'label'}>请直接扫描料盘</label>
      <InputContainer type="text" name="labelName" autoFocus className={'input'} noValue="noValue" />
    </div>


    <TableContainer
      action={SMMMaterialTraySearchLifeAPI}
      name={MainTableName}
      formName={MainFormName}
      columns={columns}
      paramTemplate={defaultGetParamTemplate2}
      needDataTemplate={detail}
      isGetDate="ok"
      nextTable="SMMMaterialTraySearchFormNext"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      onRowClick
      noRowSelection
    />


    <Title name="指定料盘的生命周期" />
    <QueryTableContainer
      name="SMMMaterialTraySearchFormNext"
      tableName={MainTableName}
      columns={columnsQtraylife}
      needDataTemplate={detail}
      isRowSelection
    />

  </div>
  );
SMMMaterialTraySearch.defaultProps = {

};
SMMMaterialTraySearch.propTypes = {

};

export default SMMMaterialTraySearch;
