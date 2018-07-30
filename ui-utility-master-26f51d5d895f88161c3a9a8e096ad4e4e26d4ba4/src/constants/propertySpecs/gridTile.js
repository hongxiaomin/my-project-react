import {
  // OBJECT,
  // UNION,
  ENUM,
  ICON,
  NODE,
  NUMBER,
  STRING,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  actionIcon: ICON, // change attribute, custom
  actionPosition: ENUM,
  // children: NODE,
  cols: NUMBER,
  // containerElement: UNION,
  rows: NUMBER,
  // style: OBJECT,
  subtitle: NODE,
  title: NODE,
  titleBackground: STRING,
  titlePosition: ENUM,
};
