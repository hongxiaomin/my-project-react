import {
  STRING,
  NUMBER,
} from '../propertyTypes';
/**
 * html img
 */
/**
 * define props type for pop INPUT in drawer (for user)
 * Key order will effect render order
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
 *       },
 *       sytle, // config for disable css key
 * }
 */
export default {
  alt: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'specifies an alternate text for an image',
  },
  src: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'specifies the URL of an image (http(s)://... start)',
  },
  width: {
    type: NUMBER,
    defaultValue: 0,
    min: 0,
    hintForInput: 'specifies only number value, it use px',
  },
  height: {
    type: NUMBER,
    defaultValue: 0,
    min: 0,
    hintForInput: 'specifies only number value, it use px',
  },
  style: {
    'Classification and Positioning': false,
    Font: false,
    Text: false,
  },
};

