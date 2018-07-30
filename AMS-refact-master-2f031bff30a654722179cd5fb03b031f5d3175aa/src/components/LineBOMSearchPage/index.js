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
import './style.less';
import TableContainer from '../../containers/TableContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';

import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  SERVER_IP_SMM, LineBomDataSourceTemplate } from '../../constants/Settings';

const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '料号',
  dataIndex: 'material_no',
  key: 'material_no',
}, {
  title: '规格',
  dataIndex: 'description',
  index: 'description',
}, {
  title: '厂商规格/本体标志',
  dataIndex: 'vendor_part',
  index: 'vendor_part',
}, {
  title: '首选',
  dataIndex: 'grp',
  index: 'grp',
}, {
  title: '位置',
  dataIndex: 'location',
  index: 'location',
}];
const LineBOMSearchPageApi = `${SERVER_IP_SMM}/smm/web/frr/getmateriallist`;
const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
  if (startTime > endTime) {
    message.error('截止时间不能早于开始时间！', 3);
    return false;
  }
  return true;
};
const LineBOMSearchPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '主线首件报表',
  }, {
    path: '',
    name: '电子料表查询',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="电子料表查询" />
      <FormContainer
        name="LineBOMSearchPage"
        action={LineBOMSearchPageApi}
        method="GET"
        paramTemplate={defaultGetParamTemplate2}
        filters={defaultRequestFilters}
        dataSourceTemplate={LineBomDataSourceTemplate}
        checkTemplate={checkTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="input" className={'label'}>*工单号:</label>
          <InputContainer type="text" name="work_order" className={'input'} />
        </div>
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <div className={'conditionPadding'}>
        <span className={'titlespan'}>
          <BOMShowDateContainer
            name="LineBOMSearchPage"
            title="工单"
            keyName="work_order"
          />
        </span>
        <span className={'titlespan'}>
          <BOMShowDateContainer
            name="LineBOMSearchPage"
            title="机种"
            keyName="product_name"
          />
        </span>
        <span className={'titlespan'}>
          <BOMShowDateContainer
            name="LineBOMSearchPage"
            title="上线日期"
            keyName="online_time"
          />
        </span>
        <span className={'titlespan'}>
          <BOMShowDateContainer
            name="LineBOMSearchPage"
            title="数量"
            keyName="amount"
          />
        </span>
      </div>
      <TableContainer name="add" formName="LineBOMSearchPage" columns={columns} />
    </div>
  );
};
LineBOMSearchPage.defaultProps = {

};
LineBOMSearchPage.propTypes = {

};

export default LineBOMSearchPage;
