import {
  COLOR,
  BORDER_STYLE,
  // BORDER_RADIUS,
  BORDER_WIDTH,
} from '../../constants/config';

export default {
  list: {
    width: 185,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 8,
    borderWidth: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
    // borderRadius: BORDER_RADIUS,
  },
  nestedList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  innerListItem: {
    borderWidth: 0,
    borderTop: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
  },
};
