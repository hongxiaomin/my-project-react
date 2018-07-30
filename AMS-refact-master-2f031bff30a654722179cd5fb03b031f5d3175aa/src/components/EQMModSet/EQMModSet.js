import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import ImageContainer from '../../containers/ImageContainer';
// import Request from '../../utils/Request';
import { GUID } from '../../utils/Common';
import {
  EQMParamTemplate,
  EQMPostFileDataTemplate,
  EQMPutFileDataTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const MainFormName = 'EQMModSetForm';
const MainTableName = 'EQMModSetTab';

const EQMModSetAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/model`;
const typeAPI = `${SERVER_IP_EQM}/ams/eqm/type/list`;
const comTypeAPI = `${SERVER_IP_EQM}/ams/eqm/communicationmode`;
const supplierAPI = `${SERVER_IP_EQM}/ams/eqm/supplier`;
const EQMModSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/model/active`;

const targetKeyUpdate = ['eqpModelName', 'eqpModelCode', 'eqpModelDesc', 'picture', 'eqpTypeId', 'commModeId', 'supplierId', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '型号名称',
    dataIndex: 'eqpModelName',
    key: 'eqpModelName',
  }, {
    title: '型号代码',
    dataIndex: 'eqpModelCode',
    key: 'eqpModelCode',
  }, {
    title: '标识图',
    dataIndex: 'pictute',
    key: 'pictute',
    render: (text, record) => (
      <ImageContainer key={GUID()} id={record.id} name="picture" action={`${SERVER_IP_EQM}/ams/eqm/eqp/model/picture`} />
    ),
  }, {
    title: '型号描述',
    dataIndex: 'eqpModelDesc',
    key: 'eqpModelDesc',
  }, {
    title: '设备类型',
    dataIndex: 'typeName',
    key: 'typeName',
  }, {
    title: '通讯类型',
    dataIndex: 'commTypeName',
    key: 'commTypeName',
  }, {
    title: '生产厂家',
    dataIndex: 'supplierName',
    key: 'supplierName',
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
  name: '设备管理',
}, {
  path: '',
  name: '型号配置',
}];
const EQMModSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="型号配置" />
    <FormContainer
      name={MainFormName}
      action={EQMModSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelName" className={'label'}>型号名称</label>
        <InputContainer type="text" name="eqpModelName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelCode" className={'label'}>型号代码</label>
        <InputContainer type="text" name="eqpModelCode" className={'input'} />
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
      <Modal name="EQMModSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMModSetAdd"
          action={EQMModSetAPI}
          method="POST"
          dataTemplate={EQMPostFileDataTemplate(['picture'])}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMModSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpModelName">型号名称</label>
              <InputContainer type="text" name="eqpModelName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="eqpModelCode">型号代码</label>
              <InputContainer type="text" name="eqpModelCode" />
              <i>*</i>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="eqpTypeId">设备类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpTypeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={typeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="commModeId">通讯类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="commModeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="commModeName"
                  action={comTypeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="supplierId">生产厂家</label>
              <span className={'select'}>
                <SelectContainer
                  name="supplierId"
                  className={'select'}
                  itemKey="id"
                  itemValue="supplierName"
                  action={supplierAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row>
              <label htmlFor="eqpModelDesc">型号描述</label>
              <InputContainer type="text" name="eqpModelDesc" />
            </Row>
            <Row className={'modalInputFile'}>
              <label htmlFor="picture">标识图</label>
              <InputContainer type="file" name="picture" />
            </Row>
            {/* <Row>
              <label htmlFor="createBy">创建者</label>
              <InputContainer type="text" name="createBy" />
              <i>*</i>
            </Row> */}
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMModSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMModSetUpdate"
          modalName="EQMModSetUpdate"
          action={EQMModSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMPutFileDataTemplate(['picture'])}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpModelName">型号名称</label>
              <InputContainer type="text" name="eqpModelName" />
            </Row>
            <Row>
              <label htmlFor="eqpModelCode">型号代码</label>
              <InputContainer type="text" name="eqpModelCode" disabled />
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="eqpTypeId">设备类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpTypeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={typeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="commModeId">通讯方式</label>
              <span className={'select'}>
                <SelectContainer
                  name="commModeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="commModeName"
                  action={comTypeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="supplierId">生产厂家</label>
              <span className={'select'}>
                <SelectContainer
                  name="supplierId"
                  className={'select'}
                  itemKey="id"
                  itemValue="supplierName"
                  action={supplierAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="eqpModelDesc">型号描述</label>
              <InputContainer type="text" name="eqpModelDesc" />
            </Row>
            <Row className={'modalInputFile'}>
              <label htmlFor="picture">标识图</label>
              <InputContainer type="file" name="picture" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后更新者</label>
              <InputContainer type="text" name="lastUpdateBy" />
            </Row> */}
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="隐藏"
        mode="update"
        action={EQMModSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMModSetActiveAPI}
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
EQMModSet.defaultProps = {

};
EQMModSet.propTypes = {

};

export default EQMModSet;
