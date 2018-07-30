import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import MQTTSettingModalContainer from '../../containers/MQTTSettingModalContainer';
import DeployToServerModalContainer from '../../containers/DeployToServerModalContainer';
import StencilCloneModalContainer from '../../containers/StencilCloneModalContainer';
import StencilCloneExplainModalContainer from '../../containers/StencilCloneExplainModalContainer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import AVPlayCircle from 'material-ui/svg-icons/av/play-circle-filled';
import ActionDelete from 'material-ui/svg-icons/action/delete';
// import ContentRedo from 'material-ui/svg-icons/content/redo';
// import ContentUndo from 'material-ui/svg-icons/content/undo';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionSetting from 'material-ui/svg-icons/action/settings';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { ROOT_DIV_ID } from '../../constants/config';
import { version } from '../../../package.json';
import styles from './appBarStyles';

const iconButtons = [
  // { tooltip: '', icon: <ContentUndo />, disabled: true },
  // { tooltip: '', icon: <ContentRedo />, disabled: true },
  { tooltip: 'Clone Stencil', icon: <ContentCopy /> },
  { tooltip: 'Delete Stencil', icon: <ActionDelete />, click: 'onDeleteClick' },
  { tooltip: 'Save JSON', icon: <FileDownload />, click: 'onJSONSaveClick' },
  { tooltip: 'Load JSON', icon: <FileUpload /> },
  { tooltip: 'Export HTML', icon: <ContentSave />, click: 'onProjectSaveClick' },
  { tooltip: 'Deploy to Server', icon: <CloudDownload />, click: 'onDeploySetUp' },
  { tooltip: 'Preview Mode', icon: <AVPlayCircle />, click: 'onModeChange' },
  { tooltip: 'MQTT Setup', icon: <ActionSetting />, click: 'onMQTTSetUp' },
];

class Appbar extends Component {
  constructor() {
    super();
    this._openFileDialog = this._openFileDialog.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.onCloneClick = this.onCloneClick.bind(this);
    this.openCloneModalClick = this.openCloneModalClick.bind(this);
    this.openCloneExplainModalClick = this.openCloneExplainModalClick.bind(this);
  }

  onCloneClick() {
    this.props.onCloneClick();
  }

  openCloneExplainModalClick() {
    this.props.onOpenStencilCloneExplainModalClick();
  }

  openCloneModalClick = (type) => () => {
    this.props.onOpenStencilCloneModalClick(type);
  }

  _openFileDialog() {
    this.refs.fileUpload.click();
  }

  _handleChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.onJSONLoadClick(event.target.result);
    };
    reader.readAsText(file);
  }

  render() {
    const { id } = this.props.selectedStencil;
    const title = (
      <ListItem style={styles.primaryText} primaryText="UI UTILITY" disabled
        secondaryText={<span style={{ margin: 3 }}>{`ver. ${version}`}</span>}
      />
    );

    const headerUI = this.props.mode === 'edit' ?
        (
          <div>
            <AppBar
              style={styles.appbar}
              title={title}
              showMenuIconButton={false}
              iconStyleRight={styles.iconStyleRight}
              iconElementRight={
                <div>
                  {iconButtons.map((button, index) => {
                    if (button.tooltip === 'Load JSON') {
                      return (
                        <span key={index}>
                          <IconButton iconStyle={styles.icon}
                            tooltip={button.tooltip} tooltipPosition="bottom-center"
                            onTouchTap={this._openFileDialog}
                          >
                            {button.icon}
                          </IconButton>
                          <input ref="fileUpload" type="file"
                            style={{ display: 'none' }} onChange={this._handleChange}
                          />
                        </span>
                      );
                    } else if (button.tooltip === 'Clone Stencil') {
                      return (
                        <IconMenu key={index}
                          iconButtonElement={
                            <IconButton iconStyle={styles.icon}
                              tooltip={button.tooltip} tooltipPosition="bottom-center"
                            >
                              {button.icon}
                            </IconButton>
                          }
                        >
                          <MenuItem primaryText="Clone to this page"
                            disabled={id === ROOT_DIV_ID} onTouchTap={this.onCloneClick}
                          />
                          <MenuItem primaryText="Clone to other pages" disabled={id === ROOT_DIV_ID}
                            onTouchTap={this.openCloneModalClick('clone')}
                          />
                          <MenuItem primaryText="Link Clone to other pages"
                            disabled={id === ROOT_DIV_ID}
                            onTouchTap={this.openCloneModalClick('link clone')}
                          />
                          <MenuItem primaryText="What's the difference ?"
                            onTouchTap={this.openCloneExplainModalClick}
                          />
                        </IconMenu>
                      );
                    }
                    return (
                      <IconButton iconStyle={styles.icon} key={index} tooltip={button.tooltip}
                        tooltipPosition="bottom-center" disabled={button.disabled}
                        onTouchTap={this.props[button.click]}
                      >
                        {button.icon}
                      </IconButton>
                    );}
                  )}
                </div>
              }
            />
            <StencilCloneModalContainer />
            <StencilCloneExplainModalContainer />
            <MQTTSettingModalContainer />
            <DeployToServerModalContainer />
          </div>
        ) :
        (
          <div>
            <FloatingActionButton
              mini
              backgroundColor={styles.floatingActionButtonBackgroundColor}
              style={styles.floatingActionButton}
              data-tip="Back to edit mode"
              data-for="floatingEditModeBtnWithToolip"
              iconStyle={styles.floatingActionButtonIcon}
              children={<ContentClear />}
              onClick={this.props.onModeChange}
            />
            <ReactTooltip id="floatingEditModeBtnWithToolip" effect="solid" />
          </div>
        );

    return headerUI;
  }
}

Appbar.propTypes = {
  mode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired,
  selectedStencil: PropTypes.object.isRequired,
  onJSONLoadClick: PropTypes.func.isRequired,
  onCloneClick: PropTypes.func.isRequired,
  onOpenStencilCloneModalClick: PropTypes.func.isRequired,
  onOpenStencilCloneExplainModalClick: PropTypes.func.isRequired,
};

export default Appbar;
