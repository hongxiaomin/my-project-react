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

const RoutingSettingDetailApi = `${SERVER_IP_SMT}/ams/routing/detail`;
const RoutingItem = `${SERVER_IP_SMT}/ams/routing`;
const RoutingConditionItem = `${SERVER_IP_SMT}/ams/routing/condition`;
const targetKeyModify = ['id', 'stationId', 'condition', 'sourceStationId', 'destStationId', 'routingId', 'sourceRoutingId', 'destRoutingId'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num',
  render: (text, record, index) => (index + 1),
}, {
  title: '途程名',
  dataIndex: 'routingName',
  key: 'routingName',
}, {
  title: '站别',
  dataIndex: 'stationId',
  key: 'stationId',
}, {
  title: '条件',
  dataIndex: 'condition',
  key: 'condition',
}, {
  title: '上一站别',
  dataIndex: 'sourceStationId',
  index: 'sourceStationId',
  render: (text, record, index) => {
    if (record.sourceStationId) {
      return record.sourceStationId;
    }
    return '--';
  },
}, {
  title: '下一站别',
  dataIndex: 'destStationId',
  index: 'destStationId',
  render: (text, record, index) => {
    if (record.destStationId) {
      return record.destStationId;
    }
    return '--';
  },
}, {
  title: '上一途程',
  dataIndex: 'sourceRoutingName',
  index: 'sourceRoutingName',
  render: (text, record, index) => {
    if (record.sourceRoutingName) {
      return record.sourceRoutingName;
    }
    return '--';
  },
}, {
  title: '下一途程',
  dataIndex: 'destRoutingName',
  index: 'destRoutingName',
  render: (text, record, index) => {
    if (record.destRoutingName) {
      return record.destRoutingName;
    }
    return '--';
  },
}, {
  title: '最后更新时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
  render: (index, record) => updateTime(record.lastUpdateDate),
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '途程详情设定',
}];

const data = [{
  id: 'Yes',
  versionNow: 'Yes',
}, {
  id: 'No',
  versionNow: 'No',
}];

const tableNames = 'RoutingDetailSetting';
const tableFormName = 'RoutingDetailSettingForm';

// const emitRequest = {
//   name: { tableFormName },
//   action: { RoutingSettingDetailApi },
//   method: 'GET',
//   paramTemplate: defaultGetParamTemplate,
//   tableName: { tableNames },
//   filters: defaultRequestFilters,
// };

const RoutingDetailSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="途程详情设定" />
    <FormContainer
      name={tableFormName}
      action={RoutingSettingDetailApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="routingId" className={'label'}>途程名</label>
        <span className={'select'}>
          <Select
            name="routingId"
            className={'select'}
            itemKey="id"
            itemValue="name"
            action={RoutingItem}
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
            // emitRequest={emitRequest}
          />
        </span>
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="RoutingSettingDetailAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RoutingSettingDetailAdd"
        action={RoutingSettingDetailApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="RoutingSettingDetailAdd"
        formName={tableFormName}
        // tableName="queryTable2"
        // prevTableName={tableNames}
        dataSourceTemplate={defaultDataSourceTemplate}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="routingId">途程</label>
            <span className={'select'}>
              <Select
                name="routingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RoutingItem}
                load="true"
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="stationId">站别</label>
            <InputContainer type="text" name="stationId" />
          </Row>
          <Row>
            <label htmlFor="condition">条件</label>
            {/* <InputContainer type="text" name="condition" /> */}
            <span className={'select'}>
              <Select
                name="condition"
                className={'select'}
                itemKey="name"
                itemValue="name"
                action={RoutingConditionItem}
                load="true"
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="sourceStationId">上一站别</label>
            <InputContainer type="text" name="sourceStationId" />
          </Row>
          <Row>
            <label htmlFor="destStationId">下一站别</label>
            <InputContainer type="text" name="destStationId" />
          </Row>
          <Row>
            <label htmlFor="sourceRoutingId">上一途程</label>
            <span className={'select'}>
              <Select
                name="sourceRoutingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RoutingItem}
                load="true"
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="destRoutingId">下一途程</label>
            <span className={'select'}>
              <Select
                name="destRoutingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RoutingItem}
                load="true"
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="RoutingSettingDetailUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="RoutingSettingDetailUpdate"
        action={RoutingSettingDetailApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="RoutingSettingDetailUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="routingId">途程</label>
            <span className={'select'}>
              <Select
                name="routingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RoutingItem}
                load="true"
                noClr
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="stationId">站别</label>
            <InputContainer type="text" name="stationId" />
          </Row>
          <Row>
            <label htmlFor="condition">条件</label>
            {/* <InputContainer type="text" name="condition" /> */}
            <span className={'select'}>
              <Select
                name="condition"
                className={'select'}
                itemKey="name"
                itemValue="name"
                action={RoutingConditionItem}
                load="true"
                noClr
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="sourceStationId">上一站别</label>
            <InputContainer type="text" name="sourceStationId" />
          </Row>
          <Row>
            <label htmlFor="destStationId">下一站别</label>
            <InputContainer type="text" name="destStationId" />
          </Row>
          <Row>
            <label htmlFor="sourceRoutingId">上一途程</label>
            <span className={'select'}>
              <Select
                name="sourceRoutingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RoutingItem}
                load="true"
                noClr
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="destRoutingId">下一途程</label>
            <span className={'select'}>
              <Select
                name="destRoutingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RoutingItem}
                load="true"
                noClr
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
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
      action={RoutingSettingDetailApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={RoutingSettingDetailApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />
  </div>
);
RoutingDetailSetting.defaultProps = {

};
RoutingDetailSetting.propTypes = {

};

export default RoutingDetailSetting;
