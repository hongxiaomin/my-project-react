import { COLOR } from '../../constants/config';
// import { DELTABLUE } from 'react-native-material-color';

export default {
  inkBar: {
    // backgroundColor: DELTABLUE[500],
    // for stencil-editor-drawer, using zIndex to overlay the stencil tag, so have declare self out
    zIndex: 1,
  },
  tab: {
    backgroundColor: COLOR.GREY[200],
    color: COLOR.GREY[600],
    fontWeight: 'bold',
    // height: 32, // no use for this material-ui version, buttonStyle could not set together
    textTransform: 'capitalize',
    borderRadius: 0,
  },
  disabledTab: {
    cursor: 'not-allowed',
    backgroundColor: COLOR.GREY[200],
    color: COLOR.GREY[100],
    fontWeight: 'bold',
    textTransform: 'capitalize',
    borderRadius: 0,
  },
};
