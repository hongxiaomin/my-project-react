/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data =[
	{ name: 'Arrived', Achieve: 4000, unAchieve: 2400, amt: 2400 },
]

const DeltaStackedBarChart = props => (
  <div>
    <BarChart name={props.name} action={props.action} width={props.width} height={props.height} data={props.data} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
    <XAxis dataKey="name" />
    <YAxis tick={{strokeWidth: 1}} tickCount={6}/>
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar dataKey="Achieve" stackId="a" fill="#8884d8" />
    <Bar dataKey="unAchieve" stackId="a" fill="#82ca9d" />
  </BarChart>
  </div>
);

DeltaStackedBarChart.defaultProps = {
  width:600,
  height:300,
  data:[],
};
DeltaStackedBarChart.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
};

export default DeltaStackedBarChart;
