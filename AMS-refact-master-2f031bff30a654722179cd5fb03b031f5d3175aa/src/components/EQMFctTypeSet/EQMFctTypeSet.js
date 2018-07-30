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
import {
  EQMParamTemplate,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultDataSourceTemplate,
  defaultRequestFilters,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMFctTypeSetAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory`;
const EQMFctTypeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/active`;

const MainFormName = 'EQMFctTypeSetForm';
const MainTableName = 'EQMFctTypeSetTab';

const targetKeyUpdate = ['factoryName', 'factoryCode', 'factoryDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '厂别名称',
    dataIndex: 'factoryName',
    key: 'factoryName',
  }, {
    title: '厂别代码',
    dataIndex: 'factoryCode',
    index: 'factoryCode',
  }, {
    title: '厂别描述',
    dataIndex: 'factoryDesc',
    index: 'factoryDesc',
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
  name: '产线管理',
}, {
  path: '',
  name: '厂别配置',
}];
const EQMFctTypeSet = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="厂别配置" />
    <FormContainer
      name={MainFormName}
      action={EQMFctTypeSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="factoryName" className={'label'}>厂别名称</label>
        <InputContainer type="text" name="factoryName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="factoryCode" className={'label'}>厂别代码</label>
        <InputContainer type="text" name="factoryCode" className={'input'} />
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
      <Modal name="EQMFctTypeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMFctTypeSetAdd"
          // needForName="EQMFctTypeSetAdd"
          action={EQMFctTypeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMFctTypeSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="factoryName">厂别名称</label>
              <InputContainer type="text" name="factoryName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="factoryCode">厂别代码</label>
              <InputContainer type="text" name="factoryCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="factoryDesc">厂别描述</label>
              <InputContainer type="text" name="factoryDesc" />
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
        name="EQMFctTypeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMFctTypeSetUpdate"
          modalName="EQMFctTypeSetUpdate"
          action={EQMFctTypeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="factoryName">厂别名称</label>
              <InputContainer type="text" name="factoryName" />
            </Row>
            <Row>
              <label htmlFor="factoryCode">厂别代码</label>
              <InputContainer type="text" name="factoryCode" disabled />
            </Row>
            <Row>
              <label htmlFor="factoryDesc">厂别描述</label>
              <InputContainer type="text" name="factoryDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后修改者</label>
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
        action={EQMFctTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMFctTypeSetActiveAPI}
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
EQMFctTypeSet.defaultProps = {

};
EQMFctTypeSet.propTypes = {

};

export default EQMFctTypeSet;
