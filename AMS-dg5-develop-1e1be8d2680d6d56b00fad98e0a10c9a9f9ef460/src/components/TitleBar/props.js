import PropTypes from 'prop-types';

export const PAGETITLE = 'pageTitle';
export const CHILDREN = 'children';
export const defaultProps = {
  [PAGETITLE]: undefined,
  [CHILDREN]: undefined,
};
export const propTypes = {
  [PAGETITLE]: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  [CHILDREN]: PropTypes.any,
};
