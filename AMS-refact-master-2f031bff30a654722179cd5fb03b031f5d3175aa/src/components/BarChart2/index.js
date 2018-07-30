/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  ResponsiveContainer } from 'recharts';
import {
  defaultBarChartName,
  defaultBarChartWidth,
  defaultBarChartHeight,
  defaultBarChartContainerWidth,
  defaultBarChartContainerHeight,
  defaultBarChartAspect,
  defaultBarChartData,
  defaultBarChartMargin,
  defaultBarChartChildren } from '../../constants/Config2';
import './style.less';

class ReBarChart extends React.Component {
  componentWillMount() {
    this.props.onInitial();
  }
  componentWillUnmount() {
    this.props.onDispose();
  }
  render() {
    return (
      <ResponsiveContainer
        width={this.props.containerWidth}
        height={this.props.containerHeight}
        aspect={this.props.aspect}
      >
        <BarChart
          layout={this.props.layout}
          name={this.props.name}
          width={this.props.chartWidth}
          height={this.props.chartHeight}
          data={this.props.data}
          margin={this.props.margin}
        >
          {this.props.children}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
ReBarChart.defaultProps = {
  name: defaultBarChartName,
  chartWidth: defaultBarChartWidth,
  chartHeight: defaultBarChartHeight,
  containerWidth: defaultBarChartContainerWidth,
  containerHeight: defaultBarChartContainerHeight,
  aspect: defaultBarChartAspect,
  data: defaultBarChartData,
  margin: defaultBarChartMargin,
  children: defaultBarChartChildren,
};
ReBarChart.propTypes = {
  name: PropTypes.string,
  layout: PropTypes.string,
  chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chartHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspect: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.any]),
  margin: PropTypes.objectOf(PropTypes.number),
  children: PropTypes.node,
  onInitial: PropTypes.func.isRequired,
  onDispose: PropTypes.func.isRequired,
};

export default ReBarChart;
