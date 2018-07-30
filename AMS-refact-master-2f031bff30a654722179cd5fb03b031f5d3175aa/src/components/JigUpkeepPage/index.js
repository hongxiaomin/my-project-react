/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import './style.less';
const JigUpkeepAPI = `${SERVER_IP_JIG}/ams/jig/life/maint/list`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '治具二维码',
    dataIndex: 'jigCode',
    key: 'jigCode',
  }, {
    title: '治工具类型',
    dataIndex: 'jigTypeName',
    key: 'jigTypeName',
  }, {
    title: '保养类型',
    dataIndex: 'maintItemName',
    key: 'maintItemName',
  }, {
    title: '保养时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
  }, {
    title: '操作人',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }];

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
  if (startTime > endTime) {
    message.error('截止时间不能早于开始时间！', 3);
    return false;
  }
  return true;
};

const JigUpkeepPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '治工具管理',
  }, {
    path: '',
    name: '综合查询',
  }, {
    path: '',
    name: '保养记录',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="保养记录" />
      <FormContainer
        name="JigUpkeepForm"
        action={JigUpkeepAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
        checkTemplate={checkTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="jigTypeId" className={'label'}>治具类型</label>
          <span className={'select'}>
            <SelectContainer
              name="jigTypeId"
              action={JigTypeAPI}
              itemKey="id"
              itemValue="name"
              next="bom_status2"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="jigCode" className={'label'}>二维码</label>
          <InputContainer type="text" name="jigCode" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="startTime" className={'label'}>起始时间</label>
          <span className={'dateInput'}>
            <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="endTime" className={'label'}>截止时间</label>
          <span className={'dateInput'}>
            <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="lastUpdateBy" className={'label'}>操作人</label>
          <InputContainer type="text" name="lastUpdateBy" className={'input'} />
        </div>
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <TableContainer name="JigUpkeep" formName="JigUpkeepForm" columns={columns} noRowSelection="true" />
    </div>
  );
};
JigUpkeepPage.defaultProps = {

};
JigUpkeepPage.propTypes = {

};

export default JigUpkeepPage;
