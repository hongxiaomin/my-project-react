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
  // STRING,
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
  startAngle: NUMBER,
  endAngle: NUMBER,
  maxAngle: NUMBER,
  minAngle: NUMBER,
  legendType: ENUM,
  label: ANY,
  background: ANY,
  data: ARRAY,
  isAnimationActive: BOOLEAN,
  animationBegin: NUMBER,
  animationDuration: NUMBER,
  animationEasing: ENUM,
  // onClick: FUNCTION,
  // onMouseDown: FUNCTION,
  // onMouseUp: FUNCTION,
  // onMouseMove: FUNCTION,
  // onMouseOver: FUNCTION,
  // onMouseOut: FUNCTION,
  // onMouseEnter: FUNCTION,
  // onMouseLeave: FUNCTION,
});
