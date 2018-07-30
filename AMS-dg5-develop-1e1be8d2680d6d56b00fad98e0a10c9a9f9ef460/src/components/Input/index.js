/**
fileName    : index.js
writer      : Chao.Wang
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { getGUID as GUID } from '../../utils/Common';

class Input extends React.Component {
  componentDidMount() {
    if (this.props.onInitail) {
      this.props.onInitail();
    }
  }
  render() {
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
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

Input.defaultProps = {
  name: GUID(),
  value: '',
  className: 'form-control',
  placeholder: undefined,
  onInitail: undefined,
  onClick: undefined,
  onChange: undefined,
  style: undefined,
  disabled: undefined,
  onKeyDown: undefined,
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
  onKeyDown: PropTypes.func,
};

export default Input;
