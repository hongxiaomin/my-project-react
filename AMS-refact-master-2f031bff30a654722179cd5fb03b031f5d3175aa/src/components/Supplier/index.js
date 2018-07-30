/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Form from '../../containers/FormContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Input from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import Table from '../../containers/TableContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPostDataTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import './style.less';

const supplierApi = `${SERVER_IP_JIG}/ams/jig/setting/supplier/query`;
// const supplierApiSel = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const supplierApiPost = `${SERVER_IP_JIG}/ams/jig/setting/supplier/add`;
const MainFormName = 'supplier';
const selData = [
  {
    code: '1',
    value: '治具',
  }, {
    code: '2',
    value: '原材料',
  }, {
    code: '3',
    value: '外包商',
  },
];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '系统配置',
}, {
  path: '',
  name: '供应商',
}];
const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '厂商名称',
  dataIndex: 'supplierName',
  key: 'supplierName',
}, {
  title: '类型',
  dataIndex: 'supplierTypeName',
  index: 'supplierTypeName',
}, {
  title: '联系人',
  dataIndex: 'linkman',
  index: 'linkman',
}, {
  title: '联系电话',
  dataIndex: 'mobilehone',
  index: 'mobilehone',
}, {
  title: '分机',
  dataIndex: 'telephone',
  index: 'telephone',
}, {
  title: 'E-Mail',
  dataIndex: 'email',
  index: 'email',
}, {
  title: '传真',
  dataIndex: 'fax',
  index: 'fax',
}, {
  title: '地址',
  dataIndex: 'address',
  index: 'address',
}, {
  title: '备注',
  dataIndex: 'remark',
  index: 'remark',
}, {
  title: '创建时间',
  dataIndex: 'createDate',
  index: 'createDate',
}, {
  title: '更新时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
}];

const Supplier = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="厂商维护" />
    <div className={'divBtn'}>
      <Form
        name={MainFormName}
        action={supplierApi}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="supplierType" className={'label'}>类型</label>
          <span className={'select'}>
            <Select
              name="supplierType"
              className={'select'}
              itemKey="code"
              itemValue="value"
              data={selData}
              load="true"
            />
          </span>
        </div>
        <input type="submit" value="查询" className={'button'} />
      </Form>
      <Modal name="SupplierAdd" btnName="增加" title="厂商信息增加" >
        <ModalForm
          name="SupplierAdd"
          action={supplierApiPost}
          method="POST"
          dataTemplate={defaultPostDataTemplate}
          filters={defaultRequestFilters}
          modalName="SupplierAdd"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="supplierName">供应商名称</label>
              <Input type="text" name="supplierName" />
            </Row>
            <Row>
              <label htmlFor="supplierCode">供应商代码</label>
              <Input type="text" name="supplierCode" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="supplierType">类型</label>
              {/* <Input type="text" name="supplierType" /> */}
              <Select
                name="supplierType"
                itemKey="code"
                itemValue="value"
                data={selData}
                load="true"
              />
            </Row>
            <Row>
              <label htmlFor="linkman">联系人</label>
              <Input type="text" name="linkman" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Table columns={columns} name="supplier" formName={MainFormName} />
    </div>
  </div>
);
Supplier.defaultProps = {

};
Supplier.propTypes = {

};

export default Supplier;
