import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplateRule,
  defaultGetParamTemplateSMT,
  SERVER_IP_RULE1,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';


const RuleSearchApi = `${SERVER_IP_RULE1}/ams/rule`;
const RuleDetailSettingApi = `${SERVER_IP_RULE1}/ams/routing/detail`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '规则查询',
}];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '代码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '类别',
  dataIndex: 'category',
  key: 'category',
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
  render: (text, record) => (
    <span style={{ display: 'inline-block', whiteSpace: 'normal', width: 200 }}>{text}</span>
  ),
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}];

const columnsTable = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '上一个节点',
  dataIndex: 'sourceId',
  key: 'sourceId',
  render: (text) => {
    if (text) {
      return text;
    } else {
      return '--';
    }
  }
}, {
  title: '条件',
  dataIndex: 'condition',
  key: 'condition',
}, {
  title: '下一个节点',
  dataIndex: 'destId',
  key: 'destId',
  render: (text) => {
    if (text) {
      return text;
    } else {
      return '--';
    }
  }
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}];


const RuleSearch = props => (
  <div className='ruleSearchPage'>
    <Bread breadMap={breadMap} />
    <Title name="规则查询" />
    <FormContainer
      name="RuleSearchForm"
      action={RuleSearchApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      load
    >

      <div className={'searchCondition'}>
        <label htmlFor="code" className={'label'}>代码</label>
        <InputContainer type="text" name="code" className={'input'} noValue />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="name" className={'label'}>名称</label>
        <InputContainer type="text" name="name" className={'input'} noValue />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="category" className={'label'}>类别</label>
        <InputContainer type="text" name="category" className={'input'} noValue />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name="RuleSearchTable"
          formName="RuleSearchForm"
          columns={columns}
          isRadio
          onRowClick
          action={RuleDetailSettingApi}
          nextTableName="RuleDetailSettingTable"
          needData="id"
          isGetDate="ok"
          dataSourceTemplate={defaultDataSourceTemplate}
          paramTemplate={(param) => {
            const params = { routingId: param.id };
            return params;
          }}
        />
      </div>
    </div>

    <Title name="规则详情" />
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1200px' }}>
        <QueryTableContainer
          name="RuleDetailSettingTable"
          tableName="RuleSearchTable"
          isRadio
          columns={columnsTable}
          dataSourceTemplate={defaultDataSourceTemplate}
          filters={defaultRequestFilters}
        />
      </div>
    </div>

  </div>
);
RuleSearch.defaultProps = {

};
RuleSearch.propTypes = {

};

export default RuleSearch;
