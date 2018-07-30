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
  SERVER_IP_RULE,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';


const RuleSearchApi = `${SERVER_IP_RULE}/webapi/ams/route/rule`;
const RuleDetailSettingApi = `${SERVER_IP_RULE}/webapi/ams/route/rule/detail`

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
  title: '类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
  render: (text, record) => (
    <span style={{ display: 'inline-block', whiteSpace: 'normal', width: 200 }}>{text}</span>
  )
}, {
  title: '程式名称',
  dataIndex: 'program_name',
  key: 'program_name',
}, {
  title: '程式路径',
  dataIndex: 'program_url',
  key: 'program_url',
}, {
  title: '最后修改人员',
  dataIndex: 'last_update_by',
  key: 'last_update_by',
}, {
  title: '最后修改时间',
  dataIndex: 'last_update_date',
  key: 'last_update_date',
}];

const columnsTable = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '规则名称',
  dataIndex: 'ruleIdName',
  key: 'ruleIdName',
}, {
  title: '上一个节点',
  dataIndex: 'sourceNodeName',
  key: 'sourceNodeName',
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
  dataIndex: 'destNodeName',
  key: 'destNodeName',
  render: (text) => {
    if (text) {
      return text;
    } else {
      return '--';
    }
  }
}, {
  title: '最后修改人员',
  dataIndex: 'last_update_by',
  key: 'last_update_by',
}, {
  title: '最后修改时间',
  dataIndex: 'last_update_date',
  key: 'last_update_date',
}];


const RuleSearch = props => (
  <div className='ruleSearchPage'>
    <Bread breadMap={breadMap} />
    <Title name="规则查询" />
    <FormContainer
      name="RuleSearchForm"
      action={RuleSearchApi}
      method="GET"
      paramTemplate={defaultPutParamTemplateRule}
      responseFormatter={res => JSON.parse(res)}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >

      <div className={'searchCondition'}>
        <label htmlFor="code" className={'label'}>简码</label>
        <InputContainer type="text" name="code" className={'input'} noValue />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="name" className={'label'}>名称</label>
        <InputContainer type="text" name="name" className={'input'} noValue />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="type" className={'label'}>类型</label>
        <InputContainer type="text" name="type" className={'input'} noValue />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name="RuleSearchTable"
          formName="RuleSearchForm"
          columns={columns}
          responseFormatter={res => JSON.parse(res)}
          isRadio
          onRowClick
          action={RuleDetailSettingApi}
          nextTableName="RuleDetailSettingTable"
          needData="id"
          isGetDate="ok"
          responseFormatter={res => JSON.parse(res)}
          dataSourceTemplate={defaultDataSourceTemplate}
          paramTemplate={(params) => {
            const param = [{ rule_id: params.id }];
            return { param };
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
          responseFormatter={res => JSON.parse(res)}
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
