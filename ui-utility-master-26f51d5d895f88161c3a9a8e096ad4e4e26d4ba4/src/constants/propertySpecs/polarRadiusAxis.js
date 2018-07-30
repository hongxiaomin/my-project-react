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
  angle: NUMBER,
  cx: NUMBER,
  cy: NUMBER,
  domain: ARRAY,
  label: ANY,
  orientation: ENUM,
  axisLine: BOOLEAN,
  tick: ANY,
  // tickFormatter: FUNCTION,
  tickCount: NUMBER,
  scale: ENUM,
  // onClick: FUNCTION,
  // onMouseDown: FUNCTION,
  // onMouseUp: FUNCTION,
  // onMouseMove: FUNCTION,
  // onMouseOver: FUNCTION,
  // onMouseOut: FUNCTION,
  // onMouseEnter: FUNCTION,
  // onMouseLeave: FUNCTION,
});
