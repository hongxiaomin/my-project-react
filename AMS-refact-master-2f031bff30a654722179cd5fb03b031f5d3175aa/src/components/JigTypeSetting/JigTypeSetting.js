import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  modifyPostDataTemplate,
  modifyParamTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import Select from '../../containers/SelectContainer';
import Input from '../../containers/InputContainer';


const JigTypeSettingFormApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query`;
const JigTypeSettingItemsApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const JigTypeSettingAddApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/add`;
const JigTypeSettingUpdateApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/update`;
const JigTypeSettingItemShelfApi = `${SERVER_IP_JIG}/ams/jig/setting/code/query/item?condition=[{"column":"item","value":"ShelfType","opt":"="}]`;
const QcQcGroupAPI = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/query/item`;
// const JigTypeSettingCheckBoxApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query`;
const MainFormName = 'JigTypeSettingForm';
const MainTableName = 'JigTypeSettingTable';

const targetKeyCopy = ['jigTypeCode', 'jigTypeName', 'jigTypeDesc', 'shelfType', 'lifeCycle', 'lifeCyclePreAlert', 'usageCounterPreAlert', 'usageCounterAlert', 'needDockingInv', 'needIQC', 'needQC', 'qcIqcGroupId', 'qcQcGroupId', 'needMaintainBefore', 'needMaintainAfter', 'needDetectBefore', 'needDetectAfter', 'remark', 'createBy'];
const targetKeyUpdate = ['jigTypeCode', 'jigTypeName', 'jigTypeDesc', 'shelfType', 'lifeCycle', 'lifeCyclePreAlert', 'usageCounterPreAlert', 'usageCounterAlert', 'needDockingInv', 'needIQC', 'needQC', 'qcIqcGroupId', 'qcQcGroupId', 'needMaintainBefore', 'needMaintainAfter', 'needDetectBefore', 'needDetectAfter', 'remark', 'createBy', 'id'];

const updateSelectName = { name: 'jigTypeName', itemKey: 'name', itemValue: 'name', action: JigTypeSettingItemsApi, dataSourceTemplate: defaultDataSourceTemplate };
const updateSelectCode = { name: 'jigTypeCode', itemKey: 'code', itemValue: 'code', action: JigTypeSettingItemsApi, dataSourceTemplate: defaultDataSourceTemplate };


const needDockingInv = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const needIQC = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const needQC = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const needMaintainBefore = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const needMaintainAfter = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const needDetectBefore = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const needDetectAfter = [
  { code: 'Y',
    value: '是',
  }, {
    code: 'N',
    value: '否',
  }];
const selDataShelf = [
  { code: '0',
    value: '固定',
  }, {
    code: '1',
    value: '动态',
  }];


const breadMap = [
  {
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
    name: '治工具类型设定',
  }];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '治具类型代号',
    dataIndex: 'jigTypeCode',
    key: 'jigTypeCode',
  }, {
    title: '治具类型名称',
    dataIndex: 'jigTypeName',
    index: 'jigTypeName',
  }, {
    title: '治具类型说明',
    dataIndex: 'jigTypeDesc',
    index: 'jigTypeDesc',
  }, {
    title: '生命周期',
    dataIndex: 'lifeCycle',
    index: 'lifeCycle',
  }, {
    title: '是否需要管理库存',
    dataIndex: 'needDockingInv',
    index: 'needDockingInv',
    render: (text, render, index) => {
      if (text === 'N') {
        return '否';
      } else if (text === 'Y') {
        return '是';
      }
    },
  }, {
    title: '需进料检测',
    dataIndex: 'needIQC',
    index: 'needIQC',
    render: (text, render, index) => {
      if (text === 'N') {
        return '否';
      } else if (text === 'Y') {
        return '是';
      }
    },
  }, {
    title: '进料检验群组',
    dataIndex: 'qcIqcGroupName',
    index: 'qcIqcGroupName',
  }, {
    title: '需检验量测',
    dataIndex: 'needQC',
    index: 'needQC',
    render: (text, render, index) => {
      if (text === 'N') {
        return '否';
      } else if (text === 'Y') {
        return '是';
      }
    },
  }, {
    title: '品质检测群组',
    dataIndex: 'qcQcGroupName',
    index: 'qcQcGroupName',
  }, {
    title: '架位类型',
    dataIndex: 'shelfType',
    index: 'shelfType', // 0 是
    render: (text, render, index) => {
      if (text === 0) {
        return '固定';
      } else if (text === 1) {
        return '动态';
      }
    },
  }, {
    title: '备注',
    dataIndex: 'remark',
    index: 'remark',
  }];
