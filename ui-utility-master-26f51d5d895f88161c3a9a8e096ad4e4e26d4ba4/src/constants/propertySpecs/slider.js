import {
  STRING,
  NUMBER,
  BOOLEAN,
  ENUM,
  // OBJECT,
  // FUNCTION,
} from '../propertyTypes';
/**
 * define special props from Material UI component
 *
 * @see http://www.material-ui.com/#/components/???
 * @type {Object}
 */
export default {
  axis: ENUM,
  defaultValue: NUMBER,
  description: STRING,
  disableFocusRipple: BOOLEAN,
  disabled: BOOLEAN,
  error: STRING,
  // The maximum value the slider can slide to on a scale from 0 to 1 inclusive.
  // Cannot be equal to min.The maximum value the slider can slide
  // to on a scale from 0 to 1 inclusive. Cannot be equal to min
  max: NUMBER,
  // The minimum value the slider can slide to on a scale from 0 to 1 inclusive.
  // Cannot be equal to max.
  min: NUMBER,
  name: STRING,
  // onChange: FUNCTION,
  // onDragStart: FUNCTION,
  // onDragStop: FUNCTION,
  required: BOOLEAN,
  // sliderStyle: OBJECT,
  step: NUMBER,
  // style: OBJECT,
  value: NUMBER,
};
