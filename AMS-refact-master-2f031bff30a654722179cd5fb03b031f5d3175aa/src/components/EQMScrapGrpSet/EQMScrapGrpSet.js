
import React from 'react';
import { Row } from 'antd';
// import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
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

const EQMScrapGrpSetForm = 'EQMScrapGrpSetForm';
const EQMScrapGrpSetTable = 'EQMScrapGrpSetTable';
const EQMScrapGrpSetGridConfTable = 'EQMScrapGrpSetGridConfTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/group`;
const EQMScrapGrpSetAddApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/group`;
const EQMScrapGrpSetListApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/item/item`;
const EQMScrapGrpSetGetItemApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/group/item`;
const EQMScrapGrpSetUpdata = `${SERVER_IP_EQM}/ams/eqm/scrapcause/group`;
const EQMScrapGrpSetActiveApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/group/active`;
const targetKeyModify = ['scGroupName', 'scGroupDesc', 'lastUpdateBy', 'scList', 'id'];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '设备报废',
}, {
  path: '',
  name: '报废群组配置',
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
    dataIndex: 'scGroupName',
    key: 'scGroupName',
  }, {
    title: '群组代码',
    dataIndex: 'scGroupCode',
    index: 'scGroupCode',
  }, {
    title: '备注',
    dataIndex: 'scGroupDesc',
    index: 'scGroupDesc',
  }];
const columnsEQMGridConf = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '报废项代码',
    dataIndex: 'scItemId',
    key: 'scItemId',
  }, {
    title: '报废项',
    dataIndex: 'scItemName',
    index: 'scItemName',
  }];
const dataSourceTemplate = (param) => {
  const datArry = [];
  const rows = param.rows ? param.rows : param;
  rows.map((v) => {
    datArry.push(v.id);
    return null;
  });
  const codeList = datArry.map(v => ({ key: v }));
  return codeList;
};
const EQMModifyParamTemplate = (params) => {
  const { ...param } = params;
  const array = [];
  const scList = param.scList ? param.scList : [];
  scList.map((v) => {
    array.push({ scItemId: v });
    return null;
  });
  param.scList = array;
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  return {
    value: dataStr1 ? [dataStr1] : [],
  };
};
const EQMScrapGrpSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="报废群组配置" />
    <FormContainer
      name={EQMScrapGrpSetForm}
      action={EQMSettingApi}
      method="GET"
      tableName={EQMScrapGrpSetTable}
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="scGroupName" className={'label'}>群组名称</label>
        <Input type="text" name="scGroupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="scGroupCode" className={'label'}>群组代码</label>
        <Input type="text" name="scGroupCode" className={'input'} />
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
      <Modal name="EQMScrapGrpSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMScrapGrpSetAdd"
          needForName="EQMScrapGrpSetAdd"
          action={EQMScrapGrpSetAddApi}
          method="POST"
          dataTemplate={EQMModifyParamTemplate}
          formName={EQMScrapGrpSetForm}
          filters={defaultRequestFilters}
          modalName="EQMScrapGrpSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="scGroupCode">设备报废原因群组代码</label>
              <Input type="text" name="scGroupCode" />
            </Row>
            <Row>
              <label htmlFor="scGroupName">设备报废原因群组名称</label>
              <Input type="text" name="scGroupName" />
            </Row>
            <Row>
              <label htmlFor="scGroupDesc">设备报废原因群组描述</label>
              <Input type="text" name="scGroupDesc" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建者</label>
              <Input type="text" name="createBy" value="admin" disabled />
            </Row>
            <Row className={'selectLabel'} style={{ height: '130px' }}>
              <label htmlFor="scList">设备故障项ID列表</label>
              <span className={'select'}>
                <Select
                  mode="multiple"
                  name="scList"
                  action={EQMScrapGrpSetListApi}
                  itemKey="key"
                  className={'select'}
                  itemValue="key"
                  load="true"
                  noDefault
                  dataSourceTemplate={dataSourceTemplate}
                />
              </span>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMScrapGrpSetUpdate"
        formName={EQMScrapGrpSetForm}
        tableName={EQMScrapGrpSetTable}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyModify}
      >
        <ModalForm
          name="EQMScrapGrpSetUpdate"
          modalName="EQMScrapGrpSetUpdate"
          action={EQMScrapGrpSetUpdata}
          method="PUT"
          paramTemplate={() => {}}
          dataTemplate={EQMModifyParamTemplate}
          filters={defaultRequestFilters}
          formName={EQMScrapGrpSetForm}
          tableName={EQMScrapGrpSetTable}
          multiple
          ItemId="scItemId"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="scGroupName">设备报废原因群组名称</label>
              <Input type="text" name="scGroupName" />
            </Row>
            <Row>
              <label htmlFor="scGroupDesc">设备报废原因群组描述</label>
              <Input type="text" name="scGroupDesc" />
            </Row>
            <Row>
              <label htmlFor="lastUpdateBy">最后修改者</label>
              <Input type="text" name="lastUpdateBy" />
            </Row>
            <Row style={{ height: '130px' }}>
              <label htmlFor="scList">设备故障项列表</label>
              <span className={'select'}>
                <Select
                  mode="multiple"
                  name="scList"
                  action={EQMScrapGrpSetListApi}
                  className={'select'}
                  itemKey="key"
                  itemValue="key"
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
        action={EQMScrapGrpSetActiveApi}
        tableName={EQMScrapGrpSetTable}
        formName={EQMScrapGrpSetForm}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMScrapGrpSetActiveApi}
        tableName={EQMScrapGrpSetTable}
        formName={EQMScrapGrpSetForm}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name={EQMScrapGrpSetTable}
      action={EQMScrapGrpSetGetItemApi}
      formName={EQMScrapGrpSetForm}
      columns={columns}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      filters={defaultRequestFilters}
      isGetDate
    />
    <QueryTableContainer
      name={EQMScrapGrpSetGridConfTable}
      tableName={EQMScrapGrpSetTable}
      columns={columnsEQMGridConf}
      isRowSelection
      uid="scItemId"
    />
  </div>
);
EQMScrapGrpSet.defaultProps = {

};
EQMScrapGrpSet.propTypes = {

};

export default EQMScrapGrpSet;
