/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const GroupSelect = props => (
  <span
    name={props.name}
    style={props.style}
    className={props.className}
  >
    {props.children}
  </span>
);
GroupSelect.defaultProps = {
};
GroupSelect.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};

export default GroupSelect;
