/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const ShowTime = (props) => {
  // console.log('dadsadas');
  const { showTime } = props;
  const showTime2 = showTime || 0;
  const shi = parseInt(showTime2 / 3600);
  const shiQian = parseInt(shi / 10);
  const shiHou = shi % 10;
  const shiFen = showTime2 % 3600;

  const fen = parseInt(shiFen / 60);
  const fenQian = parseInt(fen / 10);
  const fenHou = fen % 10;
  const fenMiao = parseInt(shiFen % 60);

  const miao = fenMiao % 60;
  const miaoQian = parseInt(miao / 10);
  const miaoHou = miao % 10;
  return (
    <div className="showTime">
      <span className="one">换线时间 :</span>
      <span>{shiQian || 0}</span>
      <span>{shiHou || 0}</span>
      <span>:</span>
      <span>{fenQian || 0}</span>
      <span>{fenHou || 0}</span>
      <span />:<span />
      <span>{miaoQian || 0}</span>
      <span>{miaoHou || 0}</span>
    </div>
  );
};
ShowTime.defaultProps = {

};
ShowTime.propTypes = {

};

export default ShowTime;
