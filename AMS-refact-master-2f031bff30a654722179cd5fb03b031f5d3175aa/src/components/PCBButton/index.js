import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const PCBButton = props => (
  <Button onClick={() => (props.onclick())}>{props.value}</Button>
  );

PCBButton.propTypes = {
  onclick: PropTypes.func,
  value: PropTypes.string,
};

export default PCBButton;
