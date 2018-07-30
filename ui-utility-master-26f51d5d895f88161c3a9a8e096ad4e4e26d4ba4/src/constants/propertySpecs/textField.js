import {
  NODE,
  STRING,
  NUMBER,
  BOOLEAN,
  // OBJECT,
  // FUNCTION,
  ANY,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  // children: NODE,
  // className: STRING,
  defaultValue: ANY,
  disabled: BOOLEAN,
  // errorStyle: OBJECT,
  errorText: NODE,
  floatingLabelFixed: BOOLEAN,
  // floatingLabelFocusStyle: OBJECT,
  // floatingLabelStyle: OBJECT,
  floatingLabelText: NODE,
  fullWidth: BOOLEAN,
  // hintStyle: OBJECT,
  hintText: NODE,
  // id: STRING,
  // inputStyle: OBJECT,
  multiLine: BOOLEAN,
  name: STRING,
  // onChange: FUNCTION,
  rows: NUMBER,
  rowsMax: NUMBER,
  // style: OBJECT,
  // textareaStyle: OBJECT,
  type: STRING,
  // underlineDisabledStyle: OBJECT,
  // underlineFocusStyle: OBJECT,
  underlineShow: BOOLEAN,
  // underlineStyle: OBJECT,
  value: ANY,
};
