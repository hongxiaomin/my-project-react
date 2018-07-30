import {
  // BOOLEAN,
  ENUM,
  NUMBER,
  // OBJECT,
  STRING,
} from '../propertyTypes';
/**
 * define props type for pop INPUT in drawer (for user)
 *
 * undefined value -> alis name is 'auto' in drawer (for user)
 * 0 value -> alis name is 'auto' in drawer (for user)
 *
 * @type {Object} {
 *       key: {
 *         type,
 *         defaultValue, // undefined(enum) | 0(number) | ''(string)
 *         enum, // options
 *         min, // options
 *         max, // options
 *         dependency, // options
 *         hintForInput: // options
 *         alias: // options
 *       },
 *       sytle, // config for disable css key
 * }
 */
export default {
  height: {
    type: NUMBER,
    defaultValue: 0,
  },
  width: {
    type: NUMBER,
    defaultValue: 0,
  },
  src: {
    type: STRING,
    defaultValue: '',
  },
  name: {
    type: STRING,
    defaultValue: '',
  },
  sandbox: {
    type: ENUM,
    defaultValue: undefined,
    enum: [
      undefined,
      'allow-forms',
      'allow-pointer-lock',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation',
    ],
  },
  style: {
    Background: false,
    Border: false,
    'Classification and Positioning': false,
    Font: false,
    Padding: false,
    Text: false,
  },
};
