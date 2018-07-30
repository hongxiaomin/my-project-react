import {
  // NODE,
  // STRING,
  NUMBER,
  REQUIREDBOOLEAN,
  // OBJECT,
  // FUNCTION,
  REQUIREDNODE,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  // action: NODE,
  autoHideDuration: NUMBER,
  // bodyStyle: OBJECT,
  // className: STRING,
  message: REQUIREDNODE, // * required property
  // onActionTouchTap: FUNCTION,
  // onRequestClose: FUNCTION,
  open: REQUIREDBOOLEAN, // * required property
  // style: OBJECT,
};
