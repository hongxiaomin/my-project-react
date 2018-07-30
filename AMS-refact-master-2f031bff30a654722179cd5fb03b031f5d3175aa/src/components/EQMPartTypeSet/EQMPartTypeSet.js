import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import {
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate,
  bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMTypeSetApi = `${SERVER_IP_EQM}/ams/eqm/part/type`;
const EQMTypeItemApi = `${SERVER_IP_EQM}/ams/eqm/part/type/item`;
const TypeItemActive = `${SERVER_IP_EQM}/ams/eqm/part/type/active`;

const targetKeyUpdate = ['typeCode', 'typeName', 'typeDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '类型名称',
    dataIndex: 'typeName',
    key: 'typeName',
  }, {
    title: '类型代码',
    dataIndex: 'typeCode',
    index: 'typeCode',
  }, {
    title: '类型描述',
    dataIndex: 'typeDesc',
    index: 'typeDesc',
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
  name: '零件管理',
}, {
  path: '',
  name: '零件类型配置',
}];
const EQMPartTypeSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="零件类型配置" />
    <FormContainer
      name="EQMPartTypeSetForm"
      action={EQMTypeSetApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="typeName" className={'label'}>类型名称</label>
        <span className={'select'}>
          <SelectContainer
            name="typeName"
            className={'select'}
            itemKey="name"
            itemValue="name"
            load="true"
            action={EQMTypeItemApi}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="typeCode" className={'label'}>类型代码</label>
        <span className={'select'}>
          <SelectContainer
            name="typeCode"
            className={'select'}
            itemKey="code"
            itemValue="code"
            load="true"
            action={EQMTypeItemApi}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
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
      <Modal name="EQMTypeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMTypeSetAdd"
          action={EQMTypeSetApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMPartTypeSetForm"
          filters={defaultRequestFilters}
          modalName="EQMTypeSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="typeName">类型名称</label>
              <InputContainer type="text" name="typeName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="typeCode">类型代码</label>
              <InputContainer type="text" name="typeCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="typeDesc">类型描述</label>
              <InputContainer type="text" name="typeDesc" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMTypeSetUpdate"
        formName="EQMPartTypeSetForm"
        tableName="EQMPartTypeSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMTypeSetUpdate"
          modalName="EQMTypeSetUpdate"
          action={EQMTypeSetApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMPartTypeSetForm"
          tableName="EQMPartTypeSetTab"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="typeName">类型名称</label>
              <InputContainer type="text" name="typeName" />
            </Row>
            <Row>
              <label htmlFor="typeCode">类型代码</label>
              <InputContainer type="text" name="typeCode" />
            </Row>
            <Row>
              <label htmlFor="typeDesc">类型描述</label>
              <InputContainer type="text" name="typeDesc" />
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
        action={TypeItemActive}
        tableName="EQMPartTypeSetTab"
        formName="EQMPartTypeSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={TypeItemActive}
        tableName="EQMPartTypeSetTab"
        formName="EQMPartTypeSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMPartTypeSetTab"
      formName="EQMPartTypeSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMPartTypeSet.defaultProps = {

};
EQMPartTypeSet.propTypes = {

};

export default EQMPartTypeSet;
