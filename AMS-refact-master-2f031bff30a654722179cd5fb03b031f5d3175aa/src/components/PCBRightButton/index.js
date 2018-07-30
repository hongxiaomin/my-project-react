import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const PCBRightButton = props => (
  <Button onClick={() => (props.onclick())}>{props.value}</Button>
  );

PCBRightButton.propTypes = {
  onclick: PropTypes.func,
  value: PropTypes.string,
};

export default PCBRightButton;
