import PropTypes from 'prop-types';

export const LOGO = 'logo';
export const TITLE = 'title';
export const LOGOWIDTH = 'logoWidth';
export const ALT = 'alt';
export const TITLESTYLE = 'titleStyle';
export const LABELSTYLE = 'labelStyle';
export const defaultProps = {
  [TITLE]: '',
  [LOGOWIDTH]: 30,
  [ALT]: '',
  [TITLESTYLE]: undefined,
  [LABELSTYLE]: undefined,
};
export const propTypes = {
  [LOGO]: PropTypes.any,
  [TITLE]: PropTypes.string,
  [LOGOWIDTH]: PropTypes.number,
  [ALT]: PropTypes.string,
  [TITLESTYLE]: PropTypes.object,
  [LABELSTYLE]: PropTypes.object,
};
