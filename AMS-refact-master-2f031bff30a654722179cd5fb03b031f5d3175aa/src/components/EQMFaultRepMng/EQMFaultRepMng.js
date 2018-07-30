import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { onFormDataSourceChange } from '../../actions/FormAction';
import { formReducerName, formDataSourceName } from '../../constants/Config';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const GroupList = `${SERVER_IP_EQM}/ams/eqm/fault/group/list`;
const GrouplistItem = `${SERVER_IP_EQM}/ams/eqm/fault/group/item`;
const FaultRepair = `${SERVER_IP_EQM}/ams/eqm/repair/application`;
const eqpCodeItem = `${SERVER_IP_EQM}/ams/eqm/eqp/info/list`;

const GroupwithTemplete = data => ({
  id: Number(data),
});
// repair submit
const RepairdataTemplate = (data) => {
  const dataItem = data.data;
  const dataArr = data.dataSource;
  const repairFaultList = [];
  let DataObject = {};
  dataArr.map((item) => {
    const { faultItemId } = item;
    DataObject = {
      faultItemId,
    };
    repairFaultList.push(DataObject);
  });
  return {
    value: JSON.stringify({
      eqmCode: dataItem.eqmCode,
      repairFaultList,
      repairDesc: dataItem.repairDesc,
      createBy: 'admin',
    }),
  };
};

const afterOptChange = props => (
  (dispatch, getState) => {
    const rows = props.rows ? props.rows : [];
    rows.map((item) => {
      const { faultItemId, faultItemCode, faultItemName, faultItemDesc } = item;
      const data = { faultItemId, faultItemCode, faultItemName, faultItemDesc };
      localStorage.setItem(item.faultItemId, JSON.stringify(data));
    });
  }
);
const getTabSource = props => (
  (dispatch, getState) => {
    const state = getState();
    const propSource = props.props;
    const fromSource = props.formData;
    const paramItem = fromSource.faultItem ? fromSource.faultItem : '';
    // const paramItem = paramItemlist.length > 0 ? paramItemlist[paramItemlist.length - 1] : '';
    const dataSource = state.getIn([formReducerName, 'FaultRepMngForm', formDataSourceName]) ?
        state.getIn([formReducerName, 'FaultRepMngForm', formDataSourceName]) : [];
    const dataSourceDeep = JSON.parse(JSON.stringify(dataSource));
    const isInArray = dataSourceDeep.some(item => item.faultItemId === Number(paramItem));
    const storage = JSON.parse(localStorage.getItem(paramItem));
    dataSourceDeep.push(storage);
    if (!isInArray) {
      dispatch(onFormDataSourceChange({ formName: propSource.formName, dataSource: dataSourceDeep, response: '' }));
    }
  }
);
const actionBtnFunc = props => (
  (dispatch, getState) => {
    const state = getState();
    const dataSource = state.getIn([formReducerName, 'FaultRepMngForm', formDataSourceName]) ?
      state.getIn([formReducerName, 'FaultRepMngForm', formDataSourceName]) : [];
    dataSource.splice(props.index, 1);
  }
);
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, render, index) => (index + 1),
  }, {
    title: '故障项代码',
    dataIndex: 'faultItemCode',
    key: 'faultItemCode',
  }, {
    title: '故障项名称',
    dataIndex: 'faultItemName',
    key: 'faultItemName',
  }, {
    title: '故障项描述',
    dataIndex: 'faultItemDesc',
    key: 'faultItemDesc',
  }, {
    title: '操作',
    dataIndex: 'faultItemId',
    key: 'faultItemId',
    render: (text, record, index) => (
      <ActionBtn
        btnName="删除"
        mode="custom"
        formName="FaultRepMngForm"
        customFunc={actionBtnFunc}
        index={index}
      />
      ),
  }];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '故障及维修',
}, {
  path: '',
  name: '设备报修',
}];

const EQMFaultRepMng = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="设备报修" />
    <FormContainer
      name="FaultRepMngForm"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqmCode" className={'label'}>设备编号</label>
        <span className="select" >
          <SelectContainer
            name="eqmCode"
            action={eqpCodeItem}
            itemKey="code"
            itemValue="code"
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <br />
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="faultGroup" className={'label'}>故障群组</label>
          <span className="select" >
            <SelectContainer
              name="faultGroup"
              action={GroupList}
              itemKey="id"
              itemValue="code"
              next="faultItem"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
        <br />
        <div className={'searchCondition'}>
          <label htmlFor="faultItem" className={'label'}>故障项</label>
          <span className="select" >
            <SelectContainer
              // mode="multiple"
              name="faultItem"
              action={GrouplistItem}
              className={'select'}
              itemKey="faultItemId"
              itemValue="faultItemCode"
              // noDefault
              paramTemplate={GroupwithTemplete}
              dataSourceTemplate={defaultDataSourceTemplate}
              cb={getTabSource}
              afterOptChange={afterOptChange}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <br />
      <div className={'areaCondition'}>
        <label htmlFor="repairDesc" className={'label'}>报修备注</label>
        <InputContainer type="text" name="repairDesc" className={'textarea'} textarea />
      </div>
      <br />
    </FormContainer>
    <ActionBtn
      btnName="提交"
      mode="FaultRepMngSubmit"
      action={FaultRepair}
      formName="FaultRepMngForm"
      tableName="FaultRepMngTab"
      paramTemplate={() => ('')}
      dataTemplate={RepairdataTemplate}
      filters={defaultRequestFilters}
    />
    <TableContainer
      name="FaultRepMngTab"
      formName="FaultRepMngForm"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      columns={columns}
      uid={'ASD'}
      noRowSelection
      nopagination
    />
  </div>
);
EQMFaultRepMng.defaultProps = {

};
EQMFaultRepMng.propTypes = {

};

export default EQMFaultRepMng;
