import {
  // ANY,
  ARRAY,
  BOOLEAN,
  // ELEMENT,
  // ENUM,
  // FUNCTION,
  // NODE,
  NUMBER,
  // OBJECT,
  // PROPTYPES,
  // STRING,
  // UNION,
  // VALIDATELABEL,
} from '../propertyTypes';
import svgAttribute from './svgAttribute';
/**
 * define special props from Recharts
 *
 * @see http://recharts.org/#/en-US/api/AreaChart
 * @type {Object}
 */
export default Object.assign({}, svgAttribute, {
  x: NUMBER,
  y: NUMBER,
  width: NUMBER,
  height: NUMBER,
  horizontal: BOOLEAN,
  vertical: BOOLEAN,
  horizontalPoints: ARRAY,
  verticalPoints: ARRAY,
});
