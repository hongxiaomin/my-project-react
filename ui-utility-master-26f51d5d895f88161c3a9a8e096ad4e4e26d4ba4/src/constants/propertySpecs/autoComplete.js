import {
  BOOLEAN,
  ENUM,
  NUMBER,
  OBJECT,
  STRING,
} from '../propertyTypes';
/**
 * define props type for pop INPUT in drawer (for user)
 *
 * undefined value -> alis name is 'auto' in drawer (for user)
 * 0 value -> alis name is 'auto' in drawer (for user)
 * '' value -> alis name is 'auto' in drawer (for user)
 *
 * @see http://www.material-ui.com/#/components/auto-complete
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
  anchorOrigin: {
    type: ENUM,
    enum: [
      JSON.stringify({ vertical: 'top', horizontal: 'left' }),
      JSON.stringify({ vertical: 'top', horizontal: 'middle' }),
      JSON.stringify({ vertical: 'top', horizontal: 'right' }),
      JSON.stringify({ vertical: 'center', horizontal: 'left' }),
      JSON.stringify({ vertical: 'center', horizontal: 'middle' }),
      JSON.stringify({ vertical: 'center', horizontal: 'right' }),
      JSON.stringify({ vertical: 'bottom', horizontal: 'left' }),
      JSON.stringify({ vertical: 'bottom', horizontal: 'middle' }),
      JSON.stringify({ vertical: 'bottom', horizontal: 'right' }),
    ],
    defaultValue: JSON.stringify({ vertical: 'bottom', horizontal: 'left' }),
  },
  animated: {
    type: BOOLEAN,
    defaultValue: true,
  },
  // animation: {
  //   type: OBJECT,
  //   subType: "function",
  //   defaultValue: undefined,
  // },
  dataSource: { // * required property
    alias: 'listForAutoComplete (use ["string", "string", ...])',
    type: OBJECT,
    subType: 'array',
    defaultValue: [],
    hintForInput: 'Array of strings or nodes used to populate the list',
  },
  // dataSourceConfig: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: '{ text: "text", value: "value"}',
  // },
  disableFocusRipple: {
    type: BOOLEAN,
    defaultValue: true,
  },
  // errorStyle: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: '{}',
  //   hintForInput: 'Override style prop for error',
  // },
  errorText: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'The error content to display',
  },
  // filter: {
  //   type: OBJECT,
  //   subType: 'function',
  //   defaultValue: '(searchText, key) => searchText !== "" && key.indexOf(searchText) !== -1',
  // },
  floatingLabelText: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'The content to use for adding floating label element',
  },
  fullWidth: {
    type: BOOLEAN,
    defaultValue: false,
  },
  hintText: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'The hint content to display',
  },
  // listStyle: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: '{}',
  //   hintForInput: 'Override style for list',
  // },
  // maxSearchResults: {
  //   type: NUMBER,
  //   defaultValue: 0,
  //   hintForInput: `The max number of search results to be shown. By default it
  //     shows all the items which matches filter`.replace(/\r|\n/g, '').replace(/\s{2,}/, ' '),
  // },
  menuCloseDelay: {
    type: NUMBER,
    defaultValue: 300,
    hintForInput: 'Delay for closing time of the menu',
  },
  // menuProps: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: {},
  //   hintForInput: 'Props to be passed to menu',
  // },
  // menuStyle: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: '{}',
  //   hintForInput: 'Override style for menu',
  // },
  // onClose: {
  //   type: OBJECT,
  //   subType: 'function',
  //   defaultValue: undefined,
  //   hintForInput: 'Callback function fired when the menu is closed',
  // },
  // onNewRequest: {
  //   type: OBJECT,
  //   subType: 'function',
  //   defaultValue: '() => {}',
  //   hintForInput: `Callback function that is fired when a list item is selected,
  //       or enter is pressed in the TextField`.replace(/\r|\n/g, '').replace(/\s{2,}/, ' '),
  // },
  // onUpdateInput: {
  //   type: OBJECT,
  //   subType: 'function',
  //   defaultValue: '() => {}',
  //   hintForInput: 'Callback function that is fired when the user updates the TextField',
  // },
  open: {
    type: BOOLEAN,
    defaultValue: false,
  },
  openOnFocus: {
    type: BOOLEAN,
    defaultValue: false,
  },
  // popoverProps: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: '',
  //   hintForInput: 'Props to be passed to popover.',
  // },
  searchText: {
    type: STRING,
    defaultValue: '',
    hintForInput: 'Text being input to auto complete',
  },
  targetOrigin: {
    type: ENUM,
    enum: [
      JSON.stringify({ vertical: 'top', horizontal: 'left' }),
      JSON.stringify({ vertical: 'top', horizontal: 'middle' }),
      JSON.stringify({ vertical: 'top', horizontal: 'right' }),
      JSON.stringify({ vertical: 'center', horizontal: 'left' }),
      JSON.stringify({ vertical: 'center', horizontal: 'middle' }),
      JSON.stringify({ vertical: 'center', horizontal: 'right' }),
      JSON.stringify({ vertical: 'bottom', horizontal: 'left' }),
      JSON.stringify({ vertical: 'bottom', horizontal: 'middle' }),
      JSON.stringify({ vertical: 'bottom', horizontal: 'right' }),
    ],
    defaultValue: JSON.stringify({ vertical: 'top', horizontal: 'left' }),
  },
  // textFieldStyle: {
  //   type: OBJECT,
  //   subType: 'json',
  //   defaultValue: '{}',
  //   hintForInput: 'Override the inline-styles of AutoComplete\'s TextField element',
  // },
  style: {
    'Classification and Positioning': false,
    Dimension: false,
    Font: false,
  },
};
