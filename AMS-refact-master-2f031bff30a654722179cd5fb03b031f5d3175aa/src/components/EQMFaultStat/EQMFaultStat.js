import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplateChart, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_EQM } from '../../constants/Settings';
import BarChartContainer from '../../containers/BarChartContainer2';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import PieChartContainer from '../../containers/PieChartContainer';


const EQMFaultStatApi = `${SERVER_IP_EQM}/ams/eqm/eqp/fault/statistics`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const lineAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;
const typeAPI = `${SERVER_IP_EQM}/ams/eqm/type/list`;
const modelAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/model/list`;

const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '设备管理',
  }, {
    path: '',
    name: '故障及维修',
  }, {
    path: '',
    name: '故障统计',
  },
];


const dataSourceTemplate = (response) => {
  if (response && 'rows' in response) {
    const data = response.rows;
    return data;
  }
  return undefined;
};
const EQMFaultStat = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="故障统计" />
    <FormContainer
      name="EQMFaultStatForm"
      chartName="EQMFaultStatBarchart"
      action={EQMFaultStatApi}
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
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="typeName" className={'label'}>设备类型</label>
          <span className={'select'}>
            <SelectContainer
              name="typeId"
              action={typeAPI}
              itemKey="id"
              itemValue="name"
              load="true"
              paramTemplate={() => ('')}
              next="modelId"
              dataSourceTemplate={defaultDataSourceTemplate}
            />

          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="modelName" className={'label'}>设备型号</label>
          <span className={'select'}>
            <SelectContainer
              name="modelId"
              action={modelAPI}
              itemKey="id"
              itemValue="name"
              paramTemplate={(data) => {
                const condition = { eqpTypeId: data };
                return { condition };
              }}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>


      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>开始时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>结束时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
        </span>
      </div>


      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <div>
      <BarChartContainer
        name="EQMFaultStatBarchart"
        containerWidth="50%"
        containerHeight="50%"
        aspect={1.4}
        dataSourceTemplate={dataSourceTemplate}
        xAxis={{
          dataKey: 'faultItemName',
          label: '解决方案名称',
        }}
        yAxis={{
          dataKey: 'percent',
          label: '百分比',
          domain: [0, 1],
        }}
        bars={[
          {
            name: 'Percent',
            dataKey: 'percent',
            stackId: 'a',
            fill: '#82ca9d',
          },
        ]}
        grid
        legend
        tooltip
      />

      <PieChartContainer
        name="EQMFaultStatBarchart"
        containerWidth="50%"
        containerHeight="50%"
        aspect={1.4}
        fill="#8884d8"
        valueKey="percent"
        nameKey="faultItemName"
      />

    </div>
  </div>
);
EQMFaultStat.defaultProps = {

};
EQMFaultStat.propTypes = {

};

export default EQMFaultStat;
