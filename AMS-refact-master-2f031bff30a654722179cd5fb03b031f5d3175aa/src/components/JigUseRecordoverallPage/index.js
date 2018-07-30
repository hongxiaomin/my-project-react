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
// import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import './style.less';

const JigUseRecordAPI = `${SERVER_IP_JIG}/ams/jig/life/use/record/query`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '二维码',
    dataIndex: 'jigCode',
    key: 'jigCode',
  }, {
    title: '工单号',
    dataIndex: 'orderName',
    key: 'orderName',
  }, {
    title: '治具类型',
    dataIndex: 'jigTypeName',
    key: 'jigTypeName',
  }, {
    title: '线别',
    dataIndex: 'lineName',
    key: 'lineName',
  }, {
    title: '借出时间',
    dataIndex: 'loanTime',
    key: 'loanTime',
  }, {
    title: '借出者',
    dataIndex: 'loanBy',
    key: 'loanBy',
  }, {
    title: '归还时间',
    dataIndex: 'returnTime',
    key: 'returnTime',
  }, {
    title: '归还者',
    dataIndex: 'returnBy',
    key: 'returnBy',
  }, {
    title: '入库时间',
    dataIndex: 'createDate',
    key: 'createDate',
  }, {
    title: '入库者',
    dataIndex: 'createBy',
    key: 'createBy',
  }, {
    title: '更新时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
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

const JigUseRecordoverallPage = (props) => {
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
    name: '使用记录',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="使用记录" />
      <FormContainer
        name="JigUseRecordPageForm"
        action={JigUseRecordAPI}
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
          <label htmlFor="loanBy" className={'label'}>借出者</label>
          <InputContainer type="text" name="loanBy" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="returnBy" className={'label'}>归还者</label>
          <InputContainer type="text" name="returnBy" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="orderName" className={'label'}>工单号</label>
          <InputContainer type="text" name="orderName" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="lineName" className={'label'}>线别</label>
          <InputContainer type="text" name="lineName" className={'input'} />
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
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <TableContainer name="JigUseRecord" formName="JigUseRecordPageForm" columns={columns} noRowSelection="true" />
    </div>
  );
};
JigUseRecordoverallPage.defaultProps = {

};
JigUseRecordoverallPage.propTypes = {

};

export default JigUseRecordoverallPage;
