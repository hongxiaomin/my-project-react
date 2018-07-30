/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

const CheckBox = (props) => {
  // name={i}
  // key={i}
  // formName={formName}
  // value={value}
  // keyList={key}
  const { value, id, onCheckBoxChange, checkBoxChecked, disabled, defaultChecked } = props;
//  console.log('props', props);
  return (
    <div>
      <Checkbox
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={onCheckBoxChange}
        id={id}
        value={value}
        checked={checkBoxChecked}
        >
        {value}
      </Checkbox>
    </div>
  );
};
CheckBox.defaultProps = {

};
CheckBox.propTypes = {

};

export default CheckBox;
