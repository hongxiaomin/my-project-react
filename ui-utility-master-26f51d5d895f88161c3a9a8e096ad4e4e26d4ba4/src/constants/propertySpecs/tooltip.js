import {
  ANY,
  ARRAY,
  BOOLEAN,
  ELEMENT,
  ENUM,
  // FUNCTION,
  // NODE,
  NUMBER,
  OBJECT,
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
  separator: STRING,
  offset: NUMBER,
  // itemStyle: OBJECT,
  // wrapperStyle: OBJECT,
  // labelStyle: OBJECT,
  cursor: ANY,
  viewBox: OBJECT,
  active: BOOLEAN,
  coordinate: OBJECT,
  payload: ARRAY,
  label: STRING,
  content: ELEMENT,
  // formatter: FUNCTION,
  // labelFormatter: FUNCTION,
  // itemSorter: FUNCTION,
  isAnimationActive: BOOLEAN,
  animationBegin: NUMBER,
  animationDuration: NUMBER,
  animationEasing: ENUM,
});
