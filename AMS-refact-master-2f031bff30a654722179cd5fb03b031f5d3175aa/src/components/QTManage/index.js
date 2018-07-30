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
import { SERVER_IP_SPM } from '../../constants/Settings';
import './style.less';

const dataSourceTemplate = (response) => {
  if (response) {
    const data = response.rows.ppmDatas;
    if (Array.isArray(data)) {
      data.reverse();
      return data.map(item =>
        ({ timePoint: Number(item.timePoint), value: Number(item.value) }));
    }
  }
  return undefined;
}
const refDataTemplate = (response) => {
  let data = null;
  if (response) {
    const targetValue = response.rows.targetValue;
    data = { targetValue };
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
  name: '品質管理',
}];
const qtManage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="品質管理" />
    <table className="qtTable">
      <tbody>
        <tr>
          <td>
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="實時總達成率" cardStyle={{ height: "100%" }}>
                <LineChartContainer
                  name="linechart"
                  containerWidth="90%"
                  aspect={1.6}
                  action={`${SERVER_IP_SPM}/spm/quality/ppm/data?condition=[{%22lineType%22:%22To1%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate}
                  refDataTemplate={refDataTemplate}
                  xAxis={{
                    dataKey: 'timePoint',
                    label: '時間',
                  }}
                  yAxis={{
                    dataKey: 'value',
                    label: 'PPM',
                  }}
                  lines={[
                    {
                      name: 'PPM',
                      type: 'linear',
                      dataKey: 'value',
                      stroke: '#006e54',
                    },
                  ]}
                  refs={[
                    {
                      direction: 'y',
                      dataKey: 'targetValue',
                      label: '目標線',
                      stroke: '#006e54',
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
          <td>
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="實時拋料率" cardStyle={{ height: "100%" }}>
                <LineChartContainer
                  name="linechart2"
                  containerWidth="90%"
                  aspect={1.6}
                  action={`${SERVER_IP_SPM}/spm/quality/reject/data?condition=[{%22lineType%22:%22To2%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate}
                  refDataTemplate={refDataTemplate}
                  xAxis={{
                    dataKey: 'timePoint',
                    label: '時間',
                  }}
                  yAxis={{
                    dataKey: 'value',
                    label: '拋料率%',
                  }}
                  lines={[
                    {
                      name: '拋料率',
                      type: 'linear',
                      dataKey: 'value',
                      stroke: '#0095d9',
                    },
                  ]}
                  refs={[
                    {
                      direction: 'y',
                      dataKey: 'targetValue',
                      label: '目標線',
                      stroke: '#0095d9',
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
          <td>
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="AOI誤測率" cardStyle={{ height: "100%" }}>
                <LineChartContainer
                  name="linechart3"
                  containerWidth="90%"
                  aspect={1.6}
                  action={`${SERVER_IP_SPM}/spm/quality/misdetect/data?condition=[{%22lineType%22:%22To2%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate}
                  refDataTemplate={refDataTemplate}
                  xAxis={{
                    dataKey: 'timePoint',
                    label: '時間',
                  }}
                  yAxis={{
                    dataKey: 'value',
                    label: '誤測率%',
                  }}
                  lines={[
                    {
                      name: '誤測率',
                      type: 'linear',
                      dataKey: 'value',
                      stroke: '#f39800',
                    },
                  ]}
                  refs={[
                    {
                      direction: 'y',
                      dataKey: 'targetValue',
                      label: '目標線',
                      stroke: '#f39800',
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
qtManage.defaultProps = {

};
qtManage.propTypes = {

};

export default qtManage;
