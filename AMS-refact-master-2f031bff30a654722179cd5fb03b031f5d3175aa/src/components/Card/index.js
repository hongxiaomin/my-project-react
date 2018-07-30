/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const Card = props => (
  <div className="card" style={props.cardStyle}>
    <div style={props.titleStyle} className={props.titleClass}>
      <div className="title">
        {props.title}
      </div>
    </div>
    <div className="hr" />
    <div style={props.bodyStyle} className={props.bodyClass}>
      <div className="body">
        {props.children}
      </div>
    </div>
  </div>
);
Card.defaultProps = {
  titleClass: 'card-area',
  bodyClass: 'card-area',
};
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  cardStyle: PropTypes.objectOf(PropTypes.any),
  titleStyle: PropTypes.objectOf(PropTypes.any),
  titleClass: PropTypes.string,
  bodyStyle: PropTypes.objectOf(PropTypes.any),
  bodyClass: PropTypes.string,
};

export default Card;
