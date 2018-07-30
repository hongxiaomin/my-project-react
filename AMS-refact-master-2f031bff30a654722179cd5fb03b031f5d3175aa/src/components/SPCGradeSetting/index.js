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

const GradeSettingURL = `${SERVER_IP_SPC}/Settings/GradeSetting/`;
const SPCGradeSetting = (props) => {
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
    name: '评等设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="评等设定" />
      <iframe src={GradeSettingURL} height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
SPCGradeSetting.defaultProps = {

};
SPCGradeSetting.propTypes = {

};

export default SPCGradeSetting;
