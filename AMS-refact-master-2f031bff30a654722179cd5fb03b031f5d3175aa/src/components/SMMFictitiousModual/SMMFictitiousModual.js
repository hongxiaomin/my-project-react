import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import { Row } from 'antd';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  smmWithPageDataTemplate,
  SERVER_IP_SMM,
} from '../../constants/Settings';

const smmFictitiousModualAPI = `${SERVER_IP_SMM}/smm/resources/queryvirtualslot`;
const smmFictitiousModualAPIAdd = `${SERVER_IP_SMM}/smm/resources/addvirtualled`;
const smmFictitiousModualAPIDelete = `${SERVER_IP_SMM}/smm/resources/delvirtualslot`;
const smmFictitiousModualAPIUpdate = `${SERVER_IP_SMM}/smm/resources/slot`;
const smmFictitiousModualAPIDetail = `${SERVER_IP_SMM}/smm/resources/queryvirtualdetail`;
const smmFictitiousModualAPILedUpdate = `${SERVER_IP_SMM}/smm/resources/updateslotled`;
const SMMLightAPION = `${SERVER_IP_SMM}/smm/light/slot/on`;
const SMMLightAPIOFF = `${SERVER_IP_SMM}/smm/light/slot/off`;
const smmFictitiousModualPramTemplate = (params) => {
  console.log(params);
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ model_id: dataParam.model_id, slot_count: dataParam.total }]),
    page: { size: 10, current: 1 },
  };
};
const smmFictitiousModualPramTemplateDetail = (params) => {
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ model_id: dataParam.model_id, led_address: dataParam.led_address, slot: dataParam.slot_id }])
  };
};
const smmFictitiousModualPramTemplateDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      model_id: v.model_id,
    };
    list.push(ledAddress);
    return null;
  });
  const [...data] = list;
  const page = { size: 10, current: 1 };
  return {
    value: data,
    page,
  };
};
const SMMStatusDataParamTemplate = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      led_address: v.led_address,
    };
    list.push(ledAddress);
    return null;
  });
  const [...data] = list;
  return {
    condition: data,
  };
};
const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '虚拟模组',
    dataIndex: 'model_id',
    key: 'model_id',
  }, {
    title: '总站别',
    dataIndex: 'total',
    key: 'total',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="SMMFictitiousModualForm"
          name="total"
        />
      );
    },
  }, {
    title: '更新时间',
    dataIndex: 'renew',
    key: 'renew',
  }, {
    title: '操作',
    key: 'updata',
    render: (text, record, index) => {
      const { editable } = record;
      return (
        <div>
          {
            <EditableCellButton
              editable={editable}
              index={index}
              formName="SMMFictitiousModualForm"
              tableName="SMMFictitiousModual"
              needForName="SMMFictitiousModualForm"
              needData="model_id"
              action={smmFictitiousModualAPIUpdate}
              method="PUT"
              record={record}
              paramTemplate={smmFictitiousModualPramTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  },
];


const columnModel = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料站',
    dataIndex: 'slot_id',
    key: 'slot_id',
  }, {
    title: '标签LED地址',
    dataIndex: 'led_address',
    key: 'led_address',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="SMMFictitiousModualDetail"
          name="led_address"
        />
      );
    },
  }, {
    title: '更新时间',
    dataIndex: 'renew',
    key: 'renew',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
     render: (text, record) => {
      if (record.status === 1) {
        return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: 'green' }} />);
         }
        return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: '#ccc' }} />);
  },
  }, {
    title: '操作',
    key: 'updata',
    render: (text, record, index) => {
      const { editable } = record;
      return (
        <div>
          {
            <EditableCellButton
              editable={editable}
              index={index}
              tableName="SMMFictitiousModualDetail"
              needForName="SMMFictitiousModualDetail"
              action={smmFictitiousModualAPILedUpdate}
              method="PUT"
              record={record}
              paramTemplate={smmFictitiousModualPramTemplateDetail}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  },
];

const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '原材料管理',
  }, {
    path: '',
    name: '原材料管理设置',
  }, {
    path: '',
    name: '虚拟模组管理',
  }];
const selData = [
  {
    id: '20',
    name: '20',
  }, {
    id: '45',
    name: '45',
  },
];
const SMMFictitiousModual = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="虚拟模组管理" />

    <FormContainer
      name="SMMFictitiousModualForm"
      action={smmFictitiousModualAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="jigCode" className={'label'}>虚拟模组名称</label>
        <InputContainer type="text" name="model_id" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="jigCode" className={'label'}>LED地址</label>
        <InputContainer type="text" name="led_address" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'} style={{ marginBottom: '10px' }}>
      <Modal name="SMMFictitiousModualAdd" btnName="增加虚拟模组" title="增加虚拟模组" >
        <ModalForm
          name="SMMFictitiousModualAdd"
          action={smmFictitiousModualAPIAdd}
          method="POST"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMFictitiousModualAdd"
          formName="SMMFictitiousModualForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="model_id"><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>虚拟模组名:</label>
              <InputContainer type="text" name="model_id" value="VS" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="slot_count"><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>料站数</label>
              <SelectContainer
                name="slot_count"
                className={'select'}
                itemKey="id"
                itemValue="name"
                defaultValue="20"
                defaultKey="20"
                data={selData}
                load="true"
              />
            </Row>
            <Row>
              <label htmlFor="led_address">LED地址</label>
              <InputContainer type="text" name="led_address" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="删除"
        mode="checkDataDel"
        action={smmFictitiousModualAPIDelete}
        method="PUT"
        tableName="SMMFictitiousModual"
        formName="SMMFictitiousModualForm"
        paramTemplate={() => ('')}
        selectedTemplate={rows => ({ model_id: rows.model_id })}
        dataTemplate={smmFictitiousModualPramTemplateDel}
        dataSourceTemplate={defaultDataSourceTemplate}
      />
    </div>
    
    <TableContainer
      name="SMMFictitiousModual"
      formName="SMMFictitiousModualForm"
      columns={columns}
      action={smmFictitiousModualAPIDetail}
      paramTemplate={defaultGetParamTemplate2}
      needData="model_id"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      nextTableName="SMMFictitiousModualDetail"
      isGetDate="ok"
      onRowClick
    />
    <ActionBtn
      btnName="开灯"
      flag
      mode="turnLight"
      action={SMMLightAPION}
      tableName="SMMFictitiousModualDetail"
      formName="SMMFictitiousModualForm"
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName="SMMFictitiousModual"
      style={{ margin: '10px' }}
      filters={defaultRequestFilters}
    />
    <ActionBtn
      btnName="关灯"
      mode="turnLight"
      action={SMMLightAPIOFF}
      tableName="SMMFictitiousModualDetail"
      formName="SMMFictitiousModualForm"
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName="SMMFictitiousModual"
      filters={defaultRequestFilters}
    />
    <QueryTableContainer
      name="SMMFictitiousModualDetail"
      columns={columnModel}
      tableName="SMMFictitiousModual"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}

    />
  </div>
);
SMMFictitiousModual.defaultProps = {

};
SMMFictitiousModual.propTypes = {

};

export default SMMFictitiousModual;
