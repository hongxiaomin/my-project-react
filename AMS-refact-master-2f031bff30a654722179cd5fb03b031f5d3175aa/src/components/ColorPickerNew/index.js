import React from 'react';
import PropTypes from 'prop-types';
import ColorsPicker from 'react-colors-picker';
import './style.less';

const ColorPickerNew = props => (
  <ColorsPicker
    color={props.color}
    tableName={props.tableName}
    onChange={(e) => { props.colorChange(e); }}
    labelColor={props.labelColor}
    id={props.id}
  />
);
ColorPickerNew.defaultProps = {
  color: '#ffffff',
};
ColorPickerNew.propTypes = {
  color: PropTypes.string,
  labelColor: PropTypes.string,
  id: PropTypes.number,
  tableName: PropTypes.string,
  colorChange: PropTypes.func,
};

export default ColorPickerNew;
