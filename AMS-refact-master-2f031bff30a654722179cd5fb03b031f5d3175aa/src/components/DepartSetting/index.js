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

const DepartSettingApi = `${SERVER_IP_SMT}/ams/product/group/series`;
// const DepartSettingOpearate = `${SERVER_IP}/ams/product/group/series`;
const ProductItem = `${SERVER_IP_SMT}/ams/product/group`;
const targetKeyModify = ['id', 'code', 'name', 'description', 'groupId'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '系列别代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '系列别名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '产品别名称',
  dataIndex: 'groupName',
  key: 'groupName',
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
  name: '系列别设定',
}];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];

const DepartSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="系列别设定" />
    <FormContainer
      name="DepartSettingForm"
      action={DepartSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>系列别代码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>系列别名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="DepartSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="DepartSettingAdd"
        action={DepartSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="DepartSettingAdd"
        formName="DepartSettingForm"
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="groupId">产品别名称</label>
            <span className={'select'}>
              <Select
                name="groupId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={ProductItem}
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
            <label htmlFor="code">系列别代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">系列别名称</label>
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
      name="DepartSettingUpdate"
      btnName="修改"
      title="修改"
      formName="DepartSettingForm"
      tableName="DepartSetting"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="DepartSettingUpdate"
        action={DepartSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="DepartSettingUpdate"
        formName="DepartSettingForm"
        tableName="DepartSetting"
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="groupId">产品别名称</label>
            <span className={'select'}>
              <Select
                name="groupId"
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
            <label htmlFor="code">系列别代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">系列别名称</label>
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
    <ActionBtn
      btnName="刷新"
      mode="refresh"
      action={DepartSettingApi}
      formName="DepartSettingForm"
      tableName="DepartSetting"
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={DepartSettingApi}
      formName="DepartSettingForm"
      tableName="DepartSetting"
      paramTemplate={() => ('')}
    />
    <TableContainer name="DepartSetting" formName="DepartSettingForm" columns={columns} isRadio />
  </div>
);
DepartSetting.defaultProps = {

};
DepartSetting.propTypes = {

};

export default DepartSetting;
