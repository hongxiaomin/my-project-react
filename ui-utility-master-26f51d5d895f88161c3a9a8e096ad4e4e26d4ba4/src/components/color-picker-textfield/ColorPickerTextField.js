import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { SketchPicker } from 'react-color';
import cssStyles from './colorPickerTextFieldStyles';
/**
 * color-picker
 *
 * Usage:
 * <ColorPickerTextField
 *   TextField={textField, use Material UI TextField}
 *   colorType="hex"
 *   colorValue="red"
 *   onChange={this.onColorChange(data)}
 * />
 *
 * onColorChange = (data) => (color, event) => {}
 *
 * @see https://casesandberg.github.io/react-color/
 */
export default class ColorPickerTextField extends Component {
  /**
   * [constructor description]
   * @param  {Object} props react pass data
   */
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorValue: props.colorValue,
    };
  }
  /**
   * [componentWillReceiveProps description]
   * @param  {Object} nextProps {...}
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps) {
    const colorValue = nextProps.colorValue;
    if (colorValue) {
      this.setState({ colorValue });
    }
  }
  /**
   * [description]
   * @param  {Object} eventObject {native event value}
   */
  onTextChange = (eventObject) => {
    this.setState({ colorValue: eventObject.target.value });
  };
  /**
   * when color picker popover
   */
  onColorPickerClick = () => {
    this.setState({ displayColorPicker: true });
  };
  /**
   * when color picker close
   */
  onColorPickerClose = () => {
    this.setState({ displayColorPicker: false });
  };
  /**
   * when color picker
   * @param  {Object} colorObject {hex,hsl,rgb}
   * @param  {Object} eventObject {native event value}
   */
  onColorPickerChange = (colorObject, eventObject) => {
    const typeString = this.props.colorType || 'hex';
    let colorValue;

    switch (typeof(typeString) === 'string' && typeString.toLowerCase()) {
      case 'hex':
        colorValue = colorObject[typeString];
        break;
      case 'rgb':
        colorValue = `rgba(
          ${colorObject[typeString].r},
          ${colorObject[typeString].g},
          ${colorObject[typeString].b},
          ${colorObject[typeString].a}
        )`;
        break;
      case 'hsl':
        colorValue = `hsla(
          ${colorObject[typeString].h},
          ${colorObject[typeString].s},
          ${colorObject[typeString].l},
          ${colorObject[typeString].a}
        )`;
        break;
      default:
        colorValue = colorObject.hex;
        break;
    }
    this.setState({ colorValue });

    if (this.props.onChange) {
      this.props.onChange(colorObject, eventObject);
    }
  };
  /**
   * [render description]
   * @return {React} element
   */
  render() {
    const userTextField = this.props.TextField;
    const userTextFieldOnChange = userTextField.props.onChange || this.onTextChange;
    const ClonedTextFiled = React.cloneElement(
      userTextField || TextField,
      {
        value: this.state.colorValue,
        onChange: userTextFieldOnChange,
      }
    );
    /*
    output view
     */
    return (
        <div style={cssStyles.wrapper}>
          {/* leave input let user type here */}
          {ClonedTextFiled}
          {/* color picker here */}
          <div style={cssStyles.palette}>
            <div
              style={Object.assign(
                {},
                cssStyles.paletteColor,
                { backgroundColor: this.state.colorValue })}
              onClick={this.onColorPickerClick}
            />
            {
              this.state.displayColorPicker &&
              (
                <div style={cssStyles.colorPopover} >
                  <div style={cssStyles.cover} onClick={this.onColorPickerClose} />
                  <SketchPicker
                    disableAlpha
                    color={this.state.colorValue}
                    onChange={this.onColorPickerChange}
                  />
                </div>
              )
            }
          </div>
        </div>
    );
  }
}
/**
 * [propTypes description]
 * @type {Object}
 */
ColorPickerTextField.propTypes = {
  TextField: PropTypes.object,
  colorValue: PropTypes.string,
  colorType: PropTypes.string,
  onChange: PropTypes.func,
};
