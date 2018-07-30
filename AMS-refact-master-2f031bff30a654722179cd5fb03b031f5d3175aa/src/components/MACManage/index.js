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
import { SERVER_IP_SPM } from '../../constants/Settings';
import './style.less';

const dataSourceTemplate = (response) => {
  if (response) {
    return response.rows;
  }
  return 0;
};
const dataSourceTemplate2 = (response) => {
  if (response && "rows" in response && "changeLineTimeInfos" in response.rows) {
    const data = response.rows.changeLineTimeInfos;
    if (Array.isArray(data)) {
      return data.map(item =>
        ({ changeLineTime: item.changeLineTime, useTime: Number(item.useTime) }));
    }
  }
  return undefined;
}
const refDataTemplate = (response) => {
  let data = null;
  if (response) {
    const averageTime = response.rows.averageTime;
    data = { averageTime };
  }
  return data;
}

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fontSize={8} textAnchor="end" fill="#666">{payload.value}</text>
      </g>
    );
  }
});
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '生产监控',
}, {
  path: '',
  name: '設備管理',
}];
const MACManage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="設備管理" />
    <table className="MACTable">
      <tbody>
        <tr>
          <td align="center">
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="稼動率" cardStyle={{ height: "100%" }}>
                <br />
                <br />
                <GaugeContainer
                  size="100%"
                  action={`${SERVER_IP_SPM}/spm/equManagement/getInteractiveRate?condition=[{"startTime":"2017-1-1 00:00:00","endTime":"2017-1-10 23:59:59"}]`}
                  preload
                  websocket
                  dataSourceTemplate={dataSourceTemplate}
                />
              </Card>
            </div>
          </td>
          <td align="center">
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="平均換線時間" cardStyle={{ height: "100%" }}>
                <br />
                <br />
                <LineChartContainer
                  name="linechart"
                  containerWidth="90%"
                  aspect={1.2}
                  action={`${SERVER_IP_SPM}/spm/equManagement/getChangeLineInfo?condition=[{%22startTime%22:%222017-1-1%2000:00:00%22,%22endTime%22:%222017-1-10%2023:59:59%22}]`}
                  preload
                  dataSourceTemplate={dataSourceTemplate2}
                  refDataTemplate={refDataTemplate}
                  xAxis={{
                    dataKey: 'changeLineTime',
                    label: '時間',
                    tick: <CustomizedAxisTick />,
                  }}
                  yAxis={{
                    dataKey: 'useTime',
                    label: '使用時間',
                    domain: [0, 100],
                  }}
                  lines={[
                    {
                      name: '使用時間',
                      type: 'linear',
                      dataKey: 'useTime',
                      stroke: '#007b43',
                    },
                  ]}
                  refs={[
                    {
                      direction: 'y',
                      dataKey: 'averageTime',
                      label: '平均時間',
                      stroke: '#007b43',
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
      </tbody>
    </table>
  </div>
);
MACManage.defaultProps = {

};
MACManage.propTypes = {

};

export default MACManage;
