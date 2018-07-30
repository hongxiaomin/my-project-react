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
  name: 'AOI报表导出',
}];
const SPCAOIReportExport = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="AOI报表导出" />
    <FormContainer
      name="SPCAOIReportExportForm"
      action=""
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
    <TableContainer name="SPCAOIReportExport" formName="SPCAOIReportExportForm" />
  </div>
);
SPCAOIReportExport.defaultProps = {

};
SPCAOIReportExport.propTypes = {

};

export default SPCAOIReportExport;
