/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row, message } from 'antd';
import Input from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import Bread from '../Bread';
import Title from '../Title';
import { defaultDataSourceTemplate, defaultRequestFilters, SERVER_IP_LION } from '../../constants/Settings';
import Table from '../../containers/QueryTableContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
// import InputContainer from '../../containers/InputContainer';
import './style.less';

// 机台配置查询
const LineConfigurationSelectAllApi = `${SERVER_IP_LION}/dg5/scm/config/machine/selectByPage`;
// 机台配置新增
const LineConfigurationAddInSertApi = `${SERVER_IP_LION}/dg5/scm/config/machine/insert`;
// 机台配置修改
const LineConfigurationUpdateApi = `${SERVER_IP_LION}/dg5/scm/config/machine/update`;
// 机台配置删除
const LineConfigurationDeleteApi = `${SERVER_IP_LION}/dg5/scm/config/machine/delete`;

// 查询
const LineConfigurationThreeParam = (params) => {
 // debugger;
  const { size, current } = params;
  return {
    page: {
      current: current || 1,
      size: size || 10,
    },
  };
};

// (
//   return{
//
// });
// 全部删除的 dataTemplate
const LineConfigurationDeleteDataTemplate = (param) => {
  const datArry = [];
  if (param) {
    param.map((v) => {
      datArry.push(v.id);
      return null;
    });
  }
  return {
    value: JSON.stringify([{ ids: datArry.join(',') }]),
  };
};
// 修改的dataTemplate
// const LineConfigurationUpdateParamTemplate = (param) => {
//   console.log('param', param);
//   const { dataParam } = param;
//   const { vender, description, sequence, name, model, type, id, defaultFormDataSource } = dataParam;
//   let maxSequence = sequence;
//   const datArray = [];
//   defaultFormDataSource.map((v) => {
//     datArray.push(v.sequence);
//     return null;
//   });
//   // const maxNum = Math.max(...datArray);
//   if (maxSequence > datArray.length) {
//     maxSequence = datArray.length + 1;
//   }
//   return {
//     value: JSON.stringify([{
//       id,
//       vender,
//       description,
//       sequence: maxSequence,
//       name,
//       model,
//       type: type === 'PLC' ? 0 : 1,
//     }]),
//   };
// };

// 新增的Template
const LineConfigurationAddInSertDataTemplate = (param) => {
  const { description, model, controlMode, uri, id, machineType } = param;
  return {
    value: JSON.stringify([{
      id,
      uri,
      description,
      model,
      machineType,
      controlMode: controlMode === 'PLC' ? 0 : 1,
    }]),
  };
};
// 编辑的Template
const LineConfigurationChangeInSertDataTemplate = (params) => {
  console.log('param', params);
  const { controlMode, description, machineType, model, id } = params;
  return {
    value: JSON.stringify([{
      id,
      controlMode,
      description,
      machineType,
      model,
    }]),
  };
};
const checkChangeTemplate = (params) => {
  const { jsonData, tableData } = params;
  let flag = false;
  Object.keys(jsonData).forEach((v) => {
    if (flag) {
      return null;
    }
    if (jsonData[v] !== tableData[0][v].toString()) {
      flag = true;
    }
    return null;
  });
  if (!flag) {
    message.destroy();
    message.error('没有进行任何的修改!', 3);
  }
  return flag;
};
const data = [
  {
    id: '1',
    name: 'PC',
  },
  {
    id: '0',
    name: 'PLC',
  },
];

const columns = [{
  title: '机台类型',
  key: 'machineType',
  dataIndex: 'machineType',
}, {
  title: '控制方式',
  key: 'controlmode',
  dataIndex: 'controlMode',
  render: (text, record) => {
    let dataPC;
    switch (text) {
      case 0:
      case 'PLC':
        dataPC = 'PLC';
        break;
      case 1:
      case 'PC':
        dataPC = 'PC';
        break;
      default:
    }
    return dataPC;
  },
}, {
  title: '型号',
  key: 'model',
  dataIndex: 'model',

}, {
  title: '备注',
  key: 'description',
  dataIndex: 'description',
}];
// 修改的自带数据的数组
const targetKeyUpdate = ['machineType', 'controlMode', 'model', 'description', 'id'];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '产线管理',
}, {
  path: '',
  name: '机型配置',
}];

const ConfSearch = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="机型配置" />
    <div className="confSearchdivName">
      {/* <div className={'searchCondition'}>
        <label htmlFor="line" className={'label'}>线别:</label>
        <Input type="text" name="line" className={'input'} value="H01" />
      </div> */}
      <Modal name="LineConfigurationAdd" selectId="machinetypename" btnName="新增" title="新增">
        <ModalForm
          name="LineConfigurationAdd"
          action={LineConfigurationAddInSertApi}
          method="POST"
          formName="LineConfigurationFormAddName"
          modalName="LineConfigurationAdd"
          tableName="LineConfigurationThreeTable"
          dataTemplate={LineConfigurationAddInSertDataTemplate}
          filters={defaultRequestFilters}
        // tableName="LineConfigurationThreeTable"
          onRefresh
          onHide
        >
          <div className="modalStyle">

            <Row>
              <label htmlFor="machineType">机台类型</label>
              <Input type="text" name="machineType" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="controlMode">控制方式</label>
              <Select
                name="controlMode"
                itemKey="name"
                itemValue="name"
                data={data}
              />
            </Row>
            <Row>
              <label htmlFor="uri">URL</label>
              <Input type="text" name="uri" />
            </Row>
            <Row>
              <label htmlFor="model">型号</label>
              <Input type="text" name="model" />
            </Row>
            <Row>
              <label htmlFor="description">备注</label>
              <Input type="text" name="description" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="删除"
        mode="deleteAllData"
        method="POST"
        action={LineConfigurationDeleteApi}
        tableName="LineConfigurationThreeTable"
        dataTemplate={LineConfigurationDeleteDataTemplate}
      />
      <Modal
        name="LineConfigurationChange"
        selectId="aaaa"
        btnName="编辑"
        title="编辑"
        load="true"
        tableName="LineConfigurationThreeTable"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="LineConfigurationChange"
          action={LineConfigurationUpdateApi}
          method="POST"
          formName="LineConfigurationFormChangeName"
          modalName="LineConfigurationChange"
          tableName="LineConfigurationThreeTable"
          checkTemplate={checkChangeTemplate}
          dataTemplate={LineConfigurationChangeInSertDataTemplate}
          filters={defaultRequestFilters}
          onRefresh
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="machineType">机台类型</label>
              <Input type="text" name="machineType" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="controlMode">控制方式</label>
              <Select
                name="controlMode"
                itemKey="id"
                itemValue="name"
                noClr
                data={data}
              />
            </Row>
            <Row>
              <label htmlFor="model">型号</label>
              <Input type="text" name="model" />
            </Row>
            <Row>
              <label htmlFor="description">备注</label>
              <Input type="text" name="description" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
    </div>
    <Table
      name="LineConfigurationThreeTable"
      columns={columns}
      action={LineConfigurationSelectAllApi}
      dataSourceTemplate={defaultDataSourceTemplate}
      paramTemplate={LineConfigurationThreeParam}
      filters={defaultRequestFilters}
    />
  </div>
);

export default ConfSearch;
