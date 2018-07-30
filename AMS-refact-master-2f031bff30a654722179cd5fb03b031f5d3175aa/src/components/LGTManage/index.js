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
import BarChartContainer from '../../containers/BarChartContainer2';
import { SERVER_IP_SPM } from '../../constants/Settings';
import './style.less';

const dataSourceTemplate = (response) => {
  if (response && "rows" in response) {
    const data = response.rows;
    if (Array.isArray(data)) {
      return data.map(item =>
        ({ item: item.lineNumber, value: Number(item.actualProductionQuantity/item.planProductionQuantity * 100) }));
    }
  }
  return undefined;
}
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '生产监控',
}, {
  path: '',
  name: '物流管理',
}];
const LGTManage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="物流管理" />
    <table className="qtTable">
      <tbody>
        <tr>
          <td>
            <div style={{ width: "80%", height: "100%", margin: "auto" }}>
              <Card title="實時總達成率" cardStyle={{ height: "100%" }}>
                <BarChartContainer
                  name="barchart"
                  layout="vertical"
                  containerWidth="90%"
                  aspect={1.4}
                  action={`${SERVER_IP_SPM}/spm/logistics/allLine/information`}
                  preload
                  dataSourceTemplate={dataSourceTemplate}
                  xAxis={{
                    dataKey: 'value',
                    label: '百分比',
                    domain: [0, 100],
                    type: "number",
                  }}
                  yAxis={{
                    dataKey: 'item',
                    label: '產線',
                    type: "category",
                  }}
                  bars={[
                    {
                      name: '百分比',
                      dataKey: 'value',
                      fill: '#82ca9d',
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
LGTManage.defaultProps = {

};
LGTManage.propTypes = {

};

export default LGTManage;
