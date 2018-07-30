import { fromJS } from 'immutable';
import uuid from 'uuid';

export const BORDER_STYLE = 'solid';
export const BORDER_RADIUS = 5;
export const BORDER_WIDTH = 1;
export const COLOR = {
  GREY: {
    100: '#cccccc',
    200: '#ebebeb',
    300: '#dedede',
    500: '#868686',
    600: '#797979',
    800: '#545454',
  },
};

export const PRIMITIVE_STRING = 'Primitive String';
export const PRIMITIVE_STRING_NAMESPACE = 'primitiveString';
export const BUTTON_ICON_NAMESPACE = 'button-icon';

// only these can dispatch to other pages
export const VALID_DISPATCH_PAGE =
  ['FlatButton', 'RaisedButton', 'FloatingActionButton', 'IconButton', 'ListItem'];

// only these can accept drag source be dropped
export const VALID_DROP_TARGET = ['Paper', 'div', 'Col'];

// Rechart
export const ATYPICAL_RECHARTS = ['PieChart', 'ScatterChart'];
export const RECHART_SPECIAL_TYPE = ['Pie', 'Scatter'];
export const RECHART_BASIC_TYPE = {
  AreaChart: 'Area',
  BarChart: 'Bar',
  LineChart: 'Line',
};

// Rechart hint
const BASIC_REQUIREMENT = 'URL, xAxisKey, Key of Series, and Transformer Function ';
export const RECHART_REQUIRED_FIELDS = {
  AreaChart: BASIC_REQUIREMENT,
  BarChart: BASIC_REQUIREMENT,
  ComposedChart: BASIC_REQUIREMENT,
  LineChart: BASIC_REQUIREMENT,
  PieChart: 'URL and Transformer Function ',
  RadarChart: 'URL, Radar Key, Angle Key, and Transformer Function ',
  RadialBarChart: 'URL, dataKey, and Transformer Function ',
  ScatterChart: 'URL, Key of xAxis, Key of yAxis, and Transformer Function ',
};

// Rechart expected data format
const BASIC_FORMAT = `
  [
    { page: 'Page A', uv: 4000, pv: 2400, amt: 5600 },
    { page: 'Page B', uv: 3000, pv: 1398, amt: 7110 },
    { page: 'Page C', uv: 2000, pv: 9800, amt: 3590 },
    { page: 'Page D', uv: 6780, pv: 3908, amt: 2000 }
  ]
  `
;
export const RECHART_EXPECTED_FORMAT = {
  AreaChart: BASIC_FORMAT,
  BarChart: BASIC_FORMAT,
  ComposedChart: BASIC_FORMAT,
  LineChart: BASIC_FORMAT,
  PieChart: `
  [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
  ]
  `,
  PieChartWithColor: `
  [
    { name: 'Group A', value: 400, color: 'red' },
    { name: 'Group B', value: 300, color: 'orange' },
    { name: 'Group C', value: 300, color: 'yellow' },
    { name: 'Group D', value: 200, color: 'green' },
    { name: 'Group E', value: 278, color: 'blue' },
    { name: 'Group F', value: 189, color: 'purple' }
  ]
  `,
  RadarChart: `
  [
    { subject: 'Math', A: 30, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ]
  `,
  RadialBarChart: `
  [
    { name: 'Sales', employees: 2400, women: 1200, men: 1200 },
    { name: 'Business', employees: 4567, women: 2693, men: 1874 },
    { name: 'Education', employees: 1398, women: 624, men: 774 },
    { name: 'Health', employees: 9800, women: 5479, men: 4321 },
    { name: 'Art', employees: 3908, women: 1954, men: 1954 },
    { name: 'Trades', employees: 4800, women: 3620, men: 1180 },
    { name: 'Sport', employees: 5200, women: 1479, men: 3721 },
  ]
  `,
  RadialBarChartWithColor: `
  [
    { name: 'Sales', employees: 2400, women: 1200, men: 1200, fill: '#8884d8' },
    { name: 'Business', employees: 4567, women: 2693, men: 1874, fill: '#83a6ed' },
    { name: 'Education', employees: 1398, women: 624, men: 774, fill: '#8dd1e1' },
    { name: 'Health', employees: 9800, women: 5479, men: 4321, fill: '#82ca9d' },
    { name: 'Art', employees: 3908, women: 1954, men: 1954, fill: '#a4de6c' },
    { name: 'Trades', employees: 4800, women: 3620, men: 1180, fill: '#d0ed57' },
    { name: 'Sport', employees: 5200, women: 1479, men: 3721, fill: '#ffc658 ' },
  ]
  `,
  ScatterChart: `
  [
    { uv: 100, pv: 200, amt: 200 },
    { uv: 120, pv: 100, amt: 260 },
    { uv: 170, pv: 300, amt: 400 },
    { uv: 140, pv: 250, amt: 280 },
    { uv: 150, pv: 400, amt: 500 },
    { uv: 110, pv: 280, amt: 200 }
  ]
  `,
};

export const RECHART_CURVE_TYPE = [
  'basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural',
  'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter',
];

export const RECHART_SCATTER_SHAPE = [
  'circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye',
];

export const RECHART_PIE_LABEL_POSITION = ['above', 'outer', 'none'];

export const RTCHART_LABEL_POSITION = {
  xAxis: ['inner-right', 'inner-center', 'inner-left', 'outer-right', 'outer-center', 'outer-left'],
  yAxis: ['inner-top', 'inner-middle', 'inner-bottom', 'outer-top', 'outer-middle', 'outer-bottom'],
};

export const RTCHART_REQUIRED_FIELDS = 'Topic Name, Field Name and Transformer Function';
export const GAUGE_REQUIRED_FIELDS =
  'Topic Name, Field Name, Transformer Function, Bound and Color Value';
export const RTCHART_OPTIONAL_FIELDS = 'Label, yAxis, and Bound';
export const GAUGE_OPTIONAL_FIELDS = 'Unit and Arc Width';

// drag layer cannot detect following stencil drag state
export const DRAG_LAYER_NONFUNCTIONAL =
  ['DatePicker', 'Checkbox', 'RadioButtonGroup', 'Toggle', 'TimePicker'];

export const PAGE_NAME_RULE = [
  'Name can contain letters, digits, underscores, and dollar signs',
  'Name must begin with a letter',
  'Name can also begin with $ and _',
  'Name are case sensitive (y and Y are different)',
  'Name can not contain whitespace',
  'Name can not be the same with existing page name',
];

/**
 * generate root canvas for DnD area, user could make ui in it
 * @type {Object}
 */
export const ROOT_DIV_ID = uuid.v4();
export const ROOT_DIV = fromJS({
  id: ROOT_DIV_ID,
  namespace: 'native',
  name: 'div',
  props: {
    style: {
      backgroundColor: 'white',
      /*
      remove this, please see src/components/ui-canvas-view/uiCanvasViewStyle.js
       */
      // borderRadius: BORDER_RADIUS,
      flex: 1,
      overflow: 'auto',
      display: 'block',
    },

  },
  parentId: null,
  children: [],
  extension: {
    prop: false,
    action: false,
    dataBinding: false,
    dnd: false,
  },
  alias: 'ROOT_DIV',
});

export const ITEM_TYPE = {
  STENCIL: 'stencil',
};

export const PIWIK_ID = 3;
export const PIWIK_URL = 'http://10.136.225.86:9000/piwik/piwik.php';
