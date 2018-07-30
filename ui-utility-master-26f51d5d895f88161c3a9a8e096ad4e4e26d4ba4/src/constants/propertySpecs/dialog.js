import {
  NODE,
  // STRING,
  BOOLEAN,
  // OBJECT,
  // FUNCTION,
  REQUIREDBOOLEAN,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  // actions: NODE,
  // actionsContainerClassName: STRING,
  // actionsContainerStyle: OBJECT,
  autoDetectWindowHeight: BOOLEAN,
  autoScrollBodyContent: BOOLEAN,
  // bodyClassName: STRING,
  // bodyStyle: OBJECT,
  // children: NODE,
  // className: STRING,
  // contentClassName: STRING,
  // contentStyle: OBJECT,
  modal: BOOLEAN,
  // onRequestClose: FUNCTION,
  open: REQUIREDBOOLEAN, // * required property
  // overlayClassName: STRING,
  // overlayStyle: OBJECT,
  repositionOnUpdate: BOOLEAN,
  // style: OBJECT,
  title: NODE,
  // titleClassName: STRING,
  // titleStyle: OBJECT,
};
