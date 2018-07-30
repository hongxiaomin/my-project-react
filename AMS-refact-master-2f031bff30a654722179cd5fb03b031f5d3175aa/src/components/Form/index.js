/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Form extends React.Component {
  componentWillMount() {
    this.props.onInitial();
  }
  render() {
    return (
      <div
        name={this.props.name}
        action={this.props.action}
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
Form.defaultProps = {
};
Form.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.style),
};

export default Form;
