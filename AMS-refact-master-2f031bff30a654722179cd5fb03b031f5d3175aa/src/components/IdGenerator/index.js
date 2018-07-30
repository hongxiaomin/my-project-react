/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { GUID } from '../../utils/Common';
import {
  defaultComponentName,
  defaultHtmlFrom } from '../../constants/Config';
import './style.less';

class IdGenerator extends React.Component {
  componentWillMount() {
    const id = this.props.name ? this.props.name : GUID();
    const name = this.props.htmlFrom ? this.props.htmlFrom : this.props.name;
    const props = Object.assign({}, this.props);
    props.name = name;
    props.id = id;
    this.setState({ props });
  }
  render() {
    return (
      <this.props.component {...this.state.props} />
    );
  }
}
IdGenerator.defaultProps = {
  name: defaultComponentName,
  htmlFrom: defaultHtmlFrom,
};
IdGenerator.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  htmlFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default IdGenerator;
