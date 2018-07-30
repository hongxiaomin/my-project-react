/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Card from '../Card';
import LineChartContainer from '../../containers/LineChartContainer2';
import GaugeContainer from '../../containers/GaugeContainer';
import BarChartContainer from '../../containers/BarChartContainer2';
import { SERVER_IP_SPM } from '../../constants/Settings';
import './style.less';

const dataSourceTemplate = (response) => {
  if (response) {
    const data = response.rows.totalAchievingRateData.datas;
    if (Array.isArray(data)) {
      data.reverse();
      data.splice(0, 1);
      console.log('dataSourceTemplate', data)
      return data.map(item =>
        ({ timePoint: Number(item.timePoint), reachRate: Number(item.reachRate) }));
    }
  }
  return undefined;
}
const dataSourceTemplate2 = (response) => {
  if (response && "rows" in response && "totalAchievingRateData" in response.rows && "datas" in response.rows.totalAchievingRateData) {
    const data = response.rows.totalAchievingRateData.datas;
    if (Array.isArray(data)) {
      data.reverse();
      const filteredData = data.slice(0, 1);
      return filteredData[0].reachRate;
    }
  }
  return undefined;
}
const dataSourceTemplate3 = (response) => {
  if (response && "rows" in response && "totalAchievingRateData" in response.rows && "datas" in response.rows.totalAchievingRateData) {
    const data = response.rows.totalAchievingRateData.datas;
    if (Array.isArray(data)) {
      data.reverse();
      const filteredData = data.slice(0, 1);
      const item = '達標率';
      const reachRate = Number(filteredData[0].reachRate);
      const unreachRate = 100 - reachRate;
      return [{ item, reachRate, unreachRate }]
    }
  }
  return undefined;
}
const dataSourceTemplate4 = (response) => {
  if (response) {
    const data2 = response.rows.totalAchievingRateData.datas;
    if (Array.isArray(data2)) {
      data2.reverse();
      data2.splice(0, 1);
      console.log('dataSourceTemplate4', data2)
      return data2.map(item =>
        ({ timePoint: Number(item.timePoint), reachRate: Number(item.reachRate) }));
    }
  }
  return undefined;
}
const refDataTemplate = (response) => {
  let data = null;
  if (response) {
    const tagartValue = response.rows.targetValue;
    data = { tagartValue };
  }
  return data;
}
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '生产监控',
}, {
  path: '',
  name: '生产管理',
}];
const PDTManage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="生产管理" />
    <table className="PDTTable">
      <tbody>
        <tr>
          <td align="center">
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="實時總達成率" cardStyle={{ height: "100%" }}>
                <br />
                <br />
                <GaugeContainer
                  name="gaugechart"
                  size="70%"
                  action={`${SERVER_IP_SPM}/spm/produce/detail/achieving/rate?condition=[{%22lineType%22:%22To1%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate2}
                />
              </Card>
            </div>
          </td>
          <td align="center">
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="實時總點數" cardStyle={{ height: "100%" }}>
                <br />
                <BarChartContainer
                  name="barchart"
                  containerWidth="90%"
                  aspect={1.4}
                  action={`${SERVER_IP_SPM}/spm/produce/detail/point/rate?condition=[{%22lineType%22:%22To1%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate3}
                  xAxis={{
                    dataKey: 'item',
                    label: '達標率',
                  }}
                  yAxis={{
                    dataKey: 'reachRate',
                    label: '百分比',
                    domain: [0, 100],
                  }}
                  bars={[
                    {
                      name: '未達標',
                      dataKey: 'unreachRate',
                      stackId: 'a',
                      fill: '#82ca9d',
                    },
                    {
                      name: '達標',
                      dataKey: 'reachRate',
                      stackId: 'a',
                      fill: '#8884d8',
                    },
                  ]}
                  grid
                  legend
                  tooltip
                />
              </Card>
            </div>
          </td>
        </tr>
        <br />
        <tr>
          <td align="center">
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="達成率當日趨勢圖" cardStyle={{ height: "100%" }}>
                <br />
                <br />
                <LineChartContainer
                  name="linechart"
                  containerWidth="90%"
                  aspect={1.2}
                  action={`${SERVER_IP_SPM}/spm/produce/detail/achieving/rate?condition=[{%22lineType%22:%22To1%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate4}
                  refDataTemplate={refDataTemplate}
                  xAxis={{
                    dataKey: 'timePoint',
                    label: '時間',
                  }}
                  yAxis={{
                    domain: [0, 100],
                    dataKey: 'reachRate',
                    label: '達成率',
                  }}
                  lines={[
                    {
                      name: '達成率',
                      type: 'linear',
                      dataKey: 'reachRate',
                      stroke: '#8884d8',
                    },
                  ]}
                  refs={[
                    {
                      direction: 'y',
                      dataKey: 'tagartValue',
                      label: '目標線',
                      stroke: 'red',
                    },
                  ]}
                  grid
                  legend
                  tooltip
                />
              </Card>
            </div>
          </td>
          <td align="center">
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="點數當日趨勢圖" cardStyle={{ height: "100%" }}>
                <br />
                <br />
                <LineChartContainer
                  name="linechart2"
                  containerWidth="90%"
                  aspect={1.2}
                  action={`${SERVER_IP_SPM}/spm/produce/detail/point/rate?condition=[{%22lineType%22:%22To1%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate}
                  refDataTemplate={refDataTemplate}
                  xAxis={{
                    dataKey: 'timePoint',
                    label: '時間',
                  }}
                  yAxis={{
                    dataKey: 'reachRate',
                    label: '點數k點',
                    domain: [0, 100],
                  }}
                  lines={[
                    {
                      name: '點數k點%',
                      type: 'linear',
                      dataKey: 'reachRate',
                      stroke: '#8884d8',
                    },
                  ]}
                  refs={[
                    {
                      direction: 'y',
                      dataKey: 'tagartValue',
                      label: '目標線',
                      stroke: 'red',
                    },
                  ]}
                  grid
                  legend
                  tooltip
                />
              </Card>
            </div>
          </td>
        </tr>
        <br />
      </tbody>
    </table>
  </div>
);
PDTManage.defaultProps = {

};
PDTManage.propTypes = {

};

export default PDTManage;
