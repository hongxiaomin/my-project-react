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
import QueryTableContainer from '../../containers/QueryTableContainer';
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

const RoutingSettingApi = `${SERVER_IP_SMT}/ams/routing`;
const RoutingSettingDetailApi = `${SERVER_IP_SMT}/ams/routing/detail`;
const targetKeyModify = ['id', 'code', 'name', 'version', 'type', 'description'];

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
  title: '类型',
  dataIndex: 'type',
  key: 'type',
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

// const columnsTable = [{
//   title: '序号',
//   dataIndex: 'serialNum2',
//   key: 'serialNum2',
//   render: (text, record, index) => (index + 1),
// }, {
//   title: '站别',
//   dataIndex: 'stationId',
//   key: 'stationId',
// }, {
//   title: '条件',
//   dataIndex: 'condition',
//   key: 'condition',
// }, {
//   title: '上一站别',
//   dataIndex: 'sourceStationId',
//   index: 'sourceStationId',
// }, {
//   title: '下一站别',
//   dataIndex: 'destStationId',
//   index: 'destStationId',
// }, {
//   title: '最后更新时间',
//   dataIndex: 'lastUpdateDate',
//   index: 'lastUpdateDate',
// }];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '途程设定',
}];

const data = [{
  id: 'Yes',
  versionNow: 'Yes',
}, {
  id: 'No',
  versionNow: 'No',
}];

const tableNames = 'RoutingSetting';
const tableFormName = 'RoutingSettingForm';

const RoutingSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="途程设定" />
    <FormContainer
      name={tableFormName}
      action={RoutingSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="code" className={'label'}>代码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="name" className={'label'}>名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="RoutingSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RoutingSettingAdd"
        action={RoutingSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="RoutingSettingAdd"
        formName={tableFormName}
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
            <label htmlFor="type">类型</label>
            <InputContainer type="text" name="type" />
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
      name="RoutingSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="RoutingSettingUpdate"
        action={RoutingSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="RoutingSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
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
            <label htmlFor="type">类型</label>
            <InputContainer type="text" name="type" />
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
    <ActionBtn
      btnName="刷新"
      mode="refresh"
      action={RoutingSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={RoutingSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer
      name={tableNames}
      formName={tableFormName}
      columns={columns}
      isRadio
      // action={RoutingSettingDetailApi}
      // nextTableName="queryTable2"
      // onRowClick
      // needData="id"
      // isGetDate="ok"
      dataSourceTemplate={defaultDataSourceTemplate}
      // filters={defaultRequestFilters}
      // paramTemplate={defaultGetParamTemplate2}
    />
    {/* <Title name="途程详情" />
    <Modal name="RoutingSettingDetailAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RoutingSettingDetailAdd"
        action={RoutingSettingDetailApi}
        method="POST"
        dataTemplate={defaultPostDataTemplate}
        filters={defaultRequestFilters}
        modalName="RoutingSettingDetailAdd"
        tableName="queryTable2"
        prevTableName={tableNames}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="routingId">站别</label>
            <InputContainer type="text" name="routingId" />
          </Row>
          <Row>
            <label htmlFor="stationId">站别</label>
            <InputContainer type="text" name="stationId" />
          </Row>
          <Row>
            <label htmlFor="condition">条件</label>
            <InputContainer type="text" name="condition" />
          </Row>
          <Row>
            <label htmlFor="sourceStationId">上一站别</label>
            <InputContainer type="text" name="sourceStationId" />
          </Row>
          <Row>
            <label htmlFor="destStationId">下一站别</label>
            <InputContainer type="text" name="destStationId" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <QueryTableContainer
      name="queryTable2"
      tableName="queryTable2"
      columns={columnsTable}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    /> */}
  </div>
);
RoutingSetting.defaultProps = {

};
RoutingSetting.propTypes = {

};

export default RoutingSetting;
