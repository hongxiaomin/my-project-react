import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Checkbox, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import SelectContainer from '../../containers/SelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import ModalForm from '../../containers/ModalFormContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  modifyParamTemplate,
  modifyPostDataTemplate,
  copyPostDataTemplate,
  defaultPostDataTemplate,
  defaultPutParamTemplate,
  defaultDataSourceTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import Input from '../../containers/InputContainer';

const JigScrapReasonSettingAPI = `${SERVER_IP_JIG}/ams/jig/base/scrap/query`;
const JigScrapReasonSettingAPIPut = `${SERVER_IP_JIG}/ams/jig/base/scrap/update`;
const JigScrapReasonSettingAPIPost = `${SERVER_IP_JIG}/ams/jig/base/scrap/add`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const MainFormName = 'JigScrapReasonSettingForm';
const MainTableName = 'JigScrapReasonSetting';
const JigScrapReasonSettingApi = `${SERVER_IP_JIG}/ams/jig/base/scrap/query/item`;


const targetKeyModify = ['scItemCode', 'scItemName', 'scItemDesc', 'createBy', 'id'];
const targetKeyCopy = ['scItemCode', 'scItemName', 'scItemDesc', 'createBy'];
const selData = [
  {
    id: 'Y',
    name: '显示项',
  }, {
    id: 'N',
    name: '隐藏项',
  },
];

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
  name: '治工具报废原因设定',
}];

const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '治具报废原因代码',
  dataIndex: 'scItemCode',
  key: 'scItemCode',
}, {
  title: '治具报废原因名称',
  dataIndex: 'scItemName',
  index: 'scItemName',
}, {
  title: '治具报废原因说明',
  dataIndex: 'scItemDesc',
  index: 'scItemDesc',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  index: 'lastUpdateBy',
}];

const JigScrapDataSourceTemplate = param => param.rows;

const JigScrapReasonSetting = props => (

  <div>
    <Bread breadMap={breadMap} />
    <Title name="治工具报废原因设定" />
    <FormContainer
      name="JigScrapReasonSettingForm"
      action={JigScrapReasonSettingAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={JigScrapDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="scItemCode" className={'label'}>报废原因代号</label>
        <span className={'select'}>
          <Select
            name="scItemCode"
            className={'select'}
            itemKey="sccode"
            itemValue="sccode"
            action={JigScrapReasonSettingApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="scItemName" className={'label'}>报废原因名称</label>
        <span className={'select'}>
          <Select
            name="scItemName"
            className={'select'}
            itemKey="scname"
            itemValue="scname"
            action={JigScrapReasonSettingApi}
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
      <Modal name="JigScrapReasonSettingAdd" btnName="新增" title="新增" >
        <ModalForm
          name="JigScrapReasonSettingAdd"
          action={JigScrapReasonSettingAPIPost}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={defaultPostDataTemplate}
          modalName="JigScrapReasonSettingAdd"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="datepicker">治具报废原因代码</label>
              <InputContainer type="text" name="scItemCode" />
            </Row>
            <Row>
              <label htmlFor="input">治具报废原因名称</label>
              <InputContainer type="text" name="scItemName" />
            </Row>
            <Row>
              <label htmlFor="input">治具报废原因说明</label>
              <InputContainer type="text" name="scItemDesc" />
            </Row>
            <Row>
              <label htmlFor="input">创建人员</label>
              <InputContainer type="text" name="createBy" value="admin" disabled />
            </Row>
            {/* <Row className={'searchCondition'} style={{ position: 'relative' }}>
              <label htmlFor="input">选用治具类型</label>
              <span className={'select'} style={{ left: '115px' }}>
                <SelectContainer
                  name="jigTypeId"
                  action={JigTypeAPI}
                  itemKey="id"
                  itemValue="name"
                  next="bom_status2"
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row> */}
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>

          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="JigScrapReasonSettingCopy"
        formName={MainFormName}
        tableName={MainTableName}
        load="true"
        tarKey={targetKeyCopy}
        btnName="复制"
        title="复制"
      >
        <ModalForm
          name="JigScrapReasonSettingCopy"
          action={JigScrapReasonSettingAPIPost}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={copyPostDataTemplate}
          modalName="JigScrapReasonSettingCopy"
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="scItemCode">治具报废原因代码</label>
              <Input type="text" name="scItemCode" />
            </Row>
            <Row>
              <label htmlFor="scItemName">治具报废原因名称</label>
              <Input type="text" name="scItemName" />
            </Row>
            <Row>
              <label htmlFor="scItemDesc">治具报废原因说明</label>
              <Input type="text" name="scItemDesc" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="JigScrapReasonSettingupdate"
        formName={MainFormName}
        tableName={MainTableName}
        load="true"
        tarKey={targetKeyModify}
        btnName="修改"
        title="修改"
      >
        <ModalForm
          name="JigScrapReasonSettingupdate"
          action={JigScrapReasonSettingAPIPut}
          method="PUT"
          filters={defaultRequestFilters}
          paramTemplate={modifyParamTemplate}
          dataTemplate={modifyPostDataTemplate}
          modalName="JigScrapReasonSettingupdate"
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="scItemCode">治具报废原因代码</label>
              <Input type="text" name="scItemCode" />
            </Row>
            <Row>
              <label htmlFor="scItemName">治具报废原因名称</label>
              <Input type="text" name="scItemName" />
            </Row>
            <Row>
              <label htmlFor="scItemDesc">治具报废原因说明</label>
              <Input type="text" name="scItemDesc" />
            </Row>
            <Row>
              <label htmlFor="createBy">创建人员</label>
              <Input type="text" name="createBy" />
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
        action={JigScrapReasonSettingAPIPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="隐藏"
        mode="hide"
        action={JigScrapReasonSettingAPIPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="show"
        action={JigScrapReasonSettingAPIPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
    </div>
    <TableContainer name="JigScrapReasonSetting" formName="JigScrapReasonSettingForm" columns={columns} />
  </div>
  );
JigScrapReasonSetting.defaultProps = {

};
JigScrapReasonSetting.propTypes = {

};

export default JigScrapReasonSetting;
