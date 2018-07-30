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
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import SelectContainer from '../../containers/SelectContainer';
import InputContainer from '../../containers/InputContainer';
import {
  EQMParamTemplate,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate2,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const MainFormName = 'EQMErrorCodeSetForm';
const MainTableName = 'EQMErrorCodeSetTab';
const EQMErrorCodeSetAPI = `${SERVER_IP_EQM}/ams/eqm/errorcode`;
const modelAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/model/list`;
const EQMErrorCodeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/errorcode/active`;

const targetKeyUpdate = ['eqpModelId', 'errorCode', 'errorDetail', 'errorSolution', 'errorLevel', 'id'];
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备型号',
    dataIndex: 'modelName',
    key: 'modelName',
  }, {
    title: '设备类型',
    dataIndex: 'typeName',
    key: 'typeName',
  }, {
    title: '错误码',
    dataIndex: 'errorCode',
    key: 'errorCode',
  }, {
    title: '错误码描述',
    dataIndex: 'errorDetail',
    key: 'errorDetail',
  }, {
    title: '错误解决方案',
    dataIndex: 'errorSolution',
    key: 'errorSolution',
  }, {
    title: '错误级别',
    dataIndex: 'errorLevel',
    key: 'errorLevel',
  }, {
    title: '最后更新者',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
  }];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '故障及维修',
}, {
  path: '',
  name: '错误码配置',
}];


const EQMErrorCodeSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="错误码配置" />
    <FormContainer
      name={MainFormName}
      action={EQMErrorCodeSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelId" className={'label'}>型号名称</label>
        <span className={'select'}>
          <SelectContainer
            name="eqpModelId"
            action={modelAPI}
            itemKey="id"
            itemValue="name"
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="errorCode" className={'label'}>错误代码</label>
        <InputContainer type="text" name="errorCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="errorDetail" className={'label'}>错误描述</label>
        <InputContainer type="text" name="errorDetail" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <SelectContainer
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={showData}
            load="true"
            defaultKey="Y"
            defaultValue="显示项"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="EQMErrorCodeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMErrorCodeSetAdd"
          action={EQMErrorCodeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMErrorCodeSetAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpModelId">设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={modelAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row>
              <label htmlFor="errorCode">错误码</label>
              <InputContainer type="text" name="errorCode" />
              <i>* 必须为整形数据</i>
            </Row>
            <Row>
              <label htmlFor="errorDetail">错误码描述</label>
              <InputContainer type="text" name="errorDetail" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="errorSolution">错误解决方案</label>
              <InputContainer type="text" name="errorSolution" />
            </Row>
            <Row>
              <label htmlFor="errorLevel">错误级别</label>
              <InputContainer type="text" name="errorLevel" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMErrorCodeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMErrorCodeSetUpdate"
          modalName="EQMErrorCodeSetUpdate"
          action={EQMErrorCodeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate2}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpModelId">设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={modelAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="errorCode">错误码</label>
              <InputContainer type="text" name="errorCode" disabled />
            </Row>
            <Row>
              <label htmlFor="errorDetail">错误码描述</label>
              <InputContainer type="text" name="errorDetail" />
            </Row>
            <Row>
              <label htmlFor="errorSolution">错误解决方案</label>
              <InputContainer type="text" name="errorSolution" />
            </Row>
            <Row>
              <label htmlFor="errorLevel">错误级别</label>
              <InputContainer type="text" name="errorLevel" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="隐藏"
        mode="update"
        action={EQMErrorCodeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMErrorCodeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name={MainTableName}
      formName={MainFormName}
      columns={columns}
      onRowClick
    />
  </div>
);
EQMErrorCodeSet.defaultProps = {

};
EQMErrorCodeSet.propTypes = {

};

export default EQMErrorCodeSet;
