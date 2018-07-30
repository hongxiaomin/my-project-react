/** writer: Chao Wang */
import PropTypes from 'prop-types';

/** Properties name */
export const NAME = 'name';
export const LABEL = 'label';
export const LABELPOSITION = 'labelPosition';
export const HREF = 'href';
export const FULLWIDTH = 'fullWidth';
export const DISABLED = 'disabled';
export const DISABLETOUCHRIPPLE = 'disableTouchRipple';
export const CONTAINERELEMENT = 'containerElement';
export const ICON = 'icon';
export const LABELCOLOR = 'labelColor';
export const BACKGROUNDCOLOR = 'backgroundColor';
export const DISABLEDLABELCOLOR = 'disabledLabelColor';
export const DISABLEDBACKGROUNDCOLOR = 'disabledBackgroundColor';
export const STYLE = 'style';
export const LABELSTYLE = 'labelStyle';
export const OVERLAYSTYLE = 'overlayStyle';
export const BUTTONSTYLE = 'buttonStyle';
export const RIPPLESTYLE = 'rippleStyle';
export const CLASSNAME = 'className';
export const ONCLIENTINITIAL = 'onClientInitial';
export const ONCLIENTCLICK = 'onClientClick';
export const ONCLIENTDISPOSE = 'onClientDispose';
export const ONINITIAL = 'onInitial';
export const ONRECEIVEPROPS = 'onReceiveProps';
export const ONCLICK = 'onClick';
export const ONDISPOSE = 'onDispose';
/** Default props */
export const defaultProps = {
  [LABEL]: '',
  [LABELPOSITION]: 'after',
  [HREF]: '',
  [FULLWIDTH]: true,
  [DISABLED]: false,
  [DISABLETOUCHRIPPLE]: false,
  [CONTAINERELEMENT]: undefined,
  [ICON]: undefined,
  [STYLE]: undefined,
  [LABELSTYLE]: undefined,
  [OVERLAYSTYLE]: undefined,
  [BUTTONSTYLE]: undefined,
  [RIPPLESTYLE]: undefined,
  [LABELCOLOR]: '#ffffff',
  [BACKGROUNDCOLOR]: '#0086DB',
  [DISABLEDLABELCOLOR]: undefined,
  [DISABLEDBACKGROUNDCOLOR]: undefined,
  [CLASSNAME]: undefined,
  [ONCLIENTINITIAL]: response => response,
  [ONCLIENTCLICK]: response => response,
  [ONCLIENTDISPOSE]: response => response,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The name of the button.
   * */
  [NAME]: PropTypes.string,
  /**
   * @Props
   * The label of the button.
   * */
  [LABEL]: PropTypes.string,
  /**
   * @Props
   * The position of the button's label relative to the button's icon
   * */
  [LABELPOSITION]: PropTypes.oneOf(['before', 'after']),
  /**
   * @Props
   * The URL of button to link to when the button is clicked.
   * */
  [HREF]: PropTypes.string,
  /**
   * @Props
   * If true, the button will take up the full width of its container.
   * */
  [FULLWIDTH]: PropTypes.bool,
  /**
   * @Props
   * If true, the button will be disabled.
   * */
  [DISABLED]: PropTypes.bool,
  /**
   * @Props
   * If true, the element's ripple effect will be disabled.
   * */
  [DISABLETOUCHRIPPLE]: PropTypes.bool,
  /**
   * @Props
   * The element to use as the container for the RaisedButton.
   * Either a string to use a DOM element or a ReactElement.
   * */
  [CONTAINERELEMENT]: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * @Props
   * The icon of button to be displayed within the button.
   * */
  [ICON]: PropTypes.node,
  /**
   * @Props
   * The color of the button's label.
   * */
  [LABELCOLOR]: PropTypes.string,
  /**
   * @Props
   * The background color for the button.
   * */
  [BACKGROUNDCOLOR]: PropTypes.string,
  /**
   * @Props
   * The color of the button's label when the button is disabled.
   * */
  [DISABLEDLABELCOLOR]: PropTypes.string,
  /**
   * @Props
   * The default background color for the button when it is disabled.
   * */
  [DISABLEDBACKGROUNDCOLOR]: PropTypes.string,
  /**
   * @Style
   * Override the inline-styles of the root element.
   * */
  [STYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the button's label element.
   * */
  [LABELSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline style of the button overlay.
   * */
  [OVERLAYSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline-styles of the button element.
   * */
  [BUTTONSTYLE]: PropTypes.object,
  /**
   * @Style
   * Override the inline style of the ripple element.
   * */
  [RIPPLESTYLE]: PropTypes.object,
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
   * Delegated function fired when onClick function is triggered.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTCLICK]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onDispose function is triggerd.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   * */
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
   * @param {*} nextProps Next properties of the component.
   * @param {*} props The properties of the component.
   */
  [ONRECEIVEPROPS]: PropTypes.func,
  /**
   * @Action
   * Action function for handling button click event.
   * @param {*} props The propeties of component.
   * */
  [ONCLICK]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for releasing resouce at unmount staging.
   * @param {*} props The properties of the component.
   * */
  [ONDISPOSE]: PropTypes.func,
};
