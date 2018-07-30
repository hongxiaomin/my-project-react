/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './style.less';

const ActionBtn = props => (
  <div className="modalBtn">
    <Button type="primary" disabled={props.disabled} style={props.style} onClick={props.onClick} >{props.btnName}</Button>
  </div>
);
ActionBtn.defaultProps = {

};
ActionBtn.propTypes = {
  onClick: PropTypes.func,
  btnName: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.style),
  disabled: PropTypes.bool,
};

export default ActionBtn;
