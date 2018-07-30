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

const YieldURL = `${SERVER_IP_SPC}/Attribute/Yield/`;
const SPCYield = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: 'SPC',
  }, {
    path: '',
    name: '计数值',
  }, {
    path: '',
    name: '良率管制图',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="良率管制图" />
      <iframe src={YieldURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={SPCXBarImg} height="140%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
SPCYield.defaultProps = {

};
SPCYield.propTypes = {

};

export default SPCYield;
