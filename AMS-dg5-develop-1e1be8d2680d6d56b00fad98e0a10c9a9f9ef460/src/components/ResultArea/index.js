import React from 'react';
import { defaultProps, propTypes, STYLE, CHILDREN } from './props';
import './style.less';

const ResultArea = props => (
  <div className="result-area-style" style={props[STYLE]}>
    {props[CHILDREN]}
  </div>
);
ResultArea.defaultProps = defaultProps;
ResultArea.propTypes = propTypes;

export default ResultArea;
