import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import {
  EQMUpdatePutDataTemplate,
  EQMAddPostDataTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMUseSetApi = `${SERVER_IP_EQM}/ams/eqm/life/part/out`;
const eqpinfo = `${SERVER_IP_EQM}/ams/eqm/eqp/info/list`;
const serviceApi = `${SERVER_IP_EQM}/ams/eqm/repair/service`;
const eqpType = `${SERVER_IP_EQM}/ams/eqm/part/model/item`;
const eqpMain = `${SERVER_IP_EQM}/ams/eqm/part/equipment/item`;

const UseSetTemplete = (param) => {
  const {
    size = 10,
    current = 1,
    ...data } = param;
  const condition = {
    partModel: {
      modelCode: data.modelCode,
      modelName: data.modelName,
    },
    equipmentModel: {
      eqpModelCode: data.eqpModelCode,
      eqpModelName: data.eqpModelName,
    },
  };
  return { condition, size, current };
};

const modelPartTemplete = data => ({
  condition: { partModelId: data },
});

const targetKeyUpdate = ['partModelId', 'serviceId', 'eqpModelPartId', 'eqpId', 'count', 'remark', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '型号名称',
    dataIndex: 'modelName',
    key: 'modelName',
    render: (text, record) => {
      const { partModel } = record;
      return partModel.modelName;
    },
  }, {
    title: '型号代码',
    dataIndex: 'modelCode',
    index: 'modelCode',
    render: (text, record) => {
      const { partModel } = record;
      return partModel.modelCode;
    },
  }, {
    title: '所属类型',
    dataIndex: 'typeName',
    index: 'typeName',
    render: (text, record) => {
      const { partType } = record;
      return partType.typeName;
    },
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    index: 'eqpCode',
    render: (text, record) => {
      const { equipment } = record;
      return equipment.eqpCode;
    },
  }, {
    title: '位置',
    dataIndex: 'position',
    index: 'position',
    render: (text, record) => {
      const { partEquipmentDtl } = record;
      if (partEquipmentDtl != null) {
        return partEquipmentDtl.position;
      }
      return '';
    },
  }, {
    title: '所在线别',
    dataIndex: 'lineName',
    index: 'lineName',
    render: (text, record) => {
      const { proLine } = record;
      return proLine.lineName;
    },
  }, {
    title: '所在站点',
    dataIndex: 'assemblyName',
    index: 'assemblyName',
    render: (text, record) => {
      const { assembly } = record;
      return assembly.assemblyName;
    },
  }, {
    title: '使用数量',
    dataIndex: 'count',
    index: 'count',
  }, {
    title: '使用说明',
    dataIndex: 'remark',
    index: 'remark',
  }, {
    title: '维修编号',
    dataIndex: 'id',
    index: 'id',
    render: (text, record) => {
      const { repairService } = record;
      return repairService.id;
    },
  }, {
    title: '使用时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
    render: (text, record) => {
      const { lastUpdateDate } = record;
      if (lastUpdateDate === null) {
        return '';
      }
      const date = new Date(lastUpdateDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
    },
  }, {
    title: '操作者',
    dataIndex: 'lastUpdateBy',
    index: 'lastUpdateBy',
  }];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '零件管理',
}, {
  path: '',
  name: '使用管理',
}];
const EQMUseSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="使用管理" />
    <FormContainer
      name="EQMUseSetForm"
      action={EQMUseSetApi}
      method="GET"
      paramTemplate={UseSetTemplete}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelName" className={'label'}>设备型号名称</label>
        <InputContainer type="text" name="eqpModelName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelCode" className={'label'}>设备型号代码</label>
        <InputContainer type="text" name="eqpModelCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="modelName" className={'label'}>零件型号名称</label>
        <InputContainer type="text" name="modelName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="modelCode" className={'label'}>零件型号代码</label>
        <InputContainer type="text" name="modelCode" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="EQMTypeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMTypeSetAdd"
          action={EQMUseSetApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMUseSetForm"
          filters={defaultRequestFilters}
          modalName="EQMTypeSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpId" className={'label'}>设备编号</label>
              <span className="select" >
                <SelectContainer
                  name="eqpId"
                  itemKey="id"
                  itemValue="code"
                  load="true"
                  action={eqpinfo}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <GroupSelectContainer name="BorderAndSmallBorder">
              <Row>
                <label htmlFor="partModelId" className={'label'}>零件型号</label>
                <span className="select" >
                  <SelectContainer
                    name="partModelId"
                    action={eqpType}
                    load="true"
                    itemKey="id"
                    itemValue="name"
                    next="eqpModelPartId"
                    paramTemplate={() => ('')}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                </span>
                <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
              </Row>
              <Row>
                <label htmlFor="eqpModelPartId" className={'label'}>设备关键零件位置</label>
                <span className="select" >
                  <SelectContainer
                    name="eqpModelPartId"
                    itemKey="id"
                    itemValue="name"
                    action={eqpMain}
                    paramTemplate={modelPartTemplete}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                </span>
                <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
              </Row>
            </GroupSelectContainer>
            <Row>
              <label htmlFor="serviceId" className={'label'}>服务号</label>
              <span className="select" >
                <SelectContainer
                  name="serviceId"
                  itemKey="id"
                  itemValue="id"
                  load="true"
                  action={serviceApi}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="count">使用数量</label>
              <InputContainer type="text" name="count" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="remark">使用说明</label>
              <InputContainer type="text" name="remark" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMTypeSetUpdate"
        formName="EQMUseSetForm"
        tableName="EQMUseSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMTypeSetUpdate"
          modalName="EQMTypeSetUpdate"
          action={EQMUseSetApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMUseSetForm"
          tableName="EQMUseSetTab"
        >
          <div className="modalStyle">
            <Row style={{ marginBottom: '5px', height: '26px' }}>
              <label htmlFor="eqpId" className={'label'}>设备编号</label>
              <span className="select" style={{ marginLeft: '0px' }} >
                <SelectContainer
                  name="eqpId"
                  itemKey="id"
                  itemValue="code"
                  load="true"
                  action={eqpinfo}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  disabled
                  noClr
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row style={{ marginBottom: '5px', height: '26px' }}>
              <label htmlFor="partModelId" className={'label'}>零件型号</label>
              <span className="select" style={{ marginLeft: '0px' }}>
                <SelectContainer
                  name="partModelId"
                  action={eqpType}
                  itemKey="id"
                  itemValue="name"
                  paramTemplate={() => ('')}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  noClr
                  disabled
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row style={{ marginBottom: '5px', height: '26px' }}>
              <label htmlFor="eqpModelPartId" className={'label'}>设备关键零件位置</label>
              <span className="select" style={{ marginLeft: '0px' }} >
                <SelectContainer
                  name="eqpModelPartId"
                  action={eqpMain}
                  itemKey="id"
                  itemValue="name"
                  paramTemplate={modelPartTemplete}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  noClr
                  load
                  onWithPart
                  disabled
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row style={{ marginBottom: '5px', height: '26px' }}>
              <label htmlFor="serviceId" className={'label'}>服务号</label>
              <span className="select" style={{ marginLeft: '0px' }}>
                <SelectContainer
                  name="serviceId"
                  itemKey="id"
                  itemValue="id"
                  load="true"
                  action={serviceApi}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  noClr
                  disabled
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="count">使用数量</label>
              <InputContainer type="text" name="count" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="remark">使用说明</label>
              <InputContainer type="text" name="remark" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
    </div>
    <TableContainer
      name="EQMUseSetTab"
      formName="EQMUseSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMUseSet.defaultProps = {

};
EQMUseSet.propTypes = {

};

export default EQMUseSet;
