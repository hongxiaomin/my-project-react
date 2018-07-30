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

const JigWorkInShelfPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '治工具管理',
  }, {
    path: '',
    name: '治具作业',
  }, {
    path: '',
    name: '入架位',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="入架位" />
    </div>
  );
};
JigWorkInShelfPage.defaultProps = {

};
JigWorkInShelfPage.propTypes = {

};

export default JigWorkInShelfPage;
