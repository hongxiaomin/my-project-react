import {
  COLOR,
  BORDER_STYLE,
  // BORDER_RADIUS,
  BORDER_WIDTH,
} from '../../constants/config';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: -10,
  },
  selectField: {
    width: 185,
    marginBottom: 0,
    borderWidth: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
    // borderRadius: BORDER_RADIUS,
  },
  label: {
    paddingLeft: 15,
  },
  underline: {
    display: 'none',
  },
  dropdownIcon: {
    fill: COLOR.GREY[600],
    height: 30,
    width: 30,
    top: 10,
    padding: 0,
    paddingRight: 36,
  },
  toolbar: {
    backgroundColor: 'white',
    marginTop: 4,
  },
  toolbarGroup: {
    marginLeft: 0,
  },
  icon: {
    fill: COLOR.GREY[600],
  },
  iconButton: {
    width: 46.75,
    height: 46.75,
    padding: 0,
    borderWidth: BORDER_WIDTH,
    borderColor: COLOR.GREY[300],
    borderStyle: BORDER_STYLE,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    // borderRadius: BORDER_RADIUS,
  },
  lastIconButton: {
    borderRightWidth: BORDER_WIDTH,
  },
};
