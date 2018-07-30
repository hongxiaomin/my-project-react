/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import { SERVER_IP_SPC } from '../../constants/Settings';
import './style.less';

const OccurrenceSettingURL = `${SERVER_IP_SPC}/Settings/OccurrenceSetting/`;
const SPCOccurrenceSetting = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: 'SPC',
  }, {
    path: '',
    name: '页面设定',
  }, {
    path: '',
    name: '发生现象设定',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="发生现象设定" />
      <iframe src={OccurrenceSettingURL} height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
SPCOccurrenceSetting.defaultProps = {

};
SPCOccurrenceSetting.propTypes = {

};

export default SPCOccurrenceSetting;
