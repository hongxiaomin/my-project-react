/** writer: Chuck Wu */
import React from 'react';
import classnames from 'classnames';
import {
  defaultProps,
  propTypes,
  CARDCLASS,
  TITLECONTAINERSTYLE,
  TITLECONTAINERCLASS,
  TITLECLASS,
  TITLE,
  HRCLASS,
  BODYCONTAINERSTYLE,
  BODYCONTAINERCLASS,
  BODYCLASS } from './props';
import './style.less';

const Card = props => (
  <div className={classnames('card-style', props[CARDCLASS])}>
    <div
      style={props[TITLECONTAINERSTYLE]}
      className={classnames('card-area', props[TITLECONTAINERCLASS])}
    >
      <div className={classnames('title', props[TITLECLASS])}>
        {props[TITLE]}
      </div>
    </div>
    <div className={classnames('hr', props[HRCLASS])} />
    <div
      style={props[BODYCONTAINERSTYLE]}
      className={classnames('card-area', props[BODYCONTAINERCLASS])}
    >
      <div className={classnames('body', props[BODYCLASS])}>
        {props.children}
      </div>
    </div>
  </div>
);
Card.defaultProps = defaultProps;
Card.propTypes = propTypes;

export default Card;
