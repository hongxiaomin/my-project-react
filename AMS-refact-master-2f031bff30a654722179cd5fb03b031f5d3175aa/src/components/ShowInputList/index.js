/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import Input from '../../containers/InputContainer';
import './style.less';

const ShowInputList = (props) => {
  console.log('props', props);
  const { datArray, name, addArrayData, formName, inputName, deleteInput } = props;
  // let showData;
 // if (selectRows.length > 0) {
  // const selectRowsParamName = selectRows && selectRows[0].paramName || '';
    // const paramNameArray = selectRowsParamName.split(',');
  const newArray = [...datArray];
  const showData = newArray.map((v, i) => {
    if (v === 'addNewDataForTable') {
      return (
        <div key={i} className={'searchCondition2 searchCondition'}>
          <Input key={i} type="text" name={`${inputName},${i}`} textarea formName={formName} className={'input'} /><span key={`${i}span`} className="divSpan" onClick={() => { deleteInput(i); }}>X</span>
        </div>
      );
    }
    return (
      <div key={i} className={'searchCondition2 searchCondition'}>
        <Input key={i} type="text" name={`${inputName},${i}`} textarea formName={formName} className={'input'} value={v} /><span value={v} key={`${i}span`} className="divSpan" onClick={() => { deleteInput(i); }}>X</span>
      </div>
    );
  });
 // }

  return (
    <div className="shouwInputList">
      <div className="shouwInputListOneDiv">{name}</div>
      <div className="shouwInputListTwoDiv">
        {showData}
      </div>
      <div className="shouwInputListThereDiv">
        <Button onClick={() => { addArrayData(props); }} type="primary">增加</Button>
      </div>
    </div>
  )
;
};
ShowInputList.defaultProps = {

};
ShowInputList.propTypes = {

};

export default ShowInputList;
