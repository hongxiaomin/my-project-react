import {
  COLOR,
  BORDER_STYLE,
  BORDER_WIDTH,
} from '../../constants/config';

export default {
  container: {
    borderWidth: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
    top: 74,
    paddingBottom: 74,
    // add 74 back to avoid hiding the check & close buttons on the bottom
    overflow: 'initial', // let scroll inner by self container
  },
  drawer: {
    width: 530, // default is 256 (Material-UI component)
  },
  drawerStyle: {
    zIndex: 9999, // have higher than stencil tag
  },
};
