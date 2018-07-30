/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import './style.less';

const ColorPicker = props => (
  <div>
    <button className="swatch" onClick={props.onColorPickerShow}>
      <div
        className="color"
        style={{
          background: `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})`,
        }}
      />
    </button>
    <div
      className="popupwindow"
      style={{
        display: props.displayColorPicker,
      }}
    >
      <button className="cover" onClick={props.onColorPickerClose} />
      <ChromePicker color={props.color} onChange={props.onColorPickerChange} />
    </div>
  </div>
);
ColorPicker.defaultProps = {
  color: {
    r: 10,
    g: 10,
    b: 10,
    a: 1,
  },
};
ColorPicker.propTypes = {
  onColorPickerShow: PropTypes.func,
  onColorPickerClose: PropTypes.func,
  onColorPickerChange: PropTypes.func,
  displayColorPicker: PropTypes.string,
  color: PropTypes.objectOf(PropTypes.number),
};

export default ColorPicker;
