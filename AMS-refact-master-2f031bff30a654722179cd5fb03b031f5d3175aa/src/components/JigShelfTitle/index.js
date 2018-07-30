/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const JigShelfTitle = ({ name, ShelfLayerClick, isTrue, isTrueThere, shelflayer }) => {
  const oDiv = isTrueThere ? <div className={'cardtopDivSmall'}>{name + ShelfLayerClick + shelflayer}</div> : <div className={'cardtopDiv'}>{isTrue ? name + ShelfLayerClick : name}</div>;
  return (
    <div>
      {oDiv}
    </div>
  );
};


JigShelfTitle.defaultProps = {

};
JigShelfTitle.propTypes = {

};

export default JigShelfTitle;
