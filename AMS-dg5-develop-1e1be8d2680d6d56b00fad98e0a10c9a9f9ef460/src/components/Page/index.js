import React from 'react';
import { propTypes, defaultProps, STYLE, CHILDREN } from './props';
import './style.less';

const Page = props => (
  <div className="paper-style" style={props[STYLE]}>
    {props[CHILDREN]}
  </div>
);
Page.defaultProps = defaultProps;
Page.propTypes = propTypes;

export default Page;
