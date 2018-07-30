import {
  // ANY,
  ARRAY,
  // BOOLEAN,
  // ELEMENT,
  ENUM,
  // FUNCTION,
  // NODE,
  NUMBER,
  // OBJECT,
  // PROPTYPES,
  STRING,
  // UNION,
  // VALIDATELABEL,
} from '../propertyTypes';
import svgAttribute from './svgAttribute';
/**
 * define special props from Recharts
 *
 * @see http://recharts.org/#/en-US/api/???
 * @type {Object}
 */
export default Object.assign({}, svgAttribute, {
  cx: NUMBER,
  cy: NUMBER,
  innerRadius: STRING,
  outerRadius: STRING,
  polarAngles: ARRAY,
  polarRadius: ARRAY,
  gridType: ENUM,
});
