import PropTypes from 'prop-types';

export const VALUE = 'value';
export const COMPARERESULTVISIBLE = 'CompareResultVisible';
export const ISERROR = 'isError';
export const HANDLENGCLICK = 'handleNGClick';
export const HANDLEOKCLICK = 'handleOkClick';
export const HANDLECHANGE = 'handleChange';
export const CLICKLOOKDETAIL = 'clickLookDetail';
export const ISMOREFLEXA = 'isMoreFlexa';
export const HANDLEANGCLICK = 'handleANGClick';
export const HANDLEBNGCLICK = 'handleBNGClick';
export const MODALASHOW = 'modalAShow';
export const MODALBSHOW = 'modalBShow';
export const HANDLEACHANGE = 'handleAChange';
export const HANDLEBCHANGE = 'handleBChange';
export const HANDLEAOKCLICK = 'handleAOKClick';
export const HANDLEBOKCLICK = 'handleBOKClick';
export const INPUTVALUE = 'inputValue';
export const ISTIP = 'isTip';
export const AISTIP = 'AIsTip';
export const BISTIP = 'BIsTip';
export const GROUPING = 'grouping';

export const defaultProps = {
  [VALUE]: null,
  [COMPARERESULTVISIBLE]: false,
  [ISERROR]: undefined,
  [HANDLENGCLICK]: undefined,
  [HANDLEOKCLICK]: undefined,
  [HANDLECHANGE]: undefined,
  [CLICKLOOKDETAIL]: undefined,
  [ISMOREFLEXA]: undefined,
  [HANDLEANGCLICK]: undefined,
  [HANDLEBNGCLICK]: undefined,
  [MODALASHOW]: undefined,
  [MODALBSHOW]: undefined,
  [HANDLEACHANGE]: undefined,
  [HANDLEBCHANGE]: undefined,
  [HANDLEAOKCLICK]: undefined,
  [HANDLEBOKCLICK]: undefined,
  [INPUTVALUE]: undefined,
  [ISTIP]: undefined,
  [AISTIP]: undefined,
  [BISTIP]: undefined,
  [GROUPING]: undefined,
};

export const propTypes = {
  [VALUE]: PropTypes.objectOf(PropTypes.any),
  [COMPARERESULTVISIBLE]: PropTypes.bool,
  [ISERROR]: PropTypes.bool,
  [HANDLENGCLICK]: PropTypes.func,
  [HANDLEOKCLICK]: PropTypes.func,
  [HANDLECHANGE]: PropTypes.func,
  [CLICKLOOKDETAIL]: PropTypes.func,
  [ISMOREFLEXA]: PropTypes.bool,
  [HANDLEANGCLICK]: PropTypes.func,
  [HANDLEBNGCLICK]: PropTypes.func,
  [MODALASHOW]: PropTypes.func,
  [MODALBSHOW]: PropTypes.func,
  [HANDLEACHANGE]: PropTypes.func,
  [HANDLEBCHANGE]: PropTypes.func,
  [HANDLEAOKCLICK]: PropTypes.func,
  [HANDLEBOKCLICK]: PropTypes.func,
  [INPUTVALUE]: PropTypes.func,
  [ISTIP]: PropTypes.string,
  [AISTIP]: PropTypes.string,
  [BISTIP]: PropTypes.string,
  [GROUPING]: PropTypes.bool,
};
