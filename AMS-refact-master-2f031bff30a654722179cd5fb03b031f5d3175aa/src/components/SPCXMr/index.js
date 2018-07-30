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

const XMrURL = `${SERVER_IP_SPC}/Variable/XMr/`;
const SPCXMr = (props) => {
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
    name: '个别移动全距管制图',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="个别移动全距管制图" />
      <iframe src={XMrURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={SPCXBarImg} height="140%" width="100%" style={{ border: 'none' }} /> */}
    </div>
  );
};
SPCXMr.defaultProps = {

};
SPCXMr.propTypes = {

};

export default SPCXMr;
