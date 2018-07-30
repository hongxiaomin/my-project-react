import {
  BOOLEAN,
  ENUM,
  // NUMBER,
  // OBJECT,
  STRING,
} from '../propertyTypes';
/**
 * define props type for pop INPUT in drawer (for user)
 *
 * undefined value -> alis name is 'auto' in drawer (for user)
 * 0 value -> alis name is 'auto' in drawer (for user)
 * '' value -> alis name is 'auto' in drawer (for user)
 *
 * @see http://www.material-ui.com/#/components/app-bar
 * @version 0.18.7
 * @type {Object} {
 *       key: {
 *         alias: // options
 *         defaultValue, // undefined(enum) | 0(number) | ''(string)
 *         enum, // options
 *         dependency: // options(value will effect by this)
 *         hintForInput: // options
 *         max, // options
 *         min, // options
 *         selector, // options(use which component for render)
 *         selectorProps: { // example, by selector (component's props)
 *           units:         // by selecto prop key
 *           autocomplete:  // by selecto prop key
 *           hintForInput:  // by selecto prop key
 *         },
 *         subType, // options 'array' | 'json' | ...
 *         type,
 *       }
 *       sytle, // config for disable css key
 * }
 */
export default {
  // children: {
  //   type: OBJECT,
  //   subType: NODE,
  //   defaultValue: undefined,
  // },
  // className: {
  //   type: STRING,
  //   defaultValue: '',
  // },
  // iconClassNameLeft: {
  //   type: STRING,
  //   defaultValue: '',
  // },
  // iconClassNameRight: {
  //   type: STRING,
  //   defaultValue: '',
  // },
  // iconElementLeft: {
  //   type: OBJECT,
  //   subType: ELEMENT,
  //   defaultValue: undefined,
  // },
  // iconElementRight: {
  //   type: OBJECT,
  //   subType: ELEMENT,
  //   defaultValue: undefined,
  // },
  // iconStyleLeft: {
  //   type: OBJECT,
  //   defaultValue: undefined,
  // },
  // iconStyleRight: {
  //   type: OBJECT,
  //   defaultValue: undefined,
  // },
  // onLeftIconButtonTouchTap: {
  //   type: OBJECT,
  //   subType: FUNCTION,
  //   defaultValue: undefined,
  // },
  // onRightIconButtonTouchTap: {
  //   type: OBJECT,
  //   subType: FUNCTION,
  //   defaultValue: undefined,
  // },
  // onTitleTouchTap: {
  //   type: OBJECT,
  //   subType: FUNCTION,
  //   defaultValue: undefined,
  // },
  title: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'The title to display on the app bar',
  },
  showMenuIconButton: {
    type: BOOLEAN,
    defaultValue: true,
    hintForInput: 'Determines whether or not to display the Menu icon next to the title',
  },
  // titleStyle: {
  //   type: OBJECT,
  //   defaultValue: undefined,
  // },
  zDepth: {
    type: ENUM, // propTypes.zDepth
    defaultValue: 1,
    enum: [
      1,
      2,
      3,
      4,
      5,
    ],
    hintForInput: 'The shadow of the app bar',
  },
  style: {
    Border: false,
    'Classification and Positioning': false,
    Text: false,
  },
};
