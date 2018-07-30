import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import {
  EQMParamTemplate,
  EQMUpdatePutDataTemplate,
  EQMAddPostDataTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import './style.less';

const WPSERVER = 'http://CNXADRCNB016:8081';
const PlanConfigApi = `${WPSERVER}/ams/eqm/prod/plan`;
const lineItem = `${WPSERVER}/ams/eqm/produceline/setting/line/item`;

const targetKeyUpdate = ['prodNumber', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '线别编码',
    dataIndex: 'lineCode',
    key: 'lineCode',
  }, {
    title: '线别名称',
    dataIndex: 'lineName',
    index: 'lineName',
  }, {
    title: '生产日期',
    dataIndex: 'prodDate',
    index: 'prodDate',
    render: (text, record) => {
      const { prodDate } = record;
      if (prodDate === null) {
        return '';
      }
      const date = new Date(prodDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      return `${Y}-${add0(M)}-${add0(D)}`;
    },
  }, {
    title: '生产数量',
    dataIndex: 'prodNumber',
    index: 'prodNumber',
  }, {
    title: '创建者',
    dataIndex: 'createBy',
    index: 'createBy',
  }, {
    title: '最后创建日期',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
    render: (text, record) => {
      const { lastUpdateDate } = record;
      if (lastUpdateDate === null) {
        return '';
      }
      const date = new Date(lastUpdateDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
    },
  }];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '生产统计',
}, {
  path: '',
  name: '产线计划配置',
}];

const EQMPlanConfig = props => (
  <div className="EQMPlanConfig">
    <Bread breadMap={breadMap} />
    <Title name="产线计划配置" />
    <FormContainer
      name="EQMPlanConfigForm"
      action={PlanConfigApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="lineId" className={'label'}>线别</label>
        <span className="select">
          <SelectContainer
            name="lineId"
            action={lineItem}
            itemKey="id"
            itemValue="name"
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="prodDate" className={'label'} style={{ marginRight: '5px' }}>生产日期</label>
        <DatePickerContainer name="prodDate" style={{ outline: 'none' }} />
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="EQMPlanConfigAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMPlanConfigAdd"
          action={PlanConfigApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMPlanConfigForm"
          filters={defaultRequestFilters}
          modalName="EQMPlanConfigAdd"
        >
          <div className="modalStyle">
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="lineId" className={'label'}>线别</label>
              <span className="select" >
                <SelectContainer
                  name="lineId"
                  action={lineItem}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row className="prodDate" style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="prodDate">生产时间</label>
              <DatePickerContainer name="prodDate" style={{ outline: 'none' }} />
              <i>*</i>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="prodNumber">生产数量</label>
              <InputContainer type="text" name="prodNumber" />
              <i>*</i>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMPlanConfigUpdate"
        formName="EQMPlanConfigForm"
        tableName="EQMPlanConfigTable"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMPlanConfigUpdate"
          modalName="EQMPlanConfigUpdate"
          action={PlanConfigApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMPlanConfigForm"
          tableName="EQMPlanConfigTable"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="prodNumber">生产数量</label>
              <InputContainer type="text" name="prodNumber" />
              <i>*</i>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
    </div>
    <TableContainer
      name="EQMPlanConfigTable"
      formName="EQMPlanConfigForm"
      columns={columns}
      onRowClick
    />
  </div>
);

EQMPlanConfig.defaultProps = {

};

EQMPlanConfig.propTypes = {

};

export default EQMPlanConfig;
