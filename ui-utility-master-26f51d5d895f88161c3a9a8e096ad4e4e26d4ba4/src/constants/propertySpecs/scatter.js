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
  legendType: ENUM,
  xAxisId: STRING,
  yAxisId: STRING,
  zAxisId: STRING,
  line: ANY,
  shape: ENUM,
  lineType: ENUM,
  points: ARRAY,
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
