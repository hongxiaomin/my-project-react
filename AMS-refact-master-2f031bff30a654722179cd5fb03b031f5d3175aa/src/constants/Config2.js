// --------------------- Form ---------------------
export const formReducerName = 'Form';
export const formSubmitName = 'submit';
export const formAutoSubmitName = 'autoSubmit';
export const formChildrenName = 'children';
export const formPropsName = 'props';
export const formDataName = 'data';
export const formDataSourceName = 'dataSource';
export const formOriDataSourceName = 'oriDataSource';
export const formMemberType = [
  'Connect(Input)',
  'Connect(DatePicker)',
  'Connect(Select)',
  'Connect(ColorPicker)',
];
// --------------------- DatePiacker ---------------------
export const datePiackerName = 'datepicker';
// --------------------- Select ---------------------
export const selectName = 'select';
export const defaultOption = { key: '-1', text: '請選擇...' };
// --------------------- GroupSelect ---------------------
export const groupSelectMemberType = [
  'Connect(Select)',
];
// --------------------- ColorPicker ---------------------
export const colorPickerName = 'colorpicker';
export const displayColorPickerName = 'displayColorPicker';
export const colorName = 'color';
export const hiddenColorPicker = 'none';
export const showColorPicker = 'block';
// --------------------- UI ---------------------
export const UIReducerName = 'UI';
export const UIName = 'name';
export const UIPropsName = 'props';
export const UISelectOptionName = 'options';
export const UIColorpickerColor = 'color';
export const UIColorpickerdisplay = 'displayColorPicker';
export const UIConnectName = 'connect';




// --------------------- Constants ---------------------
export const UNDEFINED = undefined;
export const TRUE = true;
export const FALSE = false;
export const NULL = null;
// --------------------- Event Name ---------------------
export const resize = 'resize';
// --------------------- HTTP Verbs ---------------------
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
// --------------------- Reducer Name ---------------------
export const storeReducer = 'store';
// --------------------- Properties Name ---------------------
export const propsName = 'props';
export const childrenName = 'children';
export const dataName = 'data';
export const dataSourceName = 'dataSource';
export const uiControlName = 'uiControl';
export const eventName = 'event';
// --------------------- IdGenerator ---------------------
export const defaultComponentName = '';
export const defaultHtmlFrom = NULL;
// --------------------- Input ---------------------
export const defaultInputName = 'input';
export const defaultInputValue = '';
export const defaultInputClassName = 'form-control';
export const defaultInputPlaceholder = '';
export const defaultInputStyle = {};
export const defaultInputDisabled = FALSE;
export const defaultInputOnClick = () => {};
export const defaultInputOnFocus = () => {};
export const defaultInputOnKeyPress = () => {};
// --------------------- Router ---------------------
export const routerIndex = 'index';
export const routerName = 'name';
export const routerRoute = 'route';
export const routerComponent = 'component';
export const routerSubs = 'subs';
// --------------------- Navigator ---------------------
export const defaultListName = '';
export const navigatorListItemName = 'NavigatorItem';
export const navigatorWidthName = 'navigatorWidth';
export const dockedName = 'docked';
export const openName = 'open';
export const windowWidthEdge = 768;
export const defaultNavigatorWidth = 240;
export const minimumNavigatorWidth = 0;
export const defaultNavigatorOpen = TRUE;
export const defaultNavigatorDocked = FALSE;
export const defaultNavigatorChildren = NULL;
export const defaultBodyClassName = 'content-body';
export const defaultColClassName = 'content-col';
export const defaultRowClassName = 'content-row';
export const defaultDrawerClassName = 'drawer';
export const defaultListClassName = 'navigator';
export const defaultListTitleName = 'list-title-level';
export const defailtListTitleSelectedName = 'list-title-selected';
export const defaultNavigatorStyle = {};
// --------------------- LineChart ---------------------
export const defaultLineChartName = '';
export const defaultLineChartAction = NULL;
export const defaultLineChartWidth = 400;
export const defaultLineChartHeight = 200;
export const defaultLineChartContainerWidth = '100%';
export const defaultLineChartContainerHeight = '100%';
export const defaultLineChartAspect = 2;
export const defaultLineChartData = [];
export const defaultRefLines = [];
export const defaultLineChartMargin = { top: 40, right: 40, bottom: 40, left: 40 };
export const defaultLineChartChildren = NULL;
export const defaultLineChartDataSourceTemplate = response => response;
export const defaultLineChartOnSuccess = () => {};
export const defaultLineChartOnError = () => {};
export const linechartGridKey = 'grid';
export const linechartLegendKey = 'legend';
export const linechartTooltipKey = 'tooltip';
export const linechartDataKey = 'dataKey';
export const referenceLineKey = 'referenceLine';
export const referenceLineLabel = 'label';
export const referenceLineStroke = 'stroke';
export const linechartPreload = 'preload';
// --------------------- Gauge ---------------------
export const defaultGaugeSize = '100%';
export const defaultGaugePercent = 0;
export const defaultGaugeOnSuccess = () => {};
export const defaultGaugeOnError = () => {};
export const defaultGaugeDataSourceTemplate = response => response;
export const defaultGaugeWrapperClassName = 'gaugeWrapper';
export const defaultGaugeOutterClassName = 'gauge-outter';
export const defaultGaugeInnerClassName = 'gauge-inner';
export const defaultGaugeCoverClassName = 'gauge-cover';
export const defaultGaugeDataClassName = 'gauge-data';
export const gaugePreload = 'preload';
export const gaugeWebsocket = 'websocket';
// --------------------- BarChart ---------------------
export const defaultBarChartName = '';
export const defaultBarChartWidth = 400;
export const defaultBarChartHeight = 200;
export const defaultBarChartContainerWidth = '100%';
export const defaultBarChartContainerHeight = '100%';
export const defaultBarChartAspect = 2;
export const defaultBarChartData = [];
export const defaultBarChartMargin = { top: 40, right: 40, bottom: 40, left: 40 };
export const defaultBarChartChildren = NULL;
export const defaultBarChartDataSourceTemplate = response => response;
export const defaultBarChartOnSuccess = () => {};
export const defaultBarChartOnError = () => {};
export const barChartDataKey = 'dataKey';
export const barChartGridKey = 'grid';
export const barChartLegendKey = 'legend';
export const barChartTooltipKey = 'tooltip';
export const barChartPreload = 'preload';
