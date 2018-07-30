import {
  NODE,
  BOOLEAN,
  ENUM,
  OBJECT,
  // FUNCTION,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  autoOk: BOOLEAN,
  cancelLabel: NODE,
  defaultTime: OBJECT,
  // dialogBodyStyle: OBJECT,
  // dialogStyle: OBJECT,
  disabled: BOOLEAN,
  format: ENUM,
  okLabel: NODE,
  // onChange: FUNCTION,
  // onDismiss: FUNCTION,
  // onFocus: FUNCTION,
  // onShow: FUNCTION,
  // onTouchTap: FUNCTION,
  pedantic: BOOLEAN,
  // style: OBJECT,
  // textFieldStyle: OBJECT,
  // value: OBJECT,
  floatingLabelText: NODE, // @see offical website, hidden property
};
