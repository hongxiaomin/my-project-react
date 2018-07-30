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
import SelectContainer from '../../containers/SelectContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters, defaultDataSourceTemplate, defaultPutParamTemplate, SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const SMMPickMaterialSearchAPI = `${SERVER_IP_SMM}/smm/mergerinventory/qtrayslist`;
const SMMPickMaterialSearchAPIDetail = `${SERVER_IP_SMM}/smm/mergerinventory/qtraymergerdetail`;

const MainFormName = 'SMMPickMaterialSearchForm';
const MainTableName = 'SMMPickMaterialSearchTable';

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
  name: '接料查询',
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
  title: '周期',
  dataIndex: 'dc',
  key: 'dc',
}, {
  title: '厂商',
  dataIndex: 'vendor',
  key: 'vendor',
}, {
  title: '流水码',
  dataIndex: 'serial_no',
  key: 'serial_no',
}, {
  title: '工单号',
  dataIndex: 'work_order',
  key: 'work_order',
}, {
  title: '线别',
  dataIndex: 'line_name',
  key: 'line_name',
}, {
  title: '面别',
  dataIndex: 'side',
  key: 'side',
}, {
  title: '接料时间',
  dataIndex: 'merger_time',
  key: 'merger_time',
}, {
  title: '接料员',
  dataIndex: 'operator_id',
  key: 'operator_id',
}];


const columnsDetail = [{
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
}];

const selData = [{
  id: 'A',
  name: 'A',
}, {
  id: 'B',
  name: 'B',
}, {
  id: '单面',
  name: '单面',
}];

const SMMPickMaterialSearch = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="接料查询" />
    <FormContainer
      name={MainFormName}
      action={SMMPickMaterialSearchAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="material_no" className={'label'}>料号</label>
        <InputContainer type="text" name="material_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="serial_no" className={'label'}>流水号</label>
        <InputContainer type="text" name="serial_no" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="work_order" className={'label'}>工单号</label>
        <InputContainer type="text" name="work_order" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>接料人</label>
        <InputContainer type="text" name="operator_id" className={'input'} />

      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>线别</label>
        <InputContainer type="text" name="line_name" className={'input'} />


      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>面别</label>
        <span className={'select'}>
          <SelectContainer
            name="side"
            itemKey="id"
            itemValue="name"
            // load="true"
            data={selData}
          />
        </span>
      </div>

      <input type="submit" value="查询" className={'button'} />

    </FormContainer>
    <div className={'searchCondition'}>
      <label htmlFor="input" className={'label'}>请直接扫描料盘</label>
      <InputContainer type="text" name="labelName" className={'input'} noValue="noValue" />
    </div>


    <TableContainer
      name={MainTableName}
      action={SMMPickMaterialSearchAPIDetail}
      formName={MainFormName}
      columns={columns}
      paramTemplate={defaultGetParamTemplate2}
      needData="t_merger_id"
      isGetDate="ok"
      nextTableName="SMMPickMaterialSearchFormNext"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      onRowClick
    />

    <QueryTableContainer
      name="SMMPickMaterialSearchFormNext"
      tableName={MainTableName}
      columns={columnsDetail}
    />
  </div>
  );
SMMPickMaterialSearch.defaultProps = {

};
SMMPickMaterialSearch.propTypes = {

};

export default SMMPickMaterialSearch;
