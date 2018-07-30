import {
  // NODE,
  // STRING,
  BOOLEAN,
  // OBJECT,
  // FUNCTION,
  PROPTYPES,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  // anchorEl: OBJECT,
  anchorOrigin: PROPTYPES, // proptypes.origin
  animated: BOOLEAN,
  // animation: FUNCTION,
  autoCloseWhenOffScreen: BOOLEAN,
  canAutoPosition: BOOLEAN,
  // children: NODE,
  // className: STRING,
  // onRequestClose: FUNCTION,
  open: BOOLEAN,
  // style: OBJECT,
  targetOrigin: PROPTYPES, // proptypes.origin
  useLayerForClickAway: BOOLEAN,
  zDepth: PROPTYPES, // proptypes.zdepth
};
