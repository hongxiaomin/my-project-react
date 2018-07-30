import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row } from 'react-flexbox-grid';

import cssStyles from './gridLayoutStyles';

/**
 * [getRightScale description]
 *
 * get right scale:
 * case monitor - Col:3, scale:[1,1] | [1,4] | [3,2] | [1] | [1,5,1,6,5]
 * -> auto fill or splic value
 *
 * :: example
 *   ratio in 12
 *   [1,4] -> 1/5, 4/5 : 2,10
 *   [2,3] -> 2/5, 3/5 : 5,7
 *   [300,5] -> 300/305, 5/305 : 12,0
 *   [6,5] -> 6/11, 5/11 : 7,5
 *   ratio in 100
 *   100: [2,3] -> 40,60
 *
 * @param  {Array} scale         default is []
 * @param  {Number} col          default is 1
 * @param  {Number} totalGridCol default is 12
 * @return {Array}               [description]
 */
const getRightScale = (scale = [], col = 1, totalGridCol = 12) => {
  const rightScale = scale.length > col ?
    scale.splice(0, col) :
    scale.concat(Array(Math.max(0, col - scale.length)).fill(1));
  let sumScale = 0;
  // give default
  for (let i = 0, j = rightScale.length; i < j; i += 1) {
    if (rightScale[i] === undefined) {
      rightScale[i] = 1;
    }
  }
  // string to number (check)
  let convertedScales = rightScale.map((d) => {
    const digitalValue = Number(d);
    sumScale += digitalValue;

    return digitalValue;
  }).map((d) => Math.round((d / sumScale) * totalGridCol));
  /*
  remove scale value, let it auto
   */
  let isTheSameScale = true;
  convertedScales.map((value, index) => {
    if (index !== 0) {
      if (convertedScales[index - 1] !== value) {
        isTheSameScale = false;
      }
    }
    return value;
  });
  if (isTheSameScale) {
    convertedScales = convertedScales.map(() => (undefined));
  }

  return convertedScales;
};
/**
 * [getContentPositionCSS description]
 * @param  {String} colDirection    'vertical'
 * @param  {String} palaceGridName  'top-left'
 * @return {Object}                 {...}
 */
const getContentPositionCSS = (colDirection, palaceGridName) => {
  let css = {};
  const colDir = colDirection || 'vertical';

  if (colDir === 'horizontal') {
    switch (palaceGridName) {
      case 'top-left':
        css = cssStyles.positionTLInRow;
        break;
      case 'middle-left':
        css = cssStyles.positionMLInRow;
        break;
      case 'bottom-left':
        css = cssStyles.positionBLInRow;
        break;
      case 'top-middle':
        css = cssStyles.positionTMInRow;
        break;
      case 'center':
        css = cssStyles.positionCInRow;
        break;
      case 'bottom-middle':
        css = cssStyles.positionBMInRow;
        break;
      case 'top-right':
        css = cssStyles.positionTRInRow;
        break;
      case 'middle-right':
        css = cssStyles.positionMRInRow;
        break;
      case 'bottom-right':
        css = cssStyles.positionBRInRow;
        break;
      default:break;
    }
  } else {
    switch (palaceGridName) {
      case 'top-left':
        css = cssStyles.positionTLInColumn;
        break;
      case 'middle-left':
        css = cssStyles.positionMLInColumn;
        break;
      case 'bottom-left':
        css = cssStyles.positionBLInColumn;
        break;
      case 'top-middle':
        css = cssStyles.positionTMInColumn;
        break;
      case 'center':
        css = cssStyles.positionCInColumn;
        break;
      case 'bottom-middle':
        css = cssStyles.positionBMInColumn;
        break;
      case 'top-right':
        css = cssStyles.positionTRInColumn;
        break;
      case 'middle-right':
        css = cssStyles.positionMRInColumn;
        break;
      case 'bottom-right':
        css = cssStyles.positionBRInColumn;
        break;
      default:break;
    }
  }

  return css;
};
/*
 * [getColAlignCSS description]
 * @param  {String} alignName 'top'
 * @return {Object}           {...}
 */
const getColAlignCSS = (alignName) => {
  let css = {};

  switch (alignName) {
    case 'top':
      css = cssStyles.colAlignTop;
      break;
    case 'center':
      css = cssStyles.colAlignCenter;
      break;
    case 'bottom':
      css = cssStyles.colAlignBottom;
      break;
    default:break;
  }

  return css;
};
/**
 * [getColDirectionCSS description]
 * @param  {String} directionName 'vertical'
 * @return {String}               `css key: value`
 */
const getColDirectionCSS = (directionName) => {
  let css = {};

  switch (directionName) {
    case 'horizontal':
      css = {
        normal: cssStyles.colDirectionVCSS,
        hover: cssStyles.colDirectionVHoverCSS,
      };
      // css = Object.assign({}, cssStyles.colDirectionV, cssStyles.directionV);
      break;
    default:
    case 'vertical':
      css = {
        normal: cssStyles.colDirectionHCSS,
        hover: cssStyles.colDirectionHHoverCSS,
      };
      // css = Object.assign({}, cssStyles.colDirectionH, cssStyles.directionH);
      break;
  }

  return css;
};
/**
 * dynamic caculate
 * @param  {[type]} propObject [description]
 * @return {[type]}            [description]
 */
