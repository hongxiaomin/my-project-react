/** writer: Jie.ZJ.Zhang */
import PropTypes from 'prop-types';

/** Properties name */
export const ACTION = 'action';
export const SELECTED = 'selected';
/** Default props */
export const defaultProps = {
  [ACTION]: undefined,
  [SELECTED]: undefined,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The download url of the table.
   */
  [ACTION]: PropTypes.string,
  /**
   * @Props
   * The selected rowId of the table.
   */
  [SELECTED]: PropTypes.string,
};
