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
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import {
  EQMParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  dataHandler,
  SERVER_IP_EQM } from '../../constants/Settings';

const ScrapMngHisApi = `${SERVER_IP_EQM}/ams/eqm/eqp/scrap`;
const ScrapMngHisActive = `${SERVER_IP_EQM}/ams/eqm/eqp/scrap/active`;
const factoryItem = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const lineItem = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;
const typeItem = `${SERVER_IP_EQM}/ams/eqm/type/list`;
const modelItem = `${SERVER_IP_EQM}/ams/eqm/eqp/model/list`;
const groupItem = `${SERVER_IP_EQM}/ams/eqm/scrapcause/group`;
const ScrapItem = `${SERVER_IP_EQM}/ams/eqm/scrapcause/item`;

const factoryTemplete = data => ({
  condition: { factoryId: data },
});
const scrapItemTemplete = data => ({
  id: data,
});
const ScrapPostDataTemplate = (param) => {
  const { ...data } = param;
  const createBy = 'Admin';
  const dataAdd = { createBy, ...data };
  delete dataAdd.scGroup;
  const data1 = dataHandler(dataAdd);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '设备型号',
    dataIndex: 'modelName',
    key: 'modelName',
  }, {
    title: '设备代码',
    dataIndex: 'eqpCode',
    index: 'eqpCode',
  }, {
    title: '报废原因',
    dataIndex: 'scrapItemName',
    index: 'scrapItemName',
  }, {
    title: '操作时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
    render: (text, record) => {
      const { lastUpdateDate } = record;
      if (lastUpdateDate === null) {
        return '';
      }
      const date = new Date(lastUpdateDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
    },
  }, {
    title: '操作者',
    dataIndex: 'lastUpdateBy',
    index: 'lastUpdateBy',
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
  name: '设备报废',
}, {
  path: '',
  name: '设备报废',
}];

const EQMScrapMngHisSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="设备报废" />
    <FormContainer
      name="EQMScrapMngHisForm"
      action={ScrapMngHisApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="factoryId" className={'label'}>厂别</label>
          <span className="select" >
            <SelectContainer
              name="factoryId"
              action={factoryItem}
              itemKey="id"
              itemValue="name"
              paramTemplate={() => ('')}
              dataSourceTemplate={defaultDataSourceTemplate}
              next="lineId"
              load
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="lineId" className={'label'}>线别</label>
          <span className="select" >
            <SelectContainer
              name="lineId"
              action={lineItem}
              itemKey="id"
              itemValue="name"
              paramTemplate={factoryTemplete}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="typeId" className={'label'}>设备类型</label>
          <span className="select" >
            <SelectContainer
              name="typeId"
              action={typeItem}
              itemKey="id"
              itemValue="name"
              paramTemplate={() => ('')}
              dataSourceTemplate={defaultDataSourceTemplate}
              next="modelId"
              load
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="modelId" className={'label'}>设备型号</label>
          <span className="select" >
            <SelectContainer
              name="modelId"
              action={modelItem}
              itemKey="id"
              itemValue="name"
              paramTemplate={(data) => {
                const condition = { eqpTypeId: data };
                return { condition };
              }}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <div className={'searchCondition'}>
        <label htmlFor="beginTime" className={'label'} style={{ marginRight: '5px' }}>开始时间</label>
        <DatePickerContainer name="beginTime" style={{ outline: 'none' }} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'} style={{ marginRight: '5px' }}>结束时间</label>
        <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
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
      <Modal name="ScrapMngHisAdd" btnName="报废" title="报废" >
        <ModalForm
          name="ScrapMngHisAdd"
          action={ScrapMngHisApi}
          method="POST"
          dataTemplate={ScrapPostDataTemplate}
          formName="EQMScrapMngHisForm"
          filters={defaultRequestFilters}
          modalName="ScrapMngHisAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="eqpCode">设备编号</label>
              <InputContainer type="text" name="eqpCode" />
              <i>*</i>
            </Row>
            <GroupSelectContainer name="BorderAndSmallBorder">
              <Row>
                <label htmlFor="scGroup" className={'label'}>报废原因群组</label>
                <span className="select" >
                  <SelectContainer
                    name="scGroup"
                    action={groupItem}
                    itemKey="id"
                    itemValue="scGroupName"
                    paramTemplate={() => ('')}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    next="scrapItemId"
                    load
                  />
                </span>
                <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
              </Row>
              <Row>
                <label htmlFor="scrapItemId" className={'label'}>报废原因</label>
                <span className="select" >
                  <SelectContainer
                    name="scrapItemId"
                    action={ScrapItem}
                    itemKey="id"
                    itemValue="scItemName"
                    paramTemplate={scrapItemTemplete}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    load
                  />
                </span>
                <i style={{ color: '#ff0000', position: 'absolute', left: '350px', top: '2px' }}>*</i>
              </Row>
            </GroupSelectContainer>
            <Row>
              <label htmlFor="Remark">备注</label>
              <InputContainer type="text" name="Remark" />
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
        action={ScrapMngHisActive}
        tableName="EQMScrapMngHisTab"
        formName="EQMScrapMngHisForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={ScrapMngHisActive}
        tableName="EQMScrapMngHisTab"
        formName="EQMScrapMngHisForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMScrapMngHisTab"
      formName="EQMScrapMngHisForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMScrapMngHisSearch.defaultProps = {

};
EQMScrapMngHisSearch.propTypes = {

};

export default EQMScrapMngHisSearch;
