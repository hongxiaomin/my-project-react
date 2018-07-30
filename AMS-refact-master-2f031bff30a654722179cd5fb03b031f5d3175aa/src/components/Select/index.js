/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Select as ReactSelect } from 'antd';
import PropTypes from 'prop-types';
import { GUID } from '../../utils/Common';

const Option = ReactSelect.Option;
const Select = props => (
  <ReactSelect
    showSearch
    optionFilterProp="children"
    id={props.name}
    name={props.name}
    mode={props.mode}
    value={props.value}
    style={props.style}
    onChange={props.onValueChange}
    dropdownStyle={props.dropdownStyle}
    dropdownClassName={props.dropdownClassName}
    disabled={props.disabled}
    placeholder={props.placeholder}
    emitRequest={props.emitRequest || {}}
  >
    {
      props.options.map(item =>
        <Option key={item.key}>{item.text}</Option>)
    }
  </ReactSelect>
);
Select.defaultProps = {
  name: GUID(),
  onChange: () => {},
  style: { width: '100%' },
  options: [],
  placeholder: 'Please select one option...',
  // emitRequest: () => {},
};
Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  mode: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  onValueChange: PropTypes.func,
  emitRequest: PropTypes.objectOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.any),
  dropdownStyle: PropTypes.objectOf(PropTypes.any),
  dropdownClassName: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Select;
