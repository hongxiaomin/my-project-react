import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import TableContainer from '../../containers/QueryTableContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  rateMaintainPramTemplate,
  defaultGetParamTemplate2,
  SERVER_IP_SMM,
} from '../../constants/Settings';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';


const smmSystemSetingAPI = `${SERVER_IP_SMM}/smm/system/query`;
const smmSystemSetingAPIUpdate = `${SERVER_IP_SMM}/smm/system/update`;

const smmSystemSetPramTemplate =(params)=>{
  const {dataParam} = params;
  return {
    value: JSON.stringify([{ id: dataParam.id, value: dataParam.value }]),
  }

}
const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '设置名称',
  dataIndex: 'system_name',
  key: 'system_name',
}, {
  title: '设置值',
  dataIndex: 'value',
  key: 'value',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="SMMSystemSeting"
        name="value"
      />
    );
  },
}, {
  title: '操作',
  key: 'index',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            tableName="SMMSystemSeting"
            needForName="SMMSystemSeting"
            needData="id"
            action={smmSystemSetingAPIUpdate}
            method="PUT"
            record={record}
            paramTemplate={smmSystemSetPramTemplate}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        }
      </div>
    );
  },
},
];


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
  name: '系统设置',
}];
const SMMSystemSeting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="系统设置" />

    <TableContainer
      name="SMMSystemSeting"
      // tableName="SMMSystemSeting"
      action={smmSystemSetingAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      columns={columns}
    />
  </div>
);
SMMSystemSeting.defaultProps = {

};
SMMSystemSeting.propTypes = {

};

export default SMMSystemSeting;
