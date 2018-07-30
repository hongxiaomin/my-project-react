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

const MainFormName = 'EQMFaultMngForm';
const MainTableName = 'EQMFaultMngTab';

const EQMFaultMngAPI = `${SERVER_IP_EQM}/ams/eqm/fault/item`;
const EQMFaultMngActiveAPI = `${SERVER_IP_EQM}/ams/eqm/fault/item/active`;

const targetKeyUpdate = ['itemName', 'itemCode', 'itemDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '故障项名称',
    dataIndex: 'itemName',
    key: 'itemName',
  }, {
    title: '故障项代码',
    dataIndex: 'itemCode',
    index: 'itemCode',
  }, {
    title: '故障项描述',
    dataIndex: 'itemDesc',
    index: 'itemDesc',
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
  name: '故障及维修',
}, {
  path: '',
  name: '故障项管理',
}];
const EQMFaultMng = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="故障项管理" />
    <FormContainer
      name={MainFormName}
      action={EQMFaultMngAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="itemName" className={'label'}>故障项名称</label>
        <InputContainer type="text" name="itemName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="itemCode" className={'label'}>故障项代码</label>
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
      <Modal name="EQMFaultMngAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMFaultMngAdd"
          // needForName="JigTypeSettingAdd"
          action={EQMFaultMngAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMFaultMngAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="itemCode">故障项名称</label>
              <InputContainer type="text" name="itemCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="itemName">故障项代码</label>
              <InputContainer type="text" name="itemName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="itemDesc">故障项描述</label>
              <InputContainer type="text" name="itemDesc" />
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
        name="EQMFaultMngUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMFaultMngUpdate"
          modalName="EQMFaultMngUpdate"
          action={EQMFaultMngAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate2}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="itemName">故障项名称</label>
              <InputContainer type="text" name="itemName" />
            </Row>
            <Row>
              <label htmlFor="itemCode">故障项代码</label>
              <InputContainer type="text" name="itemCode" disabled />
            </Row>
            <Row>
              <label htmlFor="itemDesc">故障项描述</label>
              <InputContainer type="text" name="itemDesc" />
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
        action={EQMFaultMngActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMFaultMngActiveAPI}
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
EQMFaultMng.defaultProps = {

};
EQMFaultMng.propTypes = {

};

export default EQMFaultMng;
