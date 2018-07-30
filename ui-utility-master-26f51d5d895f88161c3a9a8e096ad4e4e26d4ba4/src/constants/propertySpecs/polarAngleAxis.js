import {
  ANY,
  ARRAY,
  BOOLEAN,
  // ELEMENT,
  // ENUM,
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
  cx: NUMBER,
  cy: NUMBER,
  radius: STRING,
  axisLine: BOOLEAN,
  axisLineType: STRING,
  tickLine: BOOLEAN,
  tick: ANY,
  ticks: ARRAY,
  orient: STRING,
  // tickFormatter: FUNCTION,
  // onClick: FUNCTION,
  // onMouseDown: FUNCTION,
  // onMouseUp: FUNCTION,
  // onMouseMove: FUNCTION,
  // onMouseOver: FUNCTION,
  // onMouseOut: FUNCTION,
  // onMouseEnter: FUNCTION,
  // onMouseLeave: FUNCTION,
});
