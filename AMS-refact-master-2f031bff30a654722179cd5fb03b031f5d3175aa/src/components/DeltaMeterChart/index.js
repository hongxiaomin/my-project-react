/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import { Progress } from 'antd';

const DeltaMeterChart = props => (
  <div>
    <Progress type={props.type} name={props.name} action={props.action} percent={props.percent} format={props.format} status={props.status} width={props.width} />
  </div>
);

DeltaMeterChart.defaultProps = {
  type: 'dashboard',
};
DeltaMeterChart.propTypes = {
  type:PropTypes.string,
  name:PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  percent:PropTypes.number.isRequired,
  format:PropTypes.func,
  status:PropTypes.string,
  width:PropTypes.number,
};

export default DeltaMeterChart;
