import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import { SketchPicker } from 'react-color';

import cssStyles from './cssColorTextFieldStyles';
/**
 * for stencil prop setting, CSS tab
 * NOT for normal component
 *
 * defined spec from src/constants/propertySpecs/cssStyle.js
 */
class CssColorTextField extends PureComponent {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorValue: props.value || '',
    };
  }
  /**
   * is function
   * @param  {[type]}  object [description]
   * @return {Boolean}        [description]
   */
  isFunction(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
  }
  /**
   * [componentWillReceiveProps description]
   * @param  {Object} nextProps {...}
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps) {
    const colorValue = nextProps.value;
    if (colorValue) {
      this.setState({ colorValue });
    }
  }
  /**
   * [description]
   * @param  {Object} eventObject {native event value}
   */
  onTextChange = ({ fieldName, handleChanged }) => (eventObject) => {
    const value = eventObject.target.value;
    this.setState({ colorValue: value });
    // execute callback for origin main process
    if (this.isFunction(handleChanged)) {
      handleChanged({
        key: fieldName,
        value,
      });
    }
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
  // onColorPickerChange = (colorObject, eventObject) => {
  onColorPickerChange = ({ fieldName, handleChanged }) => (colorObject) => {
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
    // execute callback for origin main process
    if (this.isFunction(handleChanged)) {
      handleChanged({
        key: fieldName,
        value: colorValue,
      });
    }
  };
  /**
   * [render description]
   * @return {React} element
   */
  render() {
    // console.debug('this.state', this.state);
    // console.debug('this.props', this.props);
    /*
    output view
     */
    return (
        <div style={cssStyles.wrapper}>
          {/* leave input let user type here */}
          {
            React.createElement(
              TextField,
              Object.assign(
                {},
                {
                  floatingLabelFixed: true,
                  floatingLabelText: this.props.floatingLabelText,
                  fullWidth: true,
                  value: this.state.colorValue,
                  hintStyle: cssStyles.textHintStyle,
                  hintText: this.props.hintForInput,
                  onChange: this.onTextChange(this.props.handleValueChangedWithCallBack),
                  // errorText: this.state.errorValue,
                },
                // if TextField ui by parenet define (if set, overwrite above values)
                this.props.TextField && { ...this.props.TextField.props }
              )
            )
          }
          {/* color picker here */}
          <div style={cssStyles.palette}>
            <div
              style={
                Object.assign(
                  {},
                  cssStyles.paletteColor,
                  {
                    backgroundColor: this.state.colorValue,
                  }
                )
              }
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
                    onChange={this.onColorPickerChange(this.props.handleValueChangedWithCallBack)}
                  />
                </div>
              )
            }
          </div>
        </div>
    );
  }
}

CssColorTextField.displayName = 'CssColorTextField';

CssColorTextField.propTypes = {
  defaultValue: PropTypes.string,
  floatingLabelText: PropTypes.string,
  handleValueChangedWithCallBack: PropTypes.object,
  hintForInput: PropTypes.string,
  value: PropTypes.string,
};

CssColorTextField.defaultProps = {
  defaultValue: '',
  floatingLabelText: '',
  handleValueChangedWithCallBack: {},
  hintForInput: '',
  value: '',
};

export default CssColorTextField;
