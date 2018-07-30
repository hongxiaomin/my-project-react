/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const BOMShowDate = props => (
  <div>
    <span>{props.title}:</span><span className={props.parentClass || ''}><span className={props.className} style={{ width: props.width }}></span>{props.value}</span>
  </div>
);
BOMShowDate.defaultProps = {

};
BOMShowDate.propTypes = {
  title: PropTypes.string,
  parentClass: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
};

export default BOMShowDate;
