/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  modifyPostDataTemplate,
  modifyParamTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import './style.less';
const JigMaintSetItemsApi = `${SERVER_IP_JIG}/ams/jig/base/mainttype/query/item`;

const JigMaintainSettingAPI = `${SERVER_IP_JIG}/ams/jig/base/mainttype/query`;
const JigMaintainSettingAdd = `${SERVER_IP_JIG}/ams/jig/base/mainttype/add`;
const JigMaintainSettingUpdate = `${SERVER_IP_JIG}/ams/jig/base/mainttype/update`;

const targetKeyCopy = ['maintItemCode', 'maintItemName', 'maintItemDesc'];
const targetKeyUpdate = ['maintItemCode', 'maintItemName', 'maintItemDesc', 'id'];

const defaultPostDataTemplateCopy = (param) => {
  const { ...data } = param;
  const dataAdd = { createBy: 'admin', lastUpdateBy: 'admin' };
  const datas = { ...dataAdd, ...data };
  const dataStr1 = JSON.stringify(datas);
  const dataStr = `[${dataStr1}]`;
  // const dataStr = [data];
  return {
    mode: 'AddNew',
    value: dataStr || [],
  };
};
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '保养项目代码',
    dataIndex: 'maintItemCode',
    key: 'maintItemCode',
  }, {
    title: '保养项目名称',
    dataIndex: 'maintItemName',
    key: 'maintItemName',
  }, {
    title: '保养项目说明',
    dataIndex: 'maintItemDesc',
    key: 'maintItemDesc',
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
  dataIndex: '',
  key: '',
}];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const selData = [{
  id: '1',
  name: '治具群组1',
}, {
  id: '2',
  name: '治具群组2',
}];
const JigMaintainSetting = (props) => {
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
    name: '治工具保养项目设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="治工具保养项目设定" />
      <FormContainer
        name="MaintainForm"
        action={JigMaintainSettingAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="maintItemCode" className={'label'}>保养项目代码</label>
          <span className={'select'}>
            <Select
              name="maintItemCode"
              className={'select'}
              itemKey="maintypecode"
              itemValue="maintypecode"
              action={JigMaintSetItemsApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="maintItemName" className={'label'}>保养项目名称</label>
          <span className={'select'}>
            <Select
              name="maintItemName"
              className={'select'}
              itemKey="maintypename"
              itemValue="maintypename"
              action={JigMaintSetItemsApi}
              dataSourceTemplate={defaultDataSourceTemplate}
              load="true"
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
        <Modal name="MaintainAdd" btnName="新增" title="新增" >
          <ModalForm
            name="MaintainAdd"
            action={JigMaintainSettingAdd}
            method="POST"
            filters={defaultRequestFilters}
            dataTemplate={defaultPostDataTemplate}
            formName="MaintainForm"
            modalName="MaintainAdd"
            mode="AddNew"
          >
            <div className={'modalStyle'}>
              <Row>
                <label htmlFor="maintItemCode">项目代码</label>
                <InputContainer type="text" name="maintItemCode" />
              </Row>
              <Row>
                <label htmlFor="maintItemName">项目名称</label>
                <InputContainer type="text" name="maintItemName" />
              </Row>
              <Row>
                <label htmlFor="maintItemDesc">群组描述</label>
                <InputContainer type="text" name="maintItemDesc" />
              </Row>
              <Row>
                <label htmlFor="createBy">创建人员</label>
                <InputContainer type="text" name="createBy" value="Admin" disabled />
              </Row>
              <Row>
                <label htmlFor="lastUpdateBy">最后修改人员</label>
                <InputContainer type="text" name="lastUpdateBy" value="Admin" disabled />
              </Row>
              <Row className="submitBtn">
                <input type="submit" value="Submit" />
              </Row>
            </div>
          </ModalForm>
        </Modal>
        <Modal
          name="MaintainCopy"
          btnName="复制"
          title="复制"
          load="true"
          tarKey={targetKeyCopy}
          formName="MaintainForm"
          tableName="MaintainTab"
        >
          <ModalForm
            name="MaintainCopy"
            action={JigMaintainSettingAdd}
            method="POST"
            dataTemplate={defaultPostDataTemplateCopy}
            formName="MaintainForm"
            filters={defaultRequestFilters}
            modalName="MaintainCopy"
            tableName="MaintainTab"

          >
            <div className={'modalStyle'}>
              <Row>
                <label htmlFor="maintItemCode">项目代码</label>
                <InputContainer type="text" name="maintItemCode" />
              </Row>
              <Row>
                <label htmlFor="maintItemName">项目名称</label>
                <InputContainer type="text" name="maintItemName" />
              </Row>
              <Row>
                <label htmlFor="maintItemDesc">群组描述</label>
                <InputContainer type="text" name="maintItemDesc" />
              </Row>
              <Row className="submitBtn">
                <input type="submit" value="Submit" />
              </Row>
            </div>
          </ModalForm>
        </Modal>
        <Modal
          name="MaintainUpdate"
          formName="MaintainForm"
          tableName="MaintainTab"
          btnName="修改"
          title="修改"
          load="true"
          tarKey={targetKeyUpdate}
        >
          <ModalForm
            name="MaintainUpdate"
            modalName="MaintainUpdate"
            action={JigMaintainSettingUpdate}
            method="PUT"
            paramTemplate={modifyParamTemplate}
            dataTemplate={modifyPostDataTemplate}
            filters={defaultRequestFilters}
            formName="MaintainForm"
            tableName="MaintainTab"
            mode="Modify"
          >
            <div className={'modalStyle'}>
              <Row>
                <label htmlFor="maintItemCode">项目代码</label>
                <InputContainer type="text" name="maintItemCode" disabled />
              </Row>
              <Row>
                <label htmlFor="maintItemName">项目名称</label>
                <InputContainer type="text" name="maintItemName" />
              </Row>
              <Row>
                <label htmlFor="maintItemDesc">群组描述</label>
                <InputContainer type="text" name="maintItemDesc" />
              </Row>
              <Row className="submitBtn">
                <input type="submit" value="Submit" />
              </Row>
            </div>
          </ModalForm>
        </Modal>
        <ActionBtn
          btnName="刷新"
          mode="refresh"
          action={JigMaintainSettingUpdate}
          tableName="MaintainTab"
          formName="MaintainForm"
          paramTemplate={defaultPutParamTemplate}
          clearRowsKeys=""
        />
        <ActionBtn
          btnName="隐藏"
          mode="hide"
          action={JigMaintainSettingUpdate}
          tableName="MaintainTab"
          formName="MaintainForm"
          paramTemplate={defaultPutParamTemplate}
        />
        <ActionBtn
          btnName="取消隐藏"
          mode="show"
          action={JigMaintainSettingUpdate}
          tableName="MaintainTab"
          formName="MaintainForm"
          paramTemplate={defaultPutParamTemplate}
        />
      </div>
      <TableContainer name="MaintainTab" formName="MaintainForm" columns={columns} />
    </div>
  );
};
JigMaintainSetting.defaultProps = {

};
JigMaintainSetting.propTypes = {

};

export default JigMaintainSetting;
