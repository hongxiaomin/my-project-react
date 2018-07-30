import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import ReactTooltip from 'react-tooltip';

import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import SocialPlusOne from 'material-ui/svg-icons/social/plus-one';
import * as svgIcons from 'material-ui/svg-icons';

import { getPropertySpecs } from '../../utils';
import { styleEnumList, materialUIEnumList, materialUIPropTypesList } from '../../constants/';
import { COLOR, PRIMITIVE_STRING_NAMESPACE, BUTTON_ICON_NAMESPACE } from '../../constants/config';
import styleSpec from '../../constants/propertySpecs/style';
import styles from './propertyFormRowStyles';
import ColorPickerTextField from '../color-picker-textfield';

import jsonic from 'jsonic';

import {
  // ELEMENT,
  // FUNCTION,
  // REQUIREDELEMENT,
  // UNION,
  ANY,
  ARRAY,
  BOOLEAN,
  DATA,
  ENUM,
  ICON,
  NODE,
  NUMBER,
  OBJECT,
  PROPTYPES,
  REQUIREDANY,
  REQUIREDARRAY,
  REQUIREDBOOLEAN,
  REQUIREDICON,
  REQUIREDNODE,
  REQUIREDNUMBER,
  REQUIREDSTRING,
  REQUIREDVALIDATELABEL,
  STRING,
  VALIDATELABEL,
} from '../../constants/propertyTypes';

const DeleteButton = props => (
  <IconButton iconStyle={styles.iconStyle} {...props}><ActionDelete /></IconButton>
);

const EditButton = props => (
  <IconButton iconStyle={styles.iconStyle} {...props}><ActionEdit /></IconButton>
);

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.textField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} {...props}
  />
);

/**
 * wrap Checkbox to universal style
 * @param  {Object} props {...}
 * @return {Object}       Material-UI Checkbox
 */
const DefaultCheckbox = props => (
  <Checkbox style={styles.checkbox} labelStyle={styles.checkboxLabel}
    {...props}
  />
);

const DefaultSelectField = props => (
  <SelectField floatingLabelFixed style={styles.textField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} menuStyle={styles.menu} {...props}
  />
);
/**
 * classify and sort
 * @param  {Array} data []
 * @return {Array}      []
 */
const classifyAndSortData = (data) => {
  const styleDataPool = {};
  const propDataPool = {};
  const styleNamePool = [];
  const propNamePool = [];
  const stylePool = [];
  const propPool = [];
  const styleReg = /^style_/i;
  const propReg = /^prop_/i;
  const childrenReg = /^children_/i;
  const prefixReg = /^\w+._/;
  const styleElement = <Subheader key={uuid.v4()} style={styles.subheader}>Style</Subheader>;
  const propElement = <Subheader key={uuid.v4()} style={styles.subheader}>Element</Subheader>;

  for (let i = 0, j = data.length; i < j; i += 1) {
    const objElement = data[i];
    if (objElement) {
      const prefix = objElement.key;
      const name = prefix.replace(prefixReg, '');

      if (styleReg.test(prefix)) {
        styleDataPool[name] = objElement;
        styleNamePool.push(name);
      } else if (propReg.test(prefix)) {
        propDataPool[name] = objElement;
        propNamePool.push(name);
      } else if (childrenReg.test(prefix)) {
        propDataPool[name] = objElement;
        propNamePool.push(name);
      }
    }
  }
  styleNamePool.sort();
  propNamePool.sort();

  for (let i = 0, j = styleNamePool.length; i < j; i += 1) {
    stylePool.push(styleDataPool[styleNamePool[i]]);
  }
  for (let i = 0, j = propNamePool.length; i < j; i += 1) {
    propPool.push(propDataPool[propNamePool[i]]);
  }

  return ([
    propPool.length ? propElement : null,
    ...propPool,
    stylePool.length ? styleElement : null,
    ...stylePool,
  ]);
};

