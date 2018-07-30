import { COLOR, BORDER_STYLE, BORDER_RADIUS, BORDER_WIDTH } from '../../constants/config';

export default {
  container: {
    borderWidth: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
    borderRadius: BORDER_RADIUS,
    top: 64,
    paddingBottom: 64,
    // add 64 back to avoid hiding the check & close buttons on the bottom of PropertyFormRow
  },
  width: 308, // default is 256 (Material-UI component)
};
