import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  smmWithPageDataTemplate,
  SERVER_IP_SMM,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';

const smmCangjiaweiAPI = `${SERVER_IP_SMM}/smm/resources/querymantissashelf`;
const smmCangjiaweiAPIAdd = `${SERVER_IP_SMM}/smm/resources/addbigshelf`;
const smmCangjiaweiAPIDelete = `${SERVER_IP_SMM}/smm/resources/delbigshelf`;
const smmCangjiaweishelf = `${SERVER_IP_SMM}/smm/resources/findbigshelf`;
const smmCangjiaweiLedUpdate = `${SERVER_IP_SMM}/smm/resources/updateshelfled`;
const SMMLightAPION = `${SERVER_IP_SMM}/smm/light/ws/on`;
const SMMLightAPIOFF = `${SERVER_IP_SMM}/smm/light/ws/off`;
const smmCangjiaweiPramTemplate = (params) => {
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ shelf_no: dataParam.shelf_no, led_address: dataParam.led_address }]),
  };

}
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
const SMMStatusDataParamTemplateDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      shelf_no: v.shelf_no,
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
const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '原材料管理',
  }, {
    path: '',
    name: '仓库管理',
  }, {
    path: '',
    name: '尾数仓架位管理',
  }];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '大架位',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
  }, {
    title: '当前使用格子',
    dataIndex: 'use_shelf',
    index: 'use_shelf',
  }, {
    title: '格子总数量',
    dataIndex: 'total',
    index: 'total',
  }];
const columnshelf = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '架位名称',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
  }, {
    title: 'Led地址',
    dataIndex: 'led_address',
    index: 'led_address',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="SMMCangjiaweishelf"
          name="led_address"
        />
      );
    },
  }, {
    title: '更新时间',
    dataIndex: 'renew',
    index: 'renew',
  }, {
    title: '料号',
    dataIndex: 'material_no',
    index: 'material_no',
  }, {
    title: '状态',
    dataIndex: 'led_status',
    index: 'led_status',
    render: (text, record) => {
    if (record.led_status === 1) {
      return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: 'green' }} />);
    }
    return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: '#ccc' }} />);
   },
  }, {
    title: '操作',
    key: 'updata',
    render: (text, record, index) => {
      const { editable } = record;
      console.log(editable);
      return (
        <div>
          {
            <EditableCellButton
              editable={editable}
              index={index}
              tableName="SMMCangjiaweishelf"
              needForName="SMMCangjiaweishelf"
              action={smmCangjiaweiLedUpdate}
              needData="shelf_no"
              method="PUT"
              record={record}
              paramTemplate={smmCangjiaweiPramTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  }];
const SMMCangjiawei = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="尾数仓架位管理" />
    <FormContainer
      name="SMMCangjiaweiForm"
      action={smmCangjiaweiAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>大架位</label>
        <InputContainer type="text" name="shelf_no" className={'input'} />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="SMMCangjiaweiAdd" btnName="增加架位" title="增加架位" >
        <ModalForm
          name="SMMCangjiaweiAdd"
          action={smmCangjiaweiAPIAdd}
          method="POST"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMCangjiaweiAdd"
          formName="SMMCangjiaweiForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="shelf_no">大架位:</label>
              <InputContainer type="text" name="shelf_no" value="WS" />
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
        action={smmCangjiaweiAPIDelete}
        tableName="SMMCangjiawei"
        method="PUT"
        formName="SMMCangjiaweiForm"
        paramTemplate={() => ('')}
        selectedTemplate={rows => ({ shelf_no: rows.shelf_no })}
        dataTemplate={SMMStatusDataParamTemplateDel}
        dataSourceTemplate={defaultDataSourceTemplate}
      />
    </div>
    <TableContainer
      name="SMMCangjiawei"
      formName="SMMCangjiaweiForm"
      columns={columns}
      action={smmCangjiaweishelf}
      paramTemplate={defaultGetParamTemplate2}
      needData="shelf_no"
      aliasName="shelf_no"
      isGetDate="ok"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      nextTableName="SMMCangjiaweishelf"
      onRowClick
    />
    <Title name="架位详情" />
    <ActionBtn
      btnName="开灯"
      mode="turnLight"
      action={SMMLightAPION}
      tableName="SMMCangjiaweishelf"
      formName="SMMCangjiaweiForm"
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName="SMMCangjiawei"
      style={{ margin: '10px' }}
      filters={defaultRequestFilters}
    />
    <ActionBtn
      btnName="关灯"
      mode="turnLight"
      action={SMMLightAPIOFF}
      tableName="SMMCangjiaweishelf"
      formName="SMMCangjiaweiForm"
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName="SMMCangjiawei"
      filters={defaultRequestFilters}
    />
    <QueryTableContainer
      name="SMMCangjiaweishelf"
      columns={columnshelf}
      tableName="SMMCangjiawei"
      dataSourceTemplate={defaultDataSourceTemplate}
    />
  </div>
);
SMMCangjiawei.defaultProps = {

};
SMMCangjiawei.propTypes = {

};

export default SMMCangjiawei;
