import React from 'react';
import { Row, Tabs, message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import Request from '../../utils/Request';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import Select from '../../containers/SelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Input from '../../containers/InputContainer';
import ModalForm from '../../containers/ModalFormContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  modifyParamTemplate,
  dataHandler,
  SERVER_IP_JIG } from '../../constants/Settings';
import './style.less';

const TabPane = Tabs.TabPane;
const JigCheGrpSetApi = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/query`;
const JigCheGrpSetItemsApi = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/query/item`;
const JigCheGrpSetApiAdd = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/add`;
const JigCheGrpSetApiPut = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/update`;
const JigGroupAPI = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/query/item`;
const CheckItemAPI = `${SERVER_IP_JIG}/ams/jig/setting/qcitem/query/item`;


const MainFormName = 'JigCheckGroupSettingForm';
const MainTableName = 'JigCheckGroupSettingTable';

const targetKeyModify = ['qcGroupCode', 'qcGroupName', 'jigTypeGroupId', 'lastUpdateBy', 'qcGroupDets', 'id'];
const targetKeyCopy = ['qcGroupCode', 'qcGroupName', 'jigTypeGroupId', 'createBy', 'qcGroupDets'];

const updateSelectName = { name: 'qcGroupName', itemKey: 'name', itemValue: 'name', action: JigCheGrpSetItemsApi, dataSourceTemplate: defaultDataSourceTemplate };
const updateSelectCode = { name: 'qcGroupCode', itemKey: 'code', itemValue: 'code', action: JigCheGrpSetItemsApi, dataSourceTemplate: defaultDataSourceTemplate };

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
  const url = CheckItemAPI;
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
  delete data.qcItemId;
  delete data.qcItemlimitMax;
  delete data.qcItemTargetLine;
  delete data.qcItemLimitMin;
  delete data.qcItemTimes;
  delete data.targetLine;
  delete data.limitMax;
  delete data.limitMin;
  delete data.times;
  delete data.qcItem;
  delete data.qcGroupDets;
  const local = [];
  dataSource.map((v) => {
    local.push({ qcItemId: v.qcItemId, qcItemlimitMax: v.qcItemlimitMax, qcItemTargetLine: v.qcItemTargetLine, qcItemLimitMin: v.qcItemLimitMin, qcItemTimes: v.qcItemTimes });
  });
  localStorage.setItem('localDataSource', JSON.stringify(local));
  dataSource.map((v) => {
    delete v.editable;
    delete v.targetLine;
    delete v.limitMax;
    delete v.limitMin;
    delete v.times;
    delete v.qcItem;
    delete v.createBy;
    delete v.jigTypeGroupId;
    delete v.qcGroupName;
    delete v.qcGroupCode;
    delete v.qcGroupDets;
  });

  const targetData = {
    ...data,
    qcGroupDets: dataSource || [],
  };
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
  delete data.qcItem;
  delete data.targetLine;
  delete data.limitMax;
  delete data.limitMin;
  delete data.times;
  delete data.id;
  delete data.qcItemlimitMax;
  delete data.qcItemTargetLine;
  delete data.qcItemLimitMin;
  delete data.qcItemTimes;
  delete data.qcGroupCode;
  const temp = param.qcGroupDets;
  const local = [];
  temp.map((v) => {
    local.push({ qcItemId: v.qcItemId, qcItemlimitMax: v.qcItemlimitMax, qcItemTargetLine: v.qcItemTargetLine, qcItemLimitMin: v.qcItemLimitMin, qcItemTimes: v.qcItemTimes });
  });
  localStorage.setItem('localDataSource', JSON.stringify(local));
  const target = [];
  temp.map((v) => {
    if (v.flag !== null) {
      if (v.flag === 1) {
        v.qcItemlimitMax = parseInt(v.qcItemlimitMax);
        v.qcItemTargetLine = parseInt(v.qcItemTargetLine);
        v.qcItemLimitMin = parseInt(v.qcItemLimitMin);
        v.qcItemTimes = parseInt(v.qcItemTimes);
        target.push(v);
      }
      if (v.flag === 2) {
        target.push({ id: v.id, qcItemlimitMax: v.qcItemlimitMax, qcItemTargetLine: v.qcItemTargetLine, qcItemLimitMin: v.qcItemLimitMin, qcItemTimes: v.qcItemTimes, flag: v.flag });
      }
      if (v.flag === 3) {
        target.push({ id: v.id, flag: v.flag });
      }
    }
  });
  const targetData = {
    ...data,
    qcGroupDets: target || [],
  };
  const data1 = dataHandler(targetData);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'Modify',
    value: dataStr || [],
  };
};

const selData = [
  {
    id: 'Y',
    name: '显示项',
  }, {
    id: 'N',
    name: '隐藏项',
  },
];
const TabscolumnsAdd = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '检测项目名称',
  dataIndex: 'qcItemId',
  key: 'qcItemId',
  render: (text) => {
    let name;
    items.map((value) => {
      if (value.id === text) {
        name = value.name;
      }
    });
    return name;
  },
}, {
  title: '标准值上限',
  dataIndex: 'qcItemlimitMax',
  key: 'qcItemlimitMax',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingAdd"
          name="qcItemlimitMax"
        />
      </div>
    );
  },
}, {
  title: '目标线',
  dataIndex: 'qcItemTargetLine',
  key: 'qcItemTargetLine',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingAdd"
          name="qcItemTargetLine"
        />
      </div>
    );
  },
}, {
  title: '标准值下限',
  dataIndex: 'qcItemLimitMin',
  key: 'qcItemLimitMin',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingAdd"
          name="qcItemLimitMin"
        />
      </div>
    );
  },
}, {
  title: '检测次数',
  dataIndex: 'qcItemTimes',
  key: 'qcItemTimes',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingAdd"
          name="qcItemTimes"
        />
      </div>
    );
  },
}, {
  title: '操作',
  key: 'index',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            formName="JigCheckGroupSettingAdd"
            needForName="JigCheckGroupSettingAdd"
            needData="qcItemId"
            record={record}
            noResponse
          />
        }
      </div>
    );
  },
}];
const TabscolumnsCopy = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '检测项目名称',
  dataIndex: 'qcItemId',
  key: 'qcItemId',
  render: (text) => {
    let name;
    items.map((value) => {
      if (value.id === text) {
        name = value.name;
      }
    });
    return name;
  },
}, {
  title: '标准值上限',
  dataIndex: 'qcItemlimitMax',
  key: 'qcItemlimitMax',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingCopy"
          name="qcItemlimitMax"
        />
      </div>
    );
  },
}, {
  title: '目标线',
  dataIndex: 'qcItemTargetLine',
  key: 'qcItemTargetLine',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingCopy"
          name="qcItemTargetLine"
        />
      </div>
    );
  },
}, {
  title: '标准值下限',
  dataIndex: 'qcItemLimitMin',
  key: 'qcItemLimitMin',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingCopy"
          name="qcItemLimitMin"
        />
      </div>
    );
  },
}, {
  title: '检测次数',
  dataIndex: 'qcItemTimes',
  key: 'qcItemTimes',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingCopy"
          name="qcItemTimes"
        />
      </div>
    );
  },
}, {
  title: '操作',
  key: 'index',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            formName="JigCheckGroupSettingCopy"
            needForName="JigCheckGroupSettingCopy"
            needData="qcItemId"
            record={record}
            noResponse
          />
        }
      </div>
    );
  },
}];
const TabscolumnsUpdate = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '检测项目名称',
  dataIndex: 'qcItemId',
  key: 'qcItemId',
  render: (text) => {
    let name;
    items.map((value) => {
      if (value.id === text) {
        name = value.name;
      }
    });
    return name;
  },
}, {
  title: '标准值上限',
  dataIndex: 'qcItemlimitMax',
  key: 'qcItemlimitMax',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingUpdate"
          name="qcItemlimitMax"
        />
      </div>
    );
  },
}, {
  title: '目标线',
  dataIndex: 'qcItemTargetLine',
  key: 'qcItemTargetLine',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingUpdate"
          name="qcItemTargetLine"
        />
      </div>
    );
  },
}, {
  title: '标准值下限',
  dataIndex: 'qcItemLimitMin',
  key: 'qcItemLimitMin',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingUpdate"
          name="qcItemLimitMin"
        />
      </div>
    );
  },
}, {
  title: '检测次数',
  dataIndex: 'qcItemTimes',
  key: 'qcItemTimes',
  render: (text, record) => {
    const { editable } = record;
    return (
      <div className="tabEditableCell">
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="JigCheckGroupSettingUpdate"
          name="qcItemTimes"
        />
      </div>
    );
  },
}, {
  title: '操作',
  key: 'index',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            formName="JigCheckGroupSettingUpdate"
            needForName="JigCheckGroupSettingUpdate"
            needData="qcItemId"
            record={record}
            noResponse
          />
        }
      </div>
    );
  },
}];
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, render, index) => (index + 1),
  }, {
    title: '群组代码',
    dataIndex: 'qcGroupCode',
    key: 'qcGroupCode',
  }, {
    title: '群组名称',
    dataIndex: 'qcGroupName',
    index: 'qcGroupName',
  }, {
    title: '治具群组',
    dataIndex: 'jigTypeGroupId',
    key: 'jigTypeGroupId',
    render: (text, record) => record.jigTypeGroupName,
  }, {
    title: '最后修改时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
  }, {
    title: '最后修改人员',
    dataIndex: 'lastUpdateBy',
    index: 'lastUpdateBy',
  }];

const JigCheckGroupSetting = (props) => {
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
    name: '治工具检验群组设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="治工具检验群组设定" />
      <FormContainer
        name={MainFormName}
        action={JigCheGrpSetApi}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        dataSourceTemplate={defaultDataSourceTemplate}
        filters={defaultRequestFilters}
      >
        <div className={'searchCondition'}>
          <label htmlFor="qcGroupCode" className={'label'}>群组代码</label>

          <span className={'select'}>
            <Select
              name="qcGroupCode"
              className={'select'}
              itemKey="code"
              itemValue="code"
              action={JigCheGrpSetItemsApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
              id="123"
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="input" className={'label'}>群组名称</label>
          <span className={'select'}>
            <Select
              name="qcGroupName"
              className={'select'}
              itemKey="name"
              itemValue="name"
              action={JigCheGrpSetItemsApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
              id="456"
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
              defaultValue="显示项"
              defaultKey="Y"
              data={selData}
              load="true"
            />
          </span>
        </div>
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <div className={'divBtn'}>
        <Modal name="JigCheckGroupSettingAdd" btnName="新增" title="新增" >
          <ModalForm
            name="JigCheckGroupSettingAdd"
            needForName="JigCheckGroupSettingAdd"
            action={JigCheGrpSetApiAdd}
            method="POST"
            filters={defaultRequestFilters}
            dataTemplate={defaultJigPostDataTemplate}
            modalName="JigCheckGroupSettingAdd"
            formName={MainFormName}
            mode="AddNew"
            updateSelect={updateSelectName}
            updateSelectCode={updateSelectCode}
            checkTemplate={checkTemplate}
            getLocalData
          >

            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="qcGroupCode">群组代码</label>
                  <Input type="text" name="qcGroupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="qcGroupName">群组名称</label>
                  <Input type="text" name="qcGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <Select
                    name="jigTypeGroupId"
                    className={'select'}
                    itemKey="id"
                    itemValue="groupname"
                    action={JigGroupAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="createBy">创建人员</label>
                  <Input type="text" name="createBy" value="Admin" disabled />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
              <TabPane tab="详细" key="2" className="Tabstyle" >
                <Row>
                  <label htmlFor="qcItemId">检测项目</label>
                  <Select
                    name="qcItem"
                    className={'select'}
                    itemKey="id"
                    itemValue="name"
                    action={CheckItemAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                </Row>
                <Row>
                  <label htmlFor="qcItemlimitMax">标准值上限</label>
                  <Input type="text" name="limitMax" />
                </Row>
                <Row>
                  <label htmlFor="qcItemTargetLine">目标线</label>
                  <Input type="text" name="targetLine" />
                </Row>
                <Row>
                  <label htmlFor="qcItemLimitMin">标准值下限</label>
                  <Input type="text" name="limitMin" />
                </Row>
                <Row>
                  <label htmlFor="qcItemTimes">检测次数</label>
                  <Input type="text" name="times" />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="checkAddData"
                      btnName="确定"
                      formName="JigCheckGroupSettingAdd"
                      tableName="JigCheckAdd"
                    />
                  </div>
                </Row>
                <div className="checkTabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigCheckGroupSettingAdd"
                    tableName="JigCheckAdd"
                  />
                </div>
                <div className="tabEditableCell">
                  <TableContainer
                    name="JigCheckAdd"
                    formName="JigCheckGroupSettingAdd"
                    columns={TabscolumnsAdd}
                    nopagination
                  />
                </div>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
            </Tabs>
          </ModalForm>
        </Modal>

        <Modal
          name="JigCheckGroupSettingCopy"
          formName={MainFormName}
          tableName={MainTableName}
          load="true"
          tarKey={targetKeyCopy}
          btnName="复制"
          title="复制"
        >
          <ModalForm
            name="JigCheckGroupSettingCopy"
            needForName="JigCheckGroupSettingCopy"
            action={JigCheGrpSetApiAdd}
            method="POST"
            filters={defaultRequestFilters}
            dataTemplate={defaultJigPostDataTemplate}
            modalName="JigCheckGroupSettingCopy"
            formName={MainFormName}
            tableName={MainTableName}
            mode="Copy"
            keepDataSource
            updateSelect={updateSelectName}
            updateSelectCode={updateSelectCode}
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="qcGroupCode">群组代码</label>
                  <Input type="text" name="qcGroupCode" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="qcGroupName">群组名称</label>
                  <Input type="text" name="qcGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <Select
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
                  <Input type="text" name="createBy" value="Admin" disabled />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
              <TabPane tab="详细" key="2" className="Tabstyle" >
                <Row>
                  <label htmlFor="qcItemId">检测项目</label>
                  <Select
                    name="qcItem"
                    className={'select'}
                    itemKey="id"
                    itemValue="name"
                    action={CheckItemAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                </Row>
                <Row>
                  <label htmlFor="qcItemlimitMax">标准值上限</label>
                  <Input type="text" name="limitMax" />
                </Row>
                <Row>
                  <label htmlFor="qcItemTargetLine">目标线</label>
                  <Input type="text" name="targetLine" />
                </Row>
                <Row>
                  <label htmlFor="qcItemLimitMin">标准值下限</label>
                  <Input type="text" name="limitMin" />
                </Row>
                <Row>
                  <label htmlFor="qcItemTimes">检测次数</label>
                  <Input type="text" name="times" />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="checkAddData"
                      btnName="确定"
                      formName="JigCheckGroupSettingCopy"
                      tableName="JigCheckAdd"
                    />
                  </div>
                </Row>
                <div className="checkTabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigCheckGroupSettingCopy"
                    tableName="JigCheckAdd"
                  />
                </div>
                <div className="tabEditableCell">
                  <TableContainer
                    name="JigCheckAdd"
                    formName="JigCheckGroupSettingCopy"
                    columns={TabscolumnsCopy}
                    nopagination
                  />
                </div>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
            </Tabs>
          </ModalForm>
        </Modal>
        <Modal
          name="JigCheckGroupSettingUpdate"
          formName={MainFormName}
          tableName={MainTableName}
          load="true"
          tarKey={targetKeyModify}
          btnName="修改"
          title="修改"
        >
          <ModalForm
            name="JigCheckGroupSettingUpdate"
            needForName="JigCheckGroupSettingUpdate"
            action={JigCheGrpSetApiPut}
            method="PUT"
            filters={defaultRequestFilters}
            paramTemplate={modifyParamTemplate}
            dataTemplate={defaultJigPutDataTemplate}
            modalName="JigCheckGroupSettingUpdate"
            formName={MainFormName}
            tableName={MainTableName}
            mode="Modify"
            keepDataSource
            updateSelect={updateSelectName}
            updateSelectCode={updateSelectCode}
            checkTemplate={checkTemplate}
            getLocalData
          >
            <Tabs type="card">
              <TabPane tab="主要" key="1" className="Tabstyle">
                <Row>
                  <label htmlFor="qcGroupCode">群组代码</label>
                  <Input type="text" name="qcGroupCode" disabled />
                </Row>
                <Row>
                  <label htmlFor="qcGroupName">群组名称</label>
                  <Input type="text" name="qcGroupName" />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
                </Row>
                <Row>
                  <label htmlFor="jigTypeGroupId">治具群组</label>
                  <Select
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
                  <label htmlFor="lastUpdateBy">修改人员</label>
                  <Input type="text" name="lastUpdateBy" />
                </Row>
                <Row className="submitBtn">
                  <input type="submit" value="Submit" />
                </Row>
              </TabPane>
              <TabPane tab="详细" key="2" className="Tabstyle" >
                <Row>
                  <label htmlFor="qcItemId">检测项目</label>
                  <Select
                    name="qcItem"
                    className={'select'}
                    itemKey="id"
                    itemValue="name"
                    action={CheckItemAPI}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load="true"
                  />
                </Row>
                <Row>
                  <label htmlFor="qcItemlimitMax">标准值上限</label>
                  <Input type="text" name="limitMax" />
                </Row>
                <Row>
                  <label htmlFor="qcItemTargetLine">目标线</label>
                  <Input type="text" name="targetLine" />
                </Row>
                <Row>
                  <label htmlFor="qcItemLimitMin">标准值下限</label>
                  <Input type="text" name="limitMin" />
                </Row>
                <Row>
                  <label htmlFor="qcItemTimes">检测次数</label>
                  <Input type="text" name="times" />
                  <div className="sureBtn">
                    <ActionBtn
                      mode="checkAddData"
                      btnName="确定"
                      formName="JigCheckGroupSettingUpdate"
                      tableName="JigCheckAdd"
                    />
                  </div>
                </Row>
                <div className="checkTabBtn">
                  <ActionBtn
                    mode="delData"
                    btnName="删除"
                    formName="JigCheckGroupSettingUpdate"
                    tableName="JigCheckAdd"
                  />
                </div>
                <div className="tabEditableCell">
                  <TableContainer
                    name="JigCheckAdd"
                    formName="JigCheckGroupSettingUpdate"
                    columns={TabscolumnsUpdate}
                    nopagination
                  />
                </div>
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
          action={JigCheGrpSetApiPut}
          tableName={MainTableName}
          formName={MainFormName}
          paramTemplate={defaultPutParamTemplate}
        />
        <ActionBtn
          btnName="取消隐藏"
          mode="show"
          action={JigCheGrpSetApiPut}
          tableName={MainTableName}
          formName={MainFormName}
          paramTemplate={defaultPutParamTemplate}
        />
      </div>
      <TableContainer name={MainTableName} formName="JigCheckGroupSettingForm" columns={columns} />
    </div>
  );
};
JigCheckGroupSetting.defaultProps = {

};
JigCheckGroupSetting.propTypes = {

};

export default JigCheckGroupSetting;
