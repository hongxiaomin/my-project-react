import React from 'react';
import { Select as ReactSelect } from 'antd';
import PropTypes from 'prop-types';
import { GUID } from '../../utils/Common';

const Option = ReactSelect.Option;
const DoubleSelect = props => (
  <ReactSelect
    showSearch
    optionFilterProp="children"
    id={props.name}
    name={props.name}
    // value={props.value}
    style={props.style}
    mode="multiple"
    onChange={props.onValueChange}
    dropdownStyle={props.dropdownStyle}
    dropdownClassName={props.dropdownClassName}
    disabled={props.disabled}
    placeholder="Please select"
  >
    {
      props.options.map(item =>
        <Option key={item.key}>{item.text}</Option>)
    }
  </ReactSelect>
);
DoubleSelect.defaultProps = {
  name: GUID(),
  onChange: () => {},
  style: { width: '100%' },
  options: [],
  placeholder: 'Please select one option...',
};
DoubleSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  onValueChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any),
  dropdownStyle: PropTypes.objectOf(PropTypes.any),
  dropdownClassName: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};
export default DoubleSelect;
