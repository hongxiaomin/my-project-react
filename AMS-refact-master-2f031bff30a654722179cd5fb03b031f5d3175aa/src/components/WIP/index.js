/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import WIPImg from '../../assets/wip.jpg';
import { SERVER_IP_WIP } from '../../constants/Settings';
import './style.less';

const WIPURL = `${SERVER_IP_WIP}/WIP/`;
const WIP = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '生产监控WIP',
  }, {
    path: '',
    name: '生产管理KPI',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="生产管理KPI" />
      <iframe src={WIPURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={WIPImg} height="100%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
WIP.defaultProps = {

};
WIP.propTypes = {

};

export default WIP;
