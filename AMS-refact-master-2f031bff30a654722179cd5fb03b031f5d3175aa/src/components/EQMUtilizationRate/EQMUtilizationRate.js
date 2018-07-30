import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import { defaultGetParamTemplateChart, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_EQM } from '../../constants/Settings';
import BarChartContainer from '../../containers/BarChartContainer2';
import GroupSelectContainer from '../../containers/GroupSelectContainer';

const EQMUtilizationRateApi = `${SERVER_IP_EQM}/ams/eqm/life/activation`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const lineAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '生产统计',
}, {
  path: '',
  name: '稼动率',
}];


const dataSourceTemplate = (response) => {
  if (response && 'rows' in response) {
    const data = response.rows;
    return data;
  }
  return undefined;
};


const EQMUtilizationRate = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="稼动率" />
    <FormContainer
      name="EQMUtilizationRateForm"
      chartName="EQMUtilizationRateBarchart"
      action={EQMUtilizationRateApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateChart}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="factoryName" className={'label'}>厂别</label>
          <span className={'select'}>
            <SelectContainer
              name="factoryId"
              action={factoryAPI}
              itemKey="id"
              itemValue="name"
              load="true"
              paramTemplate={() => ('')}
              next="lineId"
              dataSourceTemplate={defaultDataSourceTemplate}
            />

          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="lineId" className={'label'}>线别</label>
          <span className={'select'}>
            <SelectContainer
              name="lineId"
              action={lineAPI}
              itemKey="id"
              itemValue="name"
              paramTemplate={(data) => {
                const condition = { factoryId: data };
                return { condition };
              }}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>


      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <div>
      <BarChartContainer
        name="EQMUtilizationRateBarchart"
        containerWidth="90%"
        containerHeight="50%"
        dataSourceTemplate={dataSourceTemplate}
        aspect={2}
        xAxis={{
          dataKey: 'eqpCode',
          label: '设备名称',
        }}
        yAxis={{
          dataKey: 'activationValue',
          label: '百分比',
          domain: [0, 100],
        }}
        bars={[
          {
            name: 'Percent',
            dataKey: 'activationValue',
            stackId: 'a',
            fill: '#82ca9d',
          },
        ]}
        grid
        legend
        tooltip
      />

    </div>
  </div>
);
EQMUtilizationRate.defaultProps = {

};
EQMUtilizationRate.propTypes = {

};

export default EQMUtilizationRate;
