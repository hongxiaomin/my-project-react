import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { DELTABLUE, DELTAGREEN } from 'react-native-material-color';

export default getMuiTheme({
  palette: {
    primary1Color: DELTABLUE[500],
    primary2Color: DELTABLUE[700],
    accent1Color: DELTAGREEN[300],
    pickerHeaderColor: DELTABLUE[500],
  },
});
