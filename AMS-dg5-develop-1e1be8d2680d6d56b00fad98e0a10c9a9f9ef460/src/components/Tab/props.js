import PropTypes from 'prop-types';

/** Properties name */
export const NAME = 'name';
export const CHILDREN = 'children';
export const ICON = 'icon';
export const LABEL = 'label';
export const ONACTIVE = 'onActive';
export const VALUE = 'value';
export const SELECTED = 'selected';
export const INDEX = 'index';
export const WIDTH = 'width';
export const STYLE = 'style';
export const BUTTONSTYLE = 'buttonStyle';
export const CLASSNAME = 'className';
export const ONCLIENTINITIAL = 'onClientInitial';
export const ONCLIENTDISPOSE = 'onClientDispose';
export const ONINITIAL = 'onInitial';
export const ONRECEIVEPROPS = 'onReceiveProps';
export const ONTOUCHTAP = 'onTouchTap';
export const ONDISPOSE = 'onDispose';
/** Default props */
export const defaultProps = {
  [ICON]: undefined,
  [LABEL]: undefined,
  [ONACTIVE]: undefined,
  [VALUE]: undefined,
  [CHILDREN]: undefined,
  [SELECTED]: undefined,
  [INDEX]: undefined,
  [WIDTH]: undefined,
  [STYLE]: undefined,
  [BUTTONSTYLE]: undefined,
  [CLASSNAME]: undefined,
  [ONCLIENTINITIAL]: response => response,
  [ONCLIENTDISPOSE]: response => response,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The name of the component.
   * */
  [NAME]: PropTypes.string,
  /**
   * @Props
   * The children of the Tab.
   * */
  [CHILDREN]: PropTypes.any,
  /**
   * @Props
   * The icon of the tab, you can pass FontIcon or SvgIcon elements.
   * */
  [ICON]: PropTypes.node,
  /**
   * @Props
   * The text value of the tab item to the string specified.
   * */
  [LABEL]: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * @Props
   * Callback function fired when the active tab changes by touch or tap. Use this event to specify any functionality when an active tab changes.
   * */
  [ONACTIVE]: PropTypes.func,
  /**
   * @Props
   * If value prop passed to Tabs component, this value prop is also required. It assigns a value to the tab so that it can be selected by the Tabs.
   * */
  [VALUE]: PropTypes.any,
  /**
   * @Props
   * @Hidden
   * The index of the tab.
   */
  [INDEX]: PropTypes.any,
  /**
   * @Props
   * If true, The tab would be selected.
   * */
  [SELECTED]: PropTypes.bool,
  /**
   * @Props
   * The width of the tab.
   * */
  [WIDTH]: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @Style
   * Override the inline-styles of the root element.
   * */
  [STYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the button element.
   * */
  [BUTTONSTYLE]: PropTypes.object,
  /**
   * @ClassName
   * The css class name of the root element.
   * */
  [CLASSNAME]: PropTypes.string,
  /**
   * @Delegated
   * Delegated function fired when onInitial function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTINITIAL]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onDispose function is triggerd.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTDISPOSE]: PropTypes.func,
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
   * @param {*} nextProps Next props for updating.
   * @param {*} props The properties of the component.
   */
  [ONRECEIVEPROPS]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Touchtap event handler from tab.
   */
  [ONTOUCHTAP]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for releasing resouce at unmount staging.
   * @param {*} props The properties of the component.
   * */
  [ONDISPOSE]: PropTypes.func,
};
