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
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  dataHandler,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMTypeSetApi = `${SERVER_IP_EQM}/ams/eqm/part/equipment`;
const EQMTypeItemApi = `${SERVER_IP_EQM}/ams/eqm/part/model/item`;
const EQMTypeItemApi2 = `${SERVER_IP_EQM}/ams/eqm/eqp/model/list`;
const TypeItemActive = `${SERVER_IP_EQM}/ams/eqm/part/equipment/active`;

const targetKeyUpdate = ['partModelId', 'position', 'lifetimeTime', 'lifetimeMode', 'eqpModelId', 'count', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备型号',
    dataIndex: 'eqpModelCode',
    key: 'eqpModelCode',
  }, {
    title: '零件型号名称',
    dataIndex: 'modelName',
    index: 'modelName',
  }, {
    title: '零件型号代码',
    dataIndex: 'modelCode',
    index: 'modelCode',
  }, {
    title: '型号描述',
    dataIndex: 'modelDesc',
    key: 'modelDesc',
  }, {
    title: '所属类型',
    dataIndex: 'typeName',
    index: 'typeName',
  }, {
    title: '位置',
    dataIndex: 'position',
    index: 'position',
  }, {
    title: '数量',
    dataIndex: 'count',
    index: 'count',
  }, {
    title: '寿命管理方式',
    dataIndex: 'lifetimeMode',
    key: 'lifetimeMode',
    render: (text) => {
      if (text === 0) {
        return '不做管控';
      } else if (text === 1) {
        return '生产时间';
      } else if (text === 2) {
        return '生产数量';
      } else if (text === 3) {
        return '智能預測';
      }
      return '';
    },
  }, {
    title: '寿命时长（小时）',
    dataIndex: 'lifetimeTime',
    index: 'lifetimeTime',
  }];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];

const showDataTime = [{
  id: '0',
  name: '不做管控',
}, {
  id: '1',
  name: '生产时间',
}, {
  id: '2',
  name: '生产数量',
}, {
  id: '3',
  name: '智能預測',
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
  name: '设备关键零件配置',
}];
const EQMParamTemplate = (param) => {
  const {
    size = 10,
    current = 1,
    active,
    eqpModelCode,
    eqpModelName,
    modelCode,
    modelName,
  } = param;
  const data = dataHandler({ active, equipmentModel: { eqpModelCode: eqpModelCode || '', eqpModelName: eqpModelName || '' }, partModel: { modelCode: modelCode || '', modelName: modelName || '' } });
  const condition = { ...data };
  return { condition, size, current };
};
const EQMDefaultDataSourceTemplate = (param) => {
  let dataSource = [];
  if (Object.prototype.toString.call(param) === '[object Object]') {
    dataSource = param.rows ? param.rows : param;
    if (dataSource.length > 0) {
      dataSource.map((v) => {
        const obj = {
          modelName: v.partModel.modelName ? v.partModel.modelName : '',
          modelCode: v.partModel.modelCode ? v.partModel.modelCode : '',
          modelDesc: v.partModel.modelDesc ? v.partModel.modelDesc : '',
          partTypeId: v.partModel.partTypeId ? v.partModel.partTypeId : '',
          eqpModelCode: v.equipmentModel.eqpModelCode ? v.equipmentModel.eqpModelCode : '',
          typeName: v.partType.typeName ? v.partType.typeName : '',
        };
        Object.assign(v, obj);
      });
    }
  } else if (Object.prototype.toString.call(param) === '[object Array]') {
    dataSource = param || [];
    const a = {
      editable: false,
    };
    const dataArry = [];
    (dataSource !== []) ? dataSource.map((v) => {
      if (!v.editable) {
        Object.assign(v, a);
      }
      dataArry.push(v);
      return null;
    }) : [];
    dataSource = [...dataArry];
  }
  return dataSource;
};
const dataSourceTemplate = (param) => {
  const datArry = [];
  const rows = param.rows ? param.rows : param;
  rows.map((v) => {
    datArry.push(v.code);
    return null;
  });
  const codeList = datArry.map(v => ({ key: v.id }));
  return codeList;
};
const EQMInvMng = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="设备关键零件配置" />
    <FormContainer
      name="EQMInvMngSetForm"
      action={EQMTypeSetApi}
      method="GET"
      tableName="EQMInvMngSetTab"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={EQMDefaultDataSourceTemplate}
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
      <Modal name="EQMTypeSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMTypeSetAdd"
          action={EQMTypeSetApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMInvMngSetForm"
          filters={defaultRequestFilters}
          modalName="EQMTypeSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="partModelId" className={'label'}>零件型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="partModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="code"
                  load="true"
                  action={EQMTypeItemApi}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="eqpModelId" className={'label'}>设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMTypeItemApi2}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="position">位置</label>
              <InputContainer type="text" name="position" />
            </Row>
            <Row>
              <label htmlFor="count">数量</label>
              <InputContainer type="text" name="count" />
            </Row>
            <Row>
              <label htmlFor="lifetimeTime">寿命时长（小时）</label>
              <InputContainer type="text" name="lifetimeTime" />
            </Row>
            <Row>
              <label htmlFor="lifetimeMode" className={'label'}>寿命管理方式</label>
              <span className={'select'}>
                <SelectContainer
                  name="lifetimeMode"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  data={showDataTime}
                  load="true"
                  defaultKey="0"
                  defaultValue="不做管控"
                />
              </span>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMTypeSetUpdate"
        formName="EQMInvMngSetForm"
        tableName="EQMInvMngSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMTypeSetUpdate"
          modalName="EQMTypeSetUpdate"
          action={EQMTypeSetApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate2}
          filters={defaultRequestFilters}
          formName="EQMInvMngSetForm"
          tableName="EQMInvMngSetTab"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="partModelId" className={'label'}>零件型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="partModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="code"
                  load="true"
                  action={EQMTypeItemApi}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  noDefault
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="eqpModelId" className={'label'}>设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqpModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMTypeItemApi2}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  noDefault
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="position">位置</label>
              <InputContainer type="text" name="position" />
            </Row>
            <Row>
              <label htmlFor="count">数量</label>
              <InputContainer type="text" name="count" />
            </Row>
            <Row>
              <label htmlFor="lifetimeTime">寿命时长（小时）</label>
              <InputContainer type="text" name="lifetimeTime" />
            </Row>
            <Row>
              <label htmlFor="lifetimeMode" className={'label'}>寿命管理方式</label>
              <span className={'select'}>
                <SelectContainer
                  name="lifetimeMode"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  data={showDataTime}
                  load="true"
                  noDefault
                />
              </span>
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
        action={TypeItemActive}
        tableName="EQMInvMngSetTab"
        formName="EQMInvMngSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={TypeItemActive}
        tableName="EQMInvMngSetTab"
        formName="EQMInvMngSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMInvMngSetTab"
      formName="EQMInvMngSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMInvMng.defaultProps = {

};
EQMInvMng.propTypes = {

};

export default EQMInvMng;
