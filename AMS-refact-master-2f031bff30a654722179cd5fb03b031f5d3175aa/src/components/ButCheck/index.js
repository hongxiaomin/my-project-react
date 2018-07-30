/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import './style.less';

const ButCheck = props => (
  <div>
    <Checkbox onChange={props.onChangeCheck}>显示隐藏</Checkbox>
  </div>
);
ButCheck.defaultProps = {

};
ButCheck.propTypes = {

};

export default ButCheck;
