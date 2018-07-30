import {
  // NODE,
  // STRING,
  ENUM,
  // OBJECT,
  // FUNCTION,
  ANY,
  REQUIREDSTRING,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  // children: NODE,
  // className: STRING,
  defaultSelected: ANY,
  labelPosition: ENUM,
  name: REQUIREDSTRING, // * required property
  // onChange: FUNCTION,
  // style: OBJECT,
  valueSelected: ANY,
};
