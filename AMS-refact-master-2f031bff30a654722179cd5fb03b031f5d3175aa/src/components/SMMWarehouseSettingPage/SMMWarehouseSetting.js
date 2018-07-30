import React from 'react';
import { Card, Input, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import ModalForm from '../../containers/ModalFormContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  SMMHideDataParamTemplate,
  SMMShowDataParamTemplate,
  modifyPostDataTemplate,
  SMMModifyParamTemplate,
  SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const SMMWareSetApi = `${SERVER_IP_SMM}/warehouse/storagesetting/querystorage`;
const SMMWareSetHideApi = `${SERVER_IP_SMM}/warehouse/storagesetting/hide`;
const SMMWareSetAddApi = `${SERVER_IP_SMM}/warehouse/storagesetting/new`;
const SMMWareSetUpdateApi = `${SERVER_IP_SMM}/warehouse/storagesetting/edit`;
const targetKeyCopy = ['code', 'name', 'description', 'type', 'is_bonded', 'allow_negative_ivn'];
const targetKeyModify = ['code', 'name', 'description', 'type', 'is_bonded', 'allow_negative_ivn', 'id'];
const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '仓库代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '仓库名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '仓库类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '仓库说明',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '是否为报税仓',
  dataIndex: 'is_bonded',
  key: 'is_bonded',
}, {
  title: '仓库管理储位',
  dataIndex: 'need_control_bin',
  key: 'need_control_bin',
}, {
  title: '最后修改时间',
  dataIndex: 'last_update_date',
  key: 'last_update_date',
}, {
  title: '最后修改人员',
  dataIndex: 'last_update_by',
  key: 'last_update_by',
}];
const selData = [{
  id: 'Y',
  status: '是',
}, {
  id: 'N',
  status: '否',
}];
const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '仓库管理',
}, {
  path: '',
  name: '仓库设定',
}];

const SMMWarehouseSettingPage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="仓库设定" />
    <FormContainer
      name="SMMWarehouseSettingForm"
      tableName="SMMWarehouse"
      action={SMMWareSetApi}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>仓库代码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>仓库名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>是否为保税仓</label>
        <span className={'select'}>
          <Select
            type="text"
            name="is_bonded"
            itemKey="id"
            itemValue="status"
            load="true"
            data={selData}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="need_control_bin" className={'label'}>仓库管理储位</label>
        <span className={'select'}>
          <Select
            type="text"
            name="need_control_bin"
            itemKey="id"
            itemValue="status"
            load="true"
            data={selData}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <Select
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={showData}
            load="true"
            defaultKey="Y"
            defaultValue="显示项"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="SMMWarehouseSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="SMMWarehouseSettingAdd"
        action={SMMWareSetAddApi}
        method="POST"
        dataTemplate={defaultPostDataTemplate}
        filters={defaultRequestFilters}
        modalName="SMMWarehouseSettingAdd"
        formName="SMMWarehouseSettingForm"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="datepicker">仓库代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="input">仓库名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="description">仓库说明</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row>
            <label htmlFor="type">仓库类型</label>
            <InputContainer type="text" name="type" />
          </Row>
          <Row>
            <label htmlFor="is_bonded">是否为保税仓</label>
            <span className={'select'}>
              <Select
                name="is_bonded"
                className={'select'}
                itemKey="id"
                itemValue="status"
                data={selData}
                load="true"
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="allow_negative_ivn">是否需要储位管理</label>
            <span className={'select'}>
              <Select
                name="allow_negative_ivn"
                className={'select'}
                itemKey="id"
                itemValue="status"
                data={selData}
                load="true"
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
      name="SMMWarehouseSettingCopy"
      btnName="复制"
      title="复制"
      formName="SMMWarehouseSettingForm"
      tableName="SMMWarehouse"
      load="true"
      tarKey={targetKeyCopy}
    >
      <ModalForm
        name="SMMWarehouseSettingCopy"
        action={SMMWareSetAddApi}
        method="POST"
        filters={defaultRequestFilters}
        // dataTemplate={copyPostDataTemplate}
        dataTemplate={defaultPostDataTemplate}
        modalName="SMMWarehouseSettingCopy"
        formName="SMMWarehouseSettingForm"
        tableName="SMMWarehouse"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">仓库代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">仓库名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="description">仓库说明</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row>
            <label htmlFor="type">仓库类型</label>
            <InputContainer type="text" name="type" />
          </Row>
          <Row className={'selectLabel'}>
            <label htmlFor="is_bonded">是否为保税仓</label>
            <Select
              name="is_bonded"
              itemKey="id"
              itemValue="status"
              data={selData}
              load="true"
            />
          </Row>
          <Row className={'selectLabel'}>
            <label htmlFor="allow_negative_ivn">是否需要储位管理</label>
            <Select
              name="allow_negative_ivn"
              itemKey="id"
              itemValue="status"
              data={selData}
              load="true"
            />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="SMMWarehouseSettingUpdate"
      btnName="修改"
      title="修改"
      formName="SMMWarehouseSettingForm"
      tableName="SMMWarehouse"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="SMMWarehouseSettingUpdate"
        action={SMMWareSetUpdateApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={SMMModifyParamTemplate}
        dataTemplate={modifyPostDataTemplate}
        modalName="SMMWarehouseSettingUpdate"
        formName="SMMWarehouseSettingForm"
        tableName="SMMWarehouse"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="code">仓库代码</label>
            <InputContainer type="text" name="code" />
          </Row>
          <Row>
            <label htmlFor="name">仓库名称</label>
            <InputContainer type="text" name="name" />
          </Row>
          <Row>
            <label htmlFor="description">仓库说明</label>
            <InputContainer type="text" name="description" />
          </Row>
          <Row>
            <label htmlFor="type">仓库类型</label>
            <InputContainer type="text" name="type" />
          </Row>
          <Row className={'selectLabel'}>
            <label htmlFor="is_bonded">是否为保税仓</label>
            <Select
              name="is_bonded"
              itemKey="id"
              itemValue="status"
              data={selData}
              load="true"
            />
          </Row>
          <Row className={'selectLabel'}>
            <label htmlFor="allow_negative_ivn">是否需要储位管理</label>
            <Select
              name="allow_negative_ivn"
              itemKey="id"
              itemValue="status"
              data={selData}
              load="true"
            />
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
      action={SMMWareSetHideApi}
      tableName="SMMWarehouse"
      formName="SMMWarehouseSettingForm"
      paramTemplate={defaultPutParamTemplate}
    />
    <ActionBtn
      btnName="隐藏"
      mode="update"
      action={SMMWareSetHideApi}
      tableName="SMMWarehouse"
      formName="SMMWarehouseSettingForm"
      paramTemplate={() => ('')}
      dataTemplate={SMMHideDataParamTemplate}
    />
    <ActionBtn
      btnName="取消隐藏"
      mode="update"
      action={SMMWareSetHideApi}
      tableName="SMMWarehouse"
      formName="SMMWarehouseSettingForm"
      paramTemplate={() => ('')}
      dataTemplate={SMMShowDataParamTemplate}
    />
    <TableContainer name="SMMWarehouse" formName="SMMWarehouseSettingForm" columns={columns} />
  </div>
);
SMMWarehouseSettingPage.defaultProps = {

};
SMMWarehouseSettingPage.propTypes = {

};

export default SMMWarehouseSettingPage;
