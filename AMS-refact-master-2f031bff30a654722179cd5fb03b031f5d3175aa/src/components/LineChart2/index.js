/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart as ReLineChart,
  ResponsiveContainer } from 'recharts';
import {
  defaultLineChartName,
  defaultLineChartChildren,
  defaultLineChartAction,
  defaultLineChartWidth,
  defaultLineChartHeight,
  defaultLineChartContainerWidth,
  defaultLineChartContainerHeight,
  defaultLineChartAspect,
  defaultLineChartData,
  defaultLineChartMargin } from '../../constants/Config2';
import './style.less';

class LineChart extends React.Component {
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
        <ReLineChart
          name={this.props.name}
          width={this.props.chartWidth}
          height={this.props.chartHeight}
          data={this.props.data}
          margin={this.props.margin}
        >
          {this.props.children}
        </ReLineChart>
      </ResponsiveContainer>
    );
  }
}
LineChart.defaultProps = {
  name: defaultLineChartName,
  action: defaultLineChartAction,
  chartWidth: defaultLineChartWidth,
  chartHeight: defaultLineChartHeight,
  containerWidth: defaultLineChartContainerWidth,
  containerHeight: defaultLineChartContainerHeight,
  aspect: defaultLineChartAspect,
  data: defaultLineChartData,
  margin: defaultLineChartMargin,
  children: defaultLineChartChildren,
};
LineChart.propTypes = {
  name: PropTypes.string,
  chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chartHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspect: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.any),
  margin: PropTypes.objectOf(PropTypes.number),
  children: PropTypes.node,
  onInitial: PropTypes.func.isRequired,
  onDispose: PropTypes.func.isRequired,
};

export default LineChart;
