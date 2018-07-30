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
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import SelectContainer from '../../containers/SelectContainer';
import {
  EQMParamTemplate,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM,
} from '../../constants/Settings';

const EQMStatSetAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/assembly`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const zoneAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/zone/item`;
const lineAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;
const sectionAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/section/item`;
const groupAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/group/item`;
const stationAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/station/item`;
const EQMStatSetActiveAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/assembly/active`;

const MainFormName = 'EQMStatSetForm';
const MainTableName = 'EQMStatSetTab';

const targetKeyUpdate = ['assemblyName', 'assemblyCode', 'linePosIndex', 'factoryId', 'zoneId', 'lineId', 'groupId', 'sectionId', 'stationId', 'assemblyDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '工作站名称',
    dataIndex: 'assemblyName',
    key: 'assemblyName',
  }, {
    title: '工作站代码',
    dataIndex: 'assemblyCode',
    key: 'assemblyCode',
  }, {
    title: '工作站位置',
    dataIndex: 'linePosIndex',
    key: 'linePosIndex',
  }, {
    title: '所属厂别',
    dataIndex: 'proFacyory',
    key: 'proFacyory',
    render: (text, record) => {
      const { proFactory } = record;
      if (proFactory && proFactory.factoryName) {
        return proFactory.factoryName;
      }
      return '';
    },
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
    title: '所属线别',
    dataIndex: 'proLine',
    key: 'proLine',
    render: (text, record) => {
      const { proLine } = record;
      if (proLine && proLine.lineName) {
        return proLine.lineName;
      }
      return '';
    },
  }, {
    title: '所属段别',
    dataIndex: 'ProSection',
    key: 'ProSection',
    render: (text, record) => {
      const { proSection } = record;
      if (proSection && proSection.sectionName) {
        return proSection.sectionName;
      }
      return '';
    },
  }, {
    title: '所属组别',
    dataIndex: 'proGroup',
    key: 'proGroup',
    render: (text, record) => {
      const { proGroup } = record;
      if (proGroup && proGroup.groupName) {
        return proGroup.groupName;
      }
      return '';
    },
  }, {
    title: '所属站别',
    dataIndex: 'prostation',
    key: 'prostation',
    render: (text, record) => {
      const { proStation } = record;
      if (proStation && proStation.stationName) {
        return proStation.stationName;
      }
      return '';
    },
  }, {
    title: '工作站描述',
    dataIndex: 'assemblyDesc',
    key: 'assemblyDesc',
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
  name: '工作站配置',
}, {
  path: '',
  name: '工作站配置',
}];
const EQMStatSet = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="工作站配置" />
    <FormContainer
      name={MainFormName}
      action={EQMStatSetAPI}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="assemblyName" className={'label'}>工作站名称</label>
        <InputContainer type="text" name="assemblyName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="assemblyCode" className={'label'}>工作站代码</label>
        <InputContainer type="text" name="assemblyCode" className={'input'} />
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
      <Modal name="EQMStatSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMStatSetAdd"
          // needForName="EQMStatSetAdd"
          action={EQMStatSetAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMStatSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="assemblyName">工作站名称</label>
              <InputContainer type="text" name="assemblyName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="assemblyCode">工作站代码</label>
              <InputContainer type="text" name="assemblyCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="linePosIndex">工作站位置</label>
              <InputContainer type="text" name="linePosIndex" />
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
                    next="lineId"
                    load
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
              <Row className={'modalRowSelect'}>
                <label htmlFor="lineId" className={'label'}>所属线别</label>
                <span className="select" >
                  <SelectContainer
                    name="lineId"
                    action={lineAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={(data) => {
                      const condition = { factoryId: data, zoneId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
            </GroupSelectContainer>
            <Row className={'modalRowSelect'}>
              <label htmlFor="sectionId">所属段别</label>
              <span className={'select'}>
                <SelectContainer
                  name="sectionId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={sectionAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="groupId">所属组别</label>
              <span className={'select'}>
                <SelectContainer
                  name="groupId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={groupAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="stationId">所属站别</label>
              <span className={'select'}>
                <SelectContainer
                  name="stationId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={stationAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row>
              <label htmlFor="assemblyDesc">工作站描述</label>
              <InputContainer type="text" name="assemblyDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="createBy">创建者</label>
              <InputContainer type="text" name="createBy" />
              <i>*</i>
            </Row> */}
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMStatSetUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMStatSetUpdate"
          modalName="EQMStatSetUpdate"
          action={EQMStatSetAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="assemblyName">工作站名称</label>
              <InputContainer type="text" name="assemblyName" />
            </Row>
            <Row>
              <label htmlFor="assemblyCode">工作站代码</label>
              <InputContainer type="text" name="assemblyCode" disabled />
            </Row>
            <Row>
              <label htmlFor="linePosIndex">工作站位置</label>
              <InputContainer type="text" name="linePosIndex" />
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
                    next="lineId"
                    prev="factoryId"
                    init
                    load
                  />
                </span>
              </Row>
              <Row className={'modalRowSelect'}>
                <label htmlFor="lineId" className={'label'}>所属线别</label>
                <span className="select" >
                  <SelectContainer
                    name="lineId"
                    action={lineAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={(data) => {
                      const condition = { factoryId: data, zoneId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    prev="factoryIdAndZoneId"
                    init
                    load
                  />
                </span>
              </Row>
            </GroupSelectContainer>
            <Row className={'modalRowSelect'}>
              <label htmlFor="sectionId">所属段别</label>
              <span className={'select'}>
                <SelectContainer
                  name="sectionId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={sectionAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="groupId">所属组别</label>
              <span className={'select'}>
                <SelectContainer
                  name="groupId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={groupAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="stationId">所属站别</label>
              <span className={'select'}>
                <SelectContainer
                  name="stationId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={stationAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="assemblyDesc">工作站描述</label>
              <InputContainer type="text" name="assemblyDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后更新者</label>
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
        action={EQMStatSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMStatSetActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name={MainTableName}
          formName={MainFormName}
          columns={columns}
          onRowClick
        />
      </div>
    </div>
  </div>
);
EQMStatSet.defaultProps = {

};
EQMStatSet.propTypes = {

};

export default EQMStatSet;
