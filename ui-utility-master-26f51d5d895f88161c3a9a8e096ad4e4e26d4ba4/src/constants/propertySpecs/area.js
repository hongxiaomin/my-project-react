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
  type: ENUM,
  dataKey: STRING,
  xAxisId: STRING,
  yAxisId: STRING,
  legendType: ENUM,
  dot: ANY,
  activeDot: ANY,
  label: ANY,
  curve: BOOLEAN,
  layout: ENUM,
  baseLine: NUMBER,
  points: ARRAY,
  stackId: STRING,
  connectNulls: BOOLEAN,
  unit: STRING,
  name: STRING,
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
