/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart as ReBarChart,
  ResponsiveContainer } from 'recharts';
import './style.less';

class BarChart extends React.Component {
  componentDidMount() {
    this.props.onInitial(this.props.id);
  }
  render() {
    return (
      <ResponsiveContainer
        width={this.props.containerWidth}
        height={this.props.containerHeight}
        aspect={this.props.aspect}
      >
        <ReBarChart
          name={this.props.name}
          width={this.props.chartWidth}
          height={this.props.chartHeight}
          data={this.props.data}
          margin={this.props.margin}
        >
          {this.props.children}
        </ReBarChart>
      </ResponsiveContainer>
    );
  }
}
BarChart.defaultProps = {
  containerWidth: '100%',
  aspect: 1,
  data: [],
  margin: { top: 40, right: 40, bottom: 40, left: 40 },
};
BarChart.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  action: PropTypes.string,
  chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chartHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspect: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.any),
  margin: PropTypes.objectOf(PropTypes.number),
  children: PropTypes.node,
  onInitial: PropTypes.func,
};

export default BarChart;
