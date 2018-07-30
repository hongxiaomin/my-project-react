import PropTypes from 'prop-types';

export const VALUE = 'value';
export const COMPARERESULTDETAILVISIBLE = 'CompareResultDeatilVisible';
export const ISERROR = 'isError';
export const HANDLENGCLICK = 'handleNGClick';
export const HANDLEOKCLICK = 'handleOkClick';
export const HANDLECHANGE = 'handleChange';
export const ISMOREFLEXA = 'isMoreFlexa';
export const CLICKDETAILSIDENAME = 'clickDetailSideName';
export const HANDLEAOKCLICK = 'handleAOKClick';
export const HANDLEBOKCLICK = 'handleBOKClick';
export const HANDLEACHANGE = 'handleAChange';
export const HANDLEBCHANGE = 'handleBChange';
export const ISTIP = 'isTip';
export const AISTIP = 'AIsTip';
export const BISTIP = 'BIsTip';
export const GROUPING = 'grouping';
export const INPUTVALUE = 'inputValue';

export const defaultProps = {
  [VALUE]: null,
  [COMPARERESULTDETAILVISIBLE]: false,
  [ISERROR]: undefined,
  [HANDLENGCLICK]: undefined,
  [HANDLEOKCLICK]: undefined,
  [HANDLECHANGE]: undefined,
  [ISMOREFLEXA]: undefined,
  [CLICKDETAILSIDENAME]: undefined,
  [HANDLEAOKCLICK]: undefined,
  [HANDLEBOKCLICK]: undefined,
  [HANDLEACHANGE]: undefined,
  [HANDLEBCHANGE]: undefined,
  [ISTIP]: undefined,
  [AISTIP]: undefined,
  [BISTIP]: undefined,
  [GROUPING]: undefined,
  [INPUTVALUE]: undefined,
};

export const propTypes = {
  [VALUE]: PropTypes.objectOf(PropTypes.any),
  [COMPARERESULTDETAILVISIBLE]: PropTypes.bool,
  [ISERROR]: PropTypes.bool,
  [HANDLENGCLICK]: PropTypes.func,
  [HANDLEOKCLICK]: PropTypes.func,
  [HANDLECHANGE]: PropTypes.func,
  [ISMOREFLEXA]: PropTypes.func,
  [CLICKDETAILSIDENAME]: PropTypes.func,
  [HANDLEAOKCLICK]: PropTypes.func,
  [HANDLEBOKCLICK]: PropTypes.func,
  [HANDLEACHANGE]: PropTypes.func,
  [HANDLEBCHANGE]: PropTypes.func,
  [ISTIP]: PropTypes.string,
  [AISTIP]: PropTypes.string,
  [BISTIP]: PropTypes.string,
  [GROUPING]: PropTypes.bool,
  [INPUTVALUE]: PropTypes.string,
};
