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


const MainFormName = 'EQMTypeSetForm';
const MainTableName = 'EQMTypeSetTab';

const EQMTypeSetAPI = `${SERVER_IP_EQM}/ams/eqm/type`;
const EQMTypeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/type/active`;

const targetKeyUpdate = ['typeName', 'typeCode', 'typeDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
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
  }, {
    title: '最后更新者',
    dataIndex: 'lastUpdateBy',
    index: 'lastUpdateBy',
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
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
  name: '类型配置',
}];
const EQMTypeSet = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="类型配置" />
    <FormContainer
      name={MainFormName}
      action={EQMTypeSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="typeName" className={'label'}>类型名称</label>
        <InputContainer type="text" name="typeName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="typeCode" className={'label'}>类型代码</label>
        <InputContainer type="text" name="typeCode" className={'input'} />
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
          // needForName="JigTypeSettingAdd"
          action={EQMTypeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMTypeSetAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="typeName">类别名称</label>
              <InputContainer type="text" name="typeName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="typeCode">类别代码</label>
              <InputContainer type="text" name="typeCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="typeDesc">类型描述</label>
              <InputContainer type="text" name="typeDesc" />
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
        name="EQMTypeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMTypeSetUpdate"
          modalName="EQMTypeSetUpdate"
          action={EQMTypeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate2}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="typeName">类别名称</label>
              <InputContainer type="text" name="typeName" />
            </Row>
            <Row>
              <label htmlFor="typeCode">类别代码</label>
              <InputContainer type="text" name="typeCode" disabled />
            </Row>
            <Row>
              <label htmlFor="typeDesc">类型描述</label>
              <InputContainer type="text" name="typeDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最更新者</label>
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
        action={EQMTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMTypeSetActiveAPI}
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
EQMTypeSet.defaultProps = {

};
EQMTypeSet.propTypes = {

};

export default EQMTypeSet;
