import { fromJS } from 'immutable';

const cssStyles = {
  inlineBlock: {
    display: 'inline-block', // for column place way
    position: 'relative', // reset (for getEditPropHelper.js)
  },
  block: {
    display: 'block', // for row place way
    position: 'relative', // reset (for getEditPropHelper.js)
  },
  defaultState: {
    borderWidth: '1px',
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  doubleSelected: {
    borderWidth: '1px',
    borderColor: 'black',
    borderStyle: 'solid',
  },
};

export default (namespace, name, isDoubleSelected) => {
  let style;

  switch (namespace) {
    case 'primitiveString':
      break;
    case 'native':
      switch (name) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
          style = { style: cssStyles.block };
          break;
        default:
          style = { style: cssStyles.inlineBlock };
          break;
      }
      break;
    case 'icons':
    case 'DRC':
    case 'RTChart':
      style = { style: cssStyles.inlineBlock };
      break;
    case 'material-ui':
      switch (name) {
        case 'AppBar':
        case 'Tabs':
        case 'Card':
        case 'Chip':
        case 'DatePicker':
        case 'Divider':
        case 'GridList':
        case 'ListItem':
        case 'Menu':
        case 'MenuItem':
        case 'IconMenu':
        case 'Paper':
        case 'LinearProgress':
        case 'SelectField':
        case 'Slider':
        case 'Checkbox':
        case 'RadioButtonGroup':
        case 'Toggle':
        case 'TimePicker':
          style = { style: cssStyles.block };
          break;
        default:
          style = { style: cssStyles.inlineBlock };
          break;
      }
      break;
    case 'GridLayout':
      style = { style: cssStyles.block };
      break;
    default:
      style = { style: cssStyles.inlineBlock };
      break;
  }

  if (isDoubleSelected) {
    style = fromJS(style).mergeDeep(fromJS({ style: cssStyles.doubleSelected })).toJSON();
  } else {
    style = fromJS(style).mergeDeep(fromJS({ style: cssStyles.defaultState })).toJSON();
  }

  return style;
};
