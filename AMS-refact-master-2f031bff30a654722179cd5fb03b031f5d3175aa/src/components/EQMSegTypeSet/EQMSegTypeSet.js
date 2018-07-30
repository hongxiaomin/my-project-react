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
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMSegTypeSetAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/section`;
const EQMSegTypeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/section/active`;

const MainFormName = 'EQMSegTypeSetForm';
const MainTableName = 'EQMSegTypeSetTab';

const targetKeyUpdate = ['sectionName', 'sectionCode', 'sectionDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '段别名称',
    dataIndex: 'sectionName',
    key: 'sectionName',
  }, {
    title: '段别代码',
    dataIndex: 'sectionCode',
    index: 'sectionCode',
  }, {
    title: '段别描述',
    dataIndex: 'sectionDesc',
    index: 'sectionDesc',
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
  name: '工作站配置',
}, {
  path: '',
  name: '段别配置',
}];
const EQMSegTypeSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="段别配置" />
    <FormContainer
      name={MainFormName}
      action={EQMSegTypeSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="sectionName" className={'label'}>段别名称</label>
        <InputContainer type="text" name="sectionName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="sectionCode" className={'label'}>段别代码</label>
        <InputContainer type="text" name="sectionCode" className={'input'} />
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
      <Modal name="EQMSegTypeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMSegTypeSetAdd"
          // needForName="JigTypeSettingAdd"
          action={EQMSegTypeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMSegTypeSetAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="sectionName">段别名称</label>
              <InputContainer type="text" name="sectionName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="sectionCode">段别代码</label>
              <InputContainer type="text" name="sectionCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="sectionDesc">段别描述</label>
              <InputContainer type="text" name="sectionDesc" />
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
        name="EQMSegTypeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMSegTypeSetUpdate"
          modalName="EQMSegTypeSetUpdate"
          action={EQMSegTypeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="sectionName">段别名称</label>
              <InputContainer type="text" name="sectionName" />
            </Row>
            <Row>
              <label htmlFor="sectionCode">段别代码</label>
              <InputContainer type="text" name="sectionCode" disabled />
            </Row>
            <Row>
              <label htmlFor="sectionDesc">段别描述</label>
              <InputContainer type="text" name="sectionDesc" />
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
        action={EQMSegTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMSegTypeSetActiveAPI}
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
EQMSegTypeSet.defaultProps = {

};
EQMSegTypeSet.propTypes = {

};

export default EQMSegTypeSet;
