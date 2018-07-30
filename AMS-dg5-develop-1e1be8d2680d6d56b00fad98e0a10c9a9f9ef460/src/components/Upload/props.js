import PropTypes from 'prop-types';

/** Properties name */
export const NAME = 'name';
export const ACTION = 'action';
export const HEADERS = 'headers';
export const CUSTOMREQUEST = 'customRequest';
export const BEFOREUPLOAD = 'beforeUpload';
export const MULTIPLE = 'multiple';
export const ACCEPT = 'accept';
export const SHOWUPLOADLIST = 'showUploadList';
export const ONDISPOSE = 'onDispose';
export const BUTTONNAME = 'buttonName';
export const GETUPLOADFILE = 'getUploadFile';

/** Default props */
export const defaultProps = {
  [NAME]: undefined,
  [ACTION]: undefined,
  [HEADERS]: undefined,
  [CUSTOMREQUEST]: undefined,
  [BEFOREUPLOAD]: undefined,
  [MULTIPLE]: false,
  [ACCEPT]: undefined,
  [SHOWUPLOADLIST]: false,
  [BUTTONNAME]: '上传档案',
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The name of uploading file.
   */
  [NAME]: PropTypes.string,
  /**
   * @Props
   * @Hidden
   * Required. Uploading URL.
   */
  [ACTION]: PropTypes.string,
  /**
   * @Props
   * @Hidden
   * Set request headers, valid above IE10.
   */
  [HEADERS]: PropTypes.objectOf(PropTypes.any),
  /**
   * @Props
   * override for the default xhr behavior allowing for additional customization
   * and ability to implement your own XMLHttpRequest.
   */
  [CUSTOMREQUEST]: PropTypes.func,
  /**
   * @Props
   * Hook function which will be executed before uploading.
   * Uploading will be stopped with false or a rejected Promise returned.
   * Warning：this function is not supported in IE9。
   */
  [BEFOREUPLOAD]: PropTypes.func,
  /**
   * @Props
   * Whether to support selected multiple file. IE10+ supported.
   * You can select multiple files with CTRL holding down while multiple is set to be true。
   */
  [MULTIPLE]: PropTypes.bool,
  /**
   * @Style
   * File types that can be accepted. See input accept Attribute。
   */
  [ACCEPT]: PropTypes.string,
  /**
   * @Style
   * Whether to show default upload list, could be an object to specify showPreviewIcon
   * and showRemoveIcon individually
   */
  [SHOWUPLOADLIST]: PropTypes.bool,
  /**
   * @Action
   * @Hidden
   * Action function for releasing resouce at unmount staging.
   * @param {*} props The properties of the component.
   */
  [ONDISPOSE]: PropTypes.func,
  /**
   * @Props
   * @Hidden
   * The Button`s name.
   * @param {*} props The properties of the component.
   */
  [BUTTONNAME]: PropTypes.string,
  /**
   * @Action
   * @Hidden
   * Action function for get uploaded file without fetching request.
   * @param {*} props The properties of the component.
   */
  [GETUPLOADFILE]: PropTypes.func,
};
