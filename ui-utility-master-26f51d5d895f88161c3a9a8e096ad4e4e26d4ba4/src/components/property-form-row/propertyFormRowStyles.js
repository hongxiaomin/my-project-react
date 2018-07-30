import { COLOR } from '../../constants/config';

export default {
  inlineBlock: {
    display: 'inline-block',
  },
  container: {
    position: 'relative',
  },
  textField: {
    width: 230,
    color: 'black',
    fontSize: 20,
    display: 'inline-block',
  },
  checkbox: {
    width: 250,
    color: 'black',
    fontSize: 20,
    display: 'inline-block',
    marginTop: 24,
    marginBottom: 24,
  },
  checkboxLabel: {
    fontSize: 20,
    color: 'black',
  },
  floatButton: {
    marginTop: 5,
    marginBottom: 10,
    left: 200,
    position: 'relative',
  },
  parentItemFloatButton: {
    marginTop: 5,
    marginBottom: 10,
    left: 160,
    position: 'relative',
  },
  childItemFloatButton: {
    marginTop: 5,
    marginBottom: 10,
    left: 120,
    position: 'relative',
  },
  listItemFloatButton: {
    marginTop: 5,
    marginBottom: 10,
    left: 100,
    position: 'relative',
  },
  iconStyle: {
    fill: COLOR.GREY[600],
    width: 26,
    height: 26,
  },
  floatingLabel: {
    color: COLOR.GREY[500],
    fontSize: 22,
  },
  dataTransformerLabel: {
    color: COLOR.GREY[500],
    fontSize: 18,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  menu: {
    // width: 190, // let it auto : fill the screen
  },
  menuItem: {
    color: 'black',
    fontSize: 20,
  },
  icon: {
    top: -5,
  },
  iconCheckbox: {
    top: 5,
  },
  dataField: {
    width: 194,
    color: 'black',
    fontSize: 20,
  },
  deleteIcon: {
    top: -5,
    marginRight: -12,
  },
  underline: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  palette: {
    backgroundColor: 'rgb(255, 255, 255)',
    display: 'inline-block',
    cursor: 'pointer',
    position: 'relative',
    right: 24,
  },
  paletteColor: {
    width: 16,
    height: 16,
    border: '1px solid #ccc',
  },
  paletteLable: {
    color: 'rgb(134, 134, 134)',
    fontSize: 16.5,
  },
  colorPopover: {
    position: 'absolute',
    zIndex: '2',
    right: 35,
    top: 64,
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  iconPreview: {
    display: 'inline-block',
    position: 'relative',
    right: '24px',
    backgroundColor: '#FFF',
  },
  subheader: {
    fontSize: 20,
    color: '#2196f3',
    lineHeight: 0,
    paddingTop: 25,
    paddingBottom: 5,
  },
};
