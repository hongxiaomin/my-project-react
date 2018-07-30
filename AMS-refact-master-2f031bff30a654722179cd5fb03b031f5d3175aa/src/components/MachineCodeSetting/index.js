import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';
import {
  defaultGetParamTemplateSMT,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplateSMT,
  defaultPostDataTemplateSMT,
  modifyPostDataTemplateSMT,
  updateTime,
  SERVER_IP_SMT } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const MachineCodeSettingApi = `${SERVER_IP_SMT}/ams/product/code`;
const targetKeyModify = ['id', 'code', 'name', 'description'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '机种简码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '机种简码名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
  render: (index, record) => updateTime(record.lastUpdateDate),
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '机种管理',
}, {
  path: '',
  name: '机种简码设定',
}];

const tableNames = 'MachineCodeSetting';
const tableFormName = 'MachineCodeSettingForm';

const MachineCodeSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="机种简码设定" />
    <FormContainer
      name={tableFormName}
      action={MachineCodeSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>机种简码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>机种简码名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="MachineCodeSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="MachineCodeSettingAdd"
        action={MachineCodeSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="MachineCodeSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">机种简码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">机种简码名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="description">描述</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="MachineCodeSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="MachineCodeSettingUpdate"
        action={MachineCodeSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="MachineCodeSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">机种简码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">机种简码名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="description">说明</label>
            <InputContainer type="text" name="description" />
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
      action={MachineCodeSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={MachineCodeSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />

  </div>
);
MachineCodeSetting.defaultProps = {

};
MachineCodeSetting.propTypes = {

};

export default MachineCodeSetting;