const getColProps = (propObject) => {
  /*
  ex:
  scale : [1,2] (after column is bigger then befre one), default is [1,1]
  col : 2 (has 2 column, at least 1)
  colAlign: ['top']
  colDirection: ['vertical']
  contentHeight: ['auto']
  contentHeightUnit: ['' | 'px' | 'rem' | 'em' | '%' | 'vh']
  contentPadding: [0]
  contentPosition: ['center']
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
  } = propObject; // from parent or self
  /*
  for Col by 3rd library's parameters
   */
  const {
    xs,
    sm,
    md,
    lg,
  } = propObject; // from parent or self
  /*
  set every col
   */
  // default or get defined value
  const colSettingsColAlign = (colAlign && colAlign[index] && getColAlignCSS(colAlign[index])) ||
    getColAlignCSS();
  const colSettingsContentPosition = (contentPosition && contentPosition[index] &&
    getContentPositionCSS(colDirection[index], contentPosition[index])) ||
    getContentPositionCSS(colDirection[index]);
  const colSettingsPadding = (contentPadding && contentPadding[index]) || 0;
  const colSettingsContentHeight = (contentHeight && contentHeight[index]) || 'auto';
  const colSettingsContentHeightUnit = (contentHeightUnit && contentHeightUnit[index]) ||
    (colSettingsContentHeight === 'auto' ? '' : 'px');
  const colSettingsColDirection = (colDirection && colDirection[index]
    && getColDirectionCSS(colDirection[index])) ||
    getColDirectionCSS();

  return {
    index,
    scale,
    colAlign: colSettingsColAlign,
    colDirection: colSettingsColDirection,
    contentHeight: colSettingsContentHeight,
    contentHeightUnit: colSettingsContentHeightUnit,
    contentPadding: colSettingsPadding,
    contentPosition: colSettingsContentPosition,
    xs,
    sm,
    md,
    lg,
    isEditMode,
  };
};

/**
 * wrap react-flexbox-grid library
 *
 * useage:
 * <GridLayout
 *   children={null}
 *   padding={8}
 *   scale={[1,1]}
 *   col={1}
 *   distribution={undefined}
 *   colDirection={[undefined, 'vertical']}
 *   colAlign={['top']}
 *   contentPosition={['top-left']}
 *   contentHeight={[undefined | 0, 200]}
 *   contentHeightUnit={['','px']}
 *   >
 *   {ReactElement here}
 * </GridLayout>
 *
 *
 * @see https://github.com/roylee0704/react-flexbox-grid
 * @see https://philipwalton.github.io/solved-by-flexbox/demos/grids/
 */
const GridLayout = (props) => {
  /*
  output

  padding at least is 8, for click-able
  distribution use one of them (xs | sm | md | lg ), could not use all, it will pick on by order
   */
  const { padding = 8, distribution, style } = props;
  const { children } = props; // from parent
  const gridHoverClassName = 'gridLayoutHover';

  return (
    <Grid
      style={
        Object.assign(
          {},
          cssStyles.grid,
          props.isEditMode && cssStyles.direction45,
          { padding },
          style, // overwrite by user | coder
        )
      }
      className={[gridHoverClassName].join(' ')}
    >
      {
        React.createElement(
          Row,
          Object.assign(
            {},
            {
              style: Object.assign(
                {},
                cssStyles.row,
                // style, // no open overwrite Row component css
              ),
            },
            distribution && { [distribution]: 'xs' },
          ),
          children,
          // getCols(props), // @depressed
        )
      }
      <style>
        {props.isEditMode && `.${gridHoverClassName}:hover {cursor: move}`}
      </style>
    </Grid>
  );
};

GridLayout.displayName = 'GridLayout';
// @see https://facebook.github.io/react/docs/typechecking-with-proptypes.html
GridLayout.propTypes = {
  // receive parent's
  children: PropTypes.node,           // content(s)
  // custom
  col: PropTypes.number.isRequired,   // how many column to split
  colAlign: PropTypes.array,          // how column self align others
  colDirection: PropTypes.array,      // how content go vertical or horizontal
  colPadding: PropTypes.array,        // how column inner padding
  contentHeight: PropTypes.array,     // content box's height
  contentHeightUnit: PropTypes.array, // content box'x height unit
  contentPosition: PropTypes.array,   // how content locate in a box
  distribution: PropTypes.string,     // how columns distribute
  padding: PropTypes.number,          // grid edge
  scale: PropTypes.array.isRequired,  // relativ size
  style: PropTypes.object,            // css
  // from 3rd library props
  xs: PropTypes.number, // size
  sm: PropTypes.number, // size
  md: PropTypes.number, // size
  lg: PropTypes.number, // size
  fluid: PropTypes.bool,
  xsOffset: PropTypes.number,
  start: PropTypes.string,   // horizontal align
  center: PropTypes.string,  // horizontal align
  end: PropTypes.string,     // horizontal align
  top: PropTypes.string,     // vertical align
  middle: PropTypes.string,  // vertical align
  bottom: PropTypes.string,  // vertical align
  around: PropTypes.string,  // distribution
  between: PropTypes.string, // distribution
  // custom attribute
  isEditMode: PropTypes.bool, // with css hint
};

GridLayout.defaultProps = {
  col: 2,
  colAlign: [undefined, undefined],
  colDirection: ['vertical', 'vertical'],
  colPadding: [0, 0],
  contentHeight: [undefined, undefined],
  contentHeightUnit: ['', ''],
  contentPosition: ['top-left', 'top-left'],
  distribution: undefined,
  padding: 8,
  scale: [1, 1],
  style: {},
  isEditMode: false,
};

export default GridLayout;

export {
  getRightScale,
  getColProps,
  getColAlignCSS,
};
