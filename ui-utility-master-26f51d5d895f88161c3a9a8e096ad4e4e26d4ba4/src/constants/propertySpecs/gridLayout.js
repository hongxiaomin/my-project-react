import React from 'react';
import {
  colAlignBottom,
  colAlignCenter,
  colAlignTop,
  colDirectionHorizontal,
  colDirectionVertical,
  contentPositionBottomLeft,
  contentPositionBottomMiddle,
  contentPositionBottomRight,
  contentPositionCenter,
  contentPositionMiddleLeft,
  contentPositionMiddleRight,
  contentPositionTopLeft,
  contentPositionTopMiddle,
  contentPositionTopRight,
} from '../../components/grid-layout/img';

import {
  // BOOLEAN,
  ENUM,
  NUMBER,
  // OBJECT,
  // STRING,
} from '../propertyTypes';
/**
 * define props type for pop INPUT in drawer (for user)
 * Key order will effect render order
 *
 * undefined value -> alis name is 'auto' in drawer (for user)
 * 0 value -> alis name is 'auto' in drawer (for user)
 *
 * @type {Object} {
 *       key: {
 *         type,
 *         defaultValue, // undefined(enum) | 0(number) | ''(string)
 *         enum, // options
 *         min, // options
 *         max, // options
 *         dependency, // options
 *         hintForInput: // options
 *         alias: // options
 *       },
 *       sytle, // config for disable css key
 * }
 */
export default {
  col: {
    type: ENUM,
    defaultValue: 1,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  distribution: {
    type: ENUM,
    defaultValue: undefined,
    enum: [
      undefined,
      'around',
      'between',
    ],
  },
  // padding: {
  //   type: NUMBER,
  //   defaultValue: 8, // at least 8
  //   min: 8,
  //   max: undefined,
  // },
  scale: {
    type: NUMBER,
    defaultValue: 1,
    min: 1,
    max: undefined,
    dependency: 'col',
  },
  colDirection: {
    type: ENUM,
    defaultValue: 'vertical',
    enum: [
      {
        value: 'vertical',
        alias: <img width="24" src={colDirectionVertical} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'horizontal',
        alias: <img width="24" src={colDirectionHorizontal} style={{ paddingTop: 14 }} />,
      },
    ],
    dependency: 'col',
  },
  contentPadding: {
    type: NUMBER,
    defaultValue: 0, // ==> auto
    min: 0,
    max: undefined,
    dependency: 'col',
  },
  contentHeight: {
    type: NUMBER,
    defaultValue: 0, // ==> auto
    min: 0,
    max: undefined,
    dependency: 'col',
  },
  contentHeightUnit: {
    type: ENUM,
    defaultValue: undefined,
    enum: [
      undefined,
      'px',
      'rem',
      'em',
      '%',
      'vh',
    ],
    dependency: 'col',
  },
  colAlign: {
    type: ENUM,
    defaultValue: undefined,
    enum: [
      undefined,
      {
        value: 'top',
        alias: <img width="24" src={colAlignTop} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'center',
        alias: <img width="24" src={colAlignCenter} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'bottom',
        alias: <img width="24" src={colAlignBottom} style={{ paddingTop: 14 }} />,
      },
    ],
    dependency: 'col',
  },
  contentPosition: {
    type: ENUM,
    defaultValue: 'top-left',
    enum: [
      {
        value: 'top-left',
        alias: <img width="24" src={contentPositionTopLeft} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'middle-left',
        alias: <img width="24" src={contentPositionMiddleLeft} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'bottom-left',
        alias: <img width="24" src={contentPositionBottomLeft} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'top-middle',
        alias: <img width="24" src={contentPositionTopMiddle} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'center',
        alias: <img width="24" src={contentPositionCenter} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'bottom-middle',
        alias: <img width="24" src={contentPositionBottomMiddle} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'top-right',
        alias: <img width="24" src={contentPositionTopRight} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'middle-right',
        alias: <img width="24" src={contentPositionMiddleRight} style={{ paddingTop: 14 }} />,
      },
      {
        value: 'bottom-right',
        alias: <img width="24" src={contentPositionBottomRight} style={{ paddingTop: 14 }} />,
      },
    ],
    dependency: 'col',
  },
  style: {
    Background: false,
    Border: false,
    'Classification and Positioning': false,
    Font: false,
    Text: false,
    Padding: {
      padding: '8px', // the same value with its props
    },
  },
};
