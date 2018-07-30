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
  hide: BOOLEAN,
  dataKey: STRING,
  xAxisId: STRING,
  width: NUMBER,
  height: NUMBER,
  orientation: ENUM,
  type: ENUM,
  allowDecimals: BOOLEAN,
  allowDataOverflow: BOOLEAN,
  tickCount: NUMBER,
  domain: ARRAY,
  interval: ENUM,
  // padding: OBJECT,
  minTickGap: NUMBER,
  axisLine: BOOLEAN,
  tickLine: BOOLEAN,
  tickSize: NUMBER,
  // tickFormatter: FUNCTION,
  ticks: ARRAY,
  tick: ANY,
  label: ANY,
  scale: ENUM,
  unit: STRING,
  name: STRING,
  // onClick: FUNCTION,
  // onMouseDown: FUNCTION,
  // onMouseUp: FUNCTION,
  // onMouseMove: FUNCTION,
  // onMouseOver: FUNCTION,
  // onMouseOut: FUNCTION,
  // onMouseEnter: FUNCTION,
  // onMouseLeave: FUNCTION,
});
