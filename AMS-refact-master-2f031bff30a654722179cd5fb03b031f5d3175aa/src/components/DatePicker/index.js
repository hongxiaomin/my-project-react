/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { DatePicker as ReactDateTimePicker } from 'antd';
import PropTypes from 'prop-types';
import { GUID } from '../../utils/Common';
import './style.less';

const DatePicker = props => {
  if (props.oldDate) {
    if (props.defaultValue) {
      return (<ReactDateTimePicker
        className="dataTimer"
        id={props.name}
        name={props.name}
        style={props.style}
        popupStyle={props.popupStyle}
        size={props.size}
        onChange={props.onChange}
        disabledDate={props.disabledDate}
        placeholder={props.placeholder}
        showTime
        format={props.format}
        defaultValue={props.defaultValue}
      />);
    }
    return (<ReactDateTimePicker
      className="dataTimer"
      id={props.name}
      name={props.name}
      style={props.style}
      popupStyle={props.popupStyle}
      size={props.size}
      onChange={props.onChange}
      disabledDate={props.disabledDate}
      placeholder={props.placeholder}
      showTime
      format={props.format}
    />);
  }
  return (<ReactDateTimePicker
    className="dataTimer"
    id={props.name}
    name={props.name}
    style={props.style}
    popupStyle={props.popupStyle}
    size={props.size}
    onChange={props.onChange}
    disabledDate={props.disabledDate}
    placeholder={props.placeholder}
    showTime
    format={props.format}
  />);
};

DatePicker.defaultProps = {
  style: { width: '100%' },
  format: 'YYYY-MM-DD HH:mm:ss',
};
DatePicker.propTypes = {
  name: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  popupStyle: PropTypes.objectOf(PropTypes.any),
  size: PropTypes.string,
  onChange: PropTypes.func,
  disabledDate: PropTypes.func,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  defaultValue: PropTypes.moment,
};

export default DatePicker;
