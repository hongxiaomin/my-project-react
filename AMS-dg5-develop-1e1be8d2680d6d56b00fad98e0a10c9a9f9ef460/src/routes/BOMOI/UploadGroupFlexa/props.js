import PropTypes from 'prop-types';

export const UPLOADGROUPFLEXAVISIBLE = 'uploadGroupFlexaVisible';
export const HANDLECANCEL = 'handleCancel';
export const DATA = 'data';
export const GROUPALLUPLOADCLICK = 'groupAllUploadClick';

export const defaultProps = {
  [UPLOADGROUPFLEXAVISIBLE]: false,
  [HANDLECANCEL]: undefined,
  [DATA]: undefined,
  [GROUPALLUPLOADCLICK]: undefined,
};

export const propTypes = {
  [UPLOADGROUPFLEXAVISIBLE]: PropTypes.bool,
  [HANDLECANCEL]: PropTypes.func,
  [DATA]: PropTypes.objectOf(PropTypes.any),
  [GROUPALLUPLOADCLICK]: PropTypes.func,
};
