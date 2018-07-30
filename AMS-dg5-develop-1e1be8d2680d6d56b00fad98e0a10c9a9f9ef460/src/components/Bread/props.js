/** writer: Chuck Wu */
import PropTypes from 'prop-types';

/** Properties name */
export const BREADMAP = 'breadMap';
/** Default props */
export const defaultProps = {
  [BREADMAP]: [],
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The title of the card. It will be displayed on the top of card.
   * */
  [BREADMAP]: PropTypes.array,
};