export default class PropertyFormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { namespace, name, id, children } = nextProps.selectedStencil;
    const { fieldName, newPickedIcon, selectedIcon } = nextProps.iconData;
    // new stencil coming (if click submit button again, will not trigger here )
    //
    // careful: id !== this.props.selectedStencil.id -> after submit, props will not update
    //
    // RTChart and recharts are edited from another edit modal
    if (name === 'RTChart' || namespace === 'DRC' || id !== this.props.selectedStencil.id) {
      this.setState(
        this.state = Object.assign(
          {},
          { style: {} },
          nextProps.selectedStencil.props,
          // here put object for keep data, not id. wait bread crumbs to modify this codes
          // { children: nextProps.selectedStencil.props },
        )
      );
      // here put object for keep data, not id. wait bread crumbs to modify this codes
      // for primitive string and icon of FloatingActionButton/IconButton
      const routes = this.props.routes[this.props.pageIndex];
      const { stencils } = routes;
      if (children) {
        for (let i = 0, j = children; i < j.length; i += 1) {
          const stencil = stencils[j[i]];
          if (stencil !== undefined &&
            (stencil.namespace === PRIMITIVE_STRING_NAMESPACE ||
            stencil.namespace === BUTTON_ICON_NAMESPACE)) {
            this.setIconStringStencilInChildren(
              `children_${i}_${stencil.namespace}`, stencil, stencil.name
            );
          }
        }
      }
    }
    // ListItem.props.nestedItems are added from button of drawer
    // to keep those updated, add them to combine with current state
    if (name === 'ListItem') {
      this.state.nestedItems = nextProps.selectedStencil.props.nestedItems;
      this.setState(this.state);
    }
    // has prop key, from icon picker
    if (fieldName) {
      if (fieldName === BUTTON_ICON_NAMESPACE) {
        this.updateIconStencilInChildren(newPickedIcon);
      } else {
        this.setState({ [fieldName]: newPickedIcon || selectedIcon });
      }
    }
  }

  onClose = () => {
    this.setState({});
    this.props.closeStencilEditorDrawer();
  };
  /**
   * submit data by button in drawer
   * @return {[type]} [description]
   */
  onSubmit = () => {
    // remove not property belong stencil
    delete this.state.displayColorPicker;

    const propertySpec = getPropertySpecs(this.props.selectedStencil.name);
    // check both props(this.state) and props.style(this.state.style)
    let properties = {};
    properties = this.deleteEmptyProperty({
      propertySpec,
      state: this.state,
    });
    properties.style = this.deleteEmptyProperty({
      propertySpec: styleSpec,
      state: this.state.style,
    });
    properties = this.convertCorrectProperty({
      propertySpec,
      state: this.state,
    });
    properties = this.convertIconProperty({
      propertySpec,
      state: this.state,
    });
    properties = this.preferAvatarProperty({
      state: this.state,
    });
    properties = this.mergeRTChartDimension({
      state: this.state,
    });

    if (this.props.selectedStencil.namespace === 'icons') {
      this.props.onIconFormSubmit(this.props.selectedStencil, properties);
    } else {
      this.props.onPropertyFormSubmit(this.props.selectedStencil.id, properties);
      // update children: for primitiveString and icon of FloatingActionButton/IconButton
      for (const key in this.state.children) {
        if (this.state.children.hasOwnProperty(key)) {
          const { namespace, name } = this.props.selectedStencil;
          // 'Please input something' is for h1-h6 when the string is deleted
          let value = this.state.children[key].value || 'Please input something';
          switch (this.state.children[key].stencil.namespace) {
            // for any primitiveString: Avatar, h1-h6
            case PRIMITIVE_STRING_NAMESPACE:
              // for Avatar: allow '' empty value but we will give it a default 'A'
              if (namespace === 'material-ui' && name === 'Avatar') {
                value = this.state.children[key].value || 'A';
                value = value.trim().substring(0, 1);
              }
              this.props.onChildrenFormSubmit(
                value,
                this.state.children[key].stencil
              );
              break;
            case BUTTON_ICON_NAMESPACE:
              // click cancel after choosing new icon, will reset to the original icon: selectedIcon
              if (namespace === 'material-ui' &&
                (name === 'FloatingActionButton' || name === 'IconButton')) {
                this.props.onChildrenFormSubmit(
                  value = this.state.children[key].value || this.props.iconData.selectedIcon,
                  this.state.children[key].stencil
                );
              }
              break;
            default:
              break;
          }
        }
      }
    }
  };
  /**
   * delete field in drawer
   * @param  {String}  propKey         ex:height
   * @param  {Boolean} isStyleProperty true/false
   */
  onDelete = (propKey, isStyleProperty) => () => {
    const { onDeleteProperty, selectedStencil, selectedProperty } = this.props;
    // delete from both this.state and this.state.style
    if (this.state[propKey] !== undefined && !isStyleProperty) {
      delete this.state[propKey];
    }
    if (this.state.style[propKey] !== undefined && isStyleProperty) {
      delete this.state.style[propKey];
    }
    // since any onChange will put prop to state
    // if already input and then delete will cause 2 copies on form
    // one is in this.state, and another one is in this.props.selectedProperty
    // so compare duplicated name then delete from this.props.selectedProperty
    const deletedPropsNames = {
      prop: [],
      style: [],
    };
    const propsNames = Object.keys(this.state);
    const styleNames = Object.keys(this.state.style);
    for (let i = 0; i < selectedProperty.length; i++) {
      for (let j = 0; j < propsNames.length; j++) {
        if (selectedProperty[i] === propsNames[j]) {   // compare name
          deletedPropsNames.prop.push(selectedProperty[i]);
        }
      }
      for (let k = 0; k < styleNames.length; k++) {
        if (selectedProperty[i] === styleNames[k]) {   // compare name
          deletedPropsNames.style.push(selectedProperty[i]);
        }
      }
    }
    if (isStyleProperty) {
      deletedPropsNames.style.push(propKey);
    } else {
      deletedPropsNames.prop.push(propKey);
    }

    onDeleteProperty(selectedStencil.id, this.state, deletedPropsNames);
  };

  // for List to add ListItem by onAddChildClick,
  // for RadioButtonGroup to add RadioButton by onAddChildClick,
  // for ListItem to add nestedItems by onAddNestedItemClick
  // might be also used for Menu and MenuItem
  onAddChildItem = () => {
    const { name, id } = this.props.selectedStencil;
    switch (name) {
      case 'List':
      case 'RadioButtonGroup':
        this.props.onAddChildClick(id, name);
        break;
      case 'ListItem':
        this.props.onAddNestedItemClick(id);
        break;
      default:
        break;
    }
  }

  onEdit = (namespace, name) => () => {
    switch (namespace) {
      case 'RTChart':
        this.props.onRTChartEditClick();
        break;
      case 'DRC': {
        switch (name) {
          case 'PlainTable':
            this.props.onPlainTableEditClick();
            break;
          default:
            this.props.onReChartEditClick();
            break;
        }
        break;
      }
      default:break;
    }
  };
  /**
   * color picker change
   * @param  {Object} color hex | rgb | hsl, by component pass data
   * @param  {Object} event native event, by component pass data
   * @param  {Object} data  extra data to process, by a developer pass data
   */
  onColorChange = (data) => (color) => {
    const hex = color.hex;

    if (data.isStyleProperty) {
      const style = this.state.style;
      style[data.key] = hex;
      this.setState({ style });
    } else {
      this.setState({ [data.key]: hex });
    }
  };
  /**
   * date or time chnage
   * @param  {Object} prop        {}
   * @param  {Object} event       null
   * @param  {Object} dateTime    date format
   */
  onChangeDateTime = (prop) => (event, dateTime) => {
    this.setState({
      [prop.key]: this.checkInputValue({
        prop,
        dateTime,
      }),
    });
  };
  onIconChange = (iconName, fieldName) => () => {
    this.props.onIconSelectorEditClick(iconName, fieldName);
  };
  /**
   * for anything inside props but outside props.style
   * @param  {Object}  options.event            {}
   * @param  {Object}  options.prop             {}
   * @param  {Boolean} options.isInputChecked   true/false
   * @param  {Any}     options.selectedValue    0~N
   */
  onPropChange = (prop) => (event, key, payload) => {
    this.setState({
      [prop.key]: this.checkInputValue({
        event,
        prop,
        isInputChecked: key,
        selectedValue: payload,
      }),
    });
  };
  /**
   * for anything inside props.style
   * @param  {Object}  options.event            {}
   * @param  {Object}  options.prop             {}
   * @param  {Any}     options.selectedValue    0~N
   */
  onStyleChange = (prop) => (event, key, payload) => {
    const style = this.state.style;
    style[prop.key] = this.checkInputValue({ event, prop, selectedValue: payload });
    this.setState({ style });
  };
  /**
   * Primitive String component 'name' change
   * @param  {Object} event   handler
   * @param  {Object} prop    {}
   * @param  {String} key     identify id
   */
  onChildrenChange = (prop, key) => (event) => {
    this.setIconStringStencilInChildren(key, prop.stencil, event.target.value);
  };

  onMoveStencilOrder = (direction) => () => {
    this.props.onMoveStencilOrder(this.props.selectedStencil, direction);
  }

  getChildrenValue(prop, key) {
    let value = '';

    if ((this.state.children !== undefined) && (this.state.children[key] !== undefined)) {
      value = this.state.children[key].value;
    } else {
      value = prop.value;
    }

    return value;
  }

  /**
   * get default value or modified value
   * @param  {Object} prop {}
   * @return {String}      ...
   */
  getValue(prop) {
    let value = prop.value; // default get;

    if (prop.type === BOOLEAN || prop.type === REQUIREDBOOLEAN) {
      value = !!prop.value;
    }
    if (prop.isStyleProperty) {
      if (this.state.style[prop.key] !== undefined) {
        value = this.state.style[prop.key];
      }
    } else {
      const stateValue = this.state[prop.key];
      if (stateValue !== undefined) {
        // extra processing
        switch (prop.type) {
          case ANY:
          case REQUIREDANY: {
            switch (Object.prototype.toString.call(stateValue)) {
              case '[object Array]':
                value = stateValue.join();
                break;
              case '[object Boolean]':
                value = stateValue.toString();
                break;
              case '[object Function]':
                value = stateValue.toString();
                break;
              case '[object Number]':
                value = Number(stateValue).toString();
                break;
              case '[object Object]':
                value = JSON.stringify(stateValue);
                break;
              case '[object Undefined]':
              case '[object Null]':
                value = '';
                break;
              case '[object String]':
              default:
                value = stateValue;
                break;
            }
            break;
          }
          case ARRAY:
          case REQUIREDARRAY: {
            if (Array.isArray(stateValue)) {
              value = jsonic.stringify(value);
              // value = stateValue.join();
            } else {
              value = stateValue;
            }
            break;
          }
          case ENUM:
          case OBJECT:
          case PROPTYPES: {
            if (Object.prototype.toString.call(stateValue) === '[object Object]') {
              value = JSON.stringify(stateValue);
            } else {
              value = stateValue;
            }
            break;
          }
          case ICON:
          case REQUIREDICON: {
            if (Object.prototype.toString.call(stateValue) === '[object Object]') {
              value = stateValue.type.displayName;
            } else {
              value = stateValue;
            }
            break;
          }
          default:
            value = stateValue;
            break;
        }
      } else {
        // these component use function object
        if (/date$/i.test(prop.key) || /time$/i.test(prop.key)) {
          value = null;
        }
      }
    }

    return value;
  }

  getTopicURLValue(prop, label) {
    let value;
    if (this.state[prop.key] && this.state[prop.key][label]) {
      value = this.state[prop.key][label];
    } else {
      value = prop.value[label];
    }
    return value;
  }

  getButtonStyle(prop) {
    let deleteIconStyle;
    if (this.getValue(prop).length === 0) {
      deleteIconStyle = { top: -16 };
    } else {
      deleteIconStyle = { top: 6 };
    }
    return deleteIconStyle;
  }
  /**
   * get per row field
   * @param  {String}   prefix   string
   * @param  {Object}   prop     {...}
   * @param  {Function} onChange fun()
   * @return {Object}            JSX
   */
  getPropertyRow(prefix, prop, onChange) {
    const key = `${prefix}${prop.key}`;

    switch (prop.type) {
      case ANY:
      case ARRAY:
      case NODE:
      case OBJECT:
      case REQUIREDANY:
      case REQUIREDARRAY:
      case REQUIREDNODE:
      case REQUIREDSTRING:
      case STRING:
      case VALIDATELABEL:
      case REQUIREDVALIDATELABEL: {
        let field;

        if (!!prop.stencil && prop.stencil.namespace === PRIMITIVE_STRING_NAMESPACE) {
          field = (
            <div key={key}>
              <DeleteButton
                disabled
                style={styles.icon}
                onClick={this.onDelete(prop.key, prop.isStyleProperty)}
              />
              <DefaultTextField
                floatingLabelText={'string'}
                value={this.getChildrenValue(prop, key)}
                type="text"
                onChange={onChange(prop, key)}
              />
            </div>
          );
        } else {
          if (/color$/i.test(prop.key)) {
            const textField = (
              <DefaultTextField
                floatingLabelText={prop.key}
                value={this.getValue(prop)}
                type="text"
                onChange={onChange(prop)}
              />
            );

            field = (
              <div key={key}>
                <DeleteButton
                  style={styles.icon}
                  onClick={this.onDelete(prop.key, prop.isStyleProperty)}
                />
                <ColorPickerTextField
                  TextField={textField}
                  colorValue={this.getValue(prop)}
                  onChange={this.onColorChange(prop)}
                />
              </div>
            );
          } else if (/date$/i.test(prop.key) || /time$/i.test(prop.key)) {
            field = (
              <div key={key}>
                <DeleteButton
                  disabled={/^required/i.test(prop.type)}
                  style={styles.icon}
                  onClick={this.onDelete(prop.key, prop.isStyleProperty)}
                />
                {
                  /date$/i.test(prop.key) ?
                    <DatePicker
                      style={styles.inlineBlock}
                      textFieldStyle={styles.textField}
                      floatingLabelText={prop.key}
                      onChange={this.onChangeDateTime(prop)}
                      value={this.getValue(prop)}
                    /> :
                    <TimePicker
                      style={styles.inlineBlock}
                      textFieldStyle={styles.textField}
                      floatingLabelText={prop.key}
                      onChange={this.onChangeDateTime(prop)}
                      value={this.getValue(prop)}
                    />
                }
              </div>
            );
          } else {
            field = (
              <div key={key}>
                <DeleteButton
                  disabled={/^required/i.test(prop.type)}
                  style={styles.icon}
                  onClick={this.onDelete(prop.key, prop.isStyleProperty)}
                />
                <DefaultTextField
                  floatingLabelText={prop.key}
                  value={this.getValue(prop)}
                  type="text"
                  onChange={onChange(prop)}
                  hintText={
                    (prop.type === ARRAY || prop.type === REQUIREDARRAY)
                    ? ''
                    : prop.hintText
                  }
                />
              </div>
            );
          }// end if color
        }// end if primitive string

        return field;
      }
      case NUMBER:
      case REQUIREDNUMBER: {
        return (
          <div key={key}>
            <DeleteButton
              disabled={/^required/i.test(prop.type)}
              style={styles.icon}
              onClick={this.onDelete(prop.key, prop.isStyleProperty)}
            />
            <DefaultTextField
              floatingLabelText={prop.key}
              value={this.getValue(prop)}
              type="number"
              onChange={onChange(prop)}
            />
          </div>
        );
      }
      case ENUM: {
        const enumList = prop.isStyleProperty
                       ? styleEnumList
                       : materialUIEnumList[prop.name];

        return (
          <div key={key}>
            <DeleteButton
              style={this.getButtonStyle(prop)}
              onClick={this.onDelete(prop.key, prop.isStyleProperty)}
            />
            <DefaultSelectField
              floatingLabelText={prop.key}
              value={this.getValue(prop)}
              onChange={onChange(prop)}
            >
              {enumList[prop.key].map((value, i) =>
                <MenuItem key={i} value={value} primaryText={value} style={styles.menuItem} />
              )}
            </DefaultSelectField>
          </div>
        );
      }
      case PROPTYPES: {
        const propList = materialUIPropTypesList[prop.name];

        return (
          <div key={key}>
            <DeleteButton
              style={this.getButtonStyle(prop)}
              onClick={this.onDelete(prop.key, prop.isStyleProperty)}
            />
            <DefaultSelectField
              floatingLabelText={prop.key}
              value={this.getValue(prop)}
              onChange={onChange(prop)}
            >
              {propList[prop.key].map((value, i) =>
                <MenuItem key={i} value={value} primaryText={value} style={styles.menuItem} />
              )}
            </DefaultSelectField>
          </div>
        );
      }
      case BOOLEAN:
      case REQUIREDBOOLEAN: {
        return (
          <div key={key} style={{ marginBottom: -15 }}>
            <DeleteButton
              disabled={/^required/i.test(prop.type)}
              style={styles.iconCheckbox}
              onClick={this.onDelete(prop.key, prop.isStyleProperty)}
            />
            <DefaultCheckbox
              label={prop.key}
              labelPosition="left"
              checked={this.getValue(prop)}
              onCheck={onChange(prop)}
            />
          </div>
        );
      }
      case DATA: {
        let label;
        let text;
        if (prop.name === 'RTChart') {
          text = 'dataTransformer - Topic';
          label = 'topic';
        } else {
          text = 'dataTransformer - URL';
          label = 'url';
        }

        return (
          <div key={key}>
            <EditButton
              style={styles.icon}
              onClick={
                this.onEdit(this.props.selectedStencil.namespace, this.props.selectedStencil.name)
              }
            />
            <DefaultTextField disabled
              floatingLabelText={text} value={this.getTopicURLValue(prop, label)}
              underlineStyle={styles.underline} floatingLabelStyle={styles.dataTransformerLabel}
            />
          </div>
        );
      }
      case ICON:
      case REQUIREDICON: {
        const iconData = this.props.iconData;
        const icon = iconData.newPickedIcon || this.getValue(prop);
        const keepOriginalIcon = iconData.selectedIcon || this.getValue(prop);

        return (
          <div key={key}>
            <DeleteButton
              disabled={/^required/i.test(prop.type)}
              style={styles.icon}
              onClick={this.onDelete(prop.key, prop.isStyleProperty)}
            />
            <DefaultTextField
              floatingLabelText={prop.key}
              value={icon}
              type="text"
              onClick={this.onIconChange(keepOriginalIcon, prop.key)}
            />
            <div
              style={styles.iconPreview}
              onClick={this.onIconChange(keepOriginalIcon, prop.key)}
            >
              {
                icon && React.createElement(svgIcons[icon])
              }
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  }

  /**
   * primitive string handler
   * @param  {String} key     'random name'
   * @param  {Object} stencil {}
   * @param  {String} value   ''
   */
  setIconStringStencilInChildren(key, stencil, value) {
    this.setState({
      children: [],
    });

    const children = this.state.children || {};
    children[key] = {};
    children[key].stencil = stencil;
    children[key].value = value;

    this.setState({ children });
  }
  /**
   * get primitive string value, init or modified
   * @param  {Object} prop {}
   * @return {String}
   */
  updateIconStencilInChildren(newPickedIcon) {
    // when close drawer, this.state.children is undefined, unable to get the value and stencil.name
    if (this.state.children === undefined) {
      return;
    }
    const children = this.state.children;
    children['children_0_button-icon'].value = newPickedIcon;
    children['children_0_button-icon'].stencil.name = newPickedIcon;
    this.setState({ children });
  }
  /**
   * convert some field to correct type
   * @param  {Object} options.propertySpec {...}
   * @param  {Object} options.state        this.state
   * @return {Object}                      {...}
   */
  convertCorrectProperty({ propertySpec, state = {} }) {
    const props = state;
    const propsNames = Object.keys(props);

    for (let i = 0; i < propsNames.length; i++) {
      const dataType = propertySpec[propsNames[i]];

      let value = props[propsNames[i]];
      // input is string by user
      if (Object.prototype.toString.call(value) === '[object String]') {
        value = value.trim();

        switch (dataType) {
          case ANY:
          case REQUIREDANY: {
            // use simple regex to filter them //
            if (/^\[.*\]$/.test(value)) {
              // case '[object Array]':
              if (value.indexOf(',') > -1) {
                props[propsNames[i]] = value
                  .replace(/^\[|\]$/g, '').split(',').filter(val => val !== '');
              } else {
                props[propsNames[i]] = [value];
              }
            } else if (/true|false/i.test(value)) {
              // case '[object Boolean]':
              props[propsNames[i]] = Boolean(value);
            } else if (/^function\s.+}$/.test(value)) {
              // case '[object Function]':
              try {
                props[propsNames[i]] = eval(`(${value})`);
              } catch (error) {
                window.console.error('Func format: function a(){} but get', value);
                window.console.error(error);
              }
            } else if (!/\D+/.test(value) && value.length !== 0) {
              // case '[object Number]':
              props[propsNames[i]] = Number(value, 10);
            } else if (/^\{.*\}$/.test(value)) {
              // case '[object Object]':
              try {
                props[propsNames[i]] = JSON.parse(value);
              } catch (error) {
                window.console.error('JSON format: { "key":"value" } but get', value);
                window.console.error(error);
              }
            }
            /*
            case '[object Null]':
            case '[object String]':
            case '[object Undefined]':
             */
            break;
          }
          case ARRAY:
          case REQUIREDARRAY: {
            props[propsNames[i]] = jsonic(value);
            // if (value.indexOf(',') > -1) {
            //   props[propsNames[i]] = value.split(',').filter(val => val !== '');
            // } else {
            //   props[propsNames[i]] = [value];
            // }
            break;
          }
          case OBJECT:
          case PROPTYPES: {
            /*
            in this case: {"vertical":"bottom","horizontal":"right"}
             */
            if (/^\{.*\}$/.test(value)) {
              try {
                props[propsNames[i]] = JSON.parse(value);
              } catch (error) {
                window.console.error('JSON format: { "key":"value" } but get', value);
                window.console.error(error);
              }
            }
            break;
          }
          default:
            break;
        } // end switch
      } // end if
    } // end for

    return props;
  }
  /**
   * loop check if react element exist (prop use svg-icon)
   * @param  {[type]} options.propertySpec [description]
   * @param  {Object} options.state        [description]
   * @return {[type]}                      [description]
   */
  convertIconProperty({ propertySpec, state = {} }) {
    const props = state;
    const propsNames = Object.keys(props);

    for (let i = 0; i < propsNames.length; i += 1) {
      const dataType = propertySpec[propsNames[i]];
      if (dataType === ICON || dataType === REQUIREDICON) {
        if (typeof(props[propsNames[i]]) === 'function') {
          // has converted
          continue;
        }
        const iconObject = propertySpec[propsNames[i]] &&
          React.createElement(svgIcons[props[propsNames[i]]]);
        // if empty ''
        props[propsNames[i]] = typeof(iconObject) !== 'string' ? iconObject : null;
      }
    } // end for

    return props;
  }
  /**
   * Avatar component
   * render order : src > icon > primitive string (delete will always disappear)
   * @param  {Object} options.state [description]
   * @return {[type]}               [description]
   */
  preferAvatarProperty({ state = {} }) {
    const { selectedStencil } = this.props;
    if (selectedStencil.name !== 'Avatar') {
      return state;
    }
    const props = state;
    const propsNames = Object.keys(props);
    const preferShow = ['src', 'icon'];

    const deletePrimitiveString = () => {
      for (const key in props.children) {
        if (/^children_\d+_primitiveString/.test(key)) {
          // delete children in redux
          this.props.deleteStencil(props.children[key].stencil.id);
          // delete children in this state
          const children = props.children;
          delete children[key];
          this.setState({ children });
          break;
        }
      }
    };

    // render order : src > icon > primitive string (delete will always disappear)
    if (propsNames.indexOf(preferShow[0]) > -1 && props[preferShow[0]] !== '') {
      delete props[preferShow[1]];
      deletePrimitiveString();
    } else if (propsNames.indexOf(preferShow[1]) > -1 && props[preferShow[1]]) {
      deletePrimitiveString();
    }

    return props;
  }
  /**
   * RTChart component
   * width and height of RTChart should be set in props.chart.size
   * @param  {Object} options.state [description]
   * @return {[type]}               [description]
   */
  mergeRTChartDimension({ state = {} }) {
    if (this.props.selectedStencil.namespace !== 'RTChart') {
      return state;
    }
    const props = state;
    props.chart.size.width = this.state.width;
    props.chart.size.height = this.state.height;

    return props;
  }
  /**
   * delete empty key field
   * @param  {Object} options.propertySpec {...}
   * @param  {Object} options.state        this.state
   * @return {Object}                      {...}
   */
  deleteEmptyProperty({ propertySpec, state = {} }) {
    const props = state;
    const propsNames = Object.keys(props);

    for (let i = 0; i < propsNames.length; i++) {
      const dataType = propertySpec[propsNames[i]];

      if (!(/^required/i.test(dataType))) {
        const value = props[propsNames[i]];
        switch (dataType) {
          // input always is string by user
          case ANY:
          case ARRAY:
          case NODE:
          case OBJECT:
          case STRING:
            if (value.toString().length === 0) {
              delete props[propsNames[i]];
            }
            break;
          default:
            break;
        }
      }
    }

    return props;
  }
  /**
   * handle input should be string or number or enum
   * even if text field input type is number, still need to be converted here
   * @param  {Object}  options.event            {}
   * @param  {Object}  options.prop             {}
   * @param  {Boolean} options.isInputChecked   true/false
   * @param  {Any}     options.selectedValue    0~N
   * @param  {Object}  options.dateTime         date formate
   * @return {Any}
   */
  checkInputValue({ event, prop, isInputChecked, selectedValue, dateTime }) {
    let inputValue;
    const value = event && event.target.value;

    switch (prop.type) {
      case BOOLEAN:
      case REQUIREDBOOLEAN:
        inputValue = isInputChecked;
        break;
      case ENUM:
      case PROPTYPES:
        inputValue = selectedValue;
        break;
      case NUMBER:
      case REQUIREDNUMBER:
        inputValue = Number(value);
        break;
      case OBJECT:
        if (dateTime !== undefined) {
          inputValue = dateTime;
        } else {
          inputValue = value;
        }
        break;
      default:
        inputValue = value;
        break;
    }

    return inputValue;
  }
  /**
   * for selectedStencil's original props, include props and props.style
   * so onChange() may be props: onPropChange() or props.style: onStyleChange()
   *
   * @param  {Object}   propertySpec  {}
   * @param  {Object}   props         {}
   * @param  {Array}    propertyRows  []
   * @param  {Function} onChange      func()
   * @param  {Function} onChange      func()
   * @param  {String}   name          ui name
   * @return {Array}                  []
   */
  propsToRows(propertySpec, props, propertyRows, onChange1, onChange2, name) {
    if (props === undefined) {  // props.style might be undefined
      return null;
    }

    const propsNames = Object.keys(props);
    for (let i = 0, j = 0, k = 0; i < propsNames.length; i++) {
      if (propsNames[i] === 'style') {
        for (const key in props[propsNames[i]]) {
          if (props[propsNames[i]].hasOwnProperty(key)) {
            const prop = {
              type: styleSpec[key],
              key,
              value: props[propsNames[i]][key],
              isStyleProperty: true,
              name: key,
            };
            propertyRows.push(this.getPropertyRow(`style_${j++}_`, prop, onChange2));
          }
        }
      } else {
        if (propertySpec.hasOwnProperty(propsNames[i])) {
          const prop = {
            type: propertySpec[propsNames[i]],
            key: propsNames[i],
            value: props[propsNames[i]],
            isStyleProperty: false,
            name,
          };
          propertyRows.push(this.getPropertyRow(`prop_${k++}_`, prop, onChange1));
        }
      }
    }

    return propertyRows;
  }
  /**
   * for any style props and element props added from property-selection-modal
   *
   * @param  {Object}   props         {}
   * @param  {Array}    propertyRows  []
   * @param  {Function} onChange1     func()
   * @param  {Function} onChange2     func()
   * @param  {String}   name          ui name
   * @return {Array}                  []
   */
  selectedMorePropertyToRows(propertyRows, onChange1, onChange2, name) {
    const propertySpec = this.props.selectedStencil.namespace === 'icons' ?
      getPropertySpecs('Icons') : getPropertySpecs(name);
    const { selectedProperty } = this.props;  // array of style names
    const propSelected = selectedProperty.prop;
    const styleSelected = selectedProperty.style;

    for (let i = 0; i < propSelected.length; i++) {
      if (propertySpec.hasOwnProperty(propSelected[i])) {
        const pro = {
          type: propertySpec[propSelected[i]],
          key: propSelected[i],
          value: '',
          isStyleProperty: false,
          name,
        };
        propertyRows.push(this.getPropertyRow(`prop_new_${i}_`, pro, onChange1));
      }
    }
    for (let i = 0; i < styleSelected.length; i++) {
      if (styleSpec.hasOwnProperty(styleSelected[i])) {
        const sty = {
          type: styleSpec[styleSelected[i]],
          key: styleSelected[i],
          value: '',
          isStyleProperty: true,
          name,
        };
        propertyRows.push(this.getPropertyRow(`style_new_${i}_`, sty, onChange2));
      }
    }

    return propertyRows;
  }
  /**
   * for selectedStencil's children
   * @param  {Array}    children
   * @param  {Array}    propertyRows  output for present
   * @param  {Function} onChange      event handler
   * @param  {String}   name          ui name
   * @return {Array}                  propertyRows
   */
  childrenToRows(children, propertyRows, onChange, name) {
    const routes = this.props.routes[this.props.pageIndex];
    const { stencils } = routes;

    for (let i = 0, j = children; i < j.length; i += 1) {
      const stencil = stencils[j[i]];
      /*
      rechart will delete old stencil and create new ones
      but data still not yet put into store, so stencil object will undefined
       */

      if (stencil !== undefined) {
        const prop = {
          key: stencil.namespace,
          value: stencil.name,
          stencil,
          isStyleProperty: false,
          name,
        };
        switch (stencil.namespace) {
          case PRIMITIVE_STRING_NAMESPACE:
            prop.type = STRING;
            propertyRows.push(this.getPropertyRow(`children_${i}_`, prop, onChange));
            break;
          case BUTTON_ICON_NAMESPACE:
            prop.type = REQUIREDICON;
            propertyRows.push(this.getPropertyRow(`children_${i}_`, prop, onChange));
            break;
          default:
            break;
        }
      }
    }
    return propertyRows;
  }

  render() {
    const { onPropChange, onStyleChange, onChildrenChange } = this;
    const { selectedStencil } = this.props;
    const { props, name, children, namespace } = selectedStencil;

    let floatButtonSetting;
    switch (name) {
      case 'List':
        floatButtonSetting = { style: styles.parentItemFloatButton, tooltip: 'Add List Item' };
        break;
      case 'ListItem':
        if (props.rightIcon === undefined && this.state.rightIcon === undefined) {
          floatButtonSetting =
            { style: styles.listItemFloatButton, tooltip: 'Add Nested List Item' };
        } else {
          floatButtonSetting = { style: styles.childItemFloatButton };
        }
        break;
      case 'RadioButton':
        floatButtonSetting = { style: styles.childItemFloatButton };
        break;
      case 'RadioButtonGroup':
        floatButtonSetting = { style: styles.parentItemFloatButton, tooltip: 'Add Radio Button' };
        break;
      default:
        floatButtonSetting = { style: styles.floatButton };
    }

    if (props === undefined) {
      return null;
    }

    let propertyRows = [];
    const propertySpec = namespace === 'icons' ?
      getPropertySpecs('Icons') : getPropertySpecs(name);
    // for anything inside selectedStencil props but outside its props.style
    // for anything inside selectedStencil props.style
    this.propsToRows(
      propertySpec, props, propertyRows, onPropChange.bind(this), onStyleChange.bind(this), name
    );
    // for any style props and element props added from property-selection-modal
    this.selectedMorePropertyToRows(
      propertyRows,
      onPropChange.bind(this),
      onStyleChange.bind(this),
      name
    );
    this.childrenToRows(children, propertyRows, onChildrenChange.bind(this), name);

    propertyRows = classifyAndSortData(propertyRows);

    return (
      <div style={styles.container}>
        {propertyRows}
        {(name === 'ListItem' || name === 'RadioButton') &&
          <span>
            <FloatingActionButton mini onClick={this.onMoveStencilOrder('forward')}
              style={floatButtonSetting.style} data-tip="Move Upward"
            >
              <ArrowUpward />
            </FloatingActionButton>
            <ReactTooltip place="bottom" />
            <FloatingActionButton mini onClick={this.onMoveStencilOrder('backward')}
              style={floatButtonSetting.style} data-tip="Move Downward"
            >
              <ArrowDownward />
            </FloatingActionButton>
            <ReactTooltip place="bottom" />
          </span>
        }
        {/* currently this button is for List to add ListItem, for ListItem to add nestedItems */}
        {/* if ListItem has nestedItems, cannot add rightIcon or nestedItems cannot displayed */}
        {/* for RadioButtonGroup to add RadioButton */}
        {((name === 'List') || (name === 'RadioButtonGroup') ||
          (name === 'ListItem' &&
            props.rightIcon === undefined && this.state.rightIcon === undefined)) &&
          <span>
            <FloatingActionButton mini onClick={this.onAddChildItem}
              style={floatButtonSetting.style} data-tip={floatButtonSetting.tooltip}
            >
              <SocialPlusOne />
            </FloatingActionButton>
            <ReactTooltip place="bottom" />
          </span>
        }
        <FloatingActionButton mini onClick={this.onSubmit} backgroundColor={'#18bf2f'}
          style={floatButtonSetting.style} data-tip="Apply Property Setting"
        >
          <NavigationCheck />
        </FloatingActionButton>
        <ReactTooltip place="bottom" />
        <FloatingActionButton mini onClick={this.onClose} style={floatButtonSetting.style}
          backgroundColor={COLOR.GREY[600]} data-tip="Close Drawer"
        >
          <ArrowForward />
        </FloatingActionButton>
        <ReactTooltip place="bottom" />
      </div>
    );
  }
}

PropertyFormRow.propTypes = {
  closeStencilEditorDrawer: PropTypes.func.isRequired,
  deleteStencil: PropTypes.func.isRequired,
  iconData: PropTypes.object.isRequired,
  onChildrenFormSubmit: PropTypes.func.isRequired,
  onDeleteProperty: PropTypes.func.isRequired,
  onIconFormSubmit: PropTypes.func.isRequired,
  onIconSelectorEditClick: PropTypes.func.isRequired,
  onPropertyFormSubmit: PropTypes.func.isRequired,
  onReChartEditClick: PropTypes.func.isRequired,
  onRTChartEditClick: PropTypes.func.isRequired,
  onPlainTableEditClick: PropTypes.func.isRequired,
  onAddChildClick: PropTypes.func.isRequired,
  onAddNestedItemClick: PropTypes.func.isRequired,
  onMoveStencilOrder: PropTypes.func.isRequired,
  pageIndex: PropTypes.number,
  routes: PropTypes.array.isRequired,
  selectedProperty: PropTypes.object.isRequired,
  selectedStencil: PropTypes.object.isRequired,
};
