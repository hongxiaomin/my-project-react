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
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import {
  dataHandler,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';


const EQMLineTypeSetAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line`;
const EQMLineTypeSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/active`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const zoneAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/zone/item`;

const targetKeyUpdate = ['lineName', 'lineCode', 'factoryId', 'zoneId', 'lineDesc', 'zoneId', 'id'];

const MainFormName = 'EQMLineTypeSetForm';
const MainTableName = 'EQMLineTypeSetTab';

const EQMLineParamTemplate = (param) => {
  let paramNew = param;
  if (param.proZone) {
    const proZone = { zoneName: param.proZone };
    paramNew = { ...param, proZone };
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
    title: '线别名称',
    dataIndex: 'lineName',
    key: 'lineName',
  }, {
    title: '线别代码',
    dataIndex: 'lineCode',
    key: 'lineCode',
  }, {
    title: '所属区域',
    dataIndex: 'proZone',
    key: 'proZone',
    render: (text, record) => {
      const { proZone } = record;
      if (proZone && proZone.zoneName) {
        return proZone.zoneName;
      }
      return '';
    },
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
    title: '线别描述',
    dataIndex: 'lineDesc',
    key: 'lineDesc',
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
  name: '线别配置',
}];
const EQMLineTypeSet = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="线别配置" />
    <FormContainer
      name={MainFormName}
      action={EQMLineTypeSetAPI}
      method="GET"
      paramTemplate={EQMLineParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="zoneId" className={'label'}>区域名称</label>
        <span className="select" >
          <SelectContainer
            name="zoneId"
            action={zoneAPI}
            itemKey="id"
            itemValue="name"
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="lineName" className={'label'}>线别名称</label>
        <InputContainer type="text" name="lineName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="lineCode" className={'label'}>线别代码</label>
        <InputContainer type="text" name="lineCode" className={'input'} />
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
      <Modal name="EQMLineTypeSetAdd" btnName="新增" title="新增">
        <ModalForm
          name="EQMLineTypeSetAdd"
          // needForName="JigTypeSettingAdd"
          action={EQMLineTypeSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMLineTypeSetAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="lineName">线别名称</label>
              <InputContainer type="text" name="lineName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="lineCode">线别代码</label>
              <InputContainer type="text" name="lineCode" />
              <i>*</i>
            </Row>
            <GroupSelectContainer name="BorderAndSmallBorder">
              <Row className={'modalRowSelect'}>
                <label htmlFor="factoryId" className={'label'}>所属厂别</label>
                <span className="select" >
                  <SelectContainer
                    name="factoryId"
                    action={factoryAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={() => ('')}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    next="zoneId"
                    load
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
              <Row className={'modalRowSelect'}>
                <label htmlFor="zoneId" className={'label'}>所属区域</label>
                <span className="select" >
                  <SelectContainer
                    name="zoneId"
                    action={zoneAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={(data) => {
                      const condition = { factoryId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
            </GroupSelectContainer>
            <Row>
              <label htmlFor="lineDesc">线别描述</label>
              <InputContainer type="text" name="lineDesc" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMLineTypeSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMLineTypeSetUpdate"
          modalName="EQMLineTypeSetUpdate"
          action={EQMLineTypeSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="lineName">线别名称</label>
              <InputContainer type="text" name="lineName" />
            </Row>
            <Row>
              <label htmlFor="lineCode">线别代码</label>
              <InputContainer type="text" name="lineCode" disabled />
            </Row>
            {/* <Row>
              <label htmlFor="zoneId">所属区域</label>
              <span className={'select'}>
                <SelectContainer
                  name="zoneId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={zoneAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row> */}
             <GroupSelectContainer name="BorderAndSmallBorder">
              <Row className={'modalRowSelect'}>
                <label htmlFor="factoryId" className={'label'}>所属厂别</label>
                <span className="select" >
                  <SelectContainer
                    name="factoryId"
                    action={factoryAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={() => ('')}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    next="zoneId"
                    load
                    init
                  />
                </span>
              </Row>
              <Row className={'modalRowSelect'}>
                <label htmlFor="zoneId" className={'label'}>所属区域</label>
                <span className="select" >
                  <SelectContainer
                    name="zoneId"
                    action={zoneAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={(data) => {
                      const condition = { factoryId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    prev="factoryId"
                    load
                    init
                  />
                </span>
              </Row>
            </GroupSelectContainer>
            <Row>
              <label htmlFor="lineDesc">线别描述</label>
              <InputContainer type="text" name="lineDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后修改者</label>
              <InputContainer type="text" name="lastUpdateBy" />
            </Row> */}
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="隐藏"
        mode="update"
        action={EQMLineTypeSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMLineTypeSetActiveAPI}
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
EQMLineTypeSet.defaultProps = {

};
EQMLineTypeSet.propTypes = {

};

export default EQMLineTypeSet;
