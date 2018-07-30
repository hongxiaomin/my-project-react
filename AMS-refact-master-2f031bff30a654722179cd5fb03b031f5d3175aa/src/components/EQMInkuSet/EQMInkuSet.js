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
import { onSelectOptionsLoaded } from '../../actions/SelectAction';
import Request from '../../utils/Request';
import { onFormDataChange } from '../../actions/FormAction';
import { defaultOption } from '../../constants/Config';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMInkuApi = `${SERVER_IP_EQM}/ams/eqm/life/part/in`;
const typeItem = `${SERVER_IP_EQM}/ams/eqm/part/type/item`;
const modelItem = `${SERVER_IP_EQM}/ams/eqm/part/model/item`;

const targetKeyUpdate = ['partTypeId', 'partModelId', 'inCount', 'remark', 'id'];

const INkuParamTemplate = (param) => {
  const {
    size = 10,
    current = 1,
    ...data } = param;
  const condition = {
    partModel: {
      modelCode: data.modelCode,
      modelName: data.modelName,
    },
    partType: {
      typeCode: data.typeCode,
      typeName: data.typeName,
    },
  };
  return { condition, size, current };
};

const modelTemplete = data => ({
  condition: { partTypeId: data },
});

const InkuPostDataTemplate = (param) => {
  const { ...data } = param;
  delete data.partTypeId;
  const createBy = 'Admin';
  const dataMerge = { createBy, ...data };
  const dataStr1 = JSON.stringify(dataMerge);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};

const InkuPutDataTemplate = (param) => {
  const { ...data } = param;
  delete data.partTypeId;
  const lastUpdateBy = 'Admin';
  const dataMerge = { lastUpdateBy, ...data };
  const dataStr1 = JSON.stringify(dataMerge);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};

// 暂时保留功能————————修改联动
const getselSource = props => (
  (dispatch) => {
    const propSource = props.props;
    const fromSource = props.formData;
    const paramItem = fromSource.partTypeId ? fromSource.partTypeId : '';
    const url = `${propSource.otherAction}?condition={"partTypeId":${paramItem}}`;
    const method = 'GET';
    const id = 'partModelId';
    const callback = (response) => {
      const resRow = response.rows;
      const options = [];
      options.push(defaultOption);
      resRow.map((item) => {
        options.push(
          {
            key: item.id,
            text: item.name,
          },
        );
      });
      dispatch(onSelectOptionsLoaded({ id, options }));
      dispatch(onFormDataChange({
        formName: propSource.formName,
        name: id,
        value: '-1' }));
    };
    Request({
      url,
      method,
      callback });
  });

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
    title: '型号描述',
    dataIndex: 'modelDesc',
    index: 'modelDesc',
    render: (text, record) => {
      const { partModel } = record;
      return partModel.modelDesc;
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
    title: '入库数量',
    dataIndex: 'inCount',
    index: 'inCount',
  }, {
    title: '入库时间',
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
    title: '操作人',
    dataIndex: 'lastUpdateBy',
    index: 'lastUpdateBy',
  }, {
    title: '备注',
    dataIndex: 'remark',
    index: 'remark',
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
  name: '入库管理',
}];
const EQMInkuSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="入库管理" />
    <FormContainer
      name="EQMInkuSetForm"
      action={EQMInkuApi}
      method="GET"
      paramTemplate={INkuParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="modelName" className={'label'}>类型名称</label>
        <InputContainer type="text" name="modelName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="modelCode" className={'label'}>类型代码</label>
        <InputContainer type="text" name="modelCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="typeName" className={'label'}>型号名称</label>
        <InputContainer type="text" name="typeName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="typeCode" className={'label'}>型号代码</label>
        <InputContainer type="text" name="typeCode" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="InkuAdd" btnName="新增" title="新增" >
        <ModalForm
          name="InkuAdd"
          action={EQMInkuApi}
          method="POST"
          dataTemplate={InkuPostDataTemplate}
          formName="EQMInkuSetForm"
          filters={defaultRequestFilters}
          modalName="InkuAdd"
        >
          <div className="modalStyle">
            <GroupSelectContainer name="BorderAndSmallBorder">
              <Row>
                <label htmlFor="partTypeId" className={'label'}>零件类型</label>
                <span className="select" >
                  <SelectContainer
                    name="partTypeId"
                    itemKey="id"
                    itemValue="name"
                    load="true"
                    action={typeItem}
                    next="partModelId"
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                </span>
                <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
              </Row>
              <Row>
                <label htmlFor="partModelId" className={'label'}>零件型号</label>
                <span className="select" >
                  <SelectContainer
                    name="partModelId"
                    action={modelItem}
                    itemKey="id"
                    itemValue="name"
                    paramTemplate={modelTemplete}
                    dataSourceTemplate={defaultDataSourceTemplate}
                  />
                </span>
                <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
              </Row>
            </GroupSelectContainer>
            <Row>
              <label htmlFor="inCount">入库数量</label>
              <InputContainer type="text" name="inCount" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="remark">零件描述</label>
              <InputContainer type="text" name="remark" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="InkuUpdate"
        formName="EQMInkuSetForm"
        tableName="EQMInkuSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="InkuUpdate"
          modalName="InkuUpdate"
          action={EQMInkuApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={InkuPutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMInkuSetForm"
          tableName="EQMInkuSetTab"
        >
          <div className="modalStyle">
            <Row style={{ marginBottom: '5px', height: '26px' }}>
              <label htmlFor="partTypeId" className={'label'}>零件类型</label>
              <span className="select" style={{ marginLeft: '0px' }}>
                <SelectContainer
                  name="partTypeId"
                  action={typeItem}
                  otherAction={modelItem}
                  itemKey="id"
                  itemValue="name"
                  paramTemplate={() => ('')}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  load="true"
                  noClr
                  // cb={getselSource}
                  disabled
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="partModelId" className={'label'}>零件型号</label>
              <span className="select" style={{ marginLeft: '0px' }} >
                <SelectContainer
                  name="partModelId"
                  action={modelItem}
                  // id="partModelId"
                  itemKey="id"
                  itemValue="name"
                  paramTemplate={modelTemplete}
                  dataSourceTemplate={defaultDataSourceTemplate}
                  noClr
                  load
                  onWithType
                  disabled
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="inCount">入库数量</label>
              <InputContainer type="text" name="inCount" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="remark">零件描述</label>
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
      name="EQMInkuSetTab"
      formName="EQMInkuSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMInkuSet.defaultProps = {

};
EQMInkuSet.propTypes = {

};

export default EQMInkuSet;
