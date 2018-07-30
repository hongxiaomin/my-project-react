import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Table from '../../containers/QueryTableContainer';
import { Link } from 'react-router';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
// import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';


import './style.less';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplate2,
} from '../../constants/Settings';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '备料区管理',
}, {
  path: '',
  name: '接料与料车合并',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }, {
    title: '料量',
    dataIndex: 'qty',
    key: 'qty',
  }];
const Traycolumns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料车',
    dataIndex: 'car_name',
    key: 'car_name',
  }, {
    title: '架位',
    dataIndex: 'car_shelves',
    key: 'car_shelves',
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }, {
    title: '料站',
    dataIndex: 'slot',
    key: 'slot',
  }, {
    title: '仓库',
    dataIndex: 'wareh_name',
    key: 'wareh_name',
  }]

const Tabscolumns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料车',
    dataIndex: 'car_name',
    key: 'car_name',
  }, {
    title: '架位',
    dataIndex: 'car_shelves',
    key: 'car_shelves',
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }]

const SMMMaterialCarMergeOthers = (props) => {
  console.log('props', props);
  return (
    <div className="SMMMaterialCarMergeOthers">
      <Bread breadMap={breadMap} />

      <Title name="接料与料车合并" />
      <Link to="/smmMaterialCarMerge">返回上一级</Link>
      <FormContainer
        name="SMMDeleteRecordSearchForm"
        tableName="SMMDeleteRecordSearchForm"
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <Row>
          <label htmlFor="operator_id" className={'label'}>首盘料车</label>
          <InputContainer type="text" name="f_car" className={'firstliao Rowinput'} disabled />
          <label htmlFor="dc" className={'label'}>余斜车</label>
          <InputContainer type="text" name="rp_car" className={'firstliao Rowinput'} disabled />
        </Row>
        <Row>
          <label htmlFor="material_no" className={'label'}>主仓库备料车</label>
          <InputContainer type="text" name="smt_car" className={'mainliao Rowinput'} disabled />
        </Row>
        <Row>
          <label htmlFor="shelves_no" className={'label'}>请扫描条形码</label>
          <InputContainer type="text" name="labelName" className={'mainliao Rowinput'} materail="car" autoFocus={true} formName="SMMDeleteRecordSearchForm" noValue="noValue" />

        </Row>
        <span className={'titlespan magnifySpan'}>
          <BOMShowDateContainer
            name="SMMDeleteRecordSearchForm"
            title="Message"
            keyName="message"
          />
        </span>
      </FormContainer>
      <hr />
      <FormContainer
        name="SMMDeleteRecordSearchForm2"
        action=""
        method="GET"
        paramTemplate={defaultGetParamTemplate2}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <Row>
          <label htmlFor="liaohao" className={'label'}>料号</label>
          <InputContainer type="text" name="material_no" className={'firstliao Rowinput'} disabled />
          <label htmlFor="dcw" className={'label'}>模组料站</label>
          <InputContainer type="text" name="slot" className={'firstliao Rowinput'} disabled />
        </Row>
        <Row>
          <label htmlFor="material_nw" className={'label'}>本料站剩余料盘数</label>
          <InputContainer type="text" name="slot_remaining_qty" className={'firstliao Rowinput'} disabled />
          <label htmlFor="shelves_nw" className={'label'}>接料后总料量</label>
          <InputContainer type="text" name="merger_qty" className={'firstliao Rowinput'} disabled />

        </Row>
        <Row>
          <label htmlFor="remaining_qty" className={'label'}>当前料号的剩余盘数</label>
          <InputContainer type="text" name="slot_material_remaining_qty" className={'firstliao Rowinput'} disabled />
        </Row>



        <Row style={{ marginBottom: '5', marginTop: '5' }}>


          <Modal name="SMMMaterialCarMergeTray" btnName="需要接料料盘" title="需要接料料盘" >
            <ModalForm
              name="SMMMaterialCarMergeTray"
              modalName="SMMMaterialCarMergeTray"
              tableName="SMMMaterialCarMergeTrayTable"
              mode="needTray"
            >
              <div>
                <Row>
                  <TableContainer
                    name="SMMMaterialCarMergeTrayTable"
                    formName="SMMMaterialCarMergeTray"
                    columns={Traycolumns}
                    // nopagination
                    noRowSelection
                  />
                </Row>
              </div>
            </ModalForm>
          </Modal>


          <Modal name="SMMMaterialCarMergeCheckTray" btnName="查询剩余料盘" title="查询剩余料盘" >
            <ModalForm
              name="SMMMaterialCarMergeCheckTray"
              modalName="SMMMaterialCarMergeCheckTray"
              tableName="SMMMaterialCarMergeCheckTrayTable"
              mode="checkTray"
            >
              <div>
                <Row>
                  <TableContainer
                    name="SMMMaterialCarMergeCheckTrayTable"
                    formName="SMMMaterialCarMergeCheckTray"
                    columns={Tabscolumns}
                    nopagination
                    noRowSelection
                  />
                </Row>
              </div>
            </ModalForm>
          </Modal>


          <ActionBtn
            btnName="撤销本次扫描操作"
            mode="UndoOperation"
          />
        </Row>

      </FormContainer>
      <Table
        name="SMMMaterialCarMergeOtherTable"
        columns={columns}
        nopagination
      />
    </div>
  );
};
SMMMaterialCarMergeOthers.defaultProps = {

};
SMMMaterialCarMergeOthers.propTypes = {

};

export default SMMMaterialCarMergeOthers;
