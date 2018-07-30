import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import {
  EQMParamTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  dataHandler,
  SERVER_IP_EQM } from '../../constants/Settings';

const MainFormName = 'EQMGrpMngForm';
const MainTableName = 'EQMGrpMngTab';

const EQMGrpMngAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/group`;
const EQMGrpMngActiveAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/group/active`;
// const eqpListAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/info`;
const eqpListAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/info/list`;
const EQMGrpMngItemAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/group/item`;

const targetKeyUpdate = ['eqpGroupName', 'eqpGroupCode', 'eqpList', 'eqpGroupDesc', 'id'];


const EQMPostListDataTemplate = (param) => {
  const eqpList = param.eqpList;
  const eqplistNew = [];
  if (eqpList) {
    eqpList.map((v) => {
      eqplistNew.push({ eqpId: v });
      return null;
    });
  }
  const data = { ...param, eqpList: eqplistNew, createBy: 'Admin' };
  const data1 = dataHandler(data);
  const dataStr = JSON.stringify(data1);
  const dataStr1 = [dataStr];
  return {
    value: dataStr1 || [],
  };
};

const EQMPutListDataTemplate = (param) => {
  const eqplistNew = [];
  const eqpList = param.eqpList ? param.eqpList : [];
  eqpList.map((v) => {
    eqplistNew.push({ eqpId: v });
    return null;
  });
  const data = { ...param, eqpList: eqplistNew, lastUpdateBy: 'Admin' };
  // const data1 = dataHandler(data);
  const dataStr = JSON.stringify(data);
  const dataStr1 = [dataStr];
  return {
    value: dataStr1 || [],
  };
};

const dataSourceTemplate = (param) => {
  const datArry = [];
  const rows = param.rows ? param.rows : param;
  rows.map((v) => {
    datArry.push({ name: v.code, id: v.id });
    return null;
  });
  const codeList = datArry.map(v => ({ key: v.id, keyName: v.name }));
  return codeList;
};

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '群组名称',
    dataIndex: 'eqpGroupName',
    key: 'eqpGroupName',
  }, {
    title: '群组代码',
    dataIndex: 'eqpGroupCode',
    key: 'eqpGroupCode',
  }, {
    title: '群组描述',
    dataIndex: 'eqpGroupDesc',
    key: 'eqpGroupDesc',
  }, {
    title: '最后更新者',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
  }];

const ItemColumns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    key: 'eqpCode',
  }, {
    title: '所属厂别',
    dataIndex: 'factoryName',
    key: 'factoryName',
  }, {
    title: '所属线别',
    dataIndex: 'lineName',
    key: 'lineName',
  }, {
    title: '所属站点',
    dataIndex: 'assemblyName',
    key: 'assemblyName',
  }, {
    title: '设备描述',
    dataIndex: 'eqpDesc',
    key: 'eqpDesc',
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
  name: '设备管理',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '群组配置',
}];

const EQMGrpMng = () => (
  <div className="relationSet">
    <Bread breadMap={breadMap} />
    <Title name="群组配置" />
    <FormContainer
      name={MainFormName}
      action={EQMGrpMngAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupName" className={'label'}>群组名称</label>
        <InputContainer type="text" name="faultGroupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="faultGroupCode" className={'label'}>群组代码</label>
        <InputContainer type="text" name="faultGroupCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <SelectContainer
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
      <Modal name="EQMGrpMngAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMGrpMngAdd"
          action={EQMGrpMngAPI}
          method="POST"
          dataTemplate={EQMPostListDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMGrpMngAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpGroupName">群组名称</label>
              <InputContainer type="text" name="eqpGroupName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="eqpGroupCode">群组代码</label>
              <InputContainer type="text" name="eqpGroupCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="eqpGroupDesc">群组描述</label>
              <InputContainer type="text" name="eqpGroupDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="createBy">创建者</label>
              <InputContainer type="text" name="createBy" value="admin" disabled />
              <i>*</i>
            </Row> */}
            <Row className={'selectLabel'} style={{ height: '130px' }}>
              <label htmlFor="eqpList">设备ID列表</label>
              <span className={'select'}>
                <SelectContainer
                  mode="multiple"
                  name="eqpList"
                  action={eqpListAPI}
                  itemKey="key"
                  className={'select'}
                  itemValue="keyName"
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
        name="EQMGrpMngUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMGrpMngUpdate"
          modalName="EQMGrpMngUpdate"
          action={EQMGrpMngAPI}
          method="PUT"
          paramTemplate={() => {}}
          dataTemplate={EQMPutListDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
          multiple
          ItemId="eqpId"
          clearDatasourceOnUnselected
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpGroupName">群组名称</label>
              <InputContainer type="text" name="eqpGroupName" />
            </Row>
            <Row>
              <label htmlFor="eqpGroupCode">群组代码</label>
              <InputContainer type="text" name="eqpGroupCode" disabled />
            </Row>
            <Row>
              <label htmlFor="eqpGroupDesc">群组描述</label>
              <InputContainer type="text" name="eqpGroupDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后更新者</label>
              <InputContainer type="text" name="lastUpdateBy" value="admin" disabled />
            </Row> */}
            <Row style={{ height: '130px' }}>
              <label htmlFor="eqpList">设备ID列表</label>
              <span className={'select'}>
                <SelectContainer
                  mode="multiple"
                  name="eqpList"
                  action={eqpListAPI}
                  className={'select'}
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
        action={EQMGrpMngActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
        clearDatasourceOnUnselected
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMGrpMngActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
        clearDatasourceOnUnselected
      />
    </div>
    <TableContainer
      name={MainTableName}
      action={EQMGrpMngItemAPI}
      formName={MainFormName}
      columns={columns}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
      needData="id"
      filters={defaultRequestFilters}
      isGetDate
      isRadio
    />
    <QueryTableContainer
      name="EQMGrpMngItemTable"
      tableName={MainTableName}
      columns={ItemColumns}
      isRowSelection
      uid="eqpId"
    />
  </div>
);

EQMGrpMng.defaultProps = {

};
EQMGrpMng.propTypes = {

};

export default EQMGrpMng;
