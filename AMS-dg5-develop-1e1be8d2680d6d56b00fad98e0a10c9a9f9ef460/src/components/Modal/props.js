/** writer: YEZHI.CHEN,CHAO.WANG */

import PropTypes from 'prop-types';
import { getGUID } from '../../utils/Common';
/** Properties name */
export const NAME = 'name';
export const OPEN = 'open';
export const INNEROPEN = 'innerOpen';
export const TITLE = 'title';
export const PAPERPROPS = 'paperProps';
export const MODAL = 'modal';
export const ACTIONS = 'actions';
export const INNERACTIONS = 'innerActions';
export const SHOWOK = 'showOK';
export const SHOWCANCEL = 'showCancel';
export const REPOSITIONONUPDATE = 'repositionOnUpdate';
export const AUTODETECTWINDOWHEIGHT = 'autoDetectWindowHeight';
export const AUTOSCROLLBODYCONTENT = 'autoScrollBodyContent';
export const STYLE = 'style';
export const TITLESTYLE = 'titleStyle';
export const BODYSTYLE = 'bodyStyle';
export const CONTENTSTYLE = 'contentStyle';
export const OVERLAYSTYLE = 'overlayStyle';
export const ACTIONSCONTAINERSTYLE = 'actionsContainerStyle';
export const TITLECLASSNAME = 'titleClassName';
export const ACTIONSCONTAINERCLASSNAME = 'actionsContainerClassName';
export const BODYCLASSNAME = 'bodyClassName';
export const CONTENTCLASSNAME = 'contentClassName';
export const OVERLAYCLASSNAME = 'overlayClassName';
export const PAPERCLASSNAME = 'paperClassName';
export const ONCLIENTCHANGE = 'onClientChange';
export const ONCLIENTREQUESTCLOSE = 'onClientRequestClose';
export const ONCLIENTCLICKOK = 'onClientClickOK';
export const ONCLIENTCLICKCANCEL = 'onClientClickCancel';
export const ONCLIENTINITIAL = 'onClientInitial';
export const ONCLIENTDISPOSE = 'onClientDispose';
export const ONREQUESTCLOSE = 'onRequestClose';
export const ONINITIAL = 'onInitial';
export const ONRECEIVEPROPS = 'onReceiveProps';
export const ONCHANGE = 'onChange';
export const GETOKBUTTON = 'getOKButton';
export const GETCANCELBUTTON = 'getCancelButton';
export const ONCLICKOKBUTTON = 'onClickOKButton';
export const ONCLICKCANCELBUTTON = 'onClickCancelButton';
export const ONDISPOSE = 'onDispose';
export const SHOULDMODALSHOW = 'shouldModalShow';
export const SHOULDMODALHIDE = 'shouldModalHide';
export const SHOULDMODALSUBMIT = 'shouldModalSubmit';
export const BTNNAME = 'btnName';
export const NOBUTTON = 'noButton';
export const FORMNAME = 'formName';
/** Default props */
export const defaultProps = {
  [NAME]: getGUID(),
  [ACTIONS]: [],
  [INNERACTIONS]: [],
  [SHOWOK]: true,
  [SHOWCANCEL]: true,
  [PAPERPROPS]: {},
  [AUTODETECTWINDOWHEIGHT]: true,
  [AUTOSCROLLBODYCONTENT]: false,
  [OPEN]: false,
  [INNEROPEN]: false,
  [MODAL]: false,
  [ONREQUESTCLOSE]: response => response,
  [ONCLIENTREQUESTCLOSE]: response => response,
  [REPOSITIONONUPDATE]: true,
  [STYLE]: undefined,
  [BODYSTYLE]: undefined,
  [TITLE]: undefined,
  [TITLESTYLE]: undefined,
  [CONTENTSTYLE]: undefined,
  [OVERLAYSTYLE]: undefined,
  [ACTIONSCONTAINERSTYLE]: undefined,
  [BODYCLASSNAME]: undefined,
  [CONTENTCLASSNAME]: undefined,
  [OVERLAYCLASSNAME]: undefined,
  [TITLECLASSNAME]: undefined,
  [ACTIONSCONTAINERCLASSNAME]: undefined,
  [PAPERCLASSNAME]: undefined,
  [ONCLIENTINITIAL]: response => response,
  [ONCLIENTCLICKOK]: response => response,
  [ONCLIENTCLICKCANCEL]: response => response,
  [ONCLIENTCHANGE]: response => response,
  [ONCLIENTDISPOSE]: response => response,
  [BTNNAME]: '点击',
  [NOBUTTON]: false,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The name of the Dialog.
   */
  [NAME]: PropTypes.string,
  /**
   * @Props
   * The title of the Dialog to display on the Dialog.
   */
  [TITLE]: PropTypes.string,
  /**
   * @Props
   * The Action buttons of the dialog to display below the Dialog content
   */
  [ACTIONS]: PropTypes.node,
  /**
   * @Props
   * If true, the OK action button would be shown.
   */
  [SHOWOK]: PropTypes.bool,
  /**
   * @Props
   * If true, the Cancel action button would be shown.
   */
  [SHOWCANCEL]: PropTypes.bool,
  /**
   * @Props
   * The properties applied to the Paper element.
   */
  [PAPERPROPS]: PropTypes.object,
  /**
   * @Props
   * If true, the height of the Dialog will be auto detected.
   */
  [AUTODETECTWINDOWHEIGHT]: PropTypes.bool,
  /**
   * @Props
   * If true, the body content of the Dialog will be scrollable.
   */
  [AUTOSCROLLBODYCONTENT]: PropTypes.bool,
  /**
   * @Props
   * If true, the Dialog will be opened.
   */
  [OPEN]: PropTypes.bool,
  /**
   * @Props
   * If true, it would force the user to use one of the actions in the Dialog.
   */
  [MODAL]: PropTypes.bool,
  /**
   * @Props
   * If true, the Dialog would be repositioned when it's contents are updated.
   */
  [REPOSITIONONUPDATE]: PropTypes.bool,
  /**
   * @Props
   * @Hidden
   * The inner open state of the Dialog saved in store. It would be connected to the DatePicker by connect.
   */
  [INNEROPEN]: PropTypes.bool,
  /**
   * @Props
   * @Hidden
   * The inner action button of the Dialog saved in store. It would be connected to the DatePicker by connect.
   */
  [INNERACTIONS]: PropTypes.node,
  /**
   * @Style
   * The inline-styles of the root element.
   */
  [STYLE]: PropTypes.object,
  /**
   * @Style
   * The inline-styles of the title's root container element.
   */
  [TITLESTYLE]: PropTypes.object,
  /**
   * @Style
   * The inline-styles of the actions container's root element.
   */
  [ACTIONSCONTAINERSTYLE]: PropTypes.object,
  /**
   * @Style
   * The inline-styles of the content's root element under the title.
   */
  [BODYSTYLE]: PropTypes.object,
  /**
   * @Style
   * The inline-styles of the content container.
   */
  [CONTENTSTYLE]: PropTypes.object,
  /**
   * @Style
   * The inline-styles of the Overlay component that is rendered behind the Dialog.
   */
  [OVERLAYSTYLE]: PropTypes.object,
  /**
   * @ClassName
   * The className to add to the title's root container element.
   */
  [TITLECLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The className to add to the actions container's root element.
   */
  [ACTIONSCONTAINERCLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The className to add to the content's root element under the title.
   */
  [BODYCLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The className to add to the content container.
   */
  [CONTENTCLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The className to add to the Overlay component that is rendered behind the Dialog.
   */
  [OVERLAYCLASSNAME]: PropTypes.string,
  /**
   * @ClassName
   * The CSS class name of the Paper element.
   */
  [PAPERCLASSNAME]: PropTypes.string,
  /**
   * @Delegated
   * Fired when onRequestClose is called.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTREQUESTCLOSE]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onInitial function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTINITIAL]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onClickOk function is triggered.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTCLICKOK]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onClickCancel function is triggered.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTCLICKCANCEL]: PropTypes.func,
  /**
   * @Delegated
   * Delegated function fired when onChange function is triggered.
   * @param {bool} open The open status of Dialog.
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
   * @param {*} nextProps Next properties of the component.
   * @param {*} props The properties of the component.
   */
  [ONRECEIVEPROPS]: PropTypes.func,
  /**
   * @Action
   * Action function for handling open changing while new open is entered.
   * @param {bool} open The open status of Dialog.
   * @param {*} props The props of the component.
   */
  [ONCHANGE]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for handling that the Dialog is requested to be closed.
   * @param {*} event The open status of Dialog.
   * @param {*} props The props of the component.
   */
  [ONREQUESTCLOSE]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for getting OK button.
   * @param {*} props The props of the component.
   * @returns {node} The component of OK button.
   */
  [GETOKBUTTON]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for getting cancel button.
   * @param {*} props The props of the component.
   * @returns {node} The component of cancel button.
   */
  [GETCANCELBUTTON]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for handling OK button click event.
   * @param {*} props The props of the component.
   */
  [ONCLICKOKBUTTON]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for handling cancel button click event.
   * @param {*} props The props of the component.
   */
  [ONCLICKCANCELBUTTON]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for releasing resouce at unmount staging.
   * @param {*} props The properties of the component.
   */
  [ONDISPOSE]: PropTypes.func,
  /**
   * @Props
   * Do some validation before show modal.
   */
  [SHOULDMODALSHOW]: PropTypes.func,
  /**
   * @Props
   * Do some validation before hide modal.
   */
  [SHOULDMODALHIDE]: PropTypes.func,
  /**
   * @Props
   * @Hidden
   * The name of Button for Modal.
   */
  [BTNNAME]: PropTypes.string,
  /**
   * @Props
   * Whether show Button as default.
   */
  [NOBUTTON]: PropTypes.bool,
  /**
   * @Props
   * @Hidden
   * The name of form inside Modal.
   */
  [FORMNAME]: PropTypes.string,
};
