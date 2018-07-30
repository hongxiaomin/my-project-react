/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import {
  defaultGaugeSize,
  defaultGaugePercent,
  defaultGaugeWrapperClassName,
  defaultGaugeOutterClassName,
  defaultGaugeInnerClassName,
  defaultGaugeCoverClassName,
  defaultGaugeDataClassName } from '../../constants/Config2';

class Gauge extends React.Component {
  componentWillMount() {
    this.props.onInitial();
  }
  componentWillUnmount() {
    this.props.onDispose();
  }
  render() {
    return (
      <div
        className={this.props.gaugeWrapperClassName}
        style={{ width: this.props.size }}
      >
        <div className={this.props.gaugeOutterClassName} />
        <div className={this.props.gaugeInnerClassName} />
        <div
          className={this.props.gaugeCoverClassName}
          style={{ transform: `rotate(${this.props.data * 0.005}turn)` }}
        />
        <div className={this.props.gaugeDataClassName}>
          <h1>{`${this.props.data}%`}</h1>
        </div>
      </div>
    );
  }
}
Gauge.defaultProps = {
  size: defaultGaugeSize,
  data: defaultGaugePercent,
  gaugeWrapperClassName: defaultGaugeWrapperClassName,
  gaugeOutterClassName: defaultGaugeOutterClassName,
  gaugeInnerClassName: defaultGaugeInnerClassName,
  gaugeCoverClassName: defaultGaugeCoverClassName,
  gaugeDataClassName: defaultGaugeDataClassName,
};
Gauge.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.number,
  gaugeWrapperClassName: PropTypes.string,
  gaugeOutterClassName: PropTypes.string,
  gaugeInnerClassName: PropTypes.string,
  gaugeCoverClassName: PropTypes.string,
  gaugeDataClassName: PropTypes.string,
  onInitial: PropTypes.func.isRequired,
  onDispose: PropTypes.func.isRequired,
};

export default Gauge;
