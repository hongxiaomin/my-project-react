import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import ModalFormContainer from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import InputContainer from '../../containers/InputContainer';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';

import {
  defaultGetParamTemplate2,
  defaultRequestFilters, defaultDataSourceTemplate, defaultPutParamTemplate, LineBomDataSourceTemplate, SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const smmPCBTrackAPI = `${SERVER_IP_SMM}/smm/pcbtrack/gettrackbypcb`;
const smmPCBTrackAPI2 = `${SERVER_IP_SMM}/smm/pcbtrack/gettrackbyworkorder`;

const MainFormName = 'SMMPCBTrackForm';
const MainTableName = 'SMMPCBTrackTable';

const breadMap = [{
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
  name: '报表',
}, {
  path: '',
  name: 'PCB追踪',
}];

const columns1 = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '制程',
  dataIndex: 'label_name',
  key: 'label_name',
}, {
  title: '过站时间',
  dataIndex: 'status',
  key: 'status',
}];
const columns2 = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: 'PCB编号',
  dataIndex: 'label_name',
  key: 'label_name',
}, {
  title: 'SMT上线时间',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'PCB料号',
  dataIndex: 'update_time1',
  index: 'update_time1',
}, {
  title: '周期',
  dataIndex: 'update_time2',
  index: 'update_time2',
}, {
  title: '厂商',
  dataIndex: 'update_time3',
  index: 'update_time3',
}];

const TabPane = Tabs.TabPane;


const SMMPCBTrack = () => (
  <div>
    <Bread breadMap={breadMap} />
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="使用PCB条码查询" key="1">
          <FormContainer
            name="SMMPCBTrackForm1"
            action={smmPCBTrackAPI}
            method="GET"
            paramTemplate={defaultGetParamTemplate2}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          >
            <div className={'searchCondition'}>
              <label htmlFor="pcb_material_no" className={'label'}>请输入/扫描PBC条码查询</label>
              <InputContainer type="text" name="pcb_material_no" className={'input'} />
            </div>

            <input type="submit" value="查询" className={'button'} />

          </FormContainer>
          <div className={'conditionPadding'}>
            <span className={'titlespan'}>
              <BOMShowDateContainer
                name="LineBOMSearchPage1"
                title="所在工单"
                keyName="work_order"
              />
            </span>
            <span className={'titlespan'}>
              <BOMShowDateContainer
                name="LineBOMSearchPage2"
                title="PCB料号"
                keyName="product_name"
              />
            </span>
            <span className={'titlespan'}>
              <BOMShowDateContainer
                name="LineBOMSearchPage3"
                title="PCB周期"
                keyName="online_time"
              />
            </span>
            <span className={'titlespan'}>
              <BOMShowDateContainer
                name="LineBOMSearchPage4"
                title="厂商"
                keyName="amount"
              />
            </span>
          </div>


          <TableContainer name="SMMPCBTrack1" formName="SMMPCBTrackForm1" columns={columns1} />
        </TabPane>

        <TabPane tab="使用工单查询" key="2">
          <FormContainer
            name="SMMPCBTrackForm2"
            action={smmPCBTrackAPI2}
            method="GET"
            paramTemplate={defaultGetParamTemplate2}
            filters={defaultRequestFilters}
            dataSourceTemplate={LineBomDataSourceTemplate}
          >
            <div className={'searchCondition'}>
              <label htmlFor="work_order" className={'label'}>请输入工单号查询</label>
              <InputContainer type="text" name="work_order" className={'input'} value="2311703362" />
            </div>

            <input type="submit" value="查询" className={'button'} />
          </FormContainer>
          <div className={'conditionPadding'}>
            <span className={'titlespan'}>
              <BOMShowDateContainer
                name="SMMPCBTrackForm2"
                title="工单"
                keyName="work_order"
              />
            </span>
          </div>
          <TableContainer name="SMMPCBTrack2" formName="SMMPCBTrackForm2" columns={columns2} />
        </TabPane>
      </Tabs>
    </div>

  </div>
  );
SMMPCBTrack.defaultProps = {

};
SMMPCBTrack.propTypes = {

};

export default SMMPCBTrack;
