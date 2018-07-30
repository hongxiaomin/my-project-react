import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import TableContainer from '../../containers/QueryTableContainer';
import {
  SERVER_IP_SMM,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPostDataTemplate,
} from '../../constants/Settings';
import ActionBtn from '../../containers/ActionBtnContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import ModalFormContainer from '../../containers/ModalFormContainer';
import InputContainer from '../../containers/InputContainer';


const smmWarehousePartitionApi = `${SERVER_IP_SMM}/smm/resources/warehouse/list`;
const SMMWarehousePartitionApiUpdate = `${SERVER_IP_SMM}/smm/warehouse/shelf`;
const smmWarehousePartitionAPIAdd = `${SERVER_IP_SMM}/smm/resources/warehouse/new`;
const smmWarehousePartitionAPIDelete = `${SERVER_IP_SMM}/smm/resources/warehouse/del`;



const smmWarehousePartitionPramTemplate = (params) => {
  const { dataParam } = params;
  const data = [
    {
      name: dataParam.name,
      shelf_no: dataParam.shelf_no,
    }
  ]
  return {
    value: JSON.stringify(data),
  }
}
const smmWarehousePartitionPramDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      name: v.name,
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
    name: '小仓库划分',
  },
];

const columns = [
  {
    title: '序号',
    dataIndex: 'serialNO',
    key: 'serialNO',
    render: (text, record, index) => (index + 1),
  }, {
    title: '小仓库',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '架位',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
    render: (text, record, index) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="SMMWarehousePartition"
          name="shelf_no"
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
              tableName="SMMWarehousePartition"
              needForName="SMMWarehousePartition"
              needData="name"
              action={SMMWarehousePartitionApiUpdate}
              method="PUT"
              record={record}
              paramTemplate={smmWarehousePartitionPramTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  },

];

const SMMWarehousePartition = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="小仓库划分" />
    <div className={'divBtn modalBtnBottom'}>
      <Modal name="SMMWarehousePartitionAdd" btnName="新增" title="新增">
        <ModalFormContainer
          name="SMMWarehousePartitionAdd"
          action={smmWarehousePartitionAPIAdd}
          method="POST"
          dataTemplate={defaultPostDataTemplate}
          dataSourceTemplate={defaultDataSourceTemplate}
          filters={defaultRequestFilters}
          modalName="SMMWarehousePartitionAdd"
          needTableName="SMMWarehousePartition"
          noFormTable
        >
          <div className={'modalStyle'}>
            <Row className={'selectLabel'}>
              <label htmlFor="type">仓库分区名称:</label>
              <InputContainer type="text" name="name" />
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
        action={smmWarehousePartitionAPIDelete}
        method="PUT"
        tableName="SMMWarehousePartition"
        paramTemplate={() => ('')}
        selectedTemplate={rows => ({ name: rows.name })}
        dataTemplate={smmWarehousePartitionPramDel}
        dataSourceTemplate={defaultDataSourceTemplate}
      />
    </div>
    <TableContainer
      name="SMMWarehousePartition"
      columns={columns}
      action={smmWarehousePartitionApi}
      method="GET"
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      nopagination

    />
  </div>
);
SMMWarehousePartition.defaultProps = {

};
SMMWarehousePartition.propTypes = {

};

export default SMMWarehousePartition;
