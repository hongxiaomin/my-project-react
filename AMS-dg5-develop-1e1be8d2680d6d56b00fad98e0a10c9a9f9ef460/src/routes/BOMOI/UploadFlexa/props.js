import PropTypes from 'prop-types';

export const UPLOADFLEXAVISIBLE = 'uploadFlexaVisible';
export const HANDLECANCEL = 'handleCancel';
export const DATA = 'data';
export const ALLUPLOADCLICK = 'allUploadClick';
export const ISMOREFLEXA = 'isMoreFlexa';

export const defaultProps = {
  [UPLOADFLEXAVISIBLE]: false,
  [HANDLECANCEL]: undefined,
  [DATA]: undefined,
  [ALLUPLOADCLICK]: undefined,
  [ISMOREFLEXA]: undefined,
};

export const propTypes = {
  [UPLOADFLEXAVISIBLE]: PropTypes.bool,
  [HANDLECANCEL]: PropTypes.func,
  [DATA]: PropTypes.objectOf(PropTypes.any),
  [ALLUPLOADCLICK]: PropTypes.func,
  [ISMOREFLEXA]: PropTypes.bool,
};
