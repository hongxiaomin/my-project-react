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
import QueryTableContainer from '../../containers/QueryTableContainer';
import { defaultDataSourceTemplate, SERVER_IP_JIG, defaultRequestFilters } from '../../constants/Settings';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import EditableCell from '../../containers/EditableCellContainer';

const JigUseRecordPageApi = `${SERVER_IP_JIG}/ams/jig/setting/config/query`;
const JigShelfConfigUpdateApi = `${SERVER_IP_JIG}/ams/jig/setting/config/update`;
const JigUseRecordPagePramTemplate = (params) => {
//  debugger;
  const { dataParam } = params;
  const { parmDesc, parmValue, remark } = dataParam;
  return {
    mode: 'Modify',
    value: JSON.stringify([{ parmDesc, parmValue, remark }]),
  };
};
const JigUseRecordPageDataPramTemplate = (params) => {
  const { dataParam } = params;
  const { id } = dataParam;
  return {
    condition: [{ id }],
  };
};
const columns = [{
  title: '序号',
  render: (text, record, index) => (index + 1),
}, {
  title: '参数代码',
  dataIndex: 'parmCode',
  key: 'parmCode',
}, {
  title: '参数值',
  dataIndex: 'parmValue',
  key: 'parmValue',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="JigUseRecordPage2"
        name="parmValue"
      />
    );
  },
}, {
  title: '参数说明',
  dataIndex: 'parmDesc',
  key: 'parmDesc',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="JigUseRecordPage2"
        name="parmDesc"
      />
    );
  },
}, {
  title: '单位',
  dataIndex: 'unit',
  key: 'unit',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="JigUseRecordPage2"
        name="remark"
      />
    );
  },
}, {
  title: '更新时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}, {
  title: '编辑',
  dataIndex: 'aaaa',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            tableName="JigUseRecordPageTable"
            needForName="JigUseRecordPage2"
            needData="id"
            action={JigShelfConfigUpdateApi}
            method="PUT"
            record={record}
            paramTemplate={JigUseRecordPagePramTemplate}
            dataTemplate={JigUseRecordPageDataPramTemplate}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        }
      </div>
    );
  },
}];

const JigUseRecordPage = (props) => {
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
    name: '参数配置',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="参数配置" />
      <QueryTableContainer
        name="JigUseRecordPageTable"
        columns={columns}
        action={JigUseRecordPageApi}
        method="GET"
        dataSourceTemplate={defaultDataSourceTemplate}
      />
    </div>
  );
};
JigUseRecordPage.defaultProps = {

};
JigUseRecordPage.propTypes = {

};

export default JigUseRecordPage;
