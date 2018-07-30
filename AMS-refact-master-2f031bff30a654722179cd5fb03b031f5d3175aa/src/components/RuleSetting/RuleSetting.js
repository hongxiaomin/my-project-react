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
    defaultPutParamTemplateRule,
    SERVER_IP_RULE,
    defaultParamTemplateAddRule,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Modal from '../../containers/ModalContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';


const RuleSettingApi = `${SERVER_IP_RULE}/webapi/ams/route/rule`;
const RuleSettingAddApi = `${SERVER_IP_RULE}/webapi/ams/route/rule`;
const RuleSettingUpdateApi = `${SERVER_IP_RULE}/webapi/ams/route/rule`;


const targetKeyModify = ['id', 'code', 'name', 'description', 'type', 'description', 'program_name', 'program_url', 'username'];


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '规则设定',
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
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
  render: (text, record) => (
       <span style={{ display: 'inline-block', whiteSpace: 'normal', width: 200 }}>{text}</span>
    ),
}, {
  title: '程式名称',
  dataIndex: 'program_name',
  key: 'program_name',
}, {
  title: '程式路径',
  dataIndex: 'program_url',
  key: 'program_url',
}, {
  title: '最后修改人员',
  dataIndex: 'last_update_by',
  key: 'last_update_by',
}, {
  title: '最后修改时间',
  dataIndex: 'last_update_date',
  key: 'last_update_date',
}];


const deleteUrlTemplate = (param) => {
  const data = { id: param };
  return {
    param: [data],
  };
};


const RuleSetting = props => (
  <div className="ruleSettingPage">
    <Bread breadMap={breadMap} />
    <Title name="规则设定" />
    <FormContainer
      name="RuleSettingForm"
      action={RuleSettingApi}
      method="GET"
      paramTemplate={defaultPutParamTemplateRule}
      responseFormatter={res => JSON.parse(res)}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >

      <div className={'searchCondition'}>
        <label htmlFor="code" className={'label'}>简码</label>
        <InputContainer type="text" name="code" className={'input'} noValue />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="name" className={'label'}>名称</label>
        <InputContainer type="text" name="name" className={'input'} noValue />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="type" className={'label'}>类型</label>
        <InputContainer type="text" name="type" className={'input'} noValue />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <Modal name="RuleSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RuleSettingAdd"
        action={RuleSettingAddApi}
        method="POST"
        dataTemplate={defaultParamTemplateAddRule}
        filters={defaultRequestFilters}
        modalName="RuleSettingAdd"
        formName="RuleSettingForm"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">规则简码</label>
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
            <label htmlFor="program_name">程式名称</label>
            <InputContainer type="text" name="program_name" />
          </Row>
          <Row>
            <label htmlFor="program_url">程式路径</label>
            <InputContainer type="text" name="program_url" />
          </Row>
          <Row style={{ display: 'none' }}>
            <label htmlFor="username">用户名</label>
            <InputContainer type="text" name="username" value="Admin" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>

    <Modal
      name="RuleSettingUpdate"
      btnName="修改"
      title="修改"
      formName="RuleSettingForm"
      tableName="RuleSettingTable"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="RuleSettingUpdate"
        action={RuleSettingUpdateApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => { }}
        dataTemplate={defaultParamTemplateAddRule}
        modalName="RuleSettingUpdate"
        formName="RuleSettingForm"
        tableName="RuleSettingTable"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">规则简码</label>
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
            <label htmlFor="program_name">程式名称</label>
            <InputContainer type="text" name="program_name" />
          </Row>
          <Row>
            <label htmlFor="program_url">程式路径</label>
            <InputContainer type="text" name="program_url" />
          </Row>
          <Row style={{ display: 'none' }}>
            <label htmlFor="username">用户名</label>
            <InputContainer type="text" name="username" value="Admin" />
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
      action={RuleSettingApi}
      tableName="RuleSettingTable"
      formName="RuleSettingForm"
      paramTemplate={defaultPutParamTemplateRule}
    />

    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={RuleSettingApi}
      tableName="RuleSettingTable"
      formName="RuleSettingForm"
      dataTemplate={deleteUrlTemplate}
      newDeleteMethod
      responseFormatter={res => JSON.parse(res)}

    />
    
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name="RuleSettingTable"
          formName="RuleSettingForm"
          columns={columns}
          responseFormatter={res => JSON.parse(res)}
          isRadio
          dataSourceTemplate={defaultDataSourceTemplate}
        />
      </div>
    </div>
  </div>
);
RuleSetting.defaultProps = {

};
RuleSetting.propTypes = {

};

export default RuleSetting;
