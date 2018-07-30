import {
  // NODE,
  // STRING,
  BOOLEAN,
  // OBJECT,
  REQUIREDNODE,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  badgeContent: REQUIREDNODE, // * required property
  // badgeStyle: OBJECT,
  // children: NODE,
  // className: STRING,
  primary: BOOLEAN,
  secondary: BOOLEAN,
  // style: OBJECT,
};
