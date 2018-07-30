import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import {
  EQMParamTemplate,
  EQMAddPostDataTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMSupplierApi = `${SERVER_IP_EQM}/ams/eqm/supplier`;
const EQMSupplierShowApi = `${SERVER_IP_EQM}/ams/eqm/supplier/active`;

const targetKeyUpdate = ['supplierName', 'linkman', 'mobilephone', 'telephone', 'mobilephone', 'email', 'fax', 'address', 'remark', 'id'];

const EQMPutDataclrTemplate = (param) => {
  const { ...data } = param;
  const lastUpdateBy = 'Admin';
  const dataMerge = { lastUpdateBy, ...data };
  const dataStr = JSON.stringify(dataMerge);
  const dataStrs = `${dataStr}`;
  return {
    value: dataStrs || {},
  };
};

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '供应商名称',
    dataIndex: 'supplierName',
    key: 'supplierName',
  }, {
    title: '供应商代码',
    dataIndex: 'supplierCode',
    index: 'supplierCode',
  }, {
    title: '联系人',
    dataIndex: 'linkman',
    index: 'linkman',
  }, {
    title: '联系电话',
    dataIndex: 'telephone',
    index: 'telephone',
    render: (text, record) => {
      const { mobilephone, telephone } = record;
      if ((mobilephone === null && telephone !== '') || (mobilephone === '' && telephone !== '')) {
        return telephone;
      } else if ((mobilephone !== '' && telephone === null) || (mobilephone !== '' && telephone === '')) {
        return mobilephone;
      } else if ((mobilephone === null && telephone === null) || (mobilephone === '' && telephone === '')) {
        return '';
      } else if (mobilephone !== '' && telephone !== '') {
        return `${mobilephone} / ${telephone}`;
      }
    },
  }, {
    title: 'E-mail',
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
  }];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
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
  name: '供应商设置',
}];
const EQMSupplierConfig = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="供应商设置" />
    <FormContainer
      name="EQMSupplierConfigForm"
      action={EQMSupplierApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="supplierName" className={'label'}>供应商名称</label>
        <InputContainer type="text" name="supplierName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="supplierCode" className={'label'}>供应商代码</label>
        <InputContainer type="text" name="supplierCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <SelectContainer
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={showData}
            load="true"
            defaultKey="Y"
            defaultValue="显示项"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="EQMSupplierAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMSupplierAdd"
          action={EQMSupplierApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMSupplierConfigForm"
          filters={defaultRequestFilters}
          modalName="EQMSupplierAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="supplierCode">供应商代码</label>
              <InputContainer type="text" name="supplierCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="supplierName">供应商名称</label>
              <InputContainer type="text" name="supplierName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="linkman">联系人</label>
              <InputContainer type="text" name="linkman" />
            </Row>
            <Row>
              <label htmlFor="telephone">固话</label>
              <InputContainer type="text" name="telephone" />
            </Row>
            <Row>
              <label htmlFor="mobilephone">移动电话</label>
              <InputContainer type="text" name="mobilephone" />
            </Row>
            <Row>
              <label htmlFor="email">E_Mail</label>
              <InputContainer type="text" name="email" />
            </Row>
            <Row>
              <label htmlFor="fax">传真</label>
              <InputContainer type="text" name="fax" />
            </Row>
            <Row>
              <label htmlFor="address">地址</label>
              <InputContainer type="text" name="address" />
            </Row>
            <Row>
              <label htmlFor="remark">备注</label>
              <InputContainer type="text" name="remark" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMSupplierUpdate"
        formName="EQMSupplierConfigForm"
        tableName="EQMSupplierConfigTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMSupplierUpdate"
          modalName="EQMSupplierUpdate"
          action={EQMSupplierApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMPutDataclrTemplate}
          // filters={defaultRequestFilters}
          formName="EQMSupplierConfigForm"
          tableName="EQMSupplierConfigTab"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="supplierName">供应商名称</label>
              <InputContainer type="text" name="supplierName" />
            </Row>
            <Row>
              <label htmlFor="linkman">联系人</label>
              <InputContainer type="text" name="linkman" />
            </Row>
            <Row>
              <label htmlFor="telephone">固话</label>
              <InputContainer type="text" name="telephone" />
            </Row>
            <Row>
              <label htmlFor="mobilephone">移动电话</label>
              <InputContainer type="text" name="mobilephone" />
            </Row>
            <Row>
              <label htmlFor="email">E_Mail</label>
              <InputContainer type="text" name="email" />
            </Row>
            <Row>
              <label htmlFor="fax">传真</label>
              <InputContainer type="text" name="fax" />
            </Row>
            <Row>
              <label htmlFor="address">地址</label>
              <InputContainer type="text" name="address" />
            </Row>
            <Row>
              <label htmlFor="remark">备注</label>
              <InputContainer type="text" name="remark" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="隐藏"
        mode="update"
        action={EQMSupplierShowApi}
        tableName="EQMSupplierConfigTab"
        formName="EQMSupplierConfigForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={EQMSupplierShowApi}
        tableName="EQMSupplierConfigTab"
        formName="EQMSupplierConfigForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMSupplierConfigTab"
      formName="EQMSupplierConfigForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMSupplierConfig.defaultProps = {

};
EQMSupplierConfig.propTypes = {

};

export default EQMSupplierConfig;
