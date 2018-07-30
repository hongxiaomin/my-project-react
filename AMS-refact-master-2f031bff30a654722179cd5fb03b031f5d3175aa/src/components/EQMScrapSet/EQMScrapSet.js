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
  EQMUpdatePutDataTemplate,
  EQMAddPostDataTemplate,
  bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMScrapApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/item`;
const EQMScrapItem = `${SERVER_IP_EQM}/ams/eqm/scrapcause/item/item`;
const ScrapActive = `${SERVER_IP_EQM}/ams/eqm/scrapcause/item/active`;

const targetKeyUpdate = ['scItemCode', 'scItemName', 'scItemDesc', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '报废项名称',
    dataIndex: 'scItemName',
    key: 'scItemName',
  }, {
    title: '报废项代码',
    dataIndex: 'scItemCode',
    index: 'scItemCode',
  }, {
    title: '报废项描述',
    dataIndex: 'scItemDesc',
    index: 'scItemDesc',
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
  name: '设备报废',
}, {
  path: '',
  name: '报废项配置',
}];
const EQMScrapSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="报废项配置" />
    <FormContainer
      name="EQMScrapSetForm"
      action={EQMScrapApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="scItemName" className={'label'}>报废项名称</label>
        <span className={'select'}>
          <SelectContainer
            name="scItemName"
            className={'select'}
            itemKey="name"
            itemValue="name"
            load="true"
            action={EQMScrapItem}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="scItemCode" className={'label'}>报废项代码</label>
        <span className={'select'}>
          <SelectContainer
            name="scItemCode"
            className={'select'}
            itemKey="code"
            itemValue="code"
            load="true"
            action={EQMScrapItem}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
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
      <Modal name="ScrapSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="ScrapSetAdd"
          action={EQMScrapApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMScrapSetForm"
          filters={defaultRequestFilters}
          modalName="ScrapSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="scItemCode">报废项代码</label>
              <InputContainer type="text" name="scItemCode" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="scItemName">报废项名称</label>
              <InputContainer type="text" name="scItemName" />
              <i>*</i>
            </Row>
            <Row>
              <label htmlFor="scItemDesc">报废项描述</label>
              <InputContainer type="text" name="scItemDesc" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="ScrapSetUpdate"
        formName="EQMScrapSetForm"
        tableName="EQMScrapSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="ScrapSetUpdate"
          modalName="ScrapSetUpdate"
          action={EQMScrapApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMScrapSetForm"
          tableName="EQMScrapSetTab"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="scItemCode">报废项代码</label>
              <InputContainer type="text" name="scItemCode" />
            </Row>
            <Row>
              <label htmlFor="scItemName">报废项名称</label>
              <InputContainer type="text" name="scItemName" />
            </Row>
            <Row>
              <label htmlFor="scItemDesc">报废项描述</label>
              <InputContainer type="text" name="scItemDesc" />
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
        action={ScrapActive}
        tableName="EQMScrapSetTab"
        formName="EQMScrapSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={ScrapActive}
        tableName="EQMScrapSetTab"
        formName="EQMScrapSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMScrapSetTab"
      formName="EQMScrapSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMScrapSet.defaultProps = {

};
EQMScrapSet.propTypes = {

};

export default EQMScrapSet;
