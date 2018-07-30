import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Input from '../../containers/InputContainer';

import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  copyPostDataTemplate,
  modifyParamTemplate,
  modifyPostDataTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const JigChePrjSetApi = `${SERVER_IP_JIG}/ams/jig/setting/qcitem/query`;
const JigChePrjSetItemsApi = `${SERVER_IP_JIG}/ams/jig/setting/qcitem/query/item`;
const JigChePrjSetApiPut = `${SERVER_IP_JIG}/ams/jig/setting/qcitem/update`;
const JigChePrjSetApiPost = `${SERVER_IP_JIG}/ams/jig/setting/qcitem/add`;

const MainFormName = 'JigCheckProjectSettingForm';
const MainTableName = 'JigChePrjSetTable';
const targetKeyModify = ['qcItemCode', 'qcItemName', 'qcItemDesc', 'id'];
const targetKeyCopy = ['qcItemCode', 'qcItemName', 'qcItemDesc', 'lastUpdateBy', 'createBy'];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治工具管理',
}, {
  path: '',
  name: '治具管理设定',
}, {
  path: '',
  name: '治工具检验项目设定',
}];

const columns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, render, index) => (index + 1),
}, {
  title: '检测项目代码',
  dataIndex: 'qcItemCode',
  key: 'qcItemCode',
}, {
  title: '检测项目名称',
  dataIndex: 'qcItemName',
  index: 'qcItemName',
}, {
  title: '检测项目说明',
  dataIndex: 'qcItemDesc',
  index: 'qcItemDesc',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  index: 'lastUpdateBy',
}];
const selData = [
  {
    id: 'Y',
    name: '显示项',
  }, {
    id: 'N',
    name: '隐藏项',
  },
];
const JigCheckProjectSettingOld = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="治工具检验项目设定" />
    <FormContainer
      name={MainFormName}
      action={JigChePrjSetApi}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="qcItemCode" className={'label'}>检验项目代号</label>
        <span className={'select'}>
          <Select
            name="qcItemCode"
            className={'select'}
            itemKey="code"
            itemValue="code"
            action={JigChePrjSetItemsApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="qcItemName" className={'label'}>检验项目名称</label>
        <span className={'select'}>
          <Select
            name="qcItemName"
            className={'select'}
            itemKey="name"
            itemValue="name"
            action={JigChePrjSetItemsApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <Select
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            defaultValue="显示项"
            defaultKey="Y"
            data={selData}
            load="true"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="JigCheckProjectSettingAdd" btnName="新增" title="新增" >
        <ModalForm
          name="JigCheckProjectSettingAdd"
          action={JigChePrjSetApiPost}
          method="POST"
          dataTemplate={defaultPostDataTemplate}
          filters={defaultRequestFilters}
          modalName="JigCheckProjectSettingAdd"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="qcItemCode">检验项目代码</label>
              <Input type="text" name="qcItemCode" />
            </Row>
            <Row>
              <label htmlFor="qcItemName">检验项目名称</label>
              <Input type="text" name="qcItemName" />
            </Row>
            <Row>
              <label htmlFor="qcItemDesc">检验项目说明</label>
              <Input type="text" name="qcItemDesc" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" value="admin" disabled />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="JigCheckProjectSettingCopy"
        btnName="复制"
        title="复制"
        load="true"
        tarKey={targetKeyCopy}
        formName={MainFormName}
        tableName={MainTableName}
      >
        <ModalForm
          name="JigCheckProjectSettingCopy"
          action={JigChePrjSetApiPost}
          method="POST"
          dataTemplate={copyPostDataTemplate}
          filters={defaultRequestFilters}
          modalName="JigCheckProjectSettingCopy"
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="qcItemCode">检验项目代码</label>
              <Input type="text" name="qcItemCode" />
            </Row>
            <Row>
              <label htmlFor="qcItemName">检验项目名称</label>
              <Input type="text" name="qcItemName" />
            </Row>
            <Row>
              <label htmlFor="qcItemDesc">检验项目说明</label>
              <Input type="text" name="qcItemDesc" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" />
            </Row>
            <Row>
              <label htmlFor="lastUpdateBy">最后修改人员</label>
              <Input type="text" name="lastUpdateBy" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="JigCheckProjectSettingUpdate"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyModify}
        formName={MainFormName}
        tableName={MainTableName}
      >
        <ModalForm
          name="JigCheckProjectSettingUpdate"
          action={JigChePrjSetApiPut}
          method="PUT"
          paramTemplate={modifyParamTemplate}
          dataTemplate={modifyPostDataTemplate}
          filters={defaultRequestFilters}
          modalName="JigCheckProjectSettingUpdate"
          formName={MainFormName}
          tableName={MainTableName}
          tarKey={targetKeyModify}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="qcItemCode">检验项目代码</label>
              <Input type="text" name="qcItemCode" />
            </Row>
            <Row>
              <label htmlFor="qcItemName">检验项目名称</label>
              <Input type="text" name="qcItemName" />
            </Row>
            <Row>
              <label htmlFor="qcItemDesc">检验项目说明</label>
              <Input type="text" name="qcItemDesc" />
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
        action={JigChePrjSetApiPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="隐藏"
        mode="hide"
        action={JigChePrjSetApiPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="show"
        action={JigChePrjSetApiPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
    </div>
    <TableContainer name={MainTableName} formName="JigCheckProjectSettingForm" columns={columns} />
  </div>
);

export default JigCheckProjectSettingOld;
