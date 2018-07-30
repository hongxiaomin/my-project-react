import {
  // STRING,
  ARRAY,
  BOOLEAN,
  // ENUM,
  NUMBER,
  // OBJECT,
  PROPTYPES,
  DATA,
} from '../propertyTypes';
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
 *         subType, // options 'array' | 'json'
 *         defaultValue, // undefined(enum) | 0(number) | ''(string)
 *         enum, // options
 *         min, // options
 *         max, // options
 *         dependency, // options
 *       }
 * }
 */
export default {
  columnDefs: ARRAY,
  rowData: ARRAY,
  rowHeight: NUMBER,
  headerHeight: NUMBER,
  theme: PROPTYPES,
  enableSorting: BOOLEAN,
  dataTransformer: DATA,
  // columnDefs: {
  //   type: OBJECT,
  //   subType: ARRAY,
  //   defaultValue: [],
  // },
  // rowData: {
  //   type: OBJECT,
  //   subType: ARRAY,
  //   defaultValue: [],
  // },
  // rowHeight: {
  //   type: NUMBER,
  //   defaultValue: 24,
  //   min: 0,
  //   max: undefined,
  // },
  // headerHeight: {
  //   type: NUMBER,
  //   defaultValue: 26,
  //   min: 0,
  //   max: undefined,
  // },
  // theme: {
  //   type: ENUM,
  //   defaultValue: 'bootstrap',
  //   enum: [
  //     'material',
  //     'bootstrap',
  //     'fresh',
  //   ],
  // },
  // enableSorting: {
  //   type: BOOLEAN,
  //   defaultValue: true,
  // },
};
