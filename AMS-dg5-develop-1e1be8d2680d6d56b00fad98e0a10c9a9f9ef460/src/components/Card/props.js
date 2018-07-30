/** writer: Chuck Wu */
import PropTypes from 'prop-types';

/** Properties name */
export const TITLE = 'title';
export const TITLECONTAINERSTYLE = 'titleContainerStyle';
export const BODYCONTAINERSTYLE = 'bodyContainerStyle';
export const TITLECONTAINERCLASS = 'titleContainerClass';
export const TITLECLASS = 'titleClass';
export const BODYCONTAINERCLASS = 'bodyContainerClass';
export const BODYCLASS = 'bodyClass';
export const CARDCLASS = 'cardClassName';
export const HRCLASS = 'hr';
/** Default props */
export const defaultProps = {
  [TITLE]: '',
  [TITLECONTAINERSTYLE]: undefined,
  [BODYCONTAINERSTYLE]: undefined,
  [TITLECONTAINERCLASS]: undefined,
  [TITLECLASS]: undefined,
  [BODYCONTAINERCLASS]: undefined,
  [CARDCLASS]: undefined,
  [HRCLASS]: undefined,
  [BODYCLASS]: undefined,
};
/** Prop types */
export const propTypes = {
  /**
   * @Props
   * The title of the card. It will be displayed on the top of card.
   * */
  [TITLE]: PropTypes.string,
  /**
   * @Style
   * Override the inline-styles of the title.
   * */
  [TITLECONTAINERSTYLE]: PropTypes.objectOf(PropTypes.any),
  /**
   * @Style
   * Override the inline-styles of content.
   * */
  [BODYCONTAINERSTYLE]: PropTypes.objectOf(PropTypes.any),
  /**
   * @ClassName
   * The css class name of the title container.
   *  */
  [TITLECONTAINERCLASS]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the body content.
   * */
  [BODYCONTAINERCLASS]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the title.
   * */
  [TITLECLASS]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the card.
   * */
  [CARDCLASS]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the horizontal line.
   * */
  [HRCLASS]: PropTypes.string,
  /**
   * @ClassName
   * The css class name of the body.
   * */
  [BODYCLASS]: PropTypes.string,
};
