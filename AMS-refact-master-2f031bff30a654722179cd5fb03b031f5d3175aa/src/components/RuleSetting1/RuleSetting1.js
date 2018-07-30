import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import RuleGraphGroupContainer from '../../containers/RuleGraphGroupContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplateRule,
  SERVER_IP_RULE1,
  defaultGetParamTemplateSMT,
  defaultPostDataTemplateSMT,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Modal from '../../containers/ModalContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';


const RuleSettingApi = `${SERVER_IP_RULE1}/ams/rule`;


const targetKeyModify = ['id', 'code', 'name', 'version', 'description', 'category'];

const tableNames = 'RuleSettingTable';

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
  title: '版本',
  dataIndex: 'version',
  key: 'version',
}, {
  title: '类别',
  dataIndex: 'category',
  key: 'category',
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
  render: (text, record) => (
    <span style={{ display: 'inline-block', whiteSpace: 'normal', width: 200 }}>{text}</span>
  ),
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}];

const RuleSetting = props => (
  <div className="ruleSettingPage">
    <Bread breadMap={breadMap} />
    <Title name="规则设定" />
    <FormContainer
      name="RuleSettingForm"
      action={RuleSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      load
    >

      <div className={'searchCondition'}>
        <label htmlFor="code" className={'label'}>代码</label>
        <InputContainer
          type="text"
          name="code"
          className={'input'}
          noValue
        />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="name" className={'label'}>名称</label>
        <InputContainer
          type="text"
          name="name"
          className={'input'}
          noValue
        />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="category" className={'label'}>类别</label>
        <InputContainer
          type="text"
          name="category"
          className={'input'}
          noValue
        />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <Modal name="RuleSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RuleSettingAdd"
        action={RuleSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="RuleSettingAdd"
        formName="RuleSettingForm"
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
            <label htmlFor="version">版本</label>
            <InputContainer type="text" name="version" />
          </Row>
          <Row>
            <label htmlFor="description">描述</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row>
            <label htmlFor="category">类别</label>
            <InputContainer type="text" name="category" />
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
        action={RuleSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => { }}
        dataTemplate={defaultPostDataTemplateSMT}
        modalName="RuleSettingUpdate"
        formName="RuleSettingForm"
        tableName="RuleSettingTable"
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
            <label htmlFor="version">版本</label>
            <InputContainer type="text" name="version" />
          </Row>
          <Row>
            <label htmlFor="description">描述</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row>
            <label htmlFor="category">类別</label>
            <InputContainer type="text" name="category" />
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
      newDeleteMethodUrl

    />

    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name="RuleSettingTable"
          formName="RuleSettingForm"
          location="RulePos"
          columns={columns}
          isRadio
          showRouting
          onRowClick
          dataSourceTemplate={defaultDataSourceTemplate}
        />
      </div>
    </div>
    <div id="RulePos" style={{ visibility: 'hidden' }}>aaa</div>
    <div style={{ marginBottom: '60px', overflow: 'hidden' }} >
      <RuleGraphGroupContainer tableName={tableNames} />
    </div>
  </div>
);
RuleSetting.defaultProps = {

};
RuleSetting.propTypes = {

};

export default RuleSetting;
