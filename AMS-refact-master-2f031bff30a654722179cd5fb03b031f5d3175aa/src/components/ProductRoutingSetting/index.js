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

const ProductRoutingSettingApi = `${SERVER_IP_SMT}/ams/routing/map`;
const RoutingItem = `${SERVER_IP_SMT}/ams/routing`;
const ProductItem = `${SERVER_IP_SMT}/ams/product`;
const targetKeyModify = ['id', 'type', 'routingId', 'materialId'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num',
  render: (text, record, index) => (index + 1),
}, {
  title: '机种',
  dataIndex: 'productName',
  key: 'productName',
}, {
  title: '途程',
  dataIndex: 'routingName',
  key: 'routingName',
}, {
  title: '类型',
  dataIndex: 'type',
  index: 'type',
}, {
  title: '最后更新者',
  dataIndex: 'lastUpdateBy',
  index: 'lastUpdateBy',
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
  name: '产品-途程关联设定',
}];

const data = [{
  id: 'Yes',
  versionNow: 'Yes',
}, {
  id: 'No',
  versionNow: 'No',
}];

const tableNames = 'ProductRoutingSetting';
const tableFormName = 'ProductRoutingSettingForm';

const ProductRoutingSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="产品-途程关联设定" />
    <FormContainer
      name={tableFormName}
      action={ProductRoutingSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      load
    >
      <div className={'searchCondition'}>
        <label htmlFor="type" className={'label'}>类型</label>
        <InputContainer type="text" name="type" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="ProductRoutingSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="ProductRoutingSettingAdd"
        action={ProductRoutingSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="ProductRoutingSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="materialId">机种</label>
            <span className={'select'}>
              <Select
                name="materialId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={ProductItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="routingId">途程</label>
            <span className={'select'}>
              <Select
                name="routingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={RoutingItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="type">类型</label>
            <InputContainer type="text" name="type" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="ProductRoutingSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="ProductRoutingSettingUpdate"
        action={ProductRoutingSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="ProductRoutingSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="materialId">机种</label>
            <span className={'select'}>
              <Select
                name="materialId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                noClr
                action={ProductItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="routingId">途程</label>
            <span className={'select'}>
              <Select
                name="routingId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                noClr
                action={RoutingItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="type">类型</label>
            <InputContainer type="text" name="type" />
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
      action={ProductRoutingSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={ProductRoutingSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />
  </div>
);
ProductRoutingSetting.defaultProps = {

};
ProductRoutingSetting.propTypes = {

};

export default ProductRoutingSetting;
