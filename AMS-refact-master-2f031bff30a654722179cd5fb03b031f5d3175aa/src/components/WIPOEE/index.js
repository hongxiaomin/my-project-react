/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import OEEImg from '../../assets/OEE.jpg';
import { SERVER_IP_WIP } from '../../constants/Settings';
import './style.less';

const OEEURL = `${SERVER_IP_WIP}/OEE/`;
const OEE = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '生产监控WIP',
  }, {
    path: '',
    name: 'OEE',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="OEE" />
      <iframe src={OEEURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={OEEImg} height="200%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
OEE.defaultProps = {

};
OEE.propTypes = {

};

export default OEE;
