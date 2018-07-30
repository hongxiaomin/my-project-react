/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import SPCCpkImg from '../../assets/spc-cpk.jpg';
import { SERVER_IP_SPC } from '../../constants/Settings';
import './style.less';

const SPCCpkURL = `${SERVER_IP_SPC}/Variable/Cpk/`;
const SPCCpk = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: 'SPC',
  }, {
    path: '',
    name: '计量值',
  }, {
    path: '',
    name: 'CPK趋势图',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="CPK趋势图" />
      <iframe src={SPCCpkURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={SPCCpkImg} height="170%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
SPCCpk.defaultProps = {

};
SPCCpk.propTypes = {

};

export default SPCCpk;
