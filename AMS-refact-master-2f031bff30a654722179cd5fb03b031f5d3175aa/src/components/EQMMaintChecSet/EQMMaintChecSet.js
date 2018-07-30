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

const EQMMaintSetApi = `${SERVER_IP_EQM}/ams/eqm/ckbm/item`;
const EQMMaintActive = `${SERVER_IP_EQM}/ams/eqm/ckbm/item/active`;

const targetKeyUpdate = ['itemCode', 'itemName', 'itemDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '项目名称',
    dataIndex: 'itemName',
    key: 'itemName',
  }, {
    title: '项目代码',
    dataIndex: 'itemCode',
    index: 'itemCode',
  }, {
    title: '项目描述',
    dataIndex: 'itemDesc',
    key: 'itemDesc',
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
  name: '点检及保养',
}, {
  path: '',
  name: '点检及保养项设置',
}];
const EQMMaintChecSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="点检及保养项设置" />
    <FormContainer
      name="EQMMaintChecSetForm"
      action={EQMMaintSetApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="itemName" className={'label'}>保养名称</label>
        <InputContainer type="text" name="itemName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="itemCode" className={'label'}>保养代码</label>
        <InputContainer type="text" name="itemCode" className={'input'} />
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
      <Modal name="MaintSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="MaintSetAdd"
          action={EQMMaintSetApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMMaintChecSetForm"
          filters={defaultRequestFilters}
          modalName="MaintSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="itemName">项目名称</label>
              <InputContainer type="text" name="itemName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="itemCode">项目代码</label>
              <InputContainer type="text" name="itemCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="itemDesc">项目描述</label>
              <InputContainer type="text" name="itemDesc" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="MaintSetUpdate"
        formName="EQMMaintChecSetForm"
        tableName="EQMMaintChecSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="MaintSetUpdate"
          modalName="MaintSetUpdate"
          action={EQMMaintSetApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMMaintChecSetForm"
          tableName="EQMMaintChecSetTab"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="itemName">项目名称</label>
              <InputContainer type="text" name="itemName" />
            </Row>
            <Row>
              <label htmlFor="itemCode">项目代码</label>
              <InputContainer type="text" name="itemCode" />
            </Row>
            <Row>
              <label htmlFor="itemDesc">项目描述</label>
              <InputContainer type="text" name="itemDesc" />
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
        action={EQMMaintActive}
        tableName="EQMMaintChecSetTab"
        formName="EQMMaintChecSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMMaintActive}
        tableName="EQMMaintChecSetTab"
        formName="EQMMaintChecSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMMaintChecSetTab"
      formName="EQMMaintChecSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMMaintChecSet.defaultProps = {

};
EQMMaintChecSet.propTypes = {

};

export default EQMMaintChecSet;
