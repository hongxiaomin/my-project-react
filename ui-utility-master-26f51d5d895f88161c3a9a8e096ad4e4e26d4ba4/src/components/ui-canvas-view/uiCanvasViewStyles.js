import {
  COLOR,
  BORDER_STYLE,
  // BORDER_RADIUS,
  BORDER_WIDTH,
} from '../../constants/config';

export default {
  canvas: {
    marginLeft: 0,
    borderWidth: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
    /*
    remove this, let it look like Material style in preview
    try AppBar this component
     */
    // borderRadius: BORDER_RADIUS,
    flex: 1,
    overflow: 'auto',
    display: 'flex',
  },
  fullScreen: {
    // comment next 2 lines to solve: preview mode mouse enters to appbar buttons will cause shaking
    // width: window.innerWidth,
    // height: '100%',
    borderWidth: 0,
  },
};
