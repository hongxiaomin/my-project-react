import { PRIMITIVE_STRING } from '../constants/config';
import { getStencilTemplate } from '../constants/models';
import {
  getRightScale,
  getColProps,
} from '../components/grid-layout';
import addUnitStencil from './addUnitStencil';
/**
 * add one stencil template in left menu list
 * @param  {Object} dispatch    store.dispatch
 * @param  {Object} stencilName anything by coder defined data
 * @param  {Object} rootId      parent id
 * @return {[type]}             [description]
 */

function addBasicRechartStencil(dispatch, baseContainerId) {
  addUnitStencil(dispatch, 're-XAxis', baseContainerId);
  addUnitStencil(dispatch, 're-YAxis', baseContainerId);
  addUnitStencil(dispatch, 're-CartesianGrid', baseContainerId);
  addUnitStencil(dispatch, 're-Tooltip', baseContainerId);
  addUnitStencil(dispatch, 're-Legend', baseContainerId);
}

function addUnitRechartStencil(dispatch, baseContainerId, unitName) {
  addUnitStencil(
    dispatch, unitName, baseContainerId,
    { dataKey: 'amt', fill: '#8884d8', stroke: '#8884d8' },
  );
  addUnitStencil(
    dispatch, unitName, baseContainerId,
    { dataKey: 'pv', fill: '#82ca9d', stroke: '#82ca9d' },
  );
  addUnitStencil(
    dispatch, unitName, baseContainerId,
    { dataKey: 'uv', fill: '#ffc658', stroke: '#ffc658' },
  );
}

