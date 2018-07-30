import {
  // FUNCTION,
  // OBJECT,
  BOOLEAN,
  ENUM,
  ICON,
  REQUIREDVALIDATELABEL,
  STRING,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  backgroundColor: STRING,
  // children: NODE,
  disabled: BOOLEAN,
  hoverColor: STRING,
  href: STRING,
  icon: ICON, // change attribute, custom
  label: REQUIREDVALIDATELABEL,
  labelPosition: ENUM,
  // labelStyle: OBJECT,
  // onKeyboardFocus: FUNCTION,
  primary: BOOLEAN,
  rippleColor: STRING,
  secondary: BOOLEAN,
  // style: OBJECT,
};
