import {
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
  // buttonStyle: OBJECT,
  // children: NODE,
  // className: STRING,
  disabled: BOOLEAN,
  disabledBackgroundColor: STRING,
  disabledLabelColor: STRING,
  fullWidth: BOOLEAN,
  href: STRING,
  icon: ICON, // change attribute, custom
  label: REQUIREDVALIDATELABEL,
  labelColor: STRING,
  labelPosition: ENUM,
  // labelStyle: OBJECT,
  // overlayStyle: OBJECT,
  primary: BOOLEAN,
  // rippleStyle: OBJECT,
  secondary: BOOLEAN,
  // style: OBJECT,
};
