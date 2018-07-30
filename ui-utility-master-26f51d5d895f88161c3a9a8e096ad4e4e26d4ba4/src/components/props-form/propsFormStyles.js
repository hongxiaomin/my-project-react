import { COLOR } from '../../constants/config';
import { DELTABLUE } from 'react-native-material-color';

export default {
  form: {
    padding: 16,
    paddingBottom: 0,
    overflow: 'auto',
    height: 'calc(100vh - 210px)',
  },
  gridLayoutSubHeader: {
    fontSize: 12, // same with TextField size (Material UI - default)
    paddingLeft: 0,
    lineHeight: '12px', // height with font size to overwrite default 48px
    paddingTop: 16,
  },
  gridLayoutInkBar: {
    backgroundColor: DELTABLUE[500],
  },
  gridLayoutTab: {
    backgroundColor: COLOR.GREY[200],
    color: COLOR.GREY[600],
    // height: 32, // no use for this material-ui version, buttonStyle could not set together
  },
  gridLayoutInputEven: {
    backgroundColor: '#fafafa',
  },
};
