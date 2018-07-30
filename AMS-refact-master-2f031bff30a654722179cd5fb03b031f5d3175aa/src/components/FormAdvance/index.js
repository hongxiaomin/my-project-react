/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import FormContainer from '../../containers/FormContainer';
import './style.less';

const FormAdvance = props => (
  <FormContainer
    name={props.name}
    action={props.action}
    className={props.className}
    style={props.style}
    onSubmit={props.onSubmit}
  >
    {props.children}
  </FormContainer>
);
FormAdvance.defaultProps = {
};
FormAdvance.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

export default FormAdvance;
