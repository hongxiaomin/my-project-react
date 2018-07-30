import {
  NODE,
  // STRING,
  NUMBER,
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
  // DateTimeFormat: FUNCTION,
  autoOk: BOOLEAN,
  cancelLabel: NODE,
  // className: STRING,
  container: ENUM,
  defaultDate: OBJECT,
  // dialogContainerStyle: OBJECT,
  disableYearSelection: BOOLEAN,
  disabled: BOOLEAN,
  firstDayOfWeek: NUMBER,
  // formatDate: FUNCTION,
  // locale: STRING,
  maxDate: OBJECT,
  minDate: OBJECT,
  mode: ENUM,
  okLabel: NODE,
  // onChange: FUNCTION,
  // onDismiss: FUNCTION,
  // onFocus: FUNCTION,
  // onShow: FUNCTION,
  // onTouchTap: FUNCTION,
  // shouldDisableDate: FUNCTION,
  // style: OBJECT,
  // textFieldStyle: OBJECT,
  // value: OBJECT,
  floatingLabelText: NODE, // @see offical website, hidden property
};
