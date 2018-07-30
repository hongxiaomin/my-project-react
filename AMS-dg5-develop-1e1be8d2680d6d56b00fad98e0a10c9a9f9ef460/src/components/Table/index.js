/**
fileName    : index.js
writer      : **Chao.Wang**
reviewers   : **Chao.Wang**
*/

import React from 'react';
import { Table as CommonTable } from '@delta/common-utils';
import {
  propTypes,
  defaultProps,
} from './props';
import './style.less';

const Table = props => (
  <CommonTable
    {...props}
  />
);
Table.defaultProps = defaultProps;
Table.propTypes = propTypes;

export default Table;
