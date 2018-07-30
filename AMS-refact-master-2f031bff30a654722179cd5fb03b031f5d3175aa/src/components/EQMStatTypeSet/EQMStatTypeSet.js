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

const EQMStatTypeSetAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/station`;
const EQMStatTypeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/station/active`;

const MainFormName = 'EQMStatTypeSetForm';
const MainTableName = 'EQMStatTypeSetTab';

const targetKeyUpdate = ['stationName', 'stationCode', 'stationDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '站别名称',
    dataIndex: 'stationName',
    key: 'stationName',
  }, {
    title: '站别代码',
    dataIndex: 'stationCode',
    index: 'stationCode',
  }, {
    title: '站别描述',
    dataIndex: 'stationDesc',
    index: 'stationDesc',
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
  name: '站别配置',
}];
const EQMStatTypeSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="站别配置" />
    <FormContainer
      name={MainFormName}
      action={EQMStatTypeSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="stationName" className={'label'}>站别名称</label>
        <InputContainer type="text" name="stationName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="stationCode" className={'label'}>站别代码</label>
        <InputContainer type="text" name="stationCode" className={'input'} />
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
      <Modal name="EQMStatTypeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMStatTypeSetAdd"
          // needForName="JigTypeSettingAdd"
          action={EQMStatTypeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMStatTypeSetAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="stationName">站别名称</label>
              <InputContainer type="text" name="stationName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="stationCode">站别代码</label>
              <InputContainer type="text" name="stationCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="stationDesc">站别描述</label>
              <InputContainer type="text" name="stationDesc" />
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
        name="EQMStatTypeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMStatTypeSetUpdate"
          modalName="EQMStatTypeSetUpdate"
          action={EQMStatTypeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="stationName">站别名称</label>
              <InputContainer type="text" name="stationName" />
            </Row>
            <Row>
              <label htmlFor="stationCode">站别代码</label>
              <InputContainer type="text" name="stationCode" disabled />
            </Row>
            <Row>
              <label htmlFor="stationDesc">站别描述</label>
              <InputContainer type="text" name="stationDesc" />
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
        action={EQMStatTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMStatTypeSetActiveAPI}
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
EQMStatTypeSet.defaultProps = {

};
EQMStatTypeSet.propTypes = {

};

export default EQMStatTypeSet;
