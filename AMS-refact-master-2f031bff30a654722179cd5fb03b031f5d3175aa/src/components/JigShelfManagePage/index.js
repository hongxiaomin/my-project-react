/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Select from '../../containers/SelectListContainer';
import JigShelfManageList from '../../containers/JigShelfManageListContainer';
import { SERVER_IP_JIG, defaultDataSourceTemplate, defaultRequestFilters, defaultGetParamTemplate } from '../../constants/Settings';
import JigShelfCard from '../../containers/JigShelfCardContainer';
import './style.less';


const JigShelfManageListApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/query/item/areacode`;
const JigShelfManageListLeftButtonApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/query/item/shelfside`;
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治具管理',
}, {
  path: '',
  name: '架位管理',
}];
// const data = {
//   jigTypeId: 1,
//   size: 1000,
// };
const data2 = {
  jigTypeId: 1,
  areaCode: 'A',
  size: 1000,
};
const JigShelfManagePage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="架位管理" />
    <Select
      action={JigShelfManageListApi}
      // param={data}
      method="GET"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      paramTemplate={defaultGetParamTemplate}
      propsName="JigShelfManageListProps"
    />
    <JigShelfManageList
      action={JigShelfManageListLeftButtonApi}
      data={data2}
      method="GET"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      paramTemplate={defaultGetParamTemplate}
      propsName="JigShelfManageListButtonProps"
    />
    <JigShelfCard />
  </div>
  );


JigShelfManagePage.defaultProps = {

};
JigShelfManagePage.propTypes = {

};

export default JigShelfManagePage;
