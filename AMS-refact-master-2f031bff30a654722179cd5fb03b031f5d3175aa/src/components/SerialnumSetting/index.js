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

const SerialnumSettingApi = `${SERVER_IP_SMT}/ams/product/serialnum`;
const SerialnumOrderItem = `${SERVER_IP_SMT}/ams/workorder`;
const targetKeyModify = ['id', 'serialNo', 'status', 'workorderId'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '工单名',
  dataIndex: 'workorderName',
  key: 'workorderName',
}, {
  title: '流水号',
  dataIndex: 'serialNo',
  key: 'serialNo',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '创建人',
  dataIndex: 'createBy',
  key: 'createBy',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '工单管理',
}, {
  path: '',
  name: '在制品序号设定',
}];

const tableNames = 'SerialnumSetting';
const tableFormName = 'SerialnumSettingForm';

const SerialnumSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="在制品序号设定" />
    <FormContainer
      name={tableFormName}
      action={SerialnumSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="serialNo" className={'label'}>流水号</label>
        <InputContainer type="text" name="serialNo" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="status" className={'label'}>状态</label>
        <InputContainer type="text" name="status" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="SerialnumSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="SerialnumSettingAdd"
        action={SerialnumSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="SerialnumSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>、
          <Row>
            <label htmlFor="workorderId">工单名</label>
            <span className={'select'}>
              <Select
                name="workorderId"
                className={'select'}
                itemKey="id"
                itemValue="workorder"
                action={SerialnumOrderItem}
                load="true"
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="serialNo">流水号</label>
            <InputContainer type="text" name="serialNo" />
          </Row>
          {/* <Row>
            <label htmlFor="status">状态</label>
            <InputContainer type="text" name="status" />
          </Row> */}
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="SerialnumSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="SerialnumSettingUpdate"
        action={SerialnumSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="SerialnumSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="workorderId">工单名</label>
            <span className={'select'}>
              <Select
                name="workorderId"
                className={'select'}
                itemKey="id"
                itemValue="workorder"
                action={SerialnumOrderItem}
                load="true"
                noClr
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="serialNo">流水号</label>
            <InputContainer type="text" name="serialNo" />
          </Row>
          <Row>
            <label htmlFor="status">状态</label>
            <InputContainer type="text" name="status" />
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
      action={SerialnumSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={SerialnumSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />

  </div>
);
SerialnumSetting.defaultProps = {

};
SerialnumSetting.propTypes = {

};

export default SerialnumSetting;
