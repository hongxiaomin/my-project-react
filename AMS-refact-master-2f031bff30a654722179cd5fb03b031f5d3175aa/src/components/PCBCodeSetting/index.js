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
import { defaultOption } from '../../constants/Config';

const PCBCodeSettingApi = `${SERVER_IP_SMT}/ams/pcb/code`;
const PCBProductItem = `${SERVER_IP_SMT}/ams/product/group`;
const targetKeyModify = ['id', 'shortCode', 'type', 'productGroupId', 'description'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: 'PCB简码',
  dataIndex: 'shortCode',
  key: 'shortCode',
}, {
  title: 'PCB简码类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '产品别名称',
  dataIndex: 'productGroupName',
  key: 'productGroupName',
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
  name: 'PCB简码设定',
}];

const tableNames = 'PCBCodeSetting';
const tableFormName = 'PCBCodeSettingForm';

const PCBCodeSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="PCB简码设定" />
    <FormContainer
      name={tableFormName}
      action={PCBCodeSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="shortCode" className={'label'}>PCB简码</label>
        <InputContainer type="text" name="shortCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="type" className={'label'}>PCB简码类型</label>
        <InputContainer type="text" name="type" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="PCBCodeSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="PCBCodeSettingAdd"
        action={PCBCodeSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="PCBCodeSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="productGroupId">产品别名称</label>
            <span className={'select'}>
              <Select
                name="productGroupId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={PCBProductItem}
                load="true"
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
            <label htmlFor="shortCode">PCB简码</label>
            <InputContainer type="text" name="shortCode" />
          </Row>
          <Row>
            <label htmlFor="type">PCB简码类型</label>
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
      name="PCBCodeSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="PCBCodeSettingUpdate"
        action={PCBCodeSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="PCBCodeSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="productGroupId">产品别名称</label>
            <span className={'select'}>
              <Select
                name="productGroupId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={PCBProductItem}
                load="true"
                noClr
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
            <label htmlFor="shortCode">PCB简码</label>
            <InputContainer type="text" name="shortCode" />
          </Row>
          <Row>
            <label htmlFor="type">PCB简码类型</label>
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
      action={PCBCodeSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={PCBCodeSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />

  </div>
);
PCBCodeSetting.defaultProps = {

};
PCBCodeSetting.propTypes = {

};

export default PCBCodeSetting;
