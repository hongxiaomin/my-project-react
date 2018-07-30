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

const SolutionSettingURL = `${SERVER_IP_SPC}/Settings/SolutionSetting/`;
const SPCSolutionSetting = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: 'SPC',
  }, {
    path: '',
    name: '页面设定',
  }, {
    path: '',
    name: '处理方法设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="处理方法设定" />
      <iframe src={SolutionSettingURL} height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
SPCSolutionSetting.defaultProps = {

};
SPCSolutionSetting.propTypes = {

};

export default SPCSolutionSetting;
