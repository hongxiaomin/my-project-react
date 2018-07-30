/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import ProduceManaImg from '../../assets/ProduceMana.jpg';
import { SERVER_IP_WIP } from '../../constants/Settings';
import './style.less';

const ProduceManaURL = `${SERVER_IP_WIP}/ProduceMana/`;
const ProduceMana = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '生产监控WIP',
  }, {
    path: '',
    name: '生产力总览',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="生产力总览" />
      <iframe src={ProduceManaURL} height="2000px" width="100%" style={{ border: 'none' }} />
      {/* <img src={ProduceManaImg} height="100%" width="100%" style={{ border: 'none' }} />= */}
    </div>
  );
};
ProduceMana.defaultProps = {

};
ProduceMana.propTypes = {

};

export default ProduceMana;
