import {
  NODE,
  // STRING,
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
  autoWidth: BOOLEAN,
  // children: NODE,
  disabled: BOOLEAN,
  // errorStyle: OBJECT,
  errorText: NODE,
  floatingLabelFixed: BOOLEAN,
  // floatingLabelStyle: OBJECT,
  floatingLabelText: NODE,
  fullWidth: BOOLEAN,
  // hintStyle: OBJECT,
  hintText: NODE,
  // iconStyle: OBJECT,
  // id: STRING,
  // labelStyle: OBJECT,
  maxHeight: NUMBER,
  // menuStyle: OBJECT,
  // onChange: FUNCTION,
  // style: OBJECT,
  // underlineDisabledStyle: OBJECT,
  // underlineFocusStyle: OBJECT,
  // underlineStyle: OBJECT,
  value: ANY,
};
