/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { AutoComplete } from 'antd';
import PropTypes from 'prop-types';

const AutoInput = props => (
  <AutoComplete
    id={props.name}
    name={props.name}
    value={props.value}
    style={props.style || { width: 200 }}
    onChange={props.onValueChange}
    disabled={props.disabled}
    placeholder={props.placeholder || '请选择'}
    dataSource={props.options || []}
    filterOption={
        (inputValue, option) =>
        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
  />
  );
AutoInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  onValueChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any),
  // dropdownStyle: PropTypes.objectOf(PropTypes.any),
  // dropdownClassName: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default AutoInput;
