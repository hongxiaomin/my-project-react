/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row, Tabs } from 'antd';
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

const JigTypeGroupSettingAPI = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/query`;
const JigTypeGroupSettingAPIAdd = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/add`;
const JigTypeGroupSettingAPIUpdate = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/update`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const JigTypeGroupSettingSelectApi = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/query/item`;

const MainFormName = 'JigTypeGroupSettingForm';
const MainTableName = 'JigTypeGroupSettingTable';
const targetKeyModify = ['groupCode', 'groupName', 'groupDesc', 'lastUpdateBy', 'jigGroupDtls', 'id'];
const targetKeyCopy = ['groupCode', 'groupName', 'groupDesc', 'createBy', 'jigGroupDtls'];

let items;
const getItemData = () => {
  const data = null;
  const url = JigTypeAPI;
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
  const targetData = {
    ...data,
    jigGroupDtls: dataSource || [],
  };
  const local = [];
  dataSource.map((v) => {
    local.push({ jigTypeId: v.jigTypeId });
  });
  localStorage.setItem('localDataSource', JSON.stringify(local));
  delete targetData.jigTypeId;
  const data1 = dataHandler(targetData);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'AddNew',
    value: dataStr || [],
  };
};

const defaultJigPutDataTemplate = (param) => {
  const { ...data } = param;
  const temp = param.jigGroupDtls;
  const local = [];
  temp.map((v) => {
    local.push({ jigTypeId: v.jigTypeId });
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
    jigGroupDtls: target || [],
  };
  delete targetData.id;
  const data1 = dataHandler(targetData);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  const { ...dat } = { id: param.id };
  return {
    condition: dat ? [dat] : [],
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
    dataIndex: 'groupCode',
    key: 'groupCode',
  }, {
    title: '群组名称',
    dataIndex: 'groupName',
    key: 'groupName',
  }, {
    title: '群组说明',
    dataIndex: 'groupDesc',
    key: 'groupDesc',
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
  title: '治具类型',
  dataIndex: 'jigTypeId',
  key: 'jigTypeId',
  render: (text) => {
    // geItemData();
    let name;
    items.map((value) => {
      if (value.id === text) {
        name = value.name;
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
const JigTypeGroupSetting = (props) => {
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
    name: '治工具类型群组设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="治工具类型群组设定" />
      <FormContainer
        name={MainFormName}
        action={JigTypeGroupSettingAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="groupCode" className={'label'}>群组代码</label>
          <span className={'select'}>
            <Select
              name="groupCode"
              className={'select'}
              itemKey="code"
              itemValue="code"
              action={JigTypeGroupSettingSelectApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="groupName" className={'label'}>群组名称</label>
          <span className={'select'}>
            <Select
              name="groupName"
              className={'select'}
              itemKey="name"
              itemValue="name"
              action={JigTypeGroupSettingSelectApi}
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
        <Modal name="JigTypeGroupSettingAdd" btnName="新增" title="新增" >
          <ModalForm
            name="JigTypeGroupSettingAdd"
            needForName="JigTypeGroupSettingAdd"
            action={JigTypeGroupSettingAPIAdd}
            method="POST"
            dataTemplate={defaultJigPostDataTemplate}
            filters={defaultRequestFilters}
            modalName="JigTypeGroupSettingAdd"
            formName={MainFormName}
            mode="AddNew"
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="groupCode">群组代码</label>
                  <InputContainer type="text" name="groupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="groupName">群组名称</label>
                  <InputContainer type="text" name="groupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="groupDesc">群组说明</label>
                  <InputContainer type="text" name="groupDesc" />
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
                  <label htmlFor="jigTypeId">治具类型</label>
                  <SelectContainer
                    name="jigTypeId"
                    className={'select'}
                    itemKey="id"
                    itemValue="name"
                    action={JigTypeAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="typeAddData"
                      btnName="确定"
                      tableName="JigTypeAdd"
                      formName="JigTypeGroupSettingAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigTypeGroupSettingAdd"
                    tableName="JigTypeAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigTypeAdd"
                    formName="JigTypeGroupSettingAdd"
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
          name="JigTypeGroupSettingCopy"
          btnName="复制"
          formName={MainFormName}
          tableName={MainTableName}
          title="复制"
          load="true"
          tarKey={targetKeyCopy}
        >
          <ModalForm
            name="JigTypeGroupSettingCopy"
            needForName="JigTypeGroupSettingCopy"
            action={JigTypeGroupSettingAPIAdd}
            method="POST"
            dataTemplate={defaultJigPostDataTemplate}
            formName={MainFormName}
            filters={defaultRequestFilters}
            modalName="JigTypeGroupSettingCopy"
            tableName={MainTableName}
            mode="Copy"
            keepDataSource
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="groupCode">群组代码</label>
                  <InputContainer type="text" name="groupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="groupName">群组名称</label>
                  <InputContainer type="text" name="groupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="groupDesc">群组说明</label>
                  <InputContainer type="text" name="groupDesc" />
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
                  <label htmlFor="jigTypeId">治具类型</label>
                  <SelectContainer
                    name="jigTypeId"
                    className={'select'}
                    itemKey="id"
                    itemValue="name"
                    action={JigTypeAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="typeAddData"
                      btnName="确定"
                      formName="JigTypeGroupSettingCopy"
                      tableName="JigTypeAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigTypeGroupSettingCopy"
                    tableName="JigTypeAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigTypeAdd"
                    formName="JigTypeGroupSettingCopy"
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
          name="JigTypeGroupSettingUpdate"
          btnName="修改"
          formName={MainFormName}
          tableName={MainTableName}
          title="修改"
          load="true"
          tarKey={targetKeyModify}
        >
          <ModalForm
            name="JigTypeGroupSettingUpdate"
            needForName="JigTypeGroupSettingUpdate"
            modalName="JigTypeGroupSettingUpdate"
            action={JigTypeGroupSettingAPIUpdate}
            method="PUT"
            paramTemplate={modifyParamTemplate}
            dataTemplate={defaultJigPutDataTemplate}
            filters={defaultRequestFilters}
            formName={MainFormName}
            tableName={MainTableName}
            mode="Modify"
            keepDataSource
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="groupCode">群组代码</label>
                  <InputContainer type="text" name="groupCode" disabled />
                </Row>
                <Row>
                  <label htmlFor="groupName">群组名称</label>
                  <InputContainer type="text" name="groupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="groupDesc">群组说明</label>
                  <InputContainer type="text" name="groupDesc" />
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
                  <label htmlFor="jigTypeId">治具类型</label>
                  <SelectContainer
                    name="jigTypeId"
                    className={'select'}
                    itemKey="id"
                    itemValue="name"
                    action={JigTypeAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="typeAddData"
                      btnName="确定"
                      formName="JigTypeGroupSettingUpdate"
                      tableName="JigTypeAdd"
                    />
                  </div>
                </Row>
                <div className="tabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigTypeGroupSettingUpdate"
                    tableName="JigTypeAdd"
                  />
                </div>
                <Row>
                  <TableContainer
                    name="JigTypeAdd"
                    formName="JigTypeGroupSettingUpdate"
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
          action={JigTypeGroupSettingAPIUpdate}
          tableName={MainTableName}
          formName={MainFormName}
          paramTemplate={defaultPutParamTemplate}
        />
        <ActionBtn
          btnName="取消隐藏"
          mode="show"
          action={JigTypeGroupSettingAPIUpdate}
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
JigTypeGroupSetting.defaultProps = {

};
JigTypeGroupSetting.propTypes = {

};

export default JigTypeGroupSetting;
