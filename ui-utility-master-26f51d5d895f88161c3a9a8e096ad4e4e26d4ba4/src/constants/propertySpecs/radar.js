import {
  ANY,
  ARRAY,
  BOOLEAN,
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
  dataKey: STRING,
  points: ARRAY,
  // shape: ELEMENT,
  dot: ANY,
  label: ANY,
  isAnimationActive: BOOLEAN,
  animationBegin: NUMBER,
  animationDuration: NUMBER,
  animationEasing: ENUM,
});
