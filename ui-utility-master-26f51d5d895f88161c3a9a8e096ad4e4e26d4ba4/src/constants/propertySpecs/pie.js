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
  cx: STRING,
  cy: STRING,
  innerRadius: STRING,
  outerRadius: STRING,
  startAngle: NUMBER,
  endAngle: NUMBER,
  minAngle: NUMBER,
  paddingAngle: NUMBER,
  nameKey: STRING,
  valueKey: STRING,
  legendType: ENUM,
  label: ANY,
  // labelLine: ANY,
  data: ARRAY,
  activeIndex: ARRAY,
  // activeShape: ANY,
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
