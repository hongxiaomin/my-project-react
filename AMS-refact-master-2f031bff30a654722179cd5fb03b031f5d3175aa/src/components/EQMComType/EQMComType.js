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
  EQMParamTemplate,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate2,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const MainFormName = 'EQMComTypeForm';
const MainTableName = 'EQMComTypeTab';

const EQMComTypeAPI = `${SERVER_IP_EQM}/ams/eqm/communicationmode`;
const EQMComTypeActiveAPI = `${SERVER_IP_EQM}/ams/eqm/communicationmode/active`;

const targetKeyUpdate = ['commModeName', 'commModeCode', 'commModeDesc', 'id'];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '通讯类型名称',
    dataIndex: 'commModeName',
    key: 'commModeName',
  }, {
    title: '通讯类型代码',
    dataIndex: 'commModeCode',
    index: 'commModeCode',
  }, {
    title: '通讯类型描述',
    dataIndex: 'commModeDesc',
    index: 'commModeDesc',
  }, {
    title: '最后更新者',
    dataIndex: 'lastUpdateBy',
    index: 'lastUpdateBy',
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
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
  name: '通讯类型',
}];
const EQMComType = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="通讯类型" />
    <FormContainer
      name={MainFormName}
      action={EQMComTypeAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="commModeName" className={'label'}>通讯类型名称</label>
        <InputContainer type="text" name="commModeName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="commModeCode" className={'label'}>通讯类型代码</label>
        <InputContainer type="text" name="commModeCode" className={'input'} />
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
      <Modal name="EQMComTypeAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMComTypeAdd"
          // needForName="JigTypeSettingAdd"
          action={EQMComTypeAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMComTypeAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="commModeName">通讯类型名称</label>
              <InputContainer type="text" name="commModeName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="commModeCode">通讯类型代码</label>
              <InputContainer type="text" name="commModeCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="commModeDesc">通讯类型描述</label>
              <InputContainer type="text" name="commModeDesc" />
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
        name="EQMComTypeUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMComTypeUpdate"
          modalName="EQMComTypeUpdate"
          action={EQMComTypeAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate2}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="commModeName">通讯类型名称</label>
              <InputContainer type="text" name="commModeName" />
            </Row>
            <Row>
              <label htmlFor="commModeCode">通讯类型代码</label>
              <InputContainer type="text" name="commModeCode" disabled />
            </Row>
            <Row>
              <label htmlFor="commModeDesc">通讯类型描述</label>
              <InputContainer type="text" name="commModeDesc" />
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
        action={EQMComTypeActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMComTypeActiveAPI}
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
EQMComType.defaultProps = {

};
EQMComType.propTypes = {

};

export default EQMComType;
