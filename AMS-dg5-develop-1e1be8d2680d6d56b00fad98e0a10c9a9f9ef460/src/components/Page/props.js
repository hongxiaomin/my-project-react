import PropTypes from 'prop-types';

export const STYLE = 'style';
export const CHILDREN = 'children';
export const defaultProps = {
  [STYLE]: undefined,
  [CHILDREN]: undefined,
};
export const propTypes = {
  [STYLE]: PropTypes.object,
  [CHILDREN]: PropTypes.any,
};
