/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const JigShelfLedList = (props) => {
  const isSapn = props.ledState !== 2 ? <span className={props.ledState === 1 ? 'noBlue' : 'isBlue'} /> : '';
  return (
    <div className="ledDiv">
      {props.shelfName || ''}{isSapn}
    </div>
  );
};

JigShelfLedList.defaultProps = {

};
JigShelfLedList.propTypes = {

};

export default JigShelfLedList;
