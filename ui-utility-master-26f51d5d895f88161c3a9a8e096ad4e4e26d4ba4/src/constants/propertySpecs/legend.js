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
  width: NUMBER,
  height: NUMBER,
  layout: ENUM,
  align: ENUM,
  verticalAlign: ENUM,
  iconSize: NUMBER,
  payload: ARRAY,
  chartWidth: NUMBER,
  chartHeight: NUMBER,
  // margin: OBJECT,
  // content: ELEMENT,
  // wrapperStyle: OBJECT,
  // onClick: FUNCTION,
  // onMouseDown: FUNCTION,
  // onMouseUp: FUNCTION,
  // onMouseMove: FUNCTION,
  // onMouseOver: FUNCTION,
  // onMouseOut: FUNCTION,
  // onMouseEnter: FUNCTION,
  // onMouseLeave: FUNCTION,
});