const selData = [
  {
    id: 'Y',
    name: '显示项',
  }, {
    id: 'N',
    name: '隐藏项',
  },
];
const JigTypeSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="治工具类型设定" />
    <FormContainer
      name={MainFormName}
      action={JigTypeSettingFormApi}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="jigTypeCode" className={'label'}>治具类型代号</label>
        <span className={'select'}>
          <Select
            name="jigTypeCode"
            className={'select'}
            itemKey="code"
            itemValue="code"
            action={JigTypeSettingItemsApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
            id="123"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="jigTypeName" className={'label'}>治具类型名称</label>
        <span className={'select'}>
          <Select
            name="jigTypeName"
            className={'select'}
            itemKey="name"
            itemValue="name"
            action={JigTypeSettingItemsApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
            id="456"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="shelfType" className={'label'}>架位类型</label>
        <span className={'select'}>
          <Select
            name="shelfType"
            className={'select'}
            itemKey="code"
            itemValue="value"
            action={JigTypeSettingItemShelfApi}
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
            data={selData}
            load="true"
            defaultKey="Y"
            defaultValue="显示项"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="JigTypeSettingAdd" btnName="新增" title="新增" >
        <ModalForm
          name="JigTypeSettingAdd"
          needForName="JigTypeSettingAdd"
          action={JigTypeSettingAddApi}
          method="POST"
          dataTemplate={defaultPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="JigTypeSettingAdd"
          // tableName={MainTableName}
          mode="AddNew"
          updateSelect={updateSelectName}
          updateSelectCode={updateSelectCode}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="jigTypeCode">治具类型代码</label>
              <Input type="text" name="jigTypeCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="jigTypeName">治具类型名称</label>
              <Input type="text" name="jigTypeName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="jigTypeDesc">治具类型说明</label>
              <Input type="text" name="jigTypeDesc" />
            </Row>

            <Row className={'selectLabel'}>
              <label htmlFor="shelfType">架位类型</label>
              <Select
                name="shelfType"
                itemKey="code"
                itemValue="value"
                data={selDataShelf}
                load="true"
              />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="lifeCycle">使用寿命</label>
              <Input type="text" name="lifeCycle" />
            </Row>
            <Row>
              <label htmlFor="lifeCyclePreAlert">使用寿命预警</label>
              <Input type="text" name="lifeCyclePreAlert" />
            </Row>
            <Row>
              <label htmlFor="usageCounterPreAlert">使用次数预警</label>
              <Input type="text" name="usageCounterPreAlert" />
            </Row>
            <Row>
              <label htmlFor="usageCounterAlert">使用次数报警</label>
              <Input type="text" name="usageCounterAlert" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDockingInv">是否管理库存</label>
              <Select
                name="needDockingInv"
                itemKey="code"
                itemValue="value"
                data={needDockingInv}
                load="true"
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needIQC">是否需要进料检验</label>
              <Select
                name="needIQC"
                itemKey="code"
                itemValue="value"
                data={needIQC}
                load="true"
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needQC">是否需要检验</label>
              <Select
                name="needQC"
                itemKey="code"
                itemValue="value"
                data={needQC}
                load="true"
              />
            </Row>

            <Row>
              <label htmlFor="qcIqcGroupId">进料检验群组</label>
              <span className="select" style={{ left: '115px' }}>
                <Select
                  name="qcIqcGroupId"
                  itemKey="id"
                  itemValue="name"
                  action={QcQcGroupAPI}
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="qcQcGroupId">品质检测群组</label>
              <span className="select" style={{ left: '115px' }}>
                <Select
                  name="qcQcGroupId"
                  itemKey="id"
                  itemValue="name"
                  action={QcQcGroupAPI}
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needMaintainBefore">是否使用前保养</label>
              <Select
                name="needMaintainBefore"
                itemKey="code"
                itemValue="value"
                data={needMaintainBefore}
                load="true"
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needMaintainAfter">是否使用后保养</label>
              <Select
                name="needMaintainAfter"
                itemKey="code"
                itemValue="value"
                data={needMaintainAfter}
                load="true"
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDetectBefore">是否使用前检测</label>
              <Select
                name="needDetectBefore"
                itemKey="code"
                itemValue="value"
                data={needDetectBefore}
                load="true"
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDetectAfter">是否使用后检测</label>
              <Select
                name="needDetectAfter"
                itemKey="code"
                itemValue="value"
                data={needDetectAfter}
                load="true"
              />
            </Row>
            <Row>
              <label htmlFor="remark">备注</label>
              <Input type="text" name="remark" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" value="admin" disabled />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>

        </ModalForm>
      </Modal>
      <Modal
        name="JigTypeSettingCopy"
        btnName="复制"
        title="复制"
        load="true"
        tarKey={targetKeyCopy}
        formName={MainFormName}
        tableName={MainTableName}
      >

        <ModalForm
          name="JigTypeSettingCopy"
          action={JigTypeSettingAddApi}
          method="POST"
          dataTemplate={defaultPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="JigTypeSettingCopy"
          tableName={MainTableName}
          updateSelect={updateSelectName}
          updateSelectCode={updateSelectCode}

        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="jigTypeCode">治具类型代码</label>
              <Input type="text" name="jigTypeCode" />
            </Row>
            <Row>
              <label htmlFor="jigTypeName">治具类型名称</label>
              <Input type="text" name="jigTypeName" />
            </Row>
            <Row>
              <label htmlFor="jigTypeDesc">治具类型说明</label>
              <Input type="text" name="jigTypeDesc" />
            </Row>

            <Row className={'selectLabel'}>
              <label htmlFor="shelfType">架位类型</label>
              <Select
                name="shelfType"
                itemKey="code"
                itemValue="value"
                data={selDataShelf}
                load="true"
                init
              />
            </Row>
            <Row>
              <label htmlFor="lifeCycle">使用寿命</label>
              <Input type="text" name="lifeCycle" />
            </Row>
            <Row>
              <label htmlFor="lifeCyclePreAlert">使用寿命预警</label>
              <Input type="text" name="lifeCyclePreAlert" />
            </Row>
            <Row>
              <label htmlFor="usageCounterPreAlert">使用次数预警</label>
              <Input type="text" name="usageCounterPreAlert" />
            </Row>
            <Row>
              <label htmlFor="usageCounterAlert">使用次数报警</label>
              <Input type="text" name="usageCounterAlert" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDockingInv">是否管理库存</label>
              <Select
                name="needDockingInv"
                itemKey="code"
                itemValue="value"
                data={needDockingInv}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needIQC">是否需要进料检验</label>
              <Select
                name="needIQC"
                itemKey="code"
                itemValue="value"
                data={needIQC}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needQC">是否需要检验</label>
              <Select
                name="needQC"
                itemKey="code"
                itemValue="value"
                data={needQC}
                load="true"
                init
              />
            </Row>

            <Row className={'selectLabel'}>
              <label htmlFor="qcIqcGroupId">进料检验群组</label>
              <span className="select" style={{ left: '115px' }}>
                <Select
                  name="qcIqcGroupId"
                  itemKey="id"
                  itemValue="name"
                  action={QcQcGroupAPI}
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                  init
                />
              </span>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="qcQcGroupId">品质检测群组</label>
              <span className="select" style={{ left: '115px' }}>
                <Select
                  name="qcQcGroupId"
                  itemKey="id"
                  itemValue="name"
                  action={QcQcGroupAPI}
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                  init
                />
              </span>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needMaintainBefore">是否使用前保养</label>
              <Select
                name="needMaintainBefore"
                itemKey="code"
                itemValue="value"
                data={needMaintainBefore}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needMaintainAfter">是否使用后保养</label>
              <Select
                name="needMaintainAfter"
                itemKey="code"
                itemValue="value"
                data={needMaintainAfter}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDetectBefore">是否使用前检测</label>
              <Select
                name="needDetectBefore"
                itemKey="code"
                itemValue="value"
                data={needDetectBefore}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDetectAfter">是否使用后检测</label>
              <Select
                name="needDetectAfter"
                itemKey="code"
                itemValue="value"
                data={needDetectAfter}
                load="true"
                init
              />
            </Row>
            <Row>
              <label htmlFor="remark">备注</label>
              <Input type="text" name="remark" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" value="admin" disabled />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>

        </ModalForm>
      </Modal>

      <Modal
        name="JigTypeSettingUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="JigTypeSettingUpdate"
          modalName="JigTypeSettingUpdate"
          action={JigTypeSettingUpdateApi}
          method="PUT"
          paramTemplate={modifyParamTemplate}
          dataTemplate={modifyPostDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
          updateSelect={updateSelectName}
          updateSelectCode={updateSelectCode}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="jigTypeCode">治具类型代码</label>
              <Input type="text" name="jigTypeCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="jigTypeName">治具类型名称</label>
              <Input type="text" name="jigTypeName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="jigTypeDesc">治具类型说明</label>
              <Input type="text" name="jigTypeDesc" />
            </Row>

            <Row className={'selectLabel'}>
              <label htmlFor="shelfType">架位类型</label>
              <Select
                name="shelfType"
                itemKey="code"
                itemValue="value"
                data={selDataShelf}
                load="true"
                init
              />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="lifeCycle">使用寿命</label>
              <Input type="text" name="lifeCycle" />
            </Row>
            <Row>
              <label htmlFor="lifeCyclePreAlert">使用寿命预警</label>
              <Input type="text" name="lifeCyclePreAlert" />
            </Row>
            <Row>
              <label htmlFor="usageCounterPreAlert">使用次数预警</label>
              <Input type="text" name="usageCounterPreAlert" />
            </Row>
            <Row>
              <label htmlFor="usageCounterAlert">使用次数报警</label>
              <Input type="text" name="usageCounterAlert" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDockingInv">是否管理库存</label>
              <Select
                name="needDockingInv"
                itemKey="code"
                itemValue="value"
                data={needDockingInv}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needIQC">是否需要进料检验</label>
              <Select
                name="needIQC"
                itemKey="code"
                itemValue="value"
                data={needIQC}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needQC">是否需要检验</label>
              <Select
                name="needQC"
                itemKey="code"
                itemValue="value"
                data={needQC}
                load="true"
                init
              />
            </Row>

            <Row className={'selectLabel'}>
              <label htmlFor="qcIqcGroupId">进料检验群组</label>
              <span className="select" style={{ left: '115px' }}>
                <Select
                  name="qcIqcGroupId"
                  itemKey="id"
                  itemValue="name"
                  action={QcQcGroupAPI}
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                  init
                />
              </span>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="qcQcGroupId">品质检测群组</label>
              <span className="select" style={{ left: '115px' }}>
                <Select
                  name="qcQcGroupId"
                  itemKey="id"
                  itemValue="name"
                  action={QcQcGroupAPI}
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                  init
                />
              </span>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needMaintainBefore">是否使用前保养</label>
              <Select
                name="needMaintainBefore"
                itemKey="code"
                itemValue="value"
                data={needMaintainBefore}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needMaintainAfter">是否使用后保养</label>
              <Select
                name="needMaintainAfter"
                itemKey="code"
                itemValue="value"
                data={needMaintainAfter}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDetectBefore">是否使用前检测</label>
              <Select
                name="needDetectBefore"
                itemKey="code"
                itemValue="value"
                data={needDetectBefore}
                load="true"
                init
              />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="needDetectAfter">是否使用后检测</label>
              <Select
                name="needDetectAfter"
                itemKey="code"
                itemValue="value"
                data={needDetectAfter}
                load="true"
                init
              />
            </Row>
            <Row>
              <label htmlFor="remark">备注</label>
              <Input type="text" name="remark" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" value="admin" disabled />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>

      <ActionBtn
        btnName="刷新"
        mode="refresh"
        action={JigTypeSettingUpdateApi}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
        clearRowsKeys={MainTableName}
      />
      <ActionBtn
        btnName="隐藏"
        mode="hide"
        action={JigTypeSettingUpdateApi}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="show"
        action={JigTypeSettingUpdateApi}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
    </div>
    <TableContainer
      name={MainTableName}
      formName="JigTypeSettingForm"
      columns={columns}
    />
  </div>
);
JigTypeSetting.defaultProps = {

};
JigTypeSetting.propTypes = {

};

export default JigTypeSetting;
