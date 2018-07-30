/** writer: Chao.Wang */
import PropTypes from 'prop-types';

/** Properties name */
export const NAME = 'name';
export const DATA = 'data';
export const INNERDATA = 'innerData';
export const COLUMNS = 'columns';
export const INNERCOLUMNS = 'innerColumns';
export const LOADING = 'loading';
export const SELECTABLE = 'selectable';
export const EXPANDABLE = 'expandable';
export const DEFAULTPAGESIZE = 'defaultPageSize';
export const PAGESIZEOPTIONS = 'pageSizeOptions';
export const SUBCOMPONENT = 'SubComponent';
export const SHOWPAGINATIONBOTTOM = 'showPaginationBottom';
export const SHOWPAGINATIONTOP = 'showPaginationTop';
export const SHOWPAGEINFO = 'showPageInfo';
export const SHOWPAGEJUMP = 'showPageJump';
export const SHOWPAGESIZEOPTIONS = 'showPageSizeOptions';
export const GETFORMMATEDDATA = 'getFormmatedData';
export const DEFAULTSORTED = 'defaultSorted';
export const DEFAULTSORTDESC = 'defaultSortDesc';
export const DEFAULTSORTMETHOD = 'defaultSortMethod';
export const FILTERABLE = 'filterable';
export const SHOWFILTER = 'showFilter';
export const DEFAULTFILTERED = 'defaultFiltered';
export const DEFAULTFILTERMETHOD = 'defaultFilterMethod';
export const GETTHEADFILTERTRPROPS = 'getTheadFilterTrProps';
export const INVALIDDATETEXT = 'invalidDateText';
export const INVALIDTIMETEXT = 'invalidTimeText';
export const INVALIDDATETIMETEXT = 'invalidDateTimeText';
export const PREVIOUSTEXT = 'previousText';
export const NEXTTEXT = 'nextText';
export const LOADINGTEXT = 'loadingText';
export const NODATATEXT = 'noDataText';
export const PAGETEXT = 'pageText';
export const OFTEXT = 'ofText';
export const ROWSTEXT = 'rowsText';
export const CLASSNAME = 'className';
export const BODYCLASSNAME = 'bodyClassName';
export const GETTRPROPS = 'getTrProps';
export const GETTBODYPROPS = 'getTbodyProps';
export const TITLE = 'title';
export const TITLEBARCLASSNAME = 'titleBarClassName';
export const TITLEBARSTYLE = 'titleBarStyle';
export const TITLECLASSNAME = 'titleClassName';
export const TITLESTYLE = 'titleStyle';
export const GETTITLEBARTOOLS = 'getTitleBarTools';
export const ONFETCHDATA = 'onFetchData';
export const ONPAGESIZECHANGE = 'onPageSizeChange';
export const ONTOGGLEFILTER = 'onToggleFilter';
export const ONCHANGEDATA = 'onChangeData';
export const ONCHANGECOLUMNS = 'onChangeColumns';
export const ONCLIENTFETCHDATA = 'onClientFetchData';
export const ONCLIENTCHANGEDATA = 'onClientChangeData';
export const ONCLIENTCHANGECOLUMNS = 'onClientChangeColumns';
export const ONCLIENTINITIAL = 'onClientInitial';
export const ONCLIENTDISPOSE = 'onClientDispose';
export const WILLMOUNT = 'willMount';
export const ONINITIAL = 'onInitial';
export const ONRECEIVEPROPS = 'onReceiveProps';
export const ONDIDUPDATE = 'onDidUpdate';
export const ONDISPOSE = 'onDispose';
/** Default props */
export const defaultProps = {
  [DATA]: [],
  [INNERDATA]: [],
  [COLUMNS]: [],
  [INNERCOLUMNS]: [],
  [FILTERABLE]: false,
  [SHOWFILTER]: false,
  [SELECTABLE]: false,
  [EXPANDABLE]: false,
  [DEFAULTPAGESIZE]: 10,
  [PAGESIZEOPTIONS]: [10, 20, 30],
  [SHOWPAGINATIONBOTTOM]: true,
  [SHOWPAGINATIONTOP]: false,
  [SHOWPAGEINFO]: false,
  [SHOWPAGEJUMP]: false,
  [SHOWPAGESIZEOPTIONS]: true,
  [GETFORMMATEDDATA]: response => response,
  [DEFAULTSORTDESC]: false,
  [DEFAULTSORTED]: [],
  [DEFAULTFILTERED]: [],
  [INVALIDDATETEXT]: 'Error Date Format',
  [INVALIDTIMETEXT]: 'Error Time Format',
  [INVALIDDATETIMETEXT]: 'Error DateTime Format',
  [PREVIOUSTEXT]: 'Previous',
  [NEXTTEXT]: 'Next',
  [LOADINGTEXT]: 'Loading...',
  [NODATATEXT]: 'No rows found',
  [PAGETEXT]: 'Page',
  [OFTEXT]: 'of',
  [ROWSTEXT]: 'rows',
  [CLASSNAME]: '',
  [BODYCLASSNAME]: '-striped -highlight',
  [GETTRPROPS]: () => ({}),
  [GETTBODYPROPS]: () => ({}),
  [GETTHEADFILTERTRPROPS]: () => ({}),
  [TITLE]: '',
  [TITLEBARCLASSNAME]: undefined,
  [TITLEBARSTYLE]: { backgroundColor: '#0086DB' },
  [TITLECLASSNAME]: undefined,
  [TITLESTYLE]: undefined,
  [GETTITLEBARTOOLS]: () => [],
  [SUBCOMPONENT]: undefined,
  [ONCLIENTFETCHDATA]: response => response,
  [ONCLIENTCHANGECOLUMNS]: response => response,
  [ONCLIENTCHANGEDATA]: response => response,
  [ONCLIENTINITIAL]: response => response,
  [ONCLIENTDISPOSE]: response => response,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The name of the component.
   */
  [NAME]: PropTypes.string,
  /**
   * @Props
   * Array of objects used to config columns of the table.
   */
  [COLUMNS]: PropTypes.array,
  /**
   * @Props
   * The data of the table.
   */
  [DATA]: PropTypes.any,
  /**
   * @Props
   * If true, the filter function will enable.
   */
  [FILTERABLE]: PropTypes.bool,
  /**
   * @Props
   * If true, the filter row function will enable.
   */
  [SHOWFILTER]: PropTypes.bool,
  /**
   * @Props
   * If true, checkbox columns will be appended at the beginning of table.
   */
  [SELECTABLE]: PropTypes.bool,
  /**
   * @Props
   * If true, columns could be expanded.
   */
  [EXPANDABLE]: PropTypes.bool,
  /**
   * @Props
   * This is the subcomponent to be used inside expanded row.
   */
  [SUBCOMPONENT]: PropTypes.any,
  /**
   * @Props
   * The default number of rows shown in a page.
   */
  [DEFAULTPAGESIZE]: PropTypes.number,
  /**
   * @Props
   * The page size options of the table.
   */
  [PAGESIZEOPTIONS]: PropTypes.array,
  /**
   * @Props
   * If true, the pagination at the bottom of table will show.
   */
  [SHOWPAGINATIONBOTTOM]: PropTypes.bool,
  /**
   * @Props
   * If true, the pagination at the top of table will show.
   */
  [SHOWPAGINATIONTOP]: PropTypes.bool,
  /**
   * @Props
   * If true, the total pages info on the pagination will show.
   */
  [SHOWPAGEINFO]: PropTypes.bool,
  /**
   * @Props
   * If true, the page jumper on the pagination will show.
   */
  [SHOWPAGEJUMP]: PropTypes.bool,
  /**
   * @Props
   * If true, the page size selector on the pagination will show.
   */
  [SHOWPAGESIZEOPTIONS]: PropTypes.bool,
  /**
   * @Props
   * If true, sort the result-set in descending.
   */
  [DEFAULTSORTDESC]: PropTypes.bool,
  /**
   * @Props
   * Array of objects used to sort the data.
   */
  [DEFAULTSORTED]: PropTypes.array,
  /**
   * @Props
   * Array of objects used to filter the data.
   */
  [DEFAULTFILTERED]: PropTypes.array,
  /**
   * @Props
   * The text of invalid date format in cell.
   */
  [INVALIDDATETEXT]: PropTypes.string,
  /**
   * @Props
   * The text of invalid time format in cell.
   */
  [INVALIDTIMETEXT]: PropTypes.string,
  /**
   * @Props
   * The text of invalid datetime format in cell.
   */
  [INVALIDDATETIMETEXT]: PropTypes.string,
  /**
   * @Props
   * The text of previous page button.
   */
  [PREVIOUSTEXT]: PropTypes.string,
  /**
   * @Props
   * The text of next page button.
   */
  [NEXTTEXT]: PropTypes.string,
  /**
   * @Props
   * The text showing while data loading.
   */
  [LOADINGTEXT]: PropTypes.string,
  /**
   * @Props
   * The text showing while no data in table.
   */
  [NODATATEXT]: PropTypes.string,
  /**
   * @Props
   * The text of 'page' on the pagination.
   */
  [PAGETEXT]: PropTypes.string,
  /**
   * @Props
   * The text of 'of' on the pagination.
   */
  [OFTEXT]: PropTypes.string,
  /**
   * @Props
   * The text of 'rows' on the pagination.
   */
  [ROWSTEXT]: PropTypes.string,
  /**
   * @Props
   * The title of the table.
   */
  [TITLE]: PropTypes.string,
  /**
   * @Props
   * Callback function fired when the data of table is going to be changed. It will formmating the data.
   * @param {array} nextData
   * @returns {array} Formatted data for table.
   */
  [GETFORMMATEDDATA]: PropTypes.func,
  /**
   * @Props
   * Callback function fired when the rows of table is generated. It will decorate the rows.
   * @param {*} state react-table state.
   * @param {*} rowInfo RowInfo (undefined if not applicable).
   * @param {*} column Column (undefined if not applicable).
   * @param {*} instance react-table Instance.
   * @param {*} props The props of the component.
   * @returns {object} A object composed of properties(like style, onClick) to decorate rows.
   */
  [GETTRPROPS]: PropTypes.func,
  /**
   * @Props
   * Callback function fired when the body of table is generated. It will decorate the rows.
   * @param {*} state react-table state.
   * @param {*} rowInfo RowInfo (undefined if not applicable).
   * @param {*} column Column (undefined if not applicable).
   * @param {*} instance react-table Instance.
   * @param {*} props The props of the component.
   * @returns {object} A object composed of properties(like style, onClick) to decorate table body.
   */
  [GETTBODYPROPS]: PropTypes.func,
  /**
   * @Props
   * Callback function to get array of nodes used to append after the title bar.
   * @param {*} state table state which includes data, columns, filterable and showFilter.
   * @returns {array} A list of tools used on the TitleBar.
   */
  [GETTITLEBARTOOLS]: PropTypes.func,
  /**
   * @Hidden
   * @Props
   * The inner columns of the table saved in store. They would be connected to the table by connect.
   */
  [INNERCOLUMNS]: PropTypes.array,
  /**
   * @Hidden
   * @Props
   * The inner data of the table saved in store. They would be connected to the table by connect.
   */
  [INNERDATA]: PropTypes.array,
  /**
   * @Style
   * Override the inline-styles of the TitleBar component.
   */
  [TITLEBARSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the title element on the title bar.
   */
  [TITLESTYLE]: PropTypes.object,
  /**
   * @ClassName
   * The css class name of the root element.
   */
  [CLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of react-table component.
   */
  [BODYCLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the TitleBar component.
   */
  [TITLEBARCLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the title element on the title bar.
   */
  [TITLECLASSNAME]: PropTypes.string,
  /**
   * @Delegated
   * Delegated function fired when onFetchData function is triggered.
   * @param {*} state ReactTable state
   * @param {*} instance ReactTable instance
   * @param {*} tools The tools for helping triggering other actions.
   */
  [ONCLIENTFETCHDATA]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onChangeData function is triggered.
   * @param {array} nextData The received data while chaging of table.
   * @param {*} tools The tools for helping triggering other actions.
   */
  [ONCLIENTCHANGEDATA]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onChangeColumns function is triggered.
   * @param {array} columns The received columns while chaging of table.
   * @param {*} tools The tools for helping triggering other actions.
   */
  [ONCLIENTCHANGECOLUMNS]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onInitial function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTINITIAL]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onDispose function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTDISPOSE]: PropTypes.func,
  /**
   * @Action
   * Action function for handling the data changing event.
   * @param {array} nextData The received data while chaging of table.
   * @param {*} props The properties of the component.
   */
  [ONCHANGEDATA]: PropTypes.func,
  /**
   * @Action
   * Action function for handling the column changing event.
   * @param {array} columns The received columns while chaging of table.
   * @param {*} props The properties of the component.
   */
  [ONCHANGECOLUMNS]: PropTypes.func,
  /**
   * @Action
   * Action function for handling the visibility of Filter-row changing event.
   * @param {object} filterable If true, the filter function will enable.
   * @param {object} showFilter If true, the filter row function will enable.
   * @param {*} props The properties of the component.
   */
  [ONTOGGLEFILTER]: PropTypes.func,
  /**
   * @Action
   * Action function for handling the sort method.
   * @param {*} prev previous cell value
   * @param {*} curr current cell value
   */
  [DEFAULTSORTMETHOD]: PropTypes.func,
  /**
   * @Action
   * Action function for handling the filter method (prefix match).
   * @param {array} filter The array of filter conditions
   * @param {*} row row infomation
   */
  [DEFAULTFILTERMETHOD]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function to decorate Filter-row.
   * @param {*} state react-table state.
   * @param {*} rowInfo RowInfo (undefined if not applicable).
   * @param {*} column Column (undefined if not applicable).
   * @param {*} instance react-table Instance.
   * @param {*} props The props of the component.
   * @returns {object} A object composed of properties(like style, onClick) to decorate Filter-row.
   */
  [GETTHEADFILTERTRPROPS]: PropTypes.func,
  /**
   * @Hidden
   * @Action
   * Action function fired when compomentDidMount and anytime sorting, pagination or filterting is changed in the table.
   * @param {*} state ReactTable state
   * @param {*} instance ReactTable instance
   * @param {*} props The properties of the component.
   */
  [ONFETCHDATA]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for initializing the store at will-mount staging.
   * @param {*} props The properties of the component.
   */
  [WILLMOUNT]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for initializing the component at did-mount staging.
   * @param {*} props The properties of the component.
   * */
  [ONINITIAL]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for updating states when receiving new data.
   * @param {*} nextProps Next properties of the component.
   * @param {*} props The properties of the component.
   */
  [ONRECEIVEPROPS]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for updating checked status of the component at did-update staging.
   * @param {*} table The reference of react-table.
   * @param {*} prevProps The previous properties of the component.
   * @param {*} prevState The previous state of the component.
   * @param {*} props The properties of the component.
   */
  [ONDIDUPDATE]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for releasing resouce at unmount staging.
   * @param {*} props The properties of the component.
   * */
  [ONDISPOSE]: PropTypes.func,
};
