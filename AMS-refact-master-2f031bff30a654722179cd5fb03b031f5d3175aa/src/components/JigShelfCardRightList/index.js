/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import JigShelfTitle from '../JigShelfTitle';
import JigShelfCardRightListLed from '../../components/JigShelfCardRightListLed';

const JigShelfCardRightList = (props) => {
  const { name, shelfLayerClick, shelflayer, shelfLayerList } = props;
  const data = shelfLayerList ? shelfLayerList.toJS() : '';
  const JigShelfCardRightListLedData = shelflayer ? shelflayer.map((v, i) => <JigShelfCardRightListLed
    shelflayer={v.shelflayer}
    isTrueThere="true"
    key={i}
    name={name || 'A'}
    ShelfLayerClick={shelfLayerClick || '1'}
    shelfLayerList={data[i] || ''}
  />) : '';
  return (
    <div className={'cardtopRight'}>
      <JigShelfTitle isTrue="true" name={name || 'A'} ShelfLayerClick={shelfLayerClick || '1'} />
      <div className={'smallDiv'}>
        {JigShelfCardRightListLedData}
      </div>

    </div>

  );
};

JigShelfCardRightList.defaultProps = {

};
JigShelfCardRightList.propTypes = {

};

export default JigShelfCardRightList;
