/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './style.less';

const ButtonLeft = props => (
  <Button
    className={'leftbutton'}
    type="primary"
    onClick={props.onLeftClick}
  >
    {props.dataSourceName + props.shelfSide || '错误'}
  </Button>
  );
ButtonLeft.defaultProps = {

};
ButtonLeft.propTypes = {

};

export default ButtonLeft;
