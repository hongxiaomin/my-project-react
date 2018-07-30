import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const PCBAPIButton = props => (
  <Button onClick={() => (props.onclick())}>{props.value}</Button>
  );

PCBAPIButton.propTypes = {
  onclick: PropTypes.func,
  value: PropTypes.string,
};

export default PCBAPIButton;
