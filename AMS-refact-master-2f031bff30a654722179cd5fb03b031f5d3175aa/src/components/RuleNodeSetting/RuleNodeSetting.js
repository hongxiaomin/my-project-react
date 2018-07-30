import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplateSMT,
  defaultPostDataTemplateSMT,
  SERVER_IP_RULE1,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Modal from '../../containers/ModalContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';


const RuleNodeSettingApi = `${SERVER_IP_RULE1}/ams/rule/node`;

const targetKeyModify = ['id', 'code', 'name', 'type', 'description', 'programName', 'programUrl'];



const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '规则节点设定',
}];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
},  {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
  render: (text, record) => (
    <span style={{ display: 'inline-block', whiteSpace: 'normal', width: 200 }}>{text}</span>
  )
}, {
  title: '程式名称',
  dataIndex: 'programName',
  key: 'programName',
}, {
  title: '程式路径',
  dataIndex: 'programUrl',
  key: 'programUrl',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}];





const RuleNodeSetting = props => (
  <div className='ruleDetailSettingPage'>
    <Bread breadMap={breadMap} />
    <Title name="规则节点设定" />
    <FormContainer
      name="RuleNodeSettingForm"
      action={RuleNodeSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      load
    >

      <div className={'searchCondition'}>

        <label htmlFor="name" className={'label'}>名称</label>
        <InputContainer type="text" name="name"  className={'input'} />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>



    <Modal name="RuleNodeSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RuleNodeSettingAdd"
        action={RuleNodeSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="RuleNodeSettingAdd"
        formName="RuleNodeSettingForm"
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="description">描述</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row>
            <label htmlFor="type">规则类型</label>
            <InputContainer type="text" name="type" />
          </Row>
          <Row>
            <label htmlFor="programName">程式名称</label>
            <InputContainer type="text" name="programName" />
          </Row>
          <Row>
            <label htmlFor="programUrl">程式url</label>
            <InputContainer type="text" name="programUrl" />
          </Row>

          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>

    <Modal
      name="RuleNodeSettingUpdate"
      btnName="修改"
      title="修改"
      formName="RuleNodeSettingForm"
      tableName="RuleNodeSettingTable"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="RuleNodeSettingUpdate"
        action={RuleNodeSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => { }}
        dataTemplate={defaultPostDataTemplateSMT}
        modalName="RuleNodeSettingUpdate"
        formName="RuleNodeSettingForm"
        tableName="RuleNodeSettingTable"
        body="raw"

      >
      <div className={'modalStyle'}>
      <Row>
        <label htmlFor="code">代码</label>
        <InputContainer type="text" name="code" disabled />
      </Row>
      <Row>
        <label htmlFor="name">名称</label>
        <InputContainer type="text" name="name" disabled />
      </Row>
      <Row>
        <label htmlFor="description">描述</label>
        <InputContainer type="text" name="description" />
      </Row>
      <Row>
        <label htmlFor="type">规则类型</label>
        <InputContainer type="text" name="type" />
      </Row>
      <Row>
        <label htmlFor="programName">程式名称</label>
        <InputContainer type="text" name="programName" />
      </Row>
      <Row>
        <label htmlFor="programUrl">程式url</label>
        <InputContainer type="text" name="programUrl" />
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
      action={RuleNodeSettingApi}
      tableName="RuleNodeSettingTable"
      formName="RuleNodeSettingForm"
      paramTemplate={defaultGetParamTemplateSMT}
    />

    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={RuleNodeSettingApi}
      tableName="RuleNodeSettingTable"
      formName="RuleNodeSettingForm"
      newDeleteMethodUrl
    />

    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name="RuleNodeSettingTable"
          formName="RuleNodeSettingForm"
          columns={columns}
          isRadio
          dataSourceTemplate={defaultDataSourceTemplate}
        />
      </div>
    </div>
  </div>
);
RuleNodeSetting.defaultProps = {

};
RuleNodeSetting.propTypes = {

};

export default RuleNodeSetting;
