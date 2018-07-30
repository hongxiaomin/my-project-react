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
  name: 'UChart查询与导出',
}];
const SPCUChartSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="UChart查询与导出" />
    <FormContainer
      name="SPCUChartSearchForm"
      action=""
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
    <TableContainer name="SPCUChartSearch" formName="SPCUChartSearchForm" />
  </div>
);
SPCUChartSearch.defaultProps = {

};
SPCUChartSearch.propTypes = {

};

export default SPCUChartSearch;
