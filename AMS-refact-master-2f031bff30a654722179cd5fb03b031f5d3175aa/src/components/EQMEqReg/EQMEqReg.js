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
import ImageContainer from '../../containers/ImageContainer';
import { GUID } from '../../utils/Common';
import {
  EQMParamTemplate,
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate2,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import './style.less';

const MainFormName = 'EQMEqRegForm';
const MainTableName = 'EQMEqRegTab';

const EQMEqRegAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/info`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const lineAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;
const sectionAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/section/item`;
const groupAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/group/item`;
const stationAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/station/item`;
const typeAPI = `${SERVER_IP_EQM}/ams/eqm/type/list`;
const modelAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/model`;
const supplierAPI = `${SERVER_IP_EQM}/ams/eqm/supplier`;
const EQMEqRegActiveAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/info/active`;
const assemblyAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/assembly`;

const targetKeyUpdate = ['eqpCode', 'status', 'factoryId', 'lineId', 'sectionId', 'groupId', 'stationId', 'assemblyId', 'length', 'width', 'height', 'seq', 'useDuration', 'eqpTypeId', 'eqpModelId', 'supplierId', 'eqpDesc', 'id'];

const EQMAssemParamTemplate = param => ({
  condition: param || '',
});

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{(index + 1)}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{(index + 1)}</p>);
    },
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    key: 'eqpCode',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.eqpCode}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.eqpCode}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.eqpCode}</p>);
    },
  }, {
    title: '标识图',
    dataIndex: 'pictute',
    key: 'pictute',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}><ImageContainer key={GUID()} id={record.eqpModelId} name="picture" action={`${SERVER_IP_EQM}/ams/eqm/eqp/model/picture`} /></p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}><ImageContainer key={GUID()} id={record.eqpModelId} name="picture" action={`${SERVER_IP_EQM}/ams/eqm/eqp/model/picture`} /></p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}><ImageContainer key={GUID()} id={record.eqpModelId} name="picture" action={`${SERVER_IP_EQM}/ams/eqm/eqp/model/picture`} /></p>);
    },
  }, {
    title: '当前状态',
    dataIndex: 'statusName',
    key: 'statusName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.statusName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.statusName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.statusName}</p>);
    },
  }, {
    title: '规格',
    dataIndex: 'spec',
    key: 'spec',
    render: (text, record) => {
      const { length, width, height } = record;
      let spec = '';
      if (length && width && height) {
        spec = `${length}×${width}×${height}`;
      } else {
        spec = '';
      }
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{spec}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{spec}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{spec}</p>);
    },
  }, {
    title: '位次',
    dataIndex: 'seq',
    key: 'seq',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.seq}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.seq}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.seq}</p>);
    },
  }, {
    title: '保养及点检状态',
    dataIndex: 'maintainStatusName',
    key: 'maintainStatusName',
    render: (text, record) => {
      const maintainStatusName = '正常';
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{maintainStatusName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{maintainStatusName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{maintainStatusName}</p>);
    },
  }, {
    title: '设备类型',
    dataIndex: 'typeName',
    key: 'typeName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.typeName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.typeName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.typeName}</p>);
    },
  }, {
    title: '设备型号',
    dataIndex: 'modelName',
    key: 'modelName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.modelName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.modelName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.modelName}</p>);
    },
  }, {
    title: '通讯类型',
    dataIndex: 'commTypeName',
    key: 'commTypeName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.commTypeName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.commTypeName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.commTypeName}</p>);
    },
  }, {
    title: '所属厂别',
    dataIndex: 'factoryName',
    key: 'factoryName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.factoryName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.factoryName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.factoryName}</p>);
    },
  }, {
    title: '所属线别',
    dataIndex: 'lineName',
    key: 'lineName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.lineName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.lineName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.lineName}</p>);
    },
  }, {
    title: '所属站点',
    dataIndex: 'assemblyName',
    key: 'assemblyName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.assemblyName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.assemblyName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.assemblyName}</p>);
    },
  }, {
    title: '所属群组',
    dataIndex: 'groupName',
    key: 'groupName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.groupName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.groupName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.groupName}</p>);
    },
  }, {
    title: '生产厂家',
    dataIndex: 'supplierName',
    key: 'supplierName',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.supplierName}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.supplierName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.supplierName}</p>);
    },
  }, {
    title: '最后更新者',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.lastUpdateBy}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.lastUpdateBy}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.lastUpdateBy}</p>);
    },
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
    render: (text, record) => {
      if (record.scrapAlarmCode === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.lastUpdateDate}</p>);
      } else if (record.scrapAlarmCode === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.lastUpdateDate}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.lastUpdateDate}</p>);
    },
  }];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];

const statusData = [{
  id: '1001',
  name: '正常',
}, {
  id: '1002',
  name: '异常',
}, {
  id: '1003',
  name: '换线中',
}, {
  id: '1004',
  name: '预警',
}, {
  id: '1005',
  name: '离线',
}, {
  id: '1006',
  name: '未连接',
}, {
  id: '1007',
  name: '已报修',
}, {
  id: '1008',
  name: '报废',
}, {
  id: '1009',
  name: '维修中',
}, {
  id: '1010',
  name: '待验中',
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '设备登记',
}];
const EQMEqReg = () => (
  <div className={'EQMEqReg'}>
    <Bread breadMap={breadMap} />
    <Title name="设备登记" />
    <FormContainer
      name={MainFormName}
      action={EQMEqRegAPI}
      method="GET"
      load
      defaultParam={{ active: 'Y' }}
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpModeId" className={'label'}>设备型号</label>
        <span className={'select'}>
          <SelectContainer
            name="eqpModelId"
            action={modelAPI}
            itemKey="id"
            itemValue="eqpModelName"
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpCode" className={'label'}>设备编号</label>
        <InputContainer type="text" name="eqpCode" className={'input'} />
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
      <Modal name="EQMEqRegAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMEqRegAdd"
          action={EQMEqRegAPI}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName={MainFormName}
          filters={defaultRequestFilters}
          modalName="EQMEqRegAdd"
          mode="AddNew"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpCode">设备编号</label>
              <InputContainer type="text" name="eqpCode" />
              <i>*</i>
            </Row>
            {/* <Row className={'modalRowSelect'}>
              <label htmlFor="status">当前状态</label>
              <span className={'select'}>
                <SelectContainer
                  name="status"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  data={statusData}
                  load="true"
                  defaultKey="1"
                  defaultValue="1"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
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
                      const condition = { factoryId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
            </GroupSelectContainer>
            <Row className={'modalRowSelect'}>
              <label htmlFor="sectionId">段别</label>
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
              <label htmlFor="groupId">组别</label>
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
            <Row className={'modalRowSelect searchBtn'}>
              <label htmlFor="stationId">站别</label>
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
              <ActionBtn
                btnName="查询工作站ID"
                mode="search"
                action={assemblyAPI}
                formName="EQMEqRegAdd"
                paramTemplate={EQMAssemParamTemplate}
                name="assemblyId"
              />
            </Row>
            <Row >
              <label htmlFor="assemblyId">工作站ID</label>
              <InputContainer type="text" name="assemblyId" disabled />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="length">长度</label>
              <InputContainer type="text" name="length" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="width">宽度</label>
              <InputContainer type="text" name="width" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="height">高度</label>
              <InputContainer type="text" name="height" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="seq">排序号</label>
              <InputContainer type="text" name="seq" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="useDuration">使用时长</label>
              <InputContainer type="text" name="useDuration" />
              <i>*</i>
            </Row>
            {/* <Row>
              <label htmlFor="">保养及点检状态</label>
              <InputContainer type="text" name="" />
            </Row> */}
            <GroupSelectContainer name="BorderAndSmallBorder">
              <Row className={'modalRowSelect'}>
                <label htmlFor="typeId" className={'label'}>设备类型</label>
                <span className="select" >
                  <SelectContainer
                    name="typeId"
                    action={typeAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={() => ('')}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    next="eqpModelId"
                    load
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
              <Row className={'modalRowSelect'}>
                <label htmlFor="eqpModelId" className={'label'}>设备型号</label>
                <span className="select" >
                  <SelectContainer
                    name="eqpModelId"
                    action={modelAPI}
                    itemKey="id"
                    itemValue="eqpModelName"
                    paramTemplate={(data) => {
                      const condition = { eqpTypeId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                  <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
                </span>
              </Row>
            </GroupSelectContainer>
            {/* <Row className={'modalRowSelect'}>
              <label htmlFor="commModeId">通讯类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="comModeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="commModeName"
                  action={commModeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
              </span>
            </Row> */}
            <Row className={'modalRowSelect'}>
              <label htmlFor="supplierId">生产厂家</label>
              <span className={'select'}>
                <SelectContainer
                  name="supplierId"
                  className={'select'}
                  itemKey="id"
                  itemValue="supplierName"
                  action={supplierAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                />
                <i style={{ color: '#ff0000', position: 'absolute', left: '226px', top: '8px' }}>*</i>
              </span>
            </Row>
            <Row>
              <label htmlFor="eqpDesc">设备描述</label>
              <InputContainer type="text" name="eqpDesc" />
              <i>*</i>
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
        name="EQMEqRegUpdate"
        formName={MainFormName}
        tableName={MainTableName}
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMEqRegUpdate"
          modalName="EQMEqRegUpdate"
          action={EQMEqRegAPI}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate2}
          filters={defaultRequestFilters}
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpCode">设备编号</label>
              <InputContainer type="text" name="eqpCode" />
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="status">当前状态</label>
              <span className={'select'}>
                <SelectContainer
                  name="status"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  data={statusData}
                  load="true"
                  init
                />
              </span>
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
                    next="lineId"
                    load="true"
                    init
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
                      const condition = { factoryId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    prev="factoryId"
                    init
                    load
                  />
                </span>
              </Row>
            </GroupSelectContainer>
            {/* <Row className={'modalRowSelect'}>
              <label htmlFor="lineId">所属线别</label>
              <span className={'select'}>
                <SelectContainer
                  name="lineId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={lineAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row> */}
            <Row className={'modalRowSelect'}>
              <label htmlFor="sectionId">段别</label>
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
              <label htmlFor="groupId">组别</label>
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
            <Row className={'modalRowSelect searchBtn'}>
              <label htmlFor="stationId">站别</label>
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
              <ActionBtn
                btnName="查询工作站ID"
                mode="search"
                action={assemblyAPI}
                formName="EQMEqRegUpdate"
                paramTemplate={EQMAssemParamTemplate}
                name="assemblyId"
              />
            </Row>
            <Row >
              <label htmlFor="assemblyId">工作站ID</label>
              <InputContainer type="text" name="assemblyId" disabled />
            </Row>
            <Row>
              <label htmlFor="length">长度</label>
              <InputContainer type="text" name="length" />
            </Row>
            <Row>
              <label htmlFor="width">宽度</label>
              <InputContainer type="text" name="width" />
            </Row>
            <Row>
              <label htmlFor="height">高度</label>
              <InputContainer type="text" name="height" />
            </Row>
            <Row>
              <label htmlFor="seq">排序号</label>
              <InputContainer type="text" name="seq" />
            </Row>
            <Row>
              <label htmlFor="useDuration">使用时长</label>
              <InputContainer type="text" name="useDuration" />
            </Row>
            {/* <Row>
             <label htmlFor="">保养及点检状态</label>
             <InputContainer type="text" name="" />
            </Row> */}
            {/* <Row className={'modalRowSelect'}>
              <label htmlFor="typeName">设备类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="typeName"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  action={typeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row className={'modalRowSelect'}>
              <label htmlFor="eqpModelId">设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="eqpModelName"
                  action={modelAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row> */}
            <GroupSelectContainer name="BorderAndSmallBorder">
              <Row className={'modalRowSelect'}>
                <label htmlFor="eqpTypeId" className={'label'}>设备类型</label>
                <span className="select" >
                  <SelectContainer
                    name="eqpTypeId"
                    action={typeAPI}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={() => ('')}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    next="eqpModelId"
                    load
                    init
                  />
                </span>
              </Row>
              <Row className={'modalRowSelect'}>
                <label htmlFor="eqpModelId" className={'label'}>设备型号</label>
                <span className="select" >
                  <SelectContainer
                    name="eqpModelId"
                    action={modelAPI}
                    itemKey="id"
                    itemValue="eqpModelName"
                    paramTemplate={(data) => {
                      const condition = { eqpTypeId: data };
                      return { condition };
                    }}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    prev="eqpTypeId"
                    load="true"
                    init
                  />
                </span>
              </Row>
            </GroupSelectContainer>
            {/* <Row className={'modalRowSelect'}>
              <label htmlFor="commTypeName">通讯类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="commTypeName"
                  className={'select'}
                  itemKey="id"
                  itemValue="commModeName"
                  action={commModeAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row> */}
            <Row className={'modalRowSelect'}>
              <label htmlFor="supplierId">生产厂家</label>
              <span className={'select'}>
                <SelectContainer
                  name="supplierId"
                  className={'select'}
                  itemKey="id"
                  itemValue="supplierName"
                  action={supplierAPI}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  init
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="eqpDesc">设备描述</label>
              <InputContainer type="text" name="eqpDesc" />
            </Row>
            {/* <Row>
              <label htmlFor="lastUpdateBy">最后更新者</label>
              <InputContainer type="text" name="lastUpdateBy" value="admin" disabled />
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
        action={EQMEqRegActiveAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMEqRegActiveAPI}
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
EQMEqReg.defaultProps = {

};
EQMEqReg.propTypes = {

};

export default EQMEqReg;
