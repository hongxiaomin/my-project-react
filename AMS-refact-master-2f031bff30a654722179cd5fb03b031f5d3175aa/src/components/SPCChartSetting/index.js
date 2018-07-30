/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import { SERVER_IP_SPC } from '../../constants/Settings';
import './style.less';

const SPCChartSettingURL = `${SERVER_IP_SPC}/Settings/ChartSetting/`;
const SPCChartSetting = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: 'SPC',
  }, {
    path: '',
    name: '设定页面',
  }, {
    path: '',
    name: '图表类型设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="图表类型设定" />
      <iframe src={SPCChartSettingURL} height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
SPCChartSetting.defaultProps = {

};
SPCChartSetting.propTypes = {

};

export default SPCChartSetting;
