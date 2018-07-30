import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import {
  EQMParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const ParamConfigTemplate = (params) => {
  const { dataParam } = params;
  const data = {
    id: dataParam.id,
    parmCode: dataParam.parmCodeAnother,
    parmName: dataParam.parmNameAnother,
    parmValue: dataParam.parmValue,
    parmDesc: dataParam.parmDesc,
    parmUnit: dataParam.parmUnit,
    remark: dataParam.remark,
    lastUpdateBy: 'Admin',
  };
  return {
    value: data,
  };
};

const EQMParamApi = `${SERVER_IP_EQM}/ams/eqm/config`;

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '参数代码',
    dataIndex: 'parmCode',
    key: 'parmCode',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="ConfigAnotherForm"
          name="parmCodeAnother"
        />
      );
    },
  }, {
    title: '参数名称',
    dataIndex: 'parmName',
    key: 'parmName',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="ConfigAnotherForm"
          name="parmNameAnother"
        />
      );
    },
  }, {
    title: '参数值',
    dataIndex: 'parmValue',
    index: 'parmValue',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="ConfigAnotherForm"
          name="parmValue"
        />
      );
    },
  }, {
    title: '参数说明',
    dataIndex: 'parmDesc',
    index: 'parmDesc',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="ConfigAnotherForm"
          name="parmDesc"
        />
      );
    },
  }, {
    title: '单位',
    dataIndex: 'parmUnit',
    index: 'parmUnit',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="ConfigAnotherForm"
          name="parmUnit"
        />
      );
    },
  }, {
    title: '更新时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
  }, {
    title: '备注',
    dataIndex: 'remark',
    index: 'remark',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="ConfigAnotherForm"
          name="remark"
        />
      );
    },
  }, {
    title: '编辑',
    dataIndex: '',
    index: '',
    render: (text, record, index) => {
      const { editable } = record;
      return (
        <div>
          {
            <EditableCellButton
              editable={editable}
              index={index}
              formName="EQMParamConfigForm"
              tableName="EQMParamConfigTab"
              needForName="ConfigAnotherForm"
              action={EQMParamApi}
              method="PUT"
              record={record}
              paramTemplate={() => ('')}
              dataTemplate={ParamConfigTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  }];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '基础配置',
}, {
  path: '',
  name: '参数配置',
}];
const EQMParamConfig = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="参数配置" />
    <FormContainer
      name="EQMParamConfigForm"
      action={EQMParamApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="parmCode" className={'label'}>参数代码</label>
        <InputContainer type="text" name="parmCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="parmName" className={'label'}>参数名称</label>
        <InputContainer type="text" name="parmName" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer
      name="EQMParamConfigTab"
      formName="EQMParamConfigForm"
      columns={columns}
      noRowSelection
    />
  </div>
);
EQMParamConfig.defaultProps = {

};
EQMParamConfig.propTypes = {

};

export default EQMParamConfig;
