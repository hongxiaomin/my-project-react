import React from 'react';
import { defaultProps, propTypes, PAGETITLE, CHILDREN } from './props';
import './style.less';

const TitleBar = props => (
  <div className="my-title-bar-style">
    {props[PAGETITLE]}
    <div className="search-area">
      {props[CHILDREN]}
    </div>
  </div>
);
TitleBar.defaultProps = defaultProps;
TitleBar.propTypes = propTypes;

export default TitleBar;
