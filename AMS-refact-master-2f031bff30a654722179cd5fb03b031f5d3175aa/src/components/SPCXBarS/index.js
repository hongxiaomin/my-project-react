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

const XBarSRURL = `${SERVER_IP_SPC}/Variable/XBarS/`;
const SPCXBarS = (props) => {
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
    name: '平均值标准差管制图',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="平均值标准差管制图" />
      <iframe src={XBarSRURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={SPCXBarImg} height="140%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
SPCXBarS.defaultProps = {

};
SPCXBarS.propTypes = {

};

export default SPCXBarS;
