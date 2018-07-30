import {
  NODE,
  STRING,
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
  // children: NODE,
  // className: STRING,
  disableTouchRipple: BOOLEAN,
  disabled: BOOLEAN,
  href: STRING,
  // iconClassName: STRING,
  // iconStyle: OBJECT,
  // onKeyboardFocus: FUNCTION,
  // style: OBJECT,
  tooltip: NODE,
  tooltipPosition: PROPTYPES, // propTypes.cornersAndCenter
  // tooltipStyles: OBJECT,
  touch: BOOLEAN,
};
