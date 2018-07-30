import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';
import Select from '../../containers/SelectContainer';
import ModalForm from '../../containers/ModalFormContainer';
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

const productOtherSearch = `${SERVER_IP_SMT}/ams/product/group`;
const productOtherSettingOpearate = `${SERVER_IP_SMT}/ams/product/group`;
const targetKeyModify = ['id', 'code', 'name', 'description'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '产品别代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '产品别名称',
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
  name: '产品别设定',
}];

const ProductOtherSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="产品别设定" />
    <FormContainer
      name="ProductOtherSettingForm"
      action={productOtherSearch}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>产品别代码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>产品别名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="ProductOtherSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="ProductOtherSettingAdd"
        action={productOtherSettingOpearate}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="ProductOtherSettingAdd"
        formName="ProductOtherSettingForm"
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">产品别代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">产品别名称</label>
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
      name="ProductOtherSettingUpdate"
      btnName="修改"
      title="修改"
      formName="ProductOtherSettingForm"
      tableName="ProductOtherSetting"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="ProductOtherSettingUpdate"
        action={productOtherSettingOpearate}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="ProductOtherSettingUpdate"
        formName="ProductOtherSettingForm"
        tableName="ProductOtherSetting"
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">产品别代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">产品别名称</label>
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
      action={productOtherSearch}
      formName="ProductOtherSettingForm"
      tableName="ProductOtherSetting"
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={productOtherSettingOpearate}
      formName="ProductOtherSettingForm"
      tableName="ProductOtherSetting"
      paramTemplate={() => ('')}
    />
    <TableContainer name="ProductOtherSetting" formName="ProductOtherSettingForm" columns={columns} isRadio />
  </div>
);
ProductOtherSetting.defaultProps = {

};
ProductOtherSetting.propTypes = {

};

export default ProductOtherSetting;
