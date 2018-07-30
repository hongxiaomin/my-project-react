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
import {
  // EQMParamTemplate,
  dataHandler,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMZoneTypeSetAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/zone`;
const EQMZoneTypeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/zone/active`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;

const targetKeyUpdate = ['zoneName', 'zoneCode', 'zoneDesc', 'factoryId', 'id'];

const MainFormName = 'EQMZoneTypeSetForm';
const MainTableName = 'EQMZoneTypeSetTab';

const EQMZoneParamTemplate = (param) => {
  let paramNew = param;
  if (param.proFactory) {
    const proFactory = { factoryName: param.proFactory };
    paramNew = { ...param, proFactory };
  }
  const {
    size = 10,
    current = 1,
    ...data1 } = paramNew;
  const data = dataHandler(data1);
  const condition = { ...data };
  return { condition, size, current };
};

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '区域名称',
    dataIndex: 'zoneName',
    key: 'zoneName',
  }, {
    title: '区域代码',
    dataIndex: 'zoneCode',
    key: 'zoneCode',
  }, {
    title: '所属厂别',
    dataIndex: 'proFactory',
    key: 'proFactory',
    render: (text, record) => {
      const { proFactory } = record;
      if (proFactory && proFactory.factoryName) {
        return proFactory.factoryName;
      }
      return '';
    },
  }, {
    title: '区域描述',
    dataIndex: 'zoneDesc',
    key: 'zoneDesc',
  }, {
    title: '最后更新者',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
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
  name: '产线管理',
}, {
  path: '',
  name: '区域配置',
}];
const EQMZoneTypeSet = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="区域配置" />
    <FormContainer
      name={MainFormName}
      action={EQMZoneTypeSetAPI}
      method="GET"
      paramTemplate={EQMZoneParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="factoryId" className={'label'}>厂别名称</label>
        <span className={'select'}>
          <SelectContainer
            name="factoryId"
            className={'select'}
            itemKey="id"
            itemValue="name"
            action={factoryAPI}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="zoneName" className={'label'}>区域名称</label>
        <InputContainer type="text" name="zoneName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="zoneCode" className={'label'}>区域代码</label>
        <InputContainer type="text" name="zoneCode" className={'input'} />
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
      <Modal name="EQMZoneTypeSetAdd" btnName="新增" title="新增">
        <ModalForm
          name="EQMZoneTypeSetAdd"
          // needForName="JigTypeSettingAdd"
          action={EQMZoneTypeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMZoneTypeSetAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="zoneName">区域名称</label>
              <InputContainer type="text" name="zoneName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="zoneCode">区域代码</label>
              <InputContainer type="text" name="zoneCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="factoryId">所属厂别</label>
              <span className={'select'}>
                <SelectContainer
                  name="factoryId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={factoryAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row>
              <label htmlFor="zoneDesc">区域描述</label>
              <InputContainer type="text" name="zoneDesc" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMZoneTypeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMZoneTypeSetUpdate"
          modalName="EQMZoneTypeSetUpdate"
          action={EQMZoneTypeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="zoneName">区域名称</label>
              <InputContainer type="text" name="zoneName" />
            </Row>
            <Row>
              <label htmlFor="zoneCode">区域代码</label>
              <InputContainer type="text" name="zoneCode" disabled />
            </Row>
            <Row>
              <label htmlFor="factoryId">所属厂别</label>
              <span className={'select'}>
                <SelectContainer
                  name="factoryId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={factoryAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="zoneDesc">区域描述</label>
              <InputContainer type="text" name="zoneDesc" />
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
        action={EQMZoneTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMZoneTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
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
EQMZoneTypeSet.defaultProps = {

};
EQMZoneTypeSet.propTypes = {

};

export default EQMZoneTypeSet;
