import {
  // NODE,
  // STRING,
  // REQUIREDICON,
  NUMBER,
  BOOLEAN,
  // OBJECT,
  // FUNCTION,
  PROPTYPES,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  anchorOrigin: PROPTYPES, // propTypes.origin
  animated: BOOLEAN,
  // animation: FUNCTION,
  // children: NODE,
  // className: STRING,
  // iconButtonElement: REQUIREDICON, // * required property, no for use using
  // iconStyle: OBJECT,
  // listStyle: OBJECT,
  // menuStyle: OBJECT,
  multiple: BOOLEAN,
  // onItemTouchTap: FUNCTION,
  // onKeyboardFocus: FUNCTION,
  // onRequestChange: FUNCTION,
  // onTouchTap: FUNCTION,
  open: BOOLEAN,
  // style: OBJECT,
  targetOrigin: PROPTYPES, // propTypes.origin
  touchTapCloseDelay: NUMBER,
  useLayerForClickAway: BOOLEAN,
};
