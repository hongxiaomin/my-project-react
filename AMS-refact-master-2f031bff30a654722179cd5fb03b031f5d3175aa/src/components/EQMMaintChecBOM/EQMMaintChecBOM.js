import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import SelectContainer from '../../containers/SelectContainer';
import { onSelectDisable } from '../../actions/SelectAction';
import {
  bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMMaintcBOM = `${SERVER_IP_EQM}/ams/eqm/ckbm/bom`;
const EQMBomtypeItem = `${SERVER_IP_EQM}/ams/eqm/ckbm/bom/type/item`;
const EQMBomItem = `${SERVER_IP_EQM}/ams/eqm/ckbm/item/list`;
const EQMtypeItem = `${SERVER_IP_EQM}/ams/eqm/eqp/model/list`;
const EQMfrequency = `${SERVER_IP_EQM}/ams/eqm/ckbm/fqc/list`;
const EQMBomActive = `${SERVER_IP_EQM}/ams/eqm/ckbm/bom/active`;

const targetKeyUpdate = ['eqmModelId', 'ckbmItemId', 'ckbmFqcId', 'ckbmType', 'id'];

// 新增
const ChecBomAddPostTemplate = (param) => {
  const { ...data } = param;
  const createBy = 'Admin';
  let dataStr = '';
  if (data.ckbmType === '1') { // 点检
    const dataMerge = { createBy, ...data };
    delete dataMerge.ckbmFqcId;
    const dataStr1 = JSON.stringify(dataMerge);
    dataStr = `[${dataStr1}]`;
  } else if (data.ckbmType === '2') { // 保养
    const dataMerge = { createBy, ...data };
    const dataStr1 = JSON.stringify(dataMerge);
    dataStr = `[${dataStr1}]`;
  }
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};
// 修改
const ChecBomUpdatePutTemplate = (param) => {
  const { ...data } = param;
  const lastUpdateBy = 'Admin';
  let dataStr = '';
  if (data.ckbmType === '1') { // 点检
    const dataMerge = { lastUpdateBy, ...data };
    delete dataMerge.ckbmFqcId;
    const dataStr1 = JSON.stringify(dataMerge);
    dataStr = `${dataStr1}`;
  } else if (data.ckbmType === '2') { // 保养
    const dataMerge = { lastUpdateBy, ...data };
    const dataStr1 = JSON.stringify(dataMerge);
    dataStr = `${dataStr1}`;
  }
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};

const changeNext = props => (
  (dispatch) => {
    const propSource = props.props;
    const fromSource = props.formData;
    const ckbmType = fromSource.ckbmType ? fromSource.ckbmType : '';
    if (ckbmType === '1') {
      dispatch(onSelectDisable({ id: propSource.next, disable: true }));
    } else {
      dispatch(onSelectDisable({ id: propSource.next, disable: false }));
    }
  }
);

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备型号',
    dataIndex: 'eqmModelName',
    key: 'eqmModelName',
  }, {
    title: '项目代码',
    dataIndex: 'ckbmItemCode',
    index: 'ckbmItemCode',
  }, {
    title: '项目名称',
    dataIndex: 'ckbmItemName',
    key: 'ckbmItemName',
  }, {
    title: '类型',
    dataIndex: 'ckbmTypeName',
    index: 'ckbmTypeName',
  }, {
    title: '周期',
    dataIndex: 'ckbmFqcName',
    index: 'ckbmFqcName',
  }];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '点检及保养',
}, {
  path: '',
  name: '点检及保养项BOM',
}];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const EQMMaintChecBOM = props => (
  <div className="EQMMaintChecBOM">
    <Bread breadMap={breadMap} />
    <Title name="点检及保养项BOM" />
    <FormContainer
      name="EQMMaintChecBOMForm"
      action={EQMMaintcBOM}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqmModelId" className={'label'}>设备型号</label>
        <span className={'select'}>
          <SelectContainer
            name="eqmModelId"
            className={'select'}
            itemKey="id"
            itemValue="name"
            load="true"
            action={EQMtypeItem}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="ckbmItemId" className={'label'}>项目代码</label>
        <span className={'select'}>
          <SelectContainer
            name="ckbmItemId"
            className={'select'}
            itemKey="id"
            itemValue="name"
            load="true"
            action={EQMBomItem}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
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
      <Modal name="MaintBomAdd" btnName="新增" title="新增" >
        <ModalForm
          name="MaintBomAdd"
          action={EQMMaintcBOM}
          method="POST"
          dataTemplate={ChecBomAddPostTemplate}
          formName="EQMMaintChecBOMForm"
          filters={defaultRequestFilters}
          modalName="MaintBomAdd"
        >
          <div className="modalStyle">
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="eqmModelId" className={'label'}>设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqmModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMtypeItem}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="ckbmItemId" className={'label'}>保养项</label>
              <span className={'select'}>
                <SelectContainer
                  name="ckbmItemId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMBomItem}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="ckbmType">保养类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="ckbmType"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMBomtypeItem}
                  next="ckbmFqc"
                  dataSourceTemplate={defaultDataSourceTemplate}
                  cb={changeNext}
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="ckbmFqcId">频率</label>
              <span className={'select'}>
                <SelectContainer
                  name="ckbmFqcId"
                  id="ckbmFqc"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMfrequency}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="MaintBomUpdate"
        formName="EQMMaintChecBOMForm"
        tableName="EQMMaintChecBOMTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
        mode="ChecBom"
      >
        <ModalForm
          name="MaintBomUpdate"
          modalName="MaintBomUpdate"
          action={EQMMaintcBOM}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={ChecBomUpdatePutTemplate}
          filters={defaultRequestFilters}
          formName="EQMMaintChecBOMForm"
          tableName="EQMMaintChecBOMTab"
        >
          <div className="modalStyle">
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="eqmModelId" className={'label'}>设备型号</label>
              <span className={'select'}>
                <SelectContainer
                  name="eqmModelId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  noClr
                  action={EQMtypeItem}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="ckbmItemId" className={'label'}>保养项</label>
              <span className={'select'}>
                <SelectContainer
                  name="ckbmItemId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  noClr
                  action={EQMBomItem}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="ckbmType">保养类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="ckbmType"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={EQMBomtypeItem}
                  next="ckbmFqc"
                  noClr
                  dataSourceTemplate={defaultDataSourceTemplate}
                  cb={changeNext}
                />
              </span>
            </Row>
            <Row style={{ marginBottom: '10px', height: '40px' }}>
              <label htmlFor="ckbmFqcId">频率</label>
              <span className={'select'}>
                <SelectContainer
                  name="ckbmFqcId"
                  id="ckbmFqc"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  noClr
                  action={EQMfrequency}
                  dataSourceTemplate={defaultDataSourceTemplate}
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
        action={EQMBomActive}
        tableName="EQMMaintChecBOMTab"
        formName="EQMMaintChecBOMForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMBomActive}
        tableName="EQMMaintChecBOMTab"
        formName="EQMMaintChecBOMForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMMaintChecBOMTab"
      formName="EQMMaintChecBOMForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMMaintChecBOM.defaultProps = {

};
EQMMaintChecBOM.propTypes = {

};

export default EQMMaintChecBOM;
