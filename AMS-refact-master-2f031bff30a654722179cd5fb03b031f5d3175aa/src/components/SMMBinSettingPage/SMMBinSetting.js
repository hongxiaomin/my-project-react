import React from 'react';
import { Checkbox, Row } from 'antd';
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
  SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const SmmBinSetAPI = `${SERVER_IP_SMM}/warehouse/binsetting/querybin`;
const SmmBinSetHideApi = `${SERVER_IP_SMM}/warehouse/binsetting/hide`;
const SmmBinSetAddApi = `${SERVER_IP_SMM}/warehouse/binsetting/new`;

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '储位代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '储位名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '储位说明',
  dataIndex: 'create_date',
  key: 'create_date',
}, {
  title: '仓库代码',
  dataIndex: 'storage_code',
  key: 'storage_code',
}, {
  title: '仓库名称',
  dataIndex: 'storage_name',
  key: 'storage_name',
}, {
  title: '储位容量',
  dataIndex: 'capacity',
  key: 'capacity',
}, {
  title: '单位',
  dataIndex: 'uom',
  key: 'uom',
}, {
  title: '最后修改时间',
  dataIndex: 'last_update_date',
  key: 'last_update_date',
}, {
  title: '最后修改人员',
  dataIndex: 'last_update_by',
  key: 'last_update_by',
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
  name: '仓库储位设定',
}];
const SMMBinSettingPage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="仓库储位设定" />
    <FormContainer
      name="SMMBinSettingForm"
      action={SmmBinSetAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>储位代码</label>
        <InputContainer type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>储位名称</label>
        <InputContainer type="text" name="name" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>仓库代码</label>
        <InputContainer type="text" name="storage_code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>仓库名称</label>
        <InputContainer type="text" name="storage_name" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>储位容量</label>
        <InputContainer type="text" name="capacity" className={'input'} />
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
    <Modal name="SMMBinSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="SMMBinSetAdd"
        action={SmmBinSetAddApi}
        method="POST"
        paramTemplate={defaultPostDataTemplate}
        filters={defaultRequestFilters}
        modalName="SMMBinSetAdd"
        formName="SMMBinSettingForm"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="datepicker">储位代码</label>
            <InputContainer type="text" name="Code" />
          </Row>
          <Row>
            <label htmlFor="datepicker">储位名称</label>
            <InputContainer type="text" name="Name" />
          </Row>
          <Row>
            <label htmlFor="datepicker">仓库代码</label>
            <InputContainer type="text" name="StorageCode" />
          </Row>
          <Row>
            <label htmlFor="datepicker">仓库名称</label>
            <InputContainer type="text" name="StorageName" />
          </Row>
          <Row>
            <label htmlFor="datepicker">储位容量</label>
            <InputContainer type="text" name="Capacity" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <ActionBtn btnName="复制" />
    <ActionBtn btnName="修改" />
    <ActionBtn
      btnName="刷新"
      mode="refresh"
      action={SmmBinSetHideApi}
      tableName="SMMBin"
      formName="SMMBinSettingForm"
      paramTemplate={defaultPutParamTemplate}
    />
    <ActionBtn
      btnName="隐藏"
      mode="hide"
      action={SmmBinSetHideApi}
      tableName="SMMBin"
      formName="SMMBinSettingForm"
      paramTemplate={defaultPutParamTemplate}
    />
    <ActionBtn
      btnName="取消隐藏"
      mode="show"
      action={SmmBinSetHideApi}
      tableName="SMMBin"
      formName="SMMBinSettingForm"
      paramTemplate={defaultPutParamTemplate}
    />
    <ActionBtn btnName="高级查询" />
    {/* <Checkbox>显示隐藏项</Checkbox> */}
    <TableContainer name="SMMBin" formName="SMMBinSettingForm" columns={columns} />
  </div>
  );
SMMBinSettingPage.defaultProps = {

};
SMMBinSettingPage.propTypes = {

};

export default SMMBinSettingPage;
