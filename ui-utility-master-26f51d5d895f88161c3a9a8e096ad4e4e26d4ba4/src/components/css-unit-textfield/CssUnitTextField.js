import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';

import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import cssStyles from './cssUnitTextFieldStyles';
/**
 * for stencil prop setting, CSS tab
 * NOT for normal component
 *
 * defined spec from src/constants/propertySpecs/cssStyle.js
 */
class CssUnitTextField extends PureComponent {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      defaultValue: props.defaultValue,
      valueOfCSS: false,
      unitOfCSS: false,
      errorValue: '',
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
   * is exit in autocomplete list
   * @param  {[type]}  value [description]
   * @return {Boolean}       [description]
   */
  isExistInAutocompleteList(value) {
    return this.props.autocomplete.toString().concat(',').indexOf(`${value},`) > -1;
  }
  /**
   * AutoComplete change event when onUpdateInput
   * @param  {Object} eventObject {native event value}
   */
  onTextChange = ({ fieldName, handleChanged }) => (value) => {
    let errorValue = '';
    if (!this.isExistInAutocompleteList(value) && /\D/.test(value)) {
      errorValue = 'wrong value format, will apply fail';
    }
    this.setState({
      valueOfCSS: value,
      errorValue,
    });
    // if match autocomplete word, so help user to clean unit setting
    if (value && this.isExistInAutocompleteList(value)) {
      this.setState({ unitOfCSS: '' });
    }
    // execute callback for origin main process
    if (this.isFunction(handleChanged)) {
      // ' '.trim() -> '' (for unit value)
      let unit = this.state.unitOfCSS !== false ? this.state.unitOfCSS.trim() : '';
      if (/\d/.test(value)) {
        // give default unit
        unit = unit || 'px';
      }

      handleChanged({
        key: fieldName,
        value: `${value}${unit}`,
      });
    }
  };
  /**
   * SelectField change event
   * @param  {[type]} event [description]
   * @param  {[type]} index [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  onUnitChange = ({ fieldName, handleChanged }) => (event, index, value) => {
    this.setState({ unitOfCSS: value });
    // execute callback for origin main process
    if (this.isFunction(handleChanged)) {
      // ' '.trim() -> '' (for unit value)
      let unit = value.trim();
      if (/\d/.test(value)) {
        // give default unit
        unit = unit || 'px';
      }

      handleChanged({
        key: fieldName,
        value: `${this.state.valueOfCSS}${unit}`,
      });
    }
  };
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const settedValue = (this.props.value && String(this.props.value)) || this.state.defaultValue;
    /*
    split word to 2 text area

    if valueOfCSS has set by user, then use it, or use init props value or default value in order
    if unitOfCSS has set by user, then use it, or use init props value or default value in order
     */
    let value = this.state.valueOfCSS;
    if (value === false) {
      value = (
                !this.isExistInAutocompleteList(settedValue) && settedValue.replace(/\D/g, '')
              ) || settedValue;
    }
    let unit = this.state.unitOfCSS;
    if (unit === false) {
      unit = settedValue.replace(/\d/g, '');
    }

    return (
      <div style={cssStyles.wrapper}>
        <div style={cssStyles.valueOfROw}>
          {/* leave input let user type here */}
          {
            React.createElement(
              AutoComplete,
              Object.assign(
                {},
                {
                  dataSource: this.props.autocomplete,
                  floatingLabelFixed: true,
                  floatingLabelText: this.props.floatingLabelText,
                  fullWidth: true,
                  hintText: this.props.hintForInput,
                  hintStyle: cssStyles.textHintStyle,
                  onUpdateInput: this.onTextChange(this.props.handleValueChangedWithCallBack),
                  onNewRequest: this.onTextChange(this.props.handleValueChangedWithCallBack),
                  searchText: value,
                  errorText: this.state.errorValue,
                },
                // if AutoComplete ui by parenet define (if set, overwrite above values)
                this.props.AutoComplete && { ...this.props.AutoComplete.props }
              )
            )
          }
        </div>
        <div style={cssStyles.unitOfROw}>
          {/* leave input let user type here */}
          <SelectField
            fullWidth
            onChange={this.onUnitChange(this.props.handleValueChangedWithCallBack)}
            value={unit}
          >
            {
              this.props.units.map((valueInUnits) => {
                const val = valueInUnits;
                const lableText = val === '' ? ' ' : val;
                const itemText = val === '' ? 'NONE' : val;

                return (
                  <MenuItem
                    key={uuid.v4()}
                    label={lableText}
                    primaryText={itemText}
                    value={val}
                  />
                );
              }
              )
            }
          </SelectField>
        </div>
      </div>
    );
  }
}
CssUnitTextField.displayName = 'CssUnitTextField';

CssUnitTextField.propTypes = {
  autocomplete: PropTypes.array,
  defaultValue: PropTypes.string,
  floatingLabelText: PropTypes.string,
  handleValueChangedWithCallBack: PropTypes.object,
  hintForInput: PropTypes.string,
  units: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

CssUnitTextField.defaultProps = {
  autocomplete: [],
  defaultValue: '',
  floatingLabelText: '',
  handleValueChangedWithCallBack: {},
  hintForInput: '',
  units: [],
  value: '',
};

export default CssUnitTextField;
