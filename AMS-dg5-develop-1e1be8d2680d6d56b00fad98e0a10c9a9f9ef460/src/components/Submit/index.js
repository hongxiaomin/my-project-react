/**
fileName    : index.js
writer      : **Chao.Wang**
reviewers   : **Chao.Wang**
*/

import React from 'react';
import { Input } from '@delta/common-utils';
import {
  propTypes,
  defaultProps,
} from './props';
import './style.less';

const Submit = props => (
  <Input
    {...props}
  />
);
Submit.defaultProps = defaultProps;
Submit.propTypes = propTypes;

export default Submit;