export default (dispatch, stencilName, rootId) => {
  let stencilElement;
  let baseContainerId;

  let tableHeader;
  let tableRowHeader;
  let tableBody;
  let tableRowBody1;
  let tableRowBody2;
  let tableRowBody3;

  // some component need parent to wrap them
  if (stencilName === 'Radio Button') {
    // create parent first, so do nothing here
  } else {
    stencilElement = addUnitStencil(dispatch, stencilName, rootId);
    if (stencilElement === undefined) {
      // not match anything
      return;
    }
    baseContainerId = stencilElement.get('id');
  }
  /*
  for special component, they need children with Element or something
  for special component, they need parent with Element or something
  for special component, give default composed UI
   */
  let counting = 0;
  switch (stencilName) {
    /*
    Material UI
     */
    case 'Avatar': {
      addUnitStencil(dispatch, PRIMITIVE_STRING, baseContainerId);
      break;
    }
    case 'Floating Action Button':
    case 'Icon Button':
      addUnitStencil(dispatch, 'ButtonIcon', baseContainerId);
      break;
    case 'Card':
      addUnitStencil(dispatch, 'CardHeader', baseContainerId);
      addUnitStencil(dispatch, 'CardTitle', baseContainerId);
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(dispatch, 'CardText', baseContainerId).get('id'),
        { value: 'I am a card text' }
      );
      addUnitStencil(
        dispatch,
        'Flat Button',
        addUnitStencil(dispatch, 'CardActions', baseContainerId).get('id')
      );
      break;
    case 'Chip':
      addUnitStencil(dispatch, PRIMITIVE_STRING, baseContainerId, { value: 'I am a Chip' });
      break;
    case 'Date Picker':
      break;
    case 'Dialog':
      break;
    case 'Drawer':
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      break;
    case 'Grid List':
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(dispatch, 'Subheader', baseContainerId).get('id'),
        {
          value: 'Grid List Subheader',
        }
      );
      addUnitStencil(dispatch, 'GridTile', baseContainerId);
      addUnitStencil(dispatch, 'GridTile', baseContainerId);
      addUnitStencil(dispatch, 'GridTile', baseContainerId);
      addUnitStencil(dispatch, 'GridTile', baseContainerId);
      break;
    case 'List':
      addUnitStencil(
        dispatch, 'ListItem', baseContainerId,
        { primaryText: `List Item ${++counting}`, nestedItems: [] },
      );
      addUnitStencil(
        dispatch, 'ListItem', baseContainerId,
        { primaryText: `List Item ${++counting}`, nestedItems: [] },
      );
      // reset
      counting = 0;
      break;
    case 'Menu':
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      break;
    case 'Icon Menu':
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      addUnitStencil(dispatch, 'MenuItem', baseContainerId);
      break;
    case 'Drop Down Menu':
      addUnitStencil(dispatch, 'MenuItem', baseContainerId, { value: ++counting });
      addUnitStencil(dispatch, 'MenuItem', baseContainerId, { value: ++counting });
      addUnitStencil(dispatch, 'MenuItem', baseContainerId, { value: ++counting });
      // reset
      counting = 0;
      break;
    case 'Popover':
      break;
    case 'Select Field':
      addUnitStencil(
        dispatch,
        'MenuItem',
        baseContainerId,
        {
          value: ++counting,
          primaryText: `I am a menu item${counting}`,
        }
      );
      addUnitStencil(
        dispatch,
        'MenuItem',
        baseContainerId,
        {
          value: ++counting,
          primaryText: `I am a menu item${counting}`,
        }
      );
      // reset
      counting = 0;
      break;
    case 'Radio Button':
      stencilElement = addUnitStencil(
        dispatch,
        'RadioButtonGroup',
        undefined,
        {
          defaultSelected: `RadioButton${++counting}`,
        }
      );
      baseContainerId = stencilElement.get('id');

      addUnitStencil(
        dispatch,
        'Radio Button',
        baseContainerId,
        {
          label: `RadioButton${counting}`,
          value: `RadioButton${counting}`,
        }
      );
      ++counting;
      addUnitStencil(
        dispatch,
        'Radio Button',
        baseContainerId,
        {
          label: `RadioButton${counting}`,
          value: `RadioButton${counting}`,
        }
      );
      // reset
      counting = 0;
      break;
    case 'Toggle':
      break;
    case 'Snackbar':
      break;
    case 'Stepper':
      break;
    case 'Subheader':
      break;
    case 'Table':
      // dumy data, fake, for Jerry using. These will be temp
      tableHeader = addUnitStencil(
        dispatch,
        'TableHeader',
        baseContainerId
      );
      tableRowHeader = addUnitStencil(
        dispatch,
        'TableRow',
        tableHeader.get('id')
      );

      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableHeaderColumn',
          tableRowHeader.get('id')
        ).get('id'),
        { value: 'ID' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableHeaderColumn',
          tableRowHeader.get('id')
        ).get('id'),
        { value: 'Name' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableHeaderColumn',
          tableRowHeader.get('id')
        ).get('id'),
        { value: 'Status' }
      );

      tableBody = addUnitStencil(
        dispatch,
        'TableBody',
        baseContainerId
      );
      tableRowBody1 = addUnitStencil(
        dispatch,
        'TableRow',
        tableBody.get('id')
      );
      tableRowBody2 = addUnitStencil(
        dispatch,
        'TableRow',
        tableBody.get('id')
      );
      tableRowBody3 = addUnitStencil(
        dispatch,
        'TableRow',
        tableBody.get('id')
      );

      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody1.get('id')
        ).get('id'),
        { value: '61a137e6-7e15' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody1.get('id')
        ).get('id'),
        { value: 'Yevette Guerra' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody1.get('id')
        ).get('id'),
        { value: '2016-01-24' }
      );

      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody2.get('id')
        ).get('id'),
        { value: '65e6b27e-f4a2' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody2.get('id')
        ).get('id'),
        { value: 'Belen Szymkowski' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody2.get('id')
        ).get('id'),
        { value: '2012-03-19' }
      );

      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody3.get('id')
        ).get('id'),
        { value: '6ba1b8b8-f45b' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody3.get('id')
        ).get('id'),
        { value: 'Al Ezernack' }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(
          dispatch,
          'TableRowColumn',
          tableRowBody3.get('id')
        ).get('id'),
        { value: '2012-03-15' }
      );


      break;
    case 'Tabs': {
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(dispatch, 'Tab', baseContainerId).get('id'),
        { value: `content ${++counting}` }
      );
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        addUnitStencil(dispatch, 'Tab', baseContainerId).get('id'),
        { value: `content ${++counting}` }
      );
      // reset
      counting = 0;
      break;
    }
    case 'Time Picker':
      break;
    case 'Toolbar':
      break;
    case 'Heading 1':
    case 'Heading 2':
    case 'Heading 3':
    case 'Heading 4':
    case 'Heading 5':
    case 'Heading 6':
    case 'Paragraph':
    case 'Text':
      addUnitStencil(
        dispatch,
        PRIMITIVE_STRING,
        baseContainerId,
        { value: stencilElement.getIn(['props', 'data-children-primitiveString']) }
      );
      break;
    /*
    react-flexbox-grid
     */
    case 'Grid Layout': {
      /*
      get Gridlayout props
      grap out each col value and caculate right value
      add into back Gridlayout
       */
      const gridLayoutProps = getStencilTemplate('Grid Layout');
      const gridLayoutCols = gridLayoutProps.getIn(['props', 'col']);
      const gridLayoutScales = getRightScale(
        gridLayoutProps.getIn(['props', 'scale']).toJS(),
        gridLayoutCols,
      );
      for (let i = 0, j = gridLayoutCols; i < j; i += 1) {
        addUnitStencil(dispatch,
          'GridLayoutCol',
          baseContainerId,
          {
            ...getColProps({
              index: i,
              scale: gridLayoutScales[i],
              colAlign: gridLayoutProps.getIn(['props', 'colAlign']).toJS(),
              colDirection: gridLayoutProps.getIn(['props', 'colDirection']).toJS(),
              contentHeight: gridLayoutProps.getIn(['props', 'contentHeight']).toJS(),
              contentHeightUnit: gridLayoutProps.getIn(['props', 'contentHeightUnit']).toJS(),
              contentPadding: gridLayoutProps.getIn(['props', 'contentPadding']).toJS(),
              contentPosition: gridLayoutProps.getIn(['props', 'contentPosition']).toJS(),
              isEditMode: true,
            }),
          }
        );
      }
      break;
    }
    /*
    Recharts
     */
    case 're-AreaChart':
      addBasicRechartStencil(dispatch, baseContainerId);
      addUnitRechartStencil(dispatch, baseContainerId, 're-Area');
      break;
    case 're-BarChart':
      addBasicRechartStencil(dispatch, baseContainerId);
      addUnitRechartStencil(dispatch, baseContainerId, 're-Bar');
      break;
    case 're-LineChart':
      addBasicRechartStencil(dispatch, baseContainerId);
      addUnitRechartStencil(dispatch, baseContainerId, 're-Line');
      break;
    case 're-ComposedChart':
      addBasicRechartStencil(dispatch, baseContainerId);
      addUnitStencil(dispatch, 're-Area', baseContainerId);
      addUnitStencil(dispatch, 're-Bar', baseContainerId, { barSize: 40 });
      addUnitStencil(dispatch, 're-Line', baseContainerId);
      break;
    case 're-PieChart':
      addUnitStencil(dispatch, 're-Pie', baseContainerId);
      addUnitStencil(dispatch, 're-Tooltip', baseContainerId);
      addUnitStencil(dispatch, 're-Legend', baseContainerId);
      break;
    case 're-RadarChart':
      addUnitStencil(dispatch, 're-Radar', baseContainerId);
      addUnitStencil(dispatch, 're-PolarGrid', baseContainerId);
      addUnitStencil(dispatch, 're-PolarAngleAxis', baseContainerId);
      addUnitStencil(dispatch, 're-PolarRadiusAxis', baseContainerId);
      addUnitStencil(dispatch, 're-Legend', baseContainerId);
      addUnitStencil(dispatch, 're-Tooltip', baseContainerId);
      break;
    case 're-RadialBarChart':
      addUnitStencil(dispatch, 're-RadialBar', baseContainerId);
      addUnitStencil(
        dispatch,
        're-Legend',
        baseContainerId,
        {
          iconSize: 10,
          width: 120,
          height: 140,
          layout: 'vertical',
          verticalAlign: 'middle',
          wrapperStyle: {
            top: 0,
            left: 350,
            lineHeight: '24px',
          },
        },
      );
      addUnitStencil(dispatch, 're-Tooltip', baseContainerId);
      break;
    case 're-ScatterChart':
      addUnitStencil(
        dispatch,
        're-XAxis',
        baseContainerId,
        { dataKey: 'x', name: 'stature', unit: 'cm', label: 'Stature' }
      );
      addUnitStencil(
        dispatch,
        're-YAxis',
        baseContainerId,
        { dataKey: 'y', name: 'weight', unit: 'kg', label: 'Weight' }
      );
      addUnitStencil(dispatch, 're-CartesianGrid', baseContainerId, {});
      addUnitStencil(dispatch, 're-Scatter', baseContainerId, { name: 'A school' });
      addUnitStencil(dispatch, 're-Legend', baseContainerId);
      addUnitStencil(
        dispatch,
        're-Tooltip',
        baseContainerId,
        { cursor: { strokeDasharray: '3 3' } },
      );
      break;
    default:
      break;
  }
};
