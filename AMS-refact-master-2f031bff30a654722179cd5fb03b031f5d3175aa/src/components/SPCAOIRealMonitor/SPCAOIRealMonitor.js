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
  name: 'AOI实时监控',
}];
const SPCAOIRealMonitor = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="AOI实时监控" />
    <FormContainer
      name="SPCAOIRealMonitorForm"
      action=""
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
    <TableContainer name="SPCAOIRealMonitor" formName="SPCAOIRealMonitorForm" />
  </div>
);
SPCAOIRealMonitor.defaultProps = {

};
SPCAOIRealMonitor.propTypes = {

};

export default SPCAOIRealMonitor;
