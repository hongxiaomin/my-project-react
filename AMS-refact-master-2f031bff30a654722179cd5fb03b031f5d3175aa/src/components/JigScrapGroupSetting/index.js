/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row, Tabs, message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import Request from '../../utils/Request';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  modifyParamTemplate,
  dataHandler,
  SERVER_IP_JIG } from '../../constants/Settings';
import './style.less';

const JigScrapGroupSettingAPI = `${SERVER_IP_JIG}/ams/jig/setting/scrapgroup/query`;
const JigScrapGroupSettingAPIAdd = `${SERVER_IP_JIG}/ams/jig/setting/scrapgroup/add`;
const JigScrapGroupSettingAPIUpdate = `${SERVER_IP_JIG}/ams/jig/setting/scrapgroup/update`;
const JigGroupAPI = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/query/item`;
const ScrapReasonAPI = `${SERVER_IP_JIG}/ams/jig/base/scrap/query/item`;
const JigScrapReasonGroupSettingApi = `${SERVER_IP_JIG}/ams/jig/setting/scrapgroup/query/item`;

const MainFormName = 'JigScrapGroupSettingFrom';
const MainTableName = 'JigScrapGroupSettingTable';
const targetKeyModify = ['scGroupCode', 'scGroupName', 'lastUpdateBy', 'scGroupDesc', 'jigTypeGroupId', 'scrapGroupDtls', 'id'];
const targetKeyCopy = ['scGroupCode', 'scGroupName', 'scGroupDesc', 'jigTypeGroupId', 'createBy', 'scrapGroupDtls'];

const checkTemplate = (data) => {
  const jigTypeGroupId = Number(data.jigTypeGroupId);
  if (jigTypeGroupId === -1) {
    message.error('请选择治具群组！', 3);
    return false;
  }
  return true;
};

let items;
const getItemData = () => {
  const data = null;
  const url = ScrapReasonAPI;
  const method = 'GET';
  const filters = '';
  const callback = (response) => {
    items = response.rows;
    return items;
  };
  Request({
    url,
    method,
    data,
    filters,
    callback,
  });
};

const defaultJigPostDataTemplate = (param, dataSource) => {
  const { ...data } = param;
  const local = [];
  dataSource.map((v) => {
    local.push({ scItemId: v.scItemId });
  });
  localStorage.setItem('localDataSource', JSON.stringify(local));
  const targetData = {
    ...data,
    scrapGroupDtls: dataSource || [],
  };
  delete targetData.scItemId;
  const data1 = dataHandler(targetData);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'AddNew',
    value: dataStr || [],
  };
};

const defaultJigPutDataTemplate = (param, dataSource) => {
  const { ...data } = param;
  const temp = param.scrapGroupDtls;
  const local = [];
  temp.map((v) => {
    local.push({ scItemId: v.scItemId });
  });
  localStorage.setItem('localDataSource', JSON.stringify(local));
  const target = [];
  temp.map((v) => {
    if (v.flag !== null) {
      if (v.flag === 1) {
        target.push(v);
      } else if (v.flag === 3) {
        target.push({ id: v.id, flag: v.flag });
      }
    }
  });
  const targetData = {
    ...data,
    scrapGroupDtls: target || [],
  };
  delete targetData.scItemId;
  delete targetData.id;
  delete targetData.scGroupCode;
  const data1 = dataHandler(targetData);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'Modify',
    value: dataStr || [],
  };
};

const TabPane = Tabs.TabPane;
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '群组代码',
    dataIndex: 'scGroupCode',
    key: 'scGroupCode',
  }, {
    title: '群组名称',
    dataIndex: 'scGroupName',
    key: 'scGroupName',
  }, {
    title: '群组说明',
    dataIndex: 'scGroupDesc',
    key: 'scGroupDesc',
  }, {
    title: '治具群组',
    dataIndex: 'jigTypeGroupId',
    key: 'jigTypeGroupId',
    render: (text, record) => record.jigTypeGroupName,
  }, {
    title: '最后修改时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
  }, {
    title: '最后修改人员',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }];
const Tabscolumns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '报废项目',
  dataIndex: 'scItemId',
  key: 'scItemId',
  render: (text) => {
    let name;
    items.map((value) => {
      if (value.scid === text) {
        name = value.scname;
      }
    });
    return name;
  },
}];
const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const JigScrapGroupSetting = (props) => {
  getItemData();
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '治工具管理',
  }, {
    path: '',
    name: '治具管理设定',
  }, {
    path: '',
    name: '治工具报废群组设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="治工具报废群组设定" />
      <FormContainer
        name={MainFormName}
        action={JigScrapGroupSettingAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="scGroupCode" className={'label'}>群组代码</label>
          <span className={'select'}>
            <Select
              name="scGroupCode"
              className={'select'}
              itemKey="groupcode"
              itemValue="groupcode"
              action={JigScrapReasonGroupSettingApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="scGroupName" className={'label'}>群组名称</label>
          <span className={'select'}>
            <Select
              name="scGroupName"
              className={'select'}
              itemKey="groupname"
              itemValue="groupname"
              action={JigScrapReasonGroupSettingApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
            />
          </span>
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
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <div className={'divBtn'}>
        <Modal name="JigScrapGroupSettingAdd" btnName="新增" title="新增" >
          <ModalForm
            name="JigScrapGroupSettingAdd"
            needForName="JigScrapGroupSettingAdd"
            action={JigScrapGroupSettingAPIAdd}
            method="POST"
            dataTemplate={defaultJigPostDataTemplate}
            formName={MainFormName}
            filters={defaultRequestFilters}
            modalName="JigScrapGroupSettingAdd"
            mode="AddNew"
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="scGroupCode">群组代码</label>
                  <InputContainer type="text" name="scGroupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="scGroupName">群组名称</label>
                  <InputContainer type="text" name="scGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="scGroupDesc">群组说明</label>
                  <InputContainer type="text" name="scGroupDesc" />
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <SelectContainer
                    name="jigTypeGroupId"
                    className={'select'}
                    itemKey="id"
                    itemValue="groupname"
                    action={JigGroupAPI}
                    load="true"
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="createBy">创建人员</label>
                  <InputContainer type="text" name="createBy" value="Admin" disabled />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
              <TabPane tab="详细" key="2" className="Tabstyle" >
                <Row>
                  <label htmlFor="scItemId">报废项目</label>
                  <SelectContainer
                    name="scItemId"
                    className={'select'}
                    itemKey="scid"
                    itemValue="scname"
                    action={ScrapReasonAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="scrapAddData"
                      btnName="确定"
                      formName="JigScrapGroupSettingAdd"
                      tableName="JigScrapAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigScrapGroupSettingAdd"
                    tableName="JigScrapAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigScrapAdd"
                    formName="JigScrapGroupSettingAdd"
                    columns={Tabscolumns}
                    nopagination
                  />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
            </Tabs>
          </ModalForm>
        </Modal>
        <Modal
          name="JigScrapGroupSettingCopy"
          btnName="复制"
          formName={MainFormName}
          tableName={MainTableName}
          title="复制"
          load="true"
          tarKey={targetKeyCopy}
        >
          <ModalForm
            name="JigScrapGroupSettingCopy"
            needForName="JigScrapGroupSettingCopy"
            action={JigScrapGroupSettingAPIAdd}
            method="POST"
            dataTemplate={defaultJigPostDataTemplate}
            formName={MainFormName}
            filters={defaultRequestFilters}
            modalName="JigScrapGroupSettingCopy"
            tableName={MainTableName}
            mode="copy"
            keepDataSource
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="scGroupCode">群组代码</label>
                  <InputContainer type="text" name="scGroupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="scGroupName">群组名称</label>
                  <InputContainer type="text" name="scGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="scGroupDesc">群组描述</label>
                  <InputContainer type="text" name="scGroupDesc" />
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <SelectContainer
                    name="jigTypeGroupId"
                    className={'select'}
                    itemKey="id"
                    itemValue="groupname"
                    action={JigGroupAPI}
                    load="true"
                    dataSourceTemplate={defaultDataSourceTemplate}
                    init
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="createBy">创建人员</label>
                  <InputContainer type="text" name="createBy" value="Admin" disabled />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
              <TabPane tab="详细" key="2" className="Tabstyle" >
                <Row>
                  <label htmlFor="scItemId">报废项目</label>
                  <SelectContainer
                    name="scItemId"
                    className={'select'}
                    itemKey="scid"
                    itemValue="scname"
                    action={ScrapReasonAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="scrapAddData"
                      btnName="确定"
                      formName="JigScrapGroupSettingCopy"
                      tableName="JigScrapAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigScrapGroupSettingCopy"
                    tableName="JigScrapAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigScrapAdd"
                    formName="JigScrapGroupSettingCopy"
                    columns={Tabscolumns}
                    nopagination
                  />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
            </Tabs>
          </ModalForm>
        </Modal>
        <Modal
          name="JigScrapGroupSettingUpdate"
          btnName="修改"
          formName={MainFormName}
          tableName={MainTableName}
          title="修改"
          load="true"
          tarKey={targetKeyModify}
        >
          <ModalForm
            name="JigScrapGroupSettingUpdate"
            needForName="JigScrapGroupSettingUpdate"
            modalName="JigScrapGroupSettingUpdate"
            action={JigScrapGroupSettingAPIUpdate}
            method="PUT"
            paramTemplate={modifyParamTemplate}
            dataTemplate={defaultJigPutDataTemplate}
            filters={defaultRequestFilters}
            formName={MainFormName}
            tableName={MainTableName}
            mode="Modify"
            keepDataSource
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="scGroupCode">群组代码</label>
                  <InputContainer type="text" name="scGroupCode" disabled />
                </Row>
                <Row>
                  <label htmlFor="scGroupName">群组名称</label>
                  <InputContainer type="text" name="scGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="scGroupDesc">群组描述</label>
                  <InputContainer type="text" name="scGroupDesc" />
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <SelectContainer
                    name="jigTypeGroupId"
                    className={'select'}
                    itemKey="id"
                    itemValue="groupname"
                    action={JigGroupAPI}
                    load="true"
                    dataSourceTemplate={defaultDataSourceTemplate}
                    init
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="lastUpdateBy">修改人员</label>
                  <InputContainer type="text" name="lastUpdateBy" />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
              <TabPane tab="详细" key="2" className="Tabstyle" >
                <Row>
                  <label htmlFor="scItemId">报废项目</label>
                  <SelectContainer
                    name="scItemId"
                    className={'select'}
                    itemKey="scid"
                    itemValue="scname"
                    action={ScrapReasonAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                    disabled
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="scrapAddData"
                      btnName="确定"
                      formName="JigScrapGroupSettingUpdate"
                      tableName="JigScrapAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigScrapGroupSettingUpdate"
                    tableName="JigScrapAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigScrapAdd"
                    formName="JigScrapGroupSettingUpdate"
                    columns={Tabscolumns}
                    nopagination
                  />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
            </Tabs>
          </ModalForm>
        </Modal>
        <ActionBtn
          btnName="刷新"
          mode="refresh"
          tableName={MainTableName}
          formName={MainFormName}
        />
        <ActionBtn
          btnName="隐藏"
          mode="hide"
          action={JigScrapGroupSettingAPIUpdate}
          tableName={MainTableName}
          formName={MainFormName}
          paramTemplate={defaultPutParamTemplate}
        />
        <ActionBtn
          btnName="取消隐藏"
          mode="show"
          action={JigScrapGroupSettingAPIUpdate}
          tableName={MainTableName}
          formName={MainFormName}
          paramTemplate={defaultPutParamTemplate}
        />
      </div>
      <TableContainer
        name={MainTableName}
        formName={MainFormName}
        columns={columns}
        onRowClick
      />
    </div>
  );
};
JigScrapGroupSetting.defaultProps = {

};
JigScrapGroupSetting.propTypes = {

};

export default JigScrapGroupSetting;
