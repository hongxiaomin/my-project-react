/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const Image = props => (
  <div className="">
    <img style={{ maxHeight: '50px', maxWidth: '100px' }} src={props.src} />
  </div>
);
Image.defaultProps = {

};
Image.propTypes = {
  src: PropTypes.string,
};

export default Image;
