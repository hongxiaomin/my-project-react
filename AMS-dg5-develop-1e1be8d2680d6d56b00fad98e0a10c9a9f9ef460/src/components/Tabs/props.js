import PropTypes from 'prop-types';

/** Properties name */
export const NAME = 'name';
export const ZINDEX = 'zIndex';
export const INITIALSELECTEDINDEX = 'initialSelectedIndex';
export const TABTEMPLATE = 'tabTemplate';
export const VALUE = 'value';
export const INNERVALUE = 'innerValue';
export const CHILDREN = 'children';
export const STYLE = 'style';
export const INKBARSTYLE = 'inkBarStyle';
export const TABITEMCONTAINERSTYLE = 'tabItemContainerStyle';
export const CONTENTCONTAINERSTYLE = 'contentContainerStyle';
export const TABTEMPLATESTYLE = 'tabTemplateStyle';
export const CLASSNAME = 'className';
export const CONTENTCONTAINERCLASSNAME = 'contentContainerClassName';
export const ONCLIENTINITIAL = 'onClientInitial';
export const ONCLIENTCHANGE = 'onClientChange';
export const ONCLIENTDISPOSE = 'onClientDispose';
export const ONINITIAL = 'onInitial';
export const ONRECEIVEPROPS = 'onReceiveProps';
export const ONCHANGE = 'onChange';
export const ONDISPOSE = 'onDispose';
/** Default props */
export const defaultProps = {
  [VALUE]: undefined,
  [INNERVALUE]: undefined,
  [CHILDREN]: undefined,
  [ZINDEX]: 99,
  [TABTEMPLATE]: undefined,
  [CLASSNAME]: undefined,
  [STYLE]: undefined,
  [CONTENTCONTAINERSTYLE]: undefined,
  [INKBARSTYLE]: undefined,
  [TABITEMCONTAINERSTYLE]: undefined,
  [TABTEMPLATESTYLE]: undefined,
  [CONTENTCONTAINERCLASSNAME]: undefined,
  [INITIALSELECTEDINDEX]: 0,
  [ONCLIENTCHANGE]: response => response,
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
   * The value of tabs to make Tabs controllable and selects the tab whose value prop matches this prop.
   */
  [VALUE]: PropTypes.any,
  /**
   * @Props
   * @Hidden
   * The inner value of the tabs saved in store. It would be connected to the tabs by connect.
   */
  [INNERVALUE]: PropTypes.any,
  /**
   * @Props
   * @Hidden
   * The z-index of ink bar.
   */
  [ZINDEX]: PropTypes.number,
  /**
   * @Props
   * The index of the initial visible tab.
   */
  [INITIALSELECTEDINDEX]: PropTypes.number,
  /**
   * @Props
   * Override the default tab template used to wrap the content of each tab element
   */
  [TABTEMPLATE]: PropTypes.func,
  /**
   * @Props
   * The children components of the root.
   */
  [CHILDREN]: PropTypes.node,
  /**
   * @Style
   * Override the inline-styles of the root element
   */
  [STYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the content's container
   */
  [CONTENTCONTAINERSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the InkBar
   */
  [INKBARSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the tab-labels container
   */
  [TABITEMCONTAINERSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the tab template
   */
  [TABTEMPLATESTYLE]: PropTypes.object,
  /**
   * @ClassName
   * The css class name of the component
   */
  [CLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the content's container
   */
  [CONTENTCONTAINERCLASSNAME]: PropTypes.string,
  /**
   * @Delegated
   * Delegated functon fired when onInitail function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTINITIAL]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onChange function is triggered.
   * @param {*} value Makes Tabs controllable and selects the tab whose value prop matches this prop.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTCHANGE]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onDispose function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTDISPOSE]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for initializing the component at did-mount staging.
   * @param {*} props The properties of the component.
   */
  [ONINITIAL]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for updating states when receiving new data.
   * @param {*} nextProps Next props for updating.
   * @param {*} props The properties of the component.
   */
  [ONRECEIVEPROPS]: PropTypes.func,
  /**
   * @Action
   * Action function for handling data changing while new data is entered.
   * @param {*} value Makes Tabs controllable and selects the tab whose value prop matches this prop.
   * @param {*} props The properties of the component.
   */
  [ONCHANGE]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for releasing resouce at unmount staging.
   * @param {*} props The properties of the component.
   */
  [ONDISPOSE]: PropTypes.func,
};
