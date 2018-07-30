import {
  // ARRAY,
  // FUNCTION,
  // NUMBER,
  // OBJECT,
  BOOLEAN,
  // ELEMENT,
  ENUM,
  ICON,
  NODE,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  autoGenerateNestedIndicator: BOOLEAN,
  // children: NODE,
  disableKeyboardFocus: BOOLEAN,
  disabled: BOOLEAN,
  initiallyOpen: BOOLEAN,
  // innerDivStyle: OBJECT,
  insetChildren: BOOLEAN,
  // leftAvatar: ELEMENT,
  // leftCheckbox: ELEMENT,
  leftIcon: ICON, // change attribute, custom
  // nestedItems: ARRAY,
  // nestedLevel: NUMBER,
  // nestedListStyle: OBJECT,
  // onKeyboardFocus: FUNCTION,
  // onNestedListToggle: FUNCTION,
  open: BOOLEAN,
  primaryText: NODE,
  primaryTogglesNestedList: BOOLEAN,
  // rightAvatar: ELEMENT,
  rightIcon: ICON, // change attribute, custom
  // rightIconButton: ELEMENT,
  // rightToggle: ELEMENT,
  secondaryText: NODE,
  secondaryTextLines: ENUM,
  // style: OBJECT,
};
