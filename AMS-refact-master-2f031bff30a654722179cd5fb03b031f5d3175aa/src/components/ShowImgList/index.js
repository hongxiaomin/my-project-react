/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import ShowImg from '../../components/ShowImg';
import ShowImgAuto from '../../components/ShowImgAuto';
import './style.less';
// import { LineChangeData } from '../../constants/TableConfig';

const ShowImgList = (props) => {
  const { data, onImgDoubleClick } = props;
  if (props.auto) {
    const ShowImgListDiv = data ? data.map((v, i) =>
      <ShowImgAuto
        src={v.picture}
        index={i + 1}
        name={v.assemblyname}
        key={i}
        id={v.id}
        status={v.status}
        statusname={v.statusname}
      />) : '';
    return (
      <div>
        {ShowImgListDiv}
      </div>
    );
  }
  const ShowImgListDiv = data ? data.map((v, i) => <ShowImg name={v.machineType} key={i} id={v.id} state={v.status} onImgDoubleClick={onImgDoubleClick} />) : '';
  return (
    <div>
      {ShowImgListDiv}
    </div>
  );
};

ShowImgList.defaultProps = {

};
ShowImgList.propTypes = {

};

export default ShowImgList;
