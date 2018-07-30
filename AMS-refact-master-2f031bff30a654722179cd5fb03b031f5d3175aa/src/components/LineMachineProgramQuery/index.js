/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import TableContainer from '../../containers/TableContainer';
import TowSelect from '../../containers/TowSelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelect from '../../containers/GroupSelectContainer';
// import {  } from '../../constants/Settings';
import { LineConfigurationTemplate } from '../../constants/TableConfig';
import {
  defaultGetParamTemplate3,
  defaultRequestFilters,
  defaultDataSourceTemplate, SERVER_IP_LION, defaultDataTemplate,
 } from '../../constants/Settings';
import './style.less';

const MainFormName = 'lineMachineProgramQuery';
const MainTableName = 'lineMachineProgramQueryTable';
const lineMachineProgramQueryFormApi = `${SERVER_IP_LION}/ams/dg3/smt/scm/query/machinemodel/query`;
const lineMachineProgramQueryApi = `${SERVER_IP_LION}/ams/dg3/smt/scm/query/alllinenumber/query`;
const lineMachineProgramQueryApi2 = `${SERVER_IP_LION}/ams/dg3/smt/scm/query/workorderbylinenumber/query`;
const lineMachineProgramQueryBigApi = `${SERVER_IP_LION}/ams/dg3/smt/scm/query/bigboardbylinework/query`;
const lineMachineProgramQuerySmallApi = `${SERVER_IP_LION}/ams/dg3/smt/scm/query/smallboardbylinework/query`;
const lineMachineProgramQueryParamTemplate = (param) => {
  const dat = (param === '-1') ? '' : param;
  return {
    condition: [{ lineNumber: dat }],
  };
};
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '智能换线管理',
}, {
  path: '',
  name: '机台程式查询',
}];
export const lineMachineProgramQuerycolumnsTemplate = (param) => {
  const { columnsArray } = param;
  const rows = columnsArray && columnsArray.rows ? columnsArray.rows : {};
  const arr = [];
  const colunmsgunArr = ['lineNumber', 'workOrder', 'side', 'smallBoardName', 'bigBoardName', 'productionPlanQuantity', 'productionQuantity', 'estimatedTime'];
  const colunmsArr = rows && rows.columnName ? rows.columnName : {};
  const colunmsArrString = JSON.parse(JSON.stringify(colunmsArr));
  let data = {};
  let data2 = {};
  Object.keys(colunmsArr).forEach((key) => {
    colunmsgunArr.map((v) => {
      if (key === v) {
        delete colunmsArrString[v];
      }
      return null;
    });
  });
  colunmsgunArr.map((v) => {
    data = {
      title: colunmsArr[v],
      dataIndex: v,
      key: v,
    };
    arr.push(data);
    return null;
  });
  Object.keys(colunmsArrString).forEach((key) => {
    data2 = {
      title: colunmsArrString[key],
      dataIndex: key,
      className: 'abcd',
      key,
      render: (text, record) => {
        const { patternFileInfo } = record;
        const data4 = patternFileInfo ? patternFileInfo.map((v, i) => {
          let patternData = '';
          const dat = v[key];
          switch (dat) {
            case '0 ':
              patternData = '未下载';
              break;
            case '1 ':
              patternData = '已下载';
              break;
            default:
              patternData = dat;
          }
          const dd = <p className={'inlineTable2'} key={i}>{patternData}</p>;
          return dd;
        }) : '';
        return data4;
      },
    };
    arr.push(data2);
  });
//  debugger;
  return arr;
};
const LineMachinDataTemplate = (param) => {
  const dataSource = param && param.rows && param.rows.list ? param.rows.list : [];
  return dataSource;
};
const lineMachineProgramQuerydataSourceTemplate = (param) => {
  const { list } = param;
  return list;
};
const lineMachineProgramQueryBigApiTemplate = (param) => {
  const { workOrder, lineNumber } = param;
//  const dat = (param === '-1') ? '' : param;
  const dat = {
    workOrder: (workOrder === '-1' || workOrder === undefined) ? '' : workOrder,
    lineNumber: (lineNumber === '-1' || lineNumber === undefined) ? '' : lineNumber,
  };
  return {
    condition: [dat],
  };
};
const needSelectNameTemplate = ['bigBoardName', 'smallBoardName'];
const LineMachineProgramQuery = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="机台程式查询" />
    {/*  */}
    <FormContainer
      name={MainFormName}
      action={lineMachineProgramQueryFormApi}
      method="GET"
      paramTemplate={defaultGetParamTemplate3}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      dataTemplate={LineMachinDataTemplate}
    >
      <GroupSelect name="LineConfigurationGroupSelectName">
        <div className={'searchCondition'}>
          <label htmlFor="lineNumber" className={'label'}>线别</label>
          <span className={'select'}>
            <SelectContainer
              itemKey="name"
              itemValue="name"
              load="true"
              action={lineMachineProgramQueryApi}
              name="lineNumber"
              next="workOrder"
              dataSourceTemplate={LineConfigurationTemplate}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="workOrder" className={'label'}>工单号</label>
          <span className={'select'}>
            <SelectContainer
              itemKey="name"
              itemValue="name"
              action={lineMachineProgramQueryApi2}
              load="true"
              dataSourceTemplate={LineConfigurationTemplate}
              paramTemplate={lineMachineProgramQueryParamTemplate}
              name="workOrder"
              needTowSelect="ok"
              needSelectName={needSelectNameTemplate}
            />
          </span>
        </div>
      </GroupSelect>
      <div className={'searchCondition'}>
        <label htmlFor="bigBoardName" className={'label'}>大板名称:</label>
        <span className={'select'}>
          <TowSelect
            name="bigBoardName"
            action={lineMachineProgramQueryBigApi}
            paramTemplate={lineMachineProgramQueryBigApiTemplate}
            dataSourceTemplate={LineConfigurationTemplate}
            itemKey="name"
            itemValue="name"
            load="true"
            formName={MainFormName}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="smallBoardName" className={'label'}>小板名称:</label>
        <span className={'select'}>
          <TowSelect
            name="smallBoardName"
            action={lineMachineProgramQuerySmallApi}
            paramTemplate={lineMachineProgramQueryBigApiTemplate}
            dataSourceTemplate={LineConfigurationTemplate}
            filters={defaultRequestFilters}
            itemKey="name"
            load="true"
            itemValue="name"
            formName={MainFormName}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>起始时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer
            name="startTime"
            style={{ outline: 'none' }}
            newData
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>结束时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer
            name="endTime"
            style={{ outline: 'none' }}
            newDate
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <TableContainer
      name={MainTableName}
      formName={MainFormName}
      columnsTemplate={lineMachineProgramQuerycolumnsTemplate}
      dataSourceTemplate={lineMachineProgramQuerydataSourceTemplate}
      noRowSelection
    />


  </div>
);
LineMachineProgramQuery.defaultProps = {

};
LineMachineProgramQuery.propTypes = {

};

export default LineMachineProgramQuery;
