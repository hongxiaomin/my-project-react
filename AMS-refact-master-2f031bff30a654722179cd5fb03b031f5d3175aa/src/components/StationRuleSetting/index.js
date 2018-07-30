/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';
import {
  defaultGetParamTemplateSMT,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplateSMT,
  defaultPostDataTemplateSMT,
  modifyPostDataTemplateSMT,
  updateTime,
  SERVER_IP_SMT } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const StationRuleSettingApi = `${SERVER_IP_SMT}/ams/routing/rule/map`;
const RuleItem = `${SERVER_IP_SMT}/ams/rule`;
const StationItem = `${SERVER_IP_SMT}/ams/eqm/produceline/setting/assembly/item`;
const targetKeyModify = ['id', 'stationName', 'ruleId', 'productId'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num',
  render: (text, record, index) => (index + 1),
}, {
  title: '工作站',
  dataIndex: 'stationName',
  key: 'stationName',
}, {
  title: '规则',
  dataIndex: 'ruleName',
  key: 'ruleName',
}, {
  title: '最后更新者',
  dataIndex: 'lastUpdateBy',
  index: 'lastUpdateBy',
}, {
  title: '最后更新时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
  render: (index, record) => updateTime(record.lastUpdateDate),
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '工作站-规则关联设定',
}];

const tableNames = 'StationRuleSetting';
const tableFormName = 'StationRuleSettingForm';

const StationRuleSetting = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="工作站-规则关联设定" />
    <FormContainer
      name={tableFormName}
      action={StationRuleSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      load
    >
      <div className={'searchCondition'}>
        <label htmlFor="stationId" className={'label'}>工作站</label>
        <span className={'select'}>
          <Select
            name="stationId"
            action={StationItem}
            itemKey="id"
            itemValue="name"
            paramTemplate={() => ('')}
            dataSourceTemplate={(response) => {
              const dataSource = response.rows;
              const newDataSource = [];
              if (Array.isArray(dataSource) && dataSource.length > 0) {
                dataSource.map((v, i) => {
                  newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                });
              }
              return newDataSource;
            }}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="ruleId" className={'label'}>规则</label>
        <span className={'select'}>
          <Select
            name="ruleId"
            action={RuleItem}
            itemKey="id"
            itemValue="name"
            paramTemplate={() => ('')}
            dataSourceTemplate={(response) => {
              const dataSource = response.rows;
              const newDataSource = [];
              if (Array.isArray(dataSource) && dataSource.length > 0) {
                dataSource.map((v, i) => {
                  newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                });
              }
              return newDataSource;
            }}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="StationRuleSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="StationRuleSettingAdd"
        action={StationRuleSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="StationRuleSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row className={'modalRowSelect'}>
            <label htmlFor="stationId">工作站</label>
            <span className={'select'}>
              <Select
                name="stationId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={StationItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
              <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
            </span>
          </Row>
          <Row className={'modalRowSelect'}>
            <label htmlFor="ruleId">规则</label>
            <span className={'select'}>
              <Select
                name="ruleId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={RuleItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
              <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
            </span>
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="StationRuleSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="StationRuleSettingUpdate"
        action={StationRuleSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="StationRuleSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row className={'modalRowSelect'}>
            <label htmlFor="stationName">工作站</label>
            <InputContainer type="text" name="stationName" className={'input'} disabled />
          </Row>
          <Row>
            <label htmlFor="ruleId" className={'modalRowSelect'}>规则</label>
            <span className={'select'}>
              <Select
                name="ruleId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                noClr
                action={RuleItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <ActionBtn
      btnName="刷新"
      mode="refresh"
      action={StationRuleSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={StationRuleSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />
  </div>
);
StationRuleSetting.defaultProps = {

};
StationRuleSetting.propTypes = {

};

export default StationRuleSetting;

