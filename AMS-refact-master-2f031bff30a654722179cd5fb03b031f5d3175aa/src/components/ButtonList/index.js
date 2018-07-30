/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './style.less';

const ButtonList = props => (
  <div>
    <Button
      className={'adcbutton'}
      onClick={props.buttonClick} type="primary"
    >
      {props.areaCode || '错误'}
    </Button>
  </div>
);

ButtonList.defaultProps = {

};
ButtonList.propTypes = {

};

export default ButtonList;
