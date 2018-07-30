import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Select from '../../containers/SelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  EQMParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';

const EQMMaintGrpMngForm = 'EQMMaintGrpMngForm';
const EQMMaintGrpMngTable = 'EQMMaintGrpMngTable';
const EQMMaintGrpMngGridConfTable = 'EQMMaintGrpMngGridConfTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/fault/group`;
const EQMMaintGrpMngAddApi = `${SERVER_IP_EQM}/ams/eqm/fault/group`;
const EQMMaintGrpMngkListApi = `${SERVER_IP_EQM}/ams/eqm/fault/item/list`;
const EQMMaintGrpMngGetItemApi = `${SERVER_IP_EQM}/ams/eqm/fault/group/item`;
const EQMMaintGrpMngUpdata = `${SERVER_IP_EQM}/ams/eqm/fault/group`;
const EQMMaintGrpMngActiveApi = `${SERVER_IP_EQM}/ams/eqm/fault/group/active`;
const targetKeyModify = ['faultGroupCode', 'faultGroupName', 'faultGroupDesc', 'faultGroupDtlList', 'id'];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '故障及维修',
}, {
  path: '',
  name: '故障群组管理',
}];
const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '群组名称',
    dataIndex: 'faultGroupName',
    key: 'faultGroupName',
  }, {
    title: '群组代码',
    dataIndex: 'faultGroupCode',
    index: 'faultGroupCode',
  }];
const columnsEQMGridConf = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '故障项代码',
    dataIndex: 'faultItemCode',
    key: 'faultItemCode',
  }, {
    title: '故障项名称',
    dataIndex: 'faultItemName',
    key: 'faultItemName',
  }, {
    title: '故障项描述',
    dataIndex: 'faultItemDesc',
    index: 'faultItemDesc',
  }];
const dataSourceTemplate = (param) => {
  const datArry = [];
  const rows = param.rows ? param.rows : param;
  rows.map((v) => {
    datArry.push({ name: v.name, id: v.id });
    return null;
  });
  const codeList = datArry.map(v => ({ key: v.id, keyName: v.name }));
  return codeList;
};
const EQMModifyParamTemplate = (params) => {
  const { ...param } = params;
  const array = [];
  const faultGroupDtlList = param.faultGroupDtlList ? param.faultGroupDtlList : [];
  faultGroupDtlList.map((v) => {
    array.push({ faultItemId: v });
    return null;
  });
  param.faultGroupDtlList = array;
  const { ...data } = param;
  const dataAdd = { ...data, createBy: 'admin' };
  const dataStr1 = JSON.stringify(dataAdd);
  return {
    value: dataStr1 ? [dataStr1] : [],
  };
};
const EQMModifyParamPutTemplate = (params) => {
  const { ...param } = params;
  const array = [];
  const faultGroupDtlList = param.faultGroupDtlList ? param.faultGroupDtlList : [];
  faultGroupDtlList.map((v) => {
    array.push({ faultItemId: v });
    return null;
  });
  param.faultGroupDtlList = array;
  const { ...data } = param;
  const dataAdd = { ...data, lastUpdateBy: 'admin' };
  const dataStr1 = JSON.stringify(dataAdd);
  return {
    value: dataStr1 ? [dataStr1] : [],
  };
};
const EQMMaintGrpMng = props => (
  <div className="relationSet">
    <Bread breadMap={breadMap} />
    <Title name="故障群组管理" />
    <FormContainer
      name={EQMMaintGrpMngForm}
      action={EQMSettingApi}
      method="GET"
      tableName={EQMMaintGrpMngTable}
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupName" className={'label'}>群组名称</label>
        <Input type="text" name="faultGroupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupCode" className={'label'}>群组代码</label>
        <Input type="text" name="faultGroupCode" className={'input'} />
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
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="EQMMaintGrpMngAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMMaintGrpMngAdd"
          action={EQMMaintGrpMngAddApi}
          method="POST"
          dataTemplate={EQMModifyParamTemplate}
          formName={EQMMaintGrpMngForm}
          filters={defaultRequestFilters}
          modalName="EQMMaintGrpMngAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="faultGroupCode">设备故障群组代码</label>
              <Input type="text" name="faultGroupCode" />
            </Row>
            <Row>
              <label htmlFor="faultGroupName">设备故障群组名称</label>
              <Input type="text" name="faultGroupName" />
            </Row>
            <Row>
              <label htmlFor="faultGroupDesc">设备故障群组描述</label>
              <Input type="text" name="faultGroupDesc" />
            </Row>
            <Row className={'selectLabel'} style={{ height: '130px' }}>
              <label htmlFor="faultGroupDtlList">设备故障项列表</label>
              <span className={'select'}>
                <div>
                  <Select
                    mode="multiple"
                    name="faultGroupDtlList"
                    action={EQMMaintGrpMngkListApi}
                    itemKey="key"
                    className={'select'}
                    itemValue="keyName"
                    load="true"
                    noDefault
                    dataSourceTemplate={dataSourceTemplate}
                  />
                </div>
              </span>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMMaintGrpMngUpdata"
        formName={EQMMaintGrpMngForm}
        tableName={EQMMaintGrpMngTable}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyModify}
      >
        <ModalForm
          name="EQMMaintGrpMngUpdata"
          modalName="EQMMaintGrpMngUpdata"
          action={EQMMaintGrpMngUpdata}
          method="PUT"
          paramTemplate={() => {}}
          dataTemplate={EQMModifyParamPutTemplate}
          filters={defaultRequestFilters}
          formName={EQMMaintGrpMngForm}
          tableName={EQMMaintGrpMngTable}
          multiple
          ItemId="faultItemId"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="faultGroupCode">设备故障群组代码</label>
              <Input type="text" name="faultGroupCode" />
            </Row>
            <Row>
              <label htmlFor="faultGroupName">设备故障群组名称</label>
              <Input type="text" name="faultGroupName" />
            </Row>
            <Row>
              <label htmlFor="faultGroupDesc">设备故障群组描述</label>
              <Input type="text" name="faultGroupDesc" />
            </Row>
            <Row style={{ height: '130px' }}>
              <label htmlFor="faultGroupDtlList">设备故障项列表</label>
              <span className={'select'}>
                <div>
                  <Select
                    mode="multiple"
                    name="faultGroupDtlList"
                    action={EQMMaintGrpMngkListApi}
                    className={'select'}
                    itemKey="key"
                    itemValue="keyName"
                    noDefault
                    dataSourceTemplate={dataSourceTemplate}
                    load="true"
                  />
                </div>
              </span>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="隐藏"
        mode="update"
        action={EQMMaintGrpMngActiveApi}
        tableName={EQMMaintGrpMngTable}
        formName={EQMMaintGrpMngForm}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMMaintGrpMngActiveApi}
        tableName={EQMMaintGrpMngTable}
        formName={EQMMaintGrpMngForm}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name={EQMMaintGrpMngTable}
      action={EQMMaintGrpMngGetItemApi}
      formName={EQMMaintGrpMngForm}
      columns={columns}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      filters={defaultRequestFilters}
      isGetDate
    />
    <QueryTableContainer
      name={EQMMaintGrpMngGridConfTable}
      tableName={EQMMaintGrpMngTable}
      columns={columnsEQMGridConf}
      isRowSelection
      uid="faultItemId"
    />
  </div>
);
EQMMaintGrpMng.defaultProps = {

};
EQMMaintGrpMng.propTypes = {

};

export default EQMMaintGrpMng;
