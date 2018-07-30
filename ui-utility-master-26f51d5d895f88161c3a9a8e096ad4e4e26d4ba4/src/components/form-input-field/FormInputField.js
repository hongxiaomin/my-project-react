import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';
import jsonic from 'jsonic';

import {
  BOOLEAN,
  ENUM,
  NUMBER,
  OBJECT,
  STRING,
} from '../../constants/propertyTypes';

import cssStyles from './formInputFieldStyles';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import CssColorTextField from '../css-color-textfield';
import CssUnitTextField from '../css-unit-textfield';

/**
 * generate common input text field in tab UI
 * @param  {[type]} options.fieldName         [description]
 * @param  {[type]} options.fieldSpec         [description]
 * @param  {[type]} options.fieldSetPropValue [description]
 * @param  {[type]} options.                  [description]
 * @return {[type]}                           [description]
 */
class FormInputField extends PureComponent {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
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
   * is function
   * @param  {[type]}  object [description]
   * @return {Boolean}        [description]
   */
  isJSONObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
  }
  /**
   * aaaaBbbbbbbCcccc -> Aaaa Bbbbbbb Ccccc
   * @param  {[type]} string) [description]
   * @return {[type]}         [description]
   */
  turnCamelToSplit = (string) => (
    string && string.replace(/^[a-z]/, (u) => u.toUpperCase()).replace(/([a-z](?=[A-Z]))/g, '$1 ')
  );
  /**
   * handle input value
   * @param  {[type]} options.type         [description]
   * @param  {[type]} options.keyName      [description]
   * @param  {[type]} options.initValue    [description]
   * @param  {[type]} options.defaultValue [description]
   * @return {[type]}                      [description]
   */
  getNowValue = ({ type, keyName, initValue, defaultValue }) => {
    let value = this.state[keyName];

    // if not defined
    if (!(keyName in this.state)) {
      value = initValue !== undefined ? initValue : defaultValue;
    }
    // special value convert
    switch (type) {
      case 'array':
        /*
        "[{ headerName: \"Name\", field: \"name\", width: 300 }]"

         */
        // value = jsonic.stringify(value); // this will remove quote with string value
        value = JSON.stringify(value)
            .replace(/^"/, '')
            .replace(/"$/, '')
            .replace(/\\"/g, '"');
        break;
      default:
        if (this.isJSONObject(value)) {
          value = JSON.stringify(value);
        }
        break;
    }

    return value;
  };
  /**
   * handle onChange event
   * @param  {[type]} keyName   [description]
   * @param  {[type]} callBack) [description]
   * @return {[type]}           [description]
   */
  handleTextArrayChange = (keyName, callBack) => (event) => {
    const value = event.target.value || '';
    let convertedValue = value.trim();
    let errorText = '';
    // if data right, then execute callback
    if (/^\[.*\]$/.test(convertedValue)) {
      /*
      use un-quote

      [{ headerName: "Name", field: "name", width: 300 }]
       */
      try {
        convertedValue = jsonic(convertedValue);
      } catch (error) {
        const message = `input format wrong: ${error.name}\n ${error.message}`;
        window.console.warn(message);

        convertedValue = [];
        errorText = message;
      } finally {
        this.setState({
          [keyName]: value,
          errorText,
        });
      }

      if (this.isFunction(callBack)) {
        callBack({
          key: keyName,
          value: convertedValue,
        });
      }
    }
  };
  /**
   * handle onChange event
   * @param  {[type]} keyName   [description]
   * @param  {[type]} callBack) [description]
   * @return {[type]}           [description]
   */
  handleTextJSONChange = (keyName, callBack) => (event) => {
    let value = event.target.value || '{}';
    let errorText = '';
    // if data right, then execute callback
    if (/^\{.*\}$/.test(value)) {
      // example: {a:3}
      try {
        value = jsonic(value);
      } catch (error) {
        const message = `use JSON format: { "key":"value" } but get ${value}`;
        window.console.warn(message);
        window.console.warn(error);
        errorText = message;
      } finally {
        this.setState({
          [keyName]: value,
          errorText,
        });
      }

      if (this.isFunction(callBack)) {
        callBack({
          key: keyName,
          value,
        });
      }
    }
  };
  /**
   * handle onChange event
   * @param  {[type]} keyName   [description]
   * @param  {[type]} callBack) [description]
   * @return {[type]}           [description]
   */
  handleTextChange = (keyName, callBack) => (event) => {
    this.setState({
      [keyName]: event.target.value,
    });

    if (this.isFunction(callBack)) {
      callBack({ key: keyName, value: event.target.value });
    }
  };
  /**
   * handle onChange event
   * @param  {[type]} keyName   [description]
   * @param  {[type]} callBack) [description]
   * @return {[type]}           [description]
   */
  handleSelectChange = (keyName, callBack) => (event, index, value) => {
    let rightValue = value;
    if (/^\{.*\}$/.test(rightValue)) {
      // example: {a:3}
      try {
        rightValue = jsonic(rightValue);
      } catch (error) {
        window.console.warn('JSON format: { "key":"value" } but get', value);
        window.console.warn(error);
      }
    }

    this.setState({
      [keyName]: rightValue,
    });

    if (this.isFunction(callBack)) {
      callBack({ key: keyName, value: rightValue });
    }
  };
  /**
   * handle onToggle event
   * @param  {[type]} keyName   [description]
   * @param  {[type]} callBack) [description]
   * @return {[type]}           [description]
   */
  handleToggleChange = (keyName, callBack) => (event, value) => {
    this.setState({
      [keyName]: value,
    });

    if (this.isFunction(callBack)) {
      callBack({ key: keyName, value });
    }
  };
  /**
   * output view
   * @return {[type]} [description]
   */
  render() {
    // console.debug('render FormInputField component', this.props);
    const {
      showLable,
      fieldName,
      fieldSpec,
      fieldSetPropValue,
      handleChanged,
      style,
    } = this.props;

    let input = null;
    const nowValue = this.getNowValue(
      {
        type: fieldSpec.type,
        keyName: fieldName,
        initValue: fieldSetPropValue,
        defaultValue: fieldSpec.defaultValue,
      }
    );
    const nowValueWithSpecial = this.getNowValue(
      {
        type: fieldSpec.subType,
        keyName: fieldName,
        initValue: fieldSetPropValue,
        defaultValue: fieldSpec.defaultValue,
      }
    );

    switch (fieldSpec.type) {
      case BOOLEAN:
        input = (
          <div style={cssStyles.booleanWrapper}>
            <Subheader
              style={cssStyles.booleanSubHeader}
              children={showLable && this.turnCamelToSplit(fieldName)}
            />
            <Toggle
              label={nowValue ? 'ON' : 'OFF'}
              // label={showLable && this.turnCamelToSplit(fieldName)}
              onToggle={this.handleToggleChange(fieldName, handleChanged)}
              toggled={nowValue}
              style={style}
            />
          </div>
        );
        break;
      case ENUM:
        input = (
          <SelectField
            floatingLabelFixed
            floatingLabelText={
              showLable &&
              (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
            }
            fullWidth
            onChange={this.handleSelectChange(fieldName, handleChanged)}
            value={nowValue}
            style={style}
          >
            {
              fieldSpec.enum.map((value) => {
                let realValue = value;
                let showValue = value === undefined ? 'auto' : value;

                if (typeof(value) === 'object') {
                  realValue = realValue.value;
                  showValue = showValue.alias;
                }

                let menuItemStyle;
                if (fieldName === 'fontFamily') {
                  menuItemStyle = {
                    fontFamily: value,
                  };
                }

                return (
                  <MenuItem
                    key={uuid.v4()}
                    value={realValue}
                    primaryText={showValue}
                    style={menuItemStyle}
                  />
                );
              })
            }
          </SelectField>
        );
        break;
      case NUMBER:
        input = (
          <TextField
            floatingLabelFixed
            /*
            warning:
            We don't have enough information to build a robust unique id for the TextField component

            use id to fix no lable
             */
            id={uuid.v4()}
            floatingLabelText={
              showLable &&
              (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
            }
            fullWidth
            type="number"
            onChange={this.handleTextChange(fieldName, handleChanged)}
            min={fieldSpec.min}
            max={fieldSpec.max}
            value={nowValue}
            hintText={fieldSpec.hintForInput}
            hintStyle={cssStyles.textHintStyle}
            style={style}
          />
        );
        break;
      case STRING: {
        if (fieldSpec.selector) {
          switch (fieldSpec.selector) {
            case 'css-color-textfield':
              input = (
                <CssColorTextField
                  defaultValue={fieldSpec.defaultValue}
                  floatingLabelText={
                    showLable &&
                    (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
                  }
                  handleValueChangedWithCallBack={{ fieldName, handleChanged }}
                  hintForInput={fieldSpec.selectorProps.hintForInput}
                  value={fieldSetPropValue}
                />
              );
              break;
            case 'css-unit-textfield':
              input = (
                <CssUnitTextField
                  autocomplete={fieldSpec.selectorProps.autocomplete}
                  defaultValue={fieldSpec.defaultValue}
                  floatingLabelText={
                    showLable &&
                    (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
                  }
                  handleValueChangedWithCallBack={{ fieldName, handleChanged }}
                  hintForInput={fieldSpec.selectorProps.hintForInput}
                  units={fieldSpec.selectorProps.units}
                  value={fieldSetPropValue}
                />
              );
              break;
            default:break;
          }
        } else {
          input = (
            <TextField
              floatingLabelFixed
              /*
              use id to fix no lable
               */
              id={uuid.v4()}
              floatingLabelText={
                    showLable &&
                    (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
                  }
              fullWidth
              type="text"
              onChange={this.handleTextChange(fieldName, handleChanged)}
              value={nowValue}
              hintText={fieldSpec.hintForInput}
              hintStyle={cssStyles.textHintStyle}
              style={style}
            />
          );
        }
        break;
      }
      default:break;
      /*
      base are STRING|NUMBER|ENUM|BOOLEAN

      render special case for other type
      start------------------------------
       */
      case OBJECT: {
        switch (fieldSpec.subType) {
          case 'array':
            input = (
              <TextField
                floatingLabelFixed
                /*
                use id to fix no lable
                 */
                id={uuid.v4()}
                floatingLabelText={
                    showLable &&
                    (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
                  }
                fullWidth
                type="text"
                onChange={this.handleTextArrayChange(fieldName, handleChanged)}
                value={nowValueWithSpecial}
                errorText={this.state.errorText}
                hintText="ex: [...]"
                hintStyle={cssStyles.textHintStyle}
                style={style}
              />
            );
            break;
          case 'json':
            input = (
              <TextField
                floatingLabelFixed
                /*
                use id to fix no lable
                 */
                id={uuid.v4()}
                floatingLabelText={
                    showLable &&
                    (this.turnCamelToSplit(fieldSpec.alias) || this.turnCamelToSplit(fieldName))
                  }
                fullWidth
                type="text"
                onChange={this.handleTextJSONChange(fieldName, handleChanged)}
                value={nowValueWithSpecial}
                errorText={this.state.errorText}
                hintText="ex: [...]"
                hintStyle={cssStyles.textHintStyle}
                style={style}
              />
            );
            break;
          case 'function':
            break;
          default:break;
        }
        break;
      }
      /*
      base are STRING|NUMBER|ENUM|BOOLEAN

      render special case for other type
      end  ------------------------------
       */
    }

    return input;
  }
}

FormInputField.displayName = 'FormInputField';

FormInputField.propTypes = {
  showLable: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  fieldSpec: PropTypes.object.isRequired,
  fieldSetPropValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.any, // ex: undefined
  ]),
  style: PropTypes.object,
};

FormInputField.defaultProps = {
  showLable: true,
  fieldName: undefined,
  fieldSpec: {},
  fieldSetPropValue: undefined,
  style: {},
};

export default FormInputField;
