import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'SPC',
}, {
  path: '',
  name: 'AOI报表',
}, {
  path: '',
  name: 'AOI报警配置与查询',
}];
const SPCAOIDangerSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="AOI报警配置与查询" />
    <FormContainer
      name="SPCAOIDangerSearchForm"
      action=""
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
    <TableContainer name="SPCAOIDangerSearch" formName="SPCAOIDangerSearchForm" />
  </div>
);
SPCAOIDangerSearch.defaultProps = {

};
SPCAOIDangerSearch.propTypes = {

};

export default SPCAOIDangerSearch;
