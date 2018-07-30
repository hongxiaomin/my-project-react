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

const JigMaintainGroupSettingAPI = `${SERVER_IP_JIG}/ams/jig/setting/maintgroup/query`;
const JigMaintainGroupSettingAPIAdd = `${SERVER_IP_JIG}/ams/jig/setting/maintgroup/add`;
const JigMaintainGroupSettingAPIUpdate = `${SERVER_IP_JIG}/ams/jig/setting/maintgroup/update`;
const JigGroupAPI = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/query/item`;
const MaintainItemAPI = `${SERVER_IP_JIG}/ams/jig/base/mainttype/query/item`;
const JigMaintainGroupSettingApi = `${SERVER_IP_JIG}/ams/jig/setting/maintgroup/query/item`;

const MainFormName = 'JigMaintainGroupSettingFrom';
const MainTableName = 'JigMaintainGroupSettingTable';
const targetKeyModify = ['maintGroupCode', 'jigTypeGroupId', 'maintGroupName', 'maintGroupDesc', 'lastUpdateBy', 'maintGroupDtls', 'id'];
const targetKeyCopy = ['maintGroupCode', 'jigTypeGroupId', 'maintGroupName', 'maintGroupDesc', 'createBy', 'maintGroupDtls'];

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
  const url = MaintainItemAPI;
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
    local.push({ maintItemId: v.maintItemId });
  });
  localStorage.setItem('localDataSource', JSON.stringify(local));
  const targetData = {
    ...data,
    maintGroupDtls: dataSource || [],
  };

  delete targetData.maintItemId;
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
  const temp = param.maintGroupDtls;
  const local = [];
  temp.map((v) => {
    local.push({ maintItemId: v.maintItemId });
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
    maintGroupDtls: target || [],
  };
  delete targetData.id;
  delete targetData.maintItemId;
  delete targetData.maintGroupCode;
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
    dataIndex: 'maintGroupCode',
    key: 'maintGroupCode',
  }, {
    title: '群组名称',
    dataIndex: 'maintGroupName',
    key: 'maintGroupName',
  }, {
    title: '群组说明',
    dataIndex: 'maintGroupDesc',
    key: 'maintGroupDesc',
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
  title: '保养项目',
  dataIndex: 'maintItemId',
  key: 'maintItemId',
  render: (text) => {
    let name;
    items.map((value) => {
      if (value.mainttypeid === text) {
        name = value.maintypename;
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
const JigMaintainGroupSetting = (props) => {
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
    name: '治工具保养群组设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="治工具保养群组设定" />
      <FormContainer
        name={MainFormName}
        action={JigMaintainGroupSettingAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="maintGroupCode" className={'label'}>群组代码</label>
          <span className={'select'}>
            <Select
              name="maintGroupCode"
              className={'select'}
              itemKey="groupcode"
              itemValue="groupcode"
              action={JigMaintainGroupSettingApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="maintGroupName" className={'label'}>群组名称</label>
          <span className={'select'}>
            <Select
              name="maintGroupName"
              className={'select'}
              itemKey="groupname"
              itemValue="groupname"
              action={JigMaintainGroupSettingApi}
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
        <Modal name="JigMaintainGroupSettingAdd" btnName="新增" title="新增" >
          <ModalForm
            name="JigMaintainGroupSettingAdd"
            needForName="JigMaintainGroupSettingAdd"
            action={JigMaintainGroupSettingAPIAdd}
            method="POST"
            dataTemplate={defaultJigPostDataTemplate}
            formName={MainFormName}
            filters={defaultRequestFilters}
            modalName="JigMaintainGroupSettingAdd"
            mode="AddNew"
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="maintGroupCode">群组代码</label>
                  <InputContainer type="text" name="maintGroupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="maintGroupName">群组名称</label>
                  <InputContainer type="text" name="maintGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="maintGroupDesc">群组说明</label>
                  <InputContainer type="text" name="maintGroupDesc" />
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
                  <label htmlFor="maintItemId">保养项目</label>
                  <SelectContainer
                    name="maintItemId"
                    className={'select'}
                    itemKey="mainttypeid"
                    itemValue="maintypename"
                    action={MaintainItemAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="maintainAddData"
                      btnName="确定"
                      tableName="JigMaintainAdd"
                      formName="JigMaintainGroupSettingAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    tableName="JigMaintainAdd"
                    formName="JigMaintainGroupSettingAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigMaintainAdd"
                    formName="JigMaintainGroupSettingAdd"
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
          name="JigMaintainGroupSettingCopy"
          formName={MainFormName}
          tableName={MainTableName}
          btnName="复制"
          title="复制"
          load="true"
          tarKey={targetKeyCopy}
        >
          <ModalForm
            name="JigMaintainGroupSettingCopy"
            needForName="JigMaintainGroupSettingCopy"
            action={JigMaintainGroupSettingAPIAdd}
            method="POST"
            dataTemplate={defaultJigPostDataTemplate}
            formName={MainFormName}
            filters={defaultRequestFilters}
            modalName="JigMaintainGroupSettingCopy"
            tableName={MainTableName}
            mode="Copy"
            keepDataSource
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="maintGroupCode">群组代码</label>
                  <InputContainer type="text" name="maintGroupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="maintGroupName">群组名称</label>
                  <InputContainer type="text" name="maintGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="maintGroupDesc">群组说明</label>
                  <InputContainer type="text" name="maintGroupDesc" />
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <SelectContainer
                    name="jigTypeGroupId"
                    className={'select'}
                    itemKey="id"
                    itemValue="groupname"
                    action={JigGroupAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
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
                  <label htmlFor="maintItemId">保养项目</label>
                  <SelectContainer
                    name="maintItemId"
                    className={'select'}
                    itemKey="mainttypeid"
                    itemValue="maintypename"
                    action={MaintainItemAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="maintainAddData"
                      btnName="确定"
                      formName="JigMaintainGroupSettingCopy"
                      tableName="JigMaintainAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigMaintainGroupSettingCopy"
                    tableName="JigMaintainAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigMaintainAdd"
                    formName="JigMaintainGroupSettingCopy"
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
          name="JigMaintainGroupSettingUpdate"
          btnName="修改"
          formName={MainFormName}
          tableName={MainTableName}
          title="修改"
          load="true"
          tarKey={targetKeyModify}
        >
          <ModalForm
            name="JigMaintainGroupSettingUpdate"
            needForName="JigMaintainGroupSettingUpdate"
            modalName="JigMaintainGroupSettingUpdate"
            action={JigMaintainGroupSettingAPIUpdate}
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
                  <label htmlFor="maintGroupCode">群组代码</label>
                  <InputContainer type="text" name="maintGroupCode" disabled />
                </Row>
                <Row>
                  <label htmlFor="maintGroupName">群组名称</label>
                  <InputContainer type="text" name="maintGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
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
                  <label htmlFor="maintGroupDesc">群组说明</label>
                  <InputContainer type="text" name="maintGroupDesc" />
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
                  <label htmlFor="maintItemId">保养项目</label>
                  <SelectContainer
                    name="maintItemId"
                    className={'select'}
                    itemKey="mainttypeid"
                    itemValue="maintypename"
                    action={MaintainItemAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="maintainAddData"
                      btnName="确定"
                      formName="JigMaintainGroupSettingUpdate"
                      tableName="JigMaintainAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigMaintainGroupSettingUpdate"
                    tableName="JigMaintainAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigMaintainAdd"
                    formName="JigMaintainGroupSettingUpdate"
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
          action={JigMaintainGroupSettingAPIUpdate}
          tableName={MainTableName}
          formName={MainFormName}
          paramTemplate={defaultPutParamTemplate}
        />
        <ActionBtn
          btnName="取消隐藏"
          mode="show"
          action={JigMaintainGroupSettingAPIUpdate}
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
JigMaintainGroupSetting.defaultProps = {

};
JigMaintainGroupSetting.propTypes = {

};

export default JigMaintainGroupSetting;
