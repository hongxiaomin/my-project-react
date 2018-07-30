import React from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';
import { Col as ReactFlexboxGridCol } from 'react-flexbox-grid';

import cssStyles from './gridLayoutStyles';

/**
 * Col render from GridLayout > Grid > Row > Col
 * @param  {[type]}    options.children [description]
 * @param  {...[type]} options.props    [description]
 * @return {[type]}                     [description]
 */
const Col = ({ children, ...props }) => {
  /*
  ex:
  scale : default is 1
  colAlign: 'top'
  colDirection='vertical'
  contentHeight: 'auto'
  contentHeightUnit: '' | 'px' | 'rem' | 'em' | '%' | 'vh'
  contentPadding: 0
  contentPosition: 'center'
   */
  const {
    index,
    scale,
    colAlign,
    colDirection,
    contentHeight,
    contentHeightUnit,
    contentPadding,
    contentPosition,
    isEditMode,
    style,
  } = props;
  /*
  for Col by 3rd library's parameters
   */
  const {
    xs,
    sm,
    md,
    lg,
  } = props; // from parent or self
  /*
  output view
   */
  const enhancedCSS = Object.assign(
    {},
    cssStyles.col,
    colAlign,
    colDirection.normal,
    contentPosition,
    {
      height: contentHeight + contentHeightUnit,
      overflow: 'auto',
      padding: contentPadding,
    }
  );
  const gridColHoverClassName = `gridLayoutColHover_${uuid.v4()}`;

  const element = React.createElement(
    ReactFlexboxGridCol,
    Object.assign({},
      {
        className: [gridColHoverClassName].join(' '),
      },
      {
        style: Object.assign(
          {},
          enhancedCSS,
          style, // overwrite by user | coder
        ),
      },
      // set col, so use responsive, prefer1 || prefer2 || default(auto)
      ((xs && { xs }) || { xs: scale }) || { xs },
      ((sm && { sm }) || { sm: scale }) || { sm },
      ((md && { md }) || { md: scale }) || { md },
      ((lg && { lg }) || { lg: scale }) || { lg },
    ),
    [
      children,
      /*
      append CSS to enhance inline style
      @see https://fb.me/react-warning-keys
       */
      <style key={uuid.v4()}>
        {isEditMode && `.${gridColHoverClassName}:hover {${colDirection.hover}}`}
        {isEditMode &&
          `.${gridColHoverClassName} {${(index % 2) ? cssStyles.colCSSEven : cssStyles.colCSSOdd}}`}
      </style>,
    ]
  );

  return element;
};

Col.displayName = 'GridLayoutCol';

Col.propTypes = {
  index: PropTypes.number.isRequired,
  scale: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.any, // ex: undefined
  ]),
  colAlign: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any, // ex: undefined
  ]),
  colDirection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any, // ex: undefined
  ]),
  contentHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any, // ex: undefined
  ]),
  contentHeightUnit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any, // ex: undefined
  ]),
  contentPadding: PropTypes.number,
  contentPosition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any, // ex: undefined
  ]),
  style: PropTypes.object, // css
  isEditMode: PropTypes.bool, // with css hint
};

Col.defaultProps = {
  index: 0,
  scale: undefined,
  colAlign: 'top',
  colDirection: 'vertical',
  contentHeight: 'auto',
  contentHeightUnit: '',
  contentPadding: 0,
  contentPosition: 'top-left',
  style: {},
  isEditMode: false,
};

export default Col;
