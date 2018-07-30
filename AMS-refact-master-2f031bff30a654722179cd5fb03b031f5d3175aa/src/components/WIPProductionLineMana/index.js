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

const ProductionLineManaURL = `${SERVER_IP_WIP}/ProductionLineMana/`;
const ProductionLineMana = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '生产监控WIP',
  }, {
    path: '',
    name: '产线管理',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="产线管理" />
      <iframe src={ProductionLineManaURL} height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
ProductionLineMana.defaultProps = {

};
ProductionLineMana.propTypes = {

};

export default ProductionLineMana;
