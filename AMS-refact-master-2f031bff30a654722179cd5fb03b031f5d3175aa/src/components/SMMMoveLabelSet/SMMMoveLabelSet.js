import React from 'react';
import PropTypes from 'prop-types';
import { Row, Progress } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import ModalFormContainer from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import InputContainer from '../../containers/InputContainer';
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
import PercentBar from '../PercentBar';


const smmMoveLabelSetAPI = `${SERVER_IP_SMM}/smm/resources/querymovelabel`;
const smmMoveLabelSetApiAdds = `${SERVER_IP_SMM}/smm/resources/addbatchlabel`;
const smmMoveLabelSetApiAdd = `${SERVER_IP_SMM}/smm/resources/addmovelabel`;
const smmMoveLabelSetApiDelete = `${SERVER_IP_SMM}/smm/resources/deletelabel`;
const smmMoveLabelSetApiUpdate = `${SERVER_IP_SMM}/smm/resources/updateled`;
const SMMLightAPION = `${SERVER_IP_SMM}/smm/light/on`;
const SMMLightAPIOFF = `${SERVER_IP_SMM}/smm/light/off`;

const MainFormName = 'SMMMoveLabelSetForm';
const MainTableName = 'SMMMoveLabelSetTable';

const breadMap = [{
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
  name: '可移动标签管理',
}];

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
const smmMoveLabelSetPramTemplate = (params) => {
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ label_name: dataParam.label_name, led_address: dataParam.led_address }]),
  };
};
const smmMoveLabelSetPramTemplateDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      label_name: v.label_name,
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
const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '标签名',
  dataIndex: 'label_name',
  key: 'label_name',
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
        formName={MainFormName}
        name="led_address"
      />
    );
  },
}, {
  title: '电量',
  dataIndex: 'electricity',
  key: 'electricity',
  render: (text) => (<PercentBar percent={text} />
  ),
}, {
  title: '信号强度',
  dataIndex: 'level',
  key: 'level',
}, {
  title: '更新时间',
  dataIndex: 'update_time',
  index: 'update_time',
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
            formName={MainFormName}
            tableName={MainTableName}
            needForName={MainFormName}
            action={smmMoveLabelSetApiUpdate}
            method="PUT"
            record={record}
            paramTemplate={smmMoveLabelSetPramTemplate}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        }
      </div>
    );
  },
}];

const SMMMoveLabelSet = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="可移动标签管理" />
    <FormContainer
      name={MainFormName}
      action={smmMoveLabelSetAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      tableName={MainTableName}
      updateSavePagination
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>标签名</label>
        <InputContainer type="text" name="label_name" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="led_address" className={'label'}>LED地址</label>
        <InputContainer type="text" name="led_address" className={'input'} />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <Modal name="SMMMoveLabelSetAdds" btnName="批量新增" title="批量新增">
      <ModalFormContainer
        name="SMMMoveLabelSetAdds"
        action={smmMoveLabelSetApiAdds}
        method="POST"
        dataTemplate={smmWithPageDataTemplate}
        filters={defaultRequestFilters}
        modalName="SMMMoveLabelSetAdds"
        formName={MainFormName}
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="label_name">标签名:</label>
            <InputContainer type="text" name="label_name" value="T-" />
          </Row>
          <Row>
            <label htmlFor="size">新增数量</label>
            <InputContainer type="text" name="size" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalFormContainer>
    </Modal>

    <Modal name="SMMMoveLabelSetAdd" btnName="单个新增" title="单个新增">
      <ModalFormContainer
        name="SMMMoveLabelSetAdd"
        action={smmMoveLabelSetApiAdd}
        method="POST"
        dataTemplate={smmWithPageDataTemplate}
        filters={defaultRequestFilters}
        modalName="SMMMoveLabelSetAdd"
        formName={MainFormName}
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="label_name">标签名称</label>
            <InputContainer type="text" name="label_name" value="T-" />
          </Row>
          <Row>
            <label htmlFor="led_address">Led地址</label>
            <InputContainer type="text" name="led_address" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalFormContainer>
    </Modal>
    <ActionBtn
      btnName="删除"
      mode="checkDataDel"
      action={smmMoveLabelSetApiDelete}
      method="PUT"
      tableName={MainTableName}
      formName={MainFormName}
      paramTemplate={() => ('')}
      selectedTemplate={rows => ({ label_name: rows.label_name })}
      dataTemplate={smmMoveLabelSetPramTemplateDel}
      dataSourceTemplate={defaultDataSourceTemplate}
    />
    <ActionBtn
      btnName="开灯"
      mode="turnLight"
      fromTable
      action={SMMLightAPION}
      tableName={MainTableName}
      formName={MainFormName}
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
    />
    <ActionBtn
      btnName="关灯"
      mode="turnLight"
      fromTable
      action={SMMLightAPIOFF}
      tableName={MainTableName}
      formName={MainFormName}
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
    />
    <TableContainer name={MainTableName} formName={MainFormName} columns={columns} />
  </div>
);
SMMMoveLabelSet.defaultProps = {

};
SMMMoveLabelSet.propTypes = {

};

export default SMMMoveLabelSet;
