import {
  STRING,
  NUMBER,
  ENUM,
  // OBJECT,
  REQUIREDNUMBER,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  color: STRING,
  left: REQUIREDNUMBER, // * required properties
  loadingColor: STRING,
  percentage: NUMBER,
  size: NUMBER,
  status: ENUM,
  // style: OBJECT,
  top: REQUIREDNUMBER, // * required properties
};
