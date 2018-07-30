/**
fileName    : index.js
writer      : **Chao.Wang**
reviewers   : **Chao.Wang**
*/

import React from 'react';
import { RaisedButton } from '@delta/common-utils';
import {
  propTypes,
  defaultProps,
} from './props';
import './style.less';

const Button = props => (
  <RaisedButton
    {...props}
  />
);
Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
