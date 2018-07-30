/**
fileName    : index.js
writer      : ANDY.HX.LEE, Chuck Wu
reviewers   : Chuck Wu
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import './style.less';
const colorLengthData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '8', '19'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#33DD28', '#FF8042', '#DD8042', '#FF8800', '#FFAA28', '#00C5FE', '#00EEBB', '#FF00EE', '#07F946', '#FB4AB2', '#B9ED9A', '#AAFFBB', '#F87F94', '#33BBFF', '#CCEEAA', '#EEAACC', '#00FAAB'];
class RePieChart extends React.Component {
  componentDidMount() {
    this.props.onInitial(this.props.id);
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
        <PieChart
          name={this.props.name}
          width={this.props.chartWidth}
          height={this.props.chartHeight}
          margin={this.props.margin}
        >
          {/* <Pie isAnimationActive data={this.props.data} valueKey={this.props.valueKey} nameKey={this.props.nameKey} fill={this.props.fill} label  /> */}
          <Pie isAnimationActive data={this.props.data} valueKey={this.props.valueKey} nameKey={this.props.nameKey} fill={this.props.fill} label  >
            {
              colorLengthData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />

        </PieChart>
      </ResponsiveContainer>
    );
  }
}
PieChart.defaultProps = {
  containerWidth: '100%',
  aspect: 1,
  data: [],
  margin: { top: 40, right: 40, bottom: 40, left: 40 },
};
PieChart.propTypes = {
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

export default RePieChart;
