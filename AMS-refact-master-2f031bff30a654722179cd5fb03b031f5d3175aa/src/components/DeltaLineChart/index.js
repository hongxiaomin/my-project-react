/**
fileName    : index.js
writer      : ANDY.HX.LEE
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, CustomAxisTick, ReferenceLine, Legend } from 'recharts';
import CustomizeWarningDot from '../CustomizeWarningDot';

const DeltaLineChart = props => (
  <div>
    <LineChart name={props.name} action={props.action} width={props.width} height={props.height} data={props.data} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
      <ReferenceLine y={2500} label="Max" stroke="red" />
      <Legend verticalAlign="top" height={36} />
      <Line type="linear" dataKey="value" stroke="#8884d8" dot={<CustomizeWarningDot />} />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="name" label="X" />
      <YAxis label="Y" />
      <Tooltip active={false} />
    </LineChart>
  </div>
);

DeltaLineChart.defaultProps = {
  width: 600,
  height: 300,
  data: [],
};

DeltaLineChart.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
};

export default DeltaLineChart;
