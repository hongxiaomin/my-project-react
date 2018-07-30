import React from 'react';
import { Row, Button, Progress } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPostDataTemplate,
  defaultGetParamTemplate2,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtnShowModel from '../../containers/ActionBtnShowModelContainer';

const PCBLabelConfigAPI = `${SERVER_IP_PCB}/ams/pcb/label/light/get`;
const PCBLabelAddAPI = `${SERVER_IP_PCB}/ams/pcb/label/add`;
const PCBLabelUpdateAPI = `${SERVER_IP_PCB}/ams/pcb/label/update`;
const PCBLabelShowHideAPI = `${SERVER_IP_PCB}/ams/pcb/label/delete`;
const PCBLightAPI = `${SERVER_IP_PCB}/ams/pcb/label/light`;
const UnbondAPI = `${SERVER_IP_PCB}/ams/pcb/light/unbound`;
const MainFormName = 'PCBNewShelfConfigTableForm';
const MainTableName = 'PCBNewShelfConfigTable';
const targetKeyModify = ['name', 'id'];
const PCBLabelHideDataParamTemplate = (param) => {
  const { ...data } = { id: param.id, active: 'N' };
  return {
    value: data ? [data] : [],
  };
};
const PCBLabelDataParamTemplate = (param) => {
  const { ...data } = { id: param.id, active: 'Y' };
  return {
    value: data ? [data] : [],
  };
};
const PCBLabeOpenParamTemplate = (param) => {
  const { id } = param;
  const dataArray = [];
  id.map((item) => {
    const data = { id: item, status: '0' };
    dataArray.push(data);
    return null;
  });
  return {
    value: dataArray,
  };
};
const PCBLabeCloseParamTemplate = (param) => {
  const { id } = param;
  const dataArray = [];
  id.map((item) => {
    const data = { id: item, status: '1' };
    dataArray.push(data);
    return null;
  });
  return {
    value: dataArray,
  };
};
export const modifyParamTemplate = (param) => {
  const { ...data } = { id: param.id, name: param.name, required: '1' };
  return {
    value: data ? [data] : [] };
};
const PCBLabeCloseParamTemplate1 = (param) => {
  const { ...data } = { id: param.id, required: '0' };
  return {
    value: data ? [data] : [],
  };
};
const PCBLabeCloseParamTemplate2 = (param) => {
  const { ...data } = { id: param.id, required: '1' };
  return {
    value: data ? [data] : [],
  };
};

