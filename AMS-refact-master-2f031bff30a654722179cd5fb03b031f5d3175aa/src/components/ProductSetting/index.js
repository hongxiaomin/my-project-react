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

const ProductSettingApi = `${SERVER_IP_SMT}/ams/product`;
const targetKeyModify = ['id', 'code', 'name', 'version', 'description', 'versionNow'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '产品代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '产品名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '产品版本',
  dataIndex: 'version',
  key: 'version',
}, {
  title: '工程参数',
  dataIndex: 'version1',
  key: 'version1',
  render: () => '--',
}, {
  title: '是否为当前版本',
  dataIndex: 'versionNow',
  key: 'versionNow',
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
  name: '产品设定',
}];

const data = [{
  id: 'Yes',
  versionNow: 'Yes',
}, {
  id: 'No',
  versionNow: 'No',
}];
const data4 = [{
  id: -1,
  name: '请选择',
}];

const tableNames = 'ProductSetting';
const tableFormName = 'ProductSettingForm';

const ProductSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="产品设定" />
    <FormContainer
      name={tableFormName}
      action={ProductSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>产品代码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>产品名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="ProductSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="ProductSettingAdd"
        action={ProductSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="ProductSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">产品代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">产品名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="version">产品版本</label>
            <InputContainer type="text" name="version" />
          </Row>
          <Row>
            <label htmlFor="groupSeriesId1">工程参数</label>
            <span className={'select'}>
              <Select
                name="groupSeriesId1"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                data={data4}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="versionNow">是否为当前版本</label>
            <span className={'select'}>
              <Select
                name="versionNow"
                className={'select'}
                itemKey="id"
                itemValue="versionNow"
                data={data}
                load="true"
                defaultKey="Yes"
                defaultValue="Yes"
              />
            </span>
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
      name="ProductSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="ProductSettingUpdate"
        action={ProductSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="ProductSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">产品代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">产品名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="version">产品版本</label>
            <InputContainer type="text" name="version" />
          </Row>
          <Row>
            <label htmlFor="versionNow">是否为当前版本</label>
            <span className={'select'}>
              <Select
                name="versionNow"
                className={'select'}
                itemKey="id"
                itemValue="versionNow"
                data={data}
                load="true"
                noClr
              />
            </span>
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
      action={ProductSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={ProductSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />

  </div>
);
ProductSetting.defaultProps = {

};
ProductSetting.propTypes = {

};

export default ProductSetting;
