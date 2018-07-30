import {
  STRING,
  // NUMBER,
} from '../propertyTypes';
/**
 * html h2
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
 *         alias: // options
 *       },
 *       sytle, // config for disable css key
 * }
 */
export default {
  'data-children-primitiveString': {
    alias: 'value',
    defaultValue: 'Please input something',
    hintForInput: 'Please input something',
    type: STRING,
  },
  style: {},
};

