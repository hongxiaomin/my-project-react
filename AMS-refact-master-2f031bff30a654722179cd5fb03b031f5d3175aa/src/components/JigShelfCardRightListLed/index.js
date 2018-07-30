/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import JigShelfTitle from '../JigShelfTitle';
import JigShelfLedList from '../JigShelfLedList';
import './style.less';

const JigShelfCardRightListLed = (props) => {
  const { shelfLayerList } = props;
  const LedList = shelfLayerList ? shelfLayerList.map((v, i) => <JigShelfLedList ledState={v.ledStatus} shelfName={v.shelfName} key={i} />) : '';
  return (
    <div className="dataDiv">
      <JigShelfTitle
        shelflayer={props.shelflayer}
        isTrueThere="true"
        key={props.i}
        name={props.name || 'A'}
        ShelfLayerClick={props.ShelfLayerClick || '1'}
      />
      <div className="dataDivList">
        {LedList}
      </div>

    </div>
  );
};
JigShelfCardRightListLed.defaultProps = {

};
JigShelfCardRightListLed.propTypes = {

};

export default JigShelfCardRightListLed;