export const defaultPutDataTemplate = (param) => {
  const { ...data } = param;
  Object.keys(data).forEach((key) => {
    if (key === 'name') {
      delete data[key];
    }
  });
  const require = { required: '1' };
  const dataStr = { ...data, ...require };
  return {
    value: dataStr ? [dataStr] : [],
  };
};
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '标签编号',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '标签地址',
    dataIndex: 'serial',
    key: 'serial',
  }, {
    title: '料号',
    dataIndex: 'partNums',
    key: 'partNums',
    render: (text, record) => {
      const partNumss = record.partNums;
      if (partNumss.length > 0) {
        const parts = [];
        parts.push(<div className="modelInfo"><span style={{ width: '160px' }}>流水码</span><span>料号</span><span>PCB Code</span><span>Date Code</span>
          <span>数量</span><span>状态</span></div>);
        for (let ii = 0; ii < partNumss.length; ii++) {
          let statuss = '出库';
          if (partNumss[ii].status === 0) {
            statuss = '在库';
          } else if (partNumss[ii].status === -1) {
            statuss = '异常';
          } else if (partNumss[ii].status === 2) {
            statuss = '短期报废';
          } else if (partNumss[ii].status === 3) {
            statuss = '报废再使用';
          } else if (partNumss[ii].status === 4) {
            statuss = '永久报废';
          }
          parts.push(<div className="modelInfo">
            <span style={{ width: '160px' }}>{partNumss[ii].serial}</span><span>{partNumss[ii].partNum}</span>
            <span>{partNumss[ii].pcbCode}</span><span>{partNumss[ii].dateCode}</span>
            <span>{partNumss[ii].count}</span><span>{statuss}</span>
          </div>);
        }
        const name = `Model${record.id}`;
        return (<div className="tableBtn"><Modal
          cancelInitial name={name} btnName="详情" title="详情" key={record.id} className="tableModel"
        >{parts}</Modal></div>);
      } else if (partNumss.length === 0) {
        return 'N/A';
      }
      return null;
    },
  }, {
    title: '电量',
    dataIndex: 'electricity',
    key: 'electricity',
    render: (text, record) => {
      const electric = record.electricity;
      return (<Progress percent={electric} status="active" />);
    },
  }, {
    title: '信号强度',
    dataIndex: 'network',
    key: 'network',
    render: (text, record) => (record.level),
  }, {
    title: '亮灯指示',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      if (record.status === 0) {
        return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: 'green' }} />);
      }
      return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: '#ccc' }} />);
    },
  }];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '参数配置',
}, {
  path: '',
  name: '标签配置',
}];
const selData = [
  {
    id: 'Y',
    name: '显示项',
  }, {
    id: 'N',
    name: '隐藏项',
  },
];
const statusData = [
  {
    id: '0',
    name: '开灯',
  }, {
    id: '1',
    name: '关灯',
  },
];
const PCBNewShelfConfig = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="标签配置" />
    <FormContainer
      name="PCBNewShelfConfigTableForm"
      action={PCBLabelConfigAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="labelCode" className={'label'}>标签编号</label>
        <Input type="text" name="labelCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="partNum" className={'label'}>料号</label>
        <Input type="text" name="partNum" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'status'}>状态</label>
        <span className={'select'}>
          <Select
            name="status"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={statusData}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <Select
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            defaultValue="显示项"
            defaultKey="Y"
            data={selData}
            load="true"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'} style={{ marginBottom: '20px' }}>
      <Modal name="PCBLabelAdd" btnName="新增" title="新增" >
        <ModalForm
          name="PCBLabelAdd"
          action={PCBLabelAddAPI}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={defaultPostDataTemplate}
          modalName="PCBLabelAdd"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="labelCode">标签编号</label>
              <Input type="text" name="labelCode" />
            </Row>
            <Row>
              <label htmlFor="serial">标签地址</label>
              <Input type="text" name="serial" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="PCBLabelUpdate"
        btnName="修改"
        title="修改"
        formName={MainFormName}
        tableName={MainTableName}
        load="true"
        tarKey={targetKeyModify}
      >
        <ModalForm
          name="PCBLabelUpdate"
          action={PCBLabelUpdateAPI}
          method="PUT"
          filters={defaultRequestFilters}
          paramTemplate={defaultPutDataTemplate}
          modalName="PCBLabelUpdate"
          formName={MainFormName}
          tableName={MainTableName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="name">原始二维码</label>
              <Input type="text" name="name" disabled />
            </Row>
            <Row>
              <label htmlFor="labelCode">当前二维码</label>
              <Input type="text" name="labelCode" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtnShowModel
        btnName="解绑"
        method="PUT"
        action={UnbondAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={PCBLabeCloseParamTemplate1}
        paramTemplates={PCBLabeCloseParamTemplate2}
        title="标签配置"
      />
      <ActionBtn
        btnName="隐藏"
        mode="hide"
        action={PCBLabelShowHideAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={PCBLabelHideDataParamTemplate}
        pcbNewConfigDoubleSelect
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="show"
        action={PCBLabelShowHideAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={PCBLabelDataParamTemplate}
        pcbNewConfigDoubleSelect
      />
      <ActionBtn
        btnName="开灯"
        mode="hide"
        action={PCBLightAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={PCBLabeOpenParamTemplate}
        pcbNewConfigDoubleSelect
      />
      <ActionBtn
        btnName="关灯"
        mode="show"
        action={PCBLightAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={PCBLabeCloseParamTemplate}
        pcbNewConfigDoubleSelect
      />
    </div>
    <TableContainer
      name={MainTableName}
      formName={MainFormName}
      columns={columns}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
  </div>
);
PCBNewShelfConfig.defaultProps = {

};
PCBNewShelfConfig.propTypes = {

};

export default PCBNewShelfConfig;
