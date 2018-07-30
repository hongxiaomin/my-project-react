import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { DELTABLUE, DELTAGREEN } from 'react-native-material-color';

/**
 * @see http://www.material-ui.com/#/customization/themes
 * @see https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
 * @type {Object}
 */
export default getMuiTheme({
  palette: {
    primary1Color: DELTABLUE[500],
    primary2Color: DELTABLUE[700],
    accent1Color: DELTAGREEN[300],
    pickerHeaderColor: DELTABLUE[500],
  },
});
