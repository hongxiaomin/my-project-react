/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import { SERVER_IP_WIP } from '../../constants/Settings';
import './style.less';

const QualityManaURL = `${SERVER_IP_WIP}/QualityMana/`;
const QualityMana = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '生产监控WIP',
  }, {
    path: '',
    name: '品质管理',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="品质管理" />
      <iframe src={QualityManaURL} height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
QualityMana.defaultProps = {

};
QualityMana.propTypes = {

};

export default QualityMana;
