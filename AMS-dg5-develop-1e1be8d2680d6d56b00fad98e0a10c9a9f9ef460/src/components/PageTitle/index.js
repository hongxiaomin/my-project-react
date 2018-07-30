
import React from 'react';
import { defaultProps, propTypes, LOGO, LOGOWIDTH, ALT, TITLESTYLE, LABELSTYLE } from './props';
import './style.less';

const PageTitle = props => (
  <div className="page-title-style" style={props[TITLESTYLE]}>
    <img src={props[LOGO]} alt={props[ALT]} width={props[LOGOWIDTH]} />
    <span className="title" style={props[LABELSTYLE]}>{props.title}</span>
  </div>
);
PageTitle.defaultProps = defaultProps;
PageTitle.propTypes = propTypes;

export default PageTitle;
