/** writer: Chao Wang */
import PropTypes from 'prop-types';

/** Properties name */
export const TYPE = 'type';
export const NAME = 'name';
export const FORMITEM = 'formItem';
export const ONCLIENTINITIAL = 'onClientInitial';
export const ONCLIENTCHANGE = 'onClientChange';
export const ONCLIENTFOCUS = 'onClientFocus';
export const ONCLIENTBLUR = 'onClientBlur';
export const ONCLIENTDISPOSE = 'onClientDispose';
export const ONINITIAL = 'onInitial';
export const ONRECEIVEPROPS = 'onReceiveProps';
export const ONINITIALFORMDATA = 'onInitialFormData';
export const ONCHANGEFORMDATA = 'onChangeFormData';
export const ONREMOVEFORMDATA = 'onRemoveFormData';
export const ONCLEAR = 'onClear';
export const ONDISPOSE = 'onDispose';
export const BACKGROUNDCOLOR = 'backgroundColor';
export const LABELCOLOR = 'labelColor';
export const LABEL = 'label';
export const FULLWIDTH = 'fullWidth';
/** Default props */
export const defaultProps = {
  [TYPE]: 'text',
  [ONCLIENTINITIAL]: response => response,
  [ONCLIENTCHANGE]: response => response,
  [ONCLIENTFOCUS]: response => response,
  [ONCLIENTBLUR]: response => response,
  [ONCLIENTDISPOSE]: response => response,
  [BACKGROUNDCOLOR]: '#0086DB',
  [LABELCOLOR]: '#ffffff',
  [TYPE]: 'submit',
  [LABEL]: '提交',
  [FULLWIDTH]: true,
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
   * The type of the component.
   * */
  [TYPE]: PropTypes.oneOf([
    'text',
    'hidden',
    'number',
    'submit',
    'button',
    'select',
    'datetime',
    'time',
    'date',
    'color',
    'radio',
    'checkbox',
    'chip',
    'toggle',
  ]),
  /**
   * @Delegated
   * @Hidden
   * Delegated function fired when onInitial function is triggered.
   * @param {*} props The properties of the component.
   * @param {object} tools The tools for helping triggering other actions.
   */
  [ONCLIENTINITIAL]: PropTypes.func,
  /**
   * @Delegated
   * @Hidden
   * Delegated function fired when onChange function is triggered.
   * @param {*} value The changed value.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTCHANGE]: PropTypes.func,
  /**
   * @Delegated
   * @Hidden
   * Delegated function fired when onFocus function is triggered.
   * @param {*} event The onFocus event.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTFOCUS]: PropTypes.func,
  /**
   * @Delegated
   * @Hidden
   * Delegated function fired when onBlur function is triggered.
   * @param {*} event The onBlur event.
   * @param {object} tools The tools for helping triggering other actions.
   * */
  [ONCLIENTBLUR]: PropTypes.func,
  /**
   * @Delegated
   * @Hidden
   * Delegated function fired when onDispose function is triggered.
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
   * */
  [ONRECEIVEPROPS]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for initializing the form data.
   * @param {*} props The properties of component.
   * @returns {node} Return the real component with listening the onclientChange event.
   */
  [ONINITIALFORMDATA]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for changing data in form.
   * @param {*} formName The name of the form. If formItem of props was false, It would be undefined.
   * @param {*} itemName The name of the component.
   * @param {*} onClientChange The client changed event.
   */
  [ONCHANGEFORMDATA]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for removing data in form.
   * @param {*} formName The name of the form. If formItem of props was false, It would be undefined.
   * @param {*} name The name of the component.
   * @param {*} onClientDispose The client dispose event.
   */
  [ONREMOVEFORMDATA]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for calling clear function in component.
   * @param {*} props The properties of component.
   */
  [ONCLEAR]: PropTypes.func,
  /**
   * @Action
   * @Hidden
   * Action function for disposing data in store.
   * @param {*} props The properties of the component.
   * */
  [ONDISPOSE]: PropTypes.func,
};
