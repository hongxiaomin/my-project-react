import { COLOR } from '../../constants/config';

export default {
  appbar: {
    backgroundColor: COLOR.GREY[200],
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 10,
  },
  primaryText: {
    color: COLOR.GREY[600],
    fontSize: 26,
  },
  icon: {
    fill: COLOR.GREY[600],
  },
  floatingActionButton: {
    height: 40,
    position: 'fixed',
    top: 8,
    right: 8,
    zIndex: 9999, // use this value to overlay AppBar z-index
    opacity: 0.5,
  },
  floatingActionButtonBackgroundColor: '#fff',
  floatingActionButtonIcon: {
    fill: '#555',
  },
  iconStyleRight: {
    marginRight: 12,
    paddingRight: 0,
  },
};
