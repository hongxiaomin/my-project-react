import React from 'react';
import PropTypes from 'prop-types';
import cssStyles from './tabFormActionStyles.js';

import RaisedButton from 'material-ui/RaisedButton';

import ActionInput from 'material-ui/svg-icons/action/input';
import ActionPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';

const TabFormAction = (props) => (
  <div style={cssStyles.actionContainer}>
    <RaisedButton
      label="Apply"
      labelPosition="before"
      icon={<ActionPlaylistAddCheck />}
      primary
      onClick={props.handleApplyBtn}
      style={cssStyles.raisedButton}
      labelStyle={cssStyles.raisedButtonLabel}
      disabled={!props.isApplyBtnClickable}
    />
    <RaisedButton
      label="Close"
      labelPosition="before"
      icon={<ActionInput />}
      onClick={props.handleCollapseBtn}
      style={cssStyles.raisedButton}
      labelStyle={cssStyles.raisedButtonLabel}
    />
  </div>
);

TabFormAction.displayName = 'TabFormAction';

TabFormAction.propTypes = {
  handleApplyBtn: PropTypes.func,
  handleCollapseBtn: PropTypes.func,
  isApplyBtnClickable: PropTypes.bool,
};

TabFormAction.defaultProps = {
  handleApplyBtn: () => {},
  handleCollapseBtn: () => {},
  isApplyBtnClickable: true,
};

export default TabFormAction;
