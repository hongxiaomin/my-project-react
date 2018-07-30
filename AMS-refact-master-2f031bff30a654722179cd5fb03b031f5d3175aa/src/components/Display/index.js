/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


// const Display = ({ children, noDisplay }) => (
//   <div
//     style={{ display: noDisplay ? 'none' : 'block' }}
//   >
//     {children}
//   </div>
//   );
const Display = (props) => {
  const { children, noDisplay } = props;
  console.log('noDisplay', noDisplay);
  return (
    <div
      style={{ display: noDisplay ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};
Display.defaultProps = {

};
Display.propTypes = {
  children: PropTypes.node,
  noDisplay: PropTypes.bool,
};

export default Display;
