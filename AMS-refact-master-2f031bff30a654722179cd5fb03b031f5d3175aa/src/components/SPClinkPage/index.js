/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';

const SPClinkPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '统计流程控制',
  }, {
    path: '',
    name: '统计流程控制',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="统计流程控制" />
      <iframe src="http://10.120.137.40:8081/#/XbarRChart" height="2000px" width="100%" style={{ border: 'none' }} />
    </div>
  );
};
SPClinkPage.defaultProps = {

};
SPClinkPage.propTypes = {

};

export default SPClinkPage;
