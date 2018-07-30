/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { GUID } from '../../utils/Common';

class Input extends React.Component {
  componentDidMount() {
    if (this.props.onInitail) {
      this.props.onInitail();
    }
  }
  render() {
    if (this.props.textarea) {
      return (
        <textarea
          id={this.props.name}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
          style={this.props.style}
          className={this.props.className}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          onKeyDown={this.props.onKeyDown}
        />
      );
    }
    return (
      <input
        id={this.props.name}
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        style={this.props.style}
        className={this.props.className}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

Input.defaultProps = {
  name: GUID(),
  value: '',
  className: 'form-control',
};
Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onInitail: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  textarea: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
};

export default Input;
