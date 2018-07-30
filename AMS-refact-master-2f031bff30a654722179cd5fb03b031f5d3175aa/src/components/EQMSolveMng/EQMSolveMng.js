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

const MainFormName = 'EQMSolveMngForm';
const MainTableName = 'EQMSolveMngTab';

const EQMSolveMngAPI = `${SERVER_IP_EQM}/ams/eqm/fault/solution/item`;
const EQMSolveMngActiveAPI = `${SERVER_IP_EQM}/ams/eqm/fault/solution/item/active`;
const eqpFaultAPI = `${SERVER_IP_EQM}/ams/eqm/fault/item/list`;
const EQMSolveMngItemAPI = `${SERVER_IP_EQM}/ams/eqm/fault/solution/relation`;

const targetKeyUpdate = ['fsItemName', 'fsItemCode', 'fsItemDesc', 'faultSolutionList', 'id'];

const EQMPostListDataTemplate = (param) => {
  const faultSolutionList = param.faultSolutionList;
  const faultSolutionListNew = [];
  if (faultSolutionList) {
    faultSolutionList.map((v) => {
      faultSolutionListNew.push({ faultItemId: v });
      return null;
    });
  }
  const data = { ...param, faultSolutionList: faultSolutionListNew, createBy: 'Admin' };
  const data1 = dataHandler(data);
  const dataStr = JSON.stringify(data1);
  const dataStr1 = [dataStr];
  return {
    value: dataStr1 || [],
  };
};

const EQMPutListDataTemplate = (param) => {
  const faultSolutionList = param.faultSolutionList;
  const faultSolutionListNew = [];
  if (faultSolutionList) {
    faultSolutionList.map((v) => {
      faultSolutionListNew.push({ faultItemId: v });
      return null;
    });
  }
  const data = { ...param, faultSolutionList: faultSolutionListNew, lastUpdateBy: 'Admin' };
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
    datArry.push({ name: v.name, id: v.id });
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
    title: '方案项代码',
    dataIndex: 'fsItemCode',
    key: 'fsItemCode',
  }, {
    title: '方案项名称',
    dataIndex: 'fsItemName',
    key: 'fsItemName',
  }, {
    title: '方案项描述',
    dataIndex: 'fsItemDesc',
    key: 'fsItemDesc',
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
    key: 'faultItemDesc',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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
  name: '故障及维修',
}, {
  path: '',
  name: '解决方案项管理',
}];
const EQMSolveMng = () => (
  <div className="relationSet">
    <Bread breadMap={breadMap} />
    <Title name="解决方案项管理" />
    <FormContainer
      name={MainFormName}
      action={EQMSolveMngAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="fsItemCode" className={'label'}>解决方案项代码</label>
        <InputContainer type="text" name="fsItemCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="fsItemName" className={'label'}>解决方案项名称</label>
        <InputContainer type="text" name="fsItemName" className={'input'} />
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
      <Modal name="EQMSolveMngAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMSolveMngAdd"
          action={EQMSolveMngAPI}
          method="POST"
          dataTemplate={EQMPostListDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMSolveMngAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="fsItemCode">解决方案项代码</label>
              <InputContainer type="text" name="fsItemCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="fsItemName">解决方案项名称</label>
              <InputContainer type="text" name="fsItemName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="fsItemDesc">解决方案项描述</label>
              <InputContainer type="text" name="fsItemDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="createBy">创建者</label>
              <InputContainer type="text" name="createBy" value="admin" disabled />
              <i>*</i>
            </Row> */}
            <Row className={'selectLabel'} style={{ height: '130px' }}>
              <label htmlFor="faultSolutionList">故障ID列表</label>
              <span className={'select'}>
                <SelectContainer
                  mode="multiple"
                  name="faultSolutionList"
                  action={eqpFaultAPI}
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
        name="EQMSolveMngUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMSolveMngUpdate"
          modalName="EQMSolveMngUpdate"
          action={EQMSolveMngAPI}
          method="PUT"
          paramTemplate={() => {}}
          dataTemplate={EQMPutListDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
          multiple
          ItemId="faultItemId"
          clearDatasourceOnUnselected
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="fsItemCode">解决方案项代码</label>
              <InputContainer type="text" name="fsItemCode" disabled />
            </Row>
            <Row>
              <label htmlFor="fsItemName">解决方案项名称</label>
              <InputContainer type="text" name="fsItemName" />
            </Row>
            <Row>
              <label htmlFor="fsItemDesc">解决方案项描述</label>
              <InputContainer type="text" name="fsItemDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后更新者</label>
              <InputContainer type="text" name="lastUpdateBy" />
            </Row> */}
            <Row style={{ height: '130px' }}>
              <label htmlFor="faultSolutionList">故障ID列表</label>
              <span className={'select'}>
                <SelectContainer
                  mode="multiple"
                  name="faultSolutionList"
                  action={eqpFaultAPI}
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
        action={EQMSolveMngActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
        clearDatasourceOnUnselected
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMSolveMngActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
        clearDatasourceOnUnselected
      />
    </div>
    <TableContainer
      name={MainTableName}
      action={EQMSolveMngItemAPI}
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
      name="EQMSolveMngItemTable"
      tableName={MainTableName}
      columns={ItemColumns}
      isRowSelection
      uid="faultItemId"
    />
  </div>
);

EQMSolveMng.defaultProps = {

};
EQMSolveMng.propTypes = {

};

export default EQMSolveMng;
