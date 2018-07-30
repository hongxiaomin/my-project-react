/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';
import QueryTable from '../../containers/QueryTableContainer';
import { defaultDataSourceTemplate, SERVER_IP_JIG, defaultGetParamTemplate, defaultRequestFilters } from '../../constants/Settings';

const JigSystemConfigPageApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query`;
const columns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (rext, record, index) => (index + 1),
}, {
  title: '治具类型',
  dataIndex: 'jigTypeCode',
  key: 'jigTypeCode',
}, {
  title: '架位类型',
  dataIndex: 'shelfType',
  key: 'shelfType',
}, {
  title: '是否检测(使用前)',
  dataIndex: 'needDetectBefore',
  key: 'needDetectBefore',
  render: (rext, record) => (record.needDetectBefore === 'N' ? '否' : '是'),
}, {
  title: '是否检测(使用后)',
  dataIndex: 'needDetectAfter',
  key: 'needDetectAfter',
  render: (rext, record) => (record.needDetectAfter === 'N' ? '否' : '是'),
}, {
  title: '是否保存(使用前)',
  dataIndex: 'needMaintainBefore',
  key: 'needMaintainBefore',
  render: (rext, record) => (record.needMaintainBefore === 'N' ? '否' : '是'),
}, {
  title: '是否保存(使用后)',
  dataIndex: 'needMaintainAfter',
  key: 'needMaintainAfter',
  render: (rext, record) => (record.needMaintainAfter === 'N' ? '否' : '是'),
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
}, {
  title: '更新时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}, {
  title: '更新',
  dataIndex: 'update',
  key: 'update',
}];

const JigSystemConfigPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '治工具管理',
  }, {
    path: '',
    name: '系统配置',
  }, {
    path: '',
    name: '治具类型',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="治具类型" />
      <QueryTable
        action={JigSystemConfigPageApi}
        name="JigSystemConfigPageTable"
        columns={columns}
        method="GET"
        dataSourceTemplate={defaultDataSourceTemplate}
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
      />
    </div>
  );
};
JigSystemConfigPage.defaultProps = {

};
JigSystemConfigPage.propTypes = {

};

export default JigSystemConfigPage;
