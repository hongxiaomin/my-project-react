/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
// import SPCXBarImg from '../../assets/spc-xbar.jpg';
import { SERVER_IP_SPC } from '../../constants/Settings';
import './style.less';

const PreferenceSettingURL = `${SERVER_IP_SPC}/Settings/PrefSetting/`;
const SPCPreferenceSetting = (props) => {
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
    name: '喜好设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="喜好设定" />
      <iframe src={PreferenceSettingURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={SPCXBarImg} height="140%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
SPCPreferenceSetting.defaultProps = {

};
SPCPreferenceSetting.propTypes = {

};

export default SPCPreferenceSetting;
