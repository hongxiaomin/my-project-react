import {
  // FUNCTION,
  // OBJECT,
  ANY,
  BOOLEAN,
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
  // animation: FUNCTION,
  checked: BOOLEAN,
  // children: NODE,
  disabled: BOOLEAN,
  focusState: ENUM,
  // innerDivStyle: OBJECT,
  insetChildren: BOOLEAN,
  leftIcon: ICON, // change attribute, custom
  // menuItems: NODE,
  // onTouchTap: FUNCTION,
  primaryText: NODE,
  rightIcon: ICON, // change attribute, custom
  secondaryText: NODE,
  // style: OBJECT,
  value: ANY,
};
