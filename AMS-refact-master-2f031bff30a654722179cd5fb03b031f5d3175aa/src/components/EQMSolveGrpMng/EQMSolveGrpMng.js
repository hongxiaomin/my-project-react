import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
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

const EQMSolveGrpMngForm = 'EQMSolveGrpMngForm';
const EQMSolveGrpMngTable = 'EQMSolveGrpMngTable';
const EQMSolveGrpMngGridConfTable = 'EQMSolveGrpMngGridConfTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/fault/solution/group`;
const EQMSolveGrpMngAddApi = `${SERVER_IP_EQM}/ams/eqm/fault/solution/group`;
const EQMSolveGrpMngkListApi = `${SERVER_IP_EQM}/ams/eqm/fault/solution/item`;
const EQMSolveGrpMngGetItemApi = `${SERVER_IP_EQM}/ams/eqm/fault/solution/group/item`;
const EQMSolveGrpMngUpdata = `${SERVER_IP_EQM}/ams/eqm/fault/solution/group`;
const EQMSolveGrpMngActiveApi = `${SERVER_IP_EQM}/ams/eqm/fault/solution/group/active`;
const targetKeyModify = ['fsGroupName', 'fsGroupDesc', 'fsList', 'id'];

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
  name: '解决方案群组管理',
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
    dataIndex: 'fsGroupName',
    key: 'fsGroupName',
  }, {
    title: '群组代码',
    dataIndex: 'fsGroupCode',
    index: 'fsGroupCode',
  }];
const columnsEQMGridConf = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '解决方案项代码',
    dataIndex: 'fsItemCode',
    index: 'fsItemCode',
  }, {
    title: '解决方案群组名称',
    dataIndex: 'fsItemName',
    index: 'fsItemName',
  }, {
    title: '解决项方案项描述',
    dataIndex: 'fsItemDesc',
    index: 'fsItemDesc',
  }];
const dataSourceTemplate = (param) => {
  const datArry = [];
  const rows = param.rows ? param.rows : param;
  rows.map((v) => {
    datArry.push({ name: v.fsItemName, id: v.id });
    return null;
  });
  const codeList = datArry.map(v => ({ key: v.id, keyName: v.name }));
  return codeList;
};
const EQMModifyParamTemplate = (params) => {
  const { ...param } = params;
  const array = [];
  const fsList = param.fsList ? param.fsList : [];
  fsList.map((v) => {
    array.push({ fsItemId: v });
    return null;
  });
  param.fsList = array;
  const { ...data } = param;
  const dataAdd = { ...data, createBy: 'admin' };
  const dataStr1 = JSON.stringify(dataAdd);
  return {
    value: dataStr1 ? [dataStr1] : [],
  };
};
const EQMModifyPutParamTemplate = (params) => {
  const { ...param } = params;
  const array = [];
  const fsList = param.fsList ? param.fsList : [];
  fsList.map((v) => {
    array.push({ fsItemId: v });
    return null;
  });
  param.fsList = array;
  const { ...data } = param;
  const dataAdd = { ...data, lastUpdateBy: 'admin' };
  const dataStr1 = JSON.stringify(dataAdd);
  return {
    value: dataStr1 ? [dataStr1] : [],
  };
};
const EQMSolveGrpMng = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="解决方案群组管理" />
    <FormContainer
      name={EQMSolveGrpMngForm}
      action={EQMSettingApi}
      method="GET"
      tableName={EQMSolveGrpMngTable}
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="fsGroupName" className={'label'}>群组名称</label>
        <Input type="text" name="fsGroupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="fsGroupCode" className={'label'}>群组代码</label>
        <Input type="text" name="fsGroupCode" className={'input'} />
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
      <Modal name="EQMSolveGrpMngAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMSolveGrpMngAdd"
          action={EQMSolveGrpMngAddApi}
          method="POST"
          dataTemplate={EQMModifyParamTemplate}
          formName={EQMSolveGrpMngForm}
          filters={defaultRequestFilters}
          modalName="EQMSolveGrpMngAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="fsGroupCode">方案群组代码</label>
              <Input type="text" name="fsGroupCode" />
            </Row>
            <Row>
              <label htmlFor="fsGroupName">方案群组名称</label>
              <Input type="text" name="fsGroupName" />
            </Row>
            <Row>
              <label htmlFor="fsGroupDesc">方案群组描述</label>
              <Input type="text" name="fsGroupDesc" />
            </Row>
            <Row className={'selectLabel'} style={{ height: '130px' }}>
              <label htmlFor="fsList">方案列表</label>
              <span className={'select'}>
                <div>
                  <Select
                    mode="multiple"
                    name="fsList"
                    action={EQMSolveGrpMngkListApi}
                    itemKey="key"
                    itemValue="keyName"
                    className={'select'}
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
      <Modal
        name="EQMSolveGrpMngUpdata"
        formName={EQMSolveGrpMngForm}
        tableName={EQMSolveGrpMngTable}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyModify}
      >
        <ModalForm
          name="EQMSolveGrpMngUpdata"
          modalName="EQMSolveGrpMngUpdata"
          action={EQMSolveGrpMngUpdata}
          method="PUT"
          paramTemplate={() => {}}
          dataTemplate={EQMModifyPutParamTemplate}
          filters={defaultRequestFilters}
          formName={EQMSolveGrpMngForm}
          tableName={EQMSolveGrpMngTable}
          multiple
          ItemId="fsItemId"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="fsGroupName">方案群组名称</label>
              <Input type="text" name="fsGroupName" />
            </Row>
            <Row>
              <label htmlFor="fsGroupDesc">方案群组描述</label>
              <Input type="text" name="fsGroupDesc" />
            </Row>
            <Row style={{ height: '130px' }}>
              <label htmlFor="fsList">方案列表</label>
              <span className={'select'}>
                <Select
                  mode="multiple"
                  name="fsList"
                  action={EQMSolveGrpMngkListApi}
                  itemKey="key"
                  itemValue="keyName"
                  noDefault
                  dataSourceTemplate={dataSourceTemplate}
                  load="true"
                />
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
        action={EQMSolveGrpMngActiveApi}
        tableName={EQMSolveGrpMngTable}
        formName={EQMSolveGrpMngForm}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMSolveGrpMngActiveApi}
        tableName={EQMSolveGrpMngTable}
        formName={EQMSolveGrpMngForm}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name={EQMSolveGrpMngTable}
      action={EQMSolveGrpMngGetItemApi}
      formName={EQMSolveGrpMngForm}
      columns={columns}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      filters={defaultRequestFilters}
      isGetDate
    />
    <QueryTableContainer
      name={EQMSolveGrpMngGridConfTable}
      tableName={EQMSolveGrpMngTable}
      dataSourceTemplate={''}
      columns={columnsEQMGridConf}
      isRowSelection
      uid="fsItemId"
    />
  </div>
);
EQMSolveGrpMng.defaultProps = {

};
EQMSolveGrpMng.propTypes = {

};

export default EQMSolveGrpMng;
