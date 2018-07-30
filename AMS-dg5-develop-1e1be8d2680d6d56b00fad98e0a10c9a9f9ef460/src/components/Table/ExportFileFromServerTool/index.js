import React from 'react';
import { message } from 'antd';
import { IconButton } from '@delta/common-utils';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';
import { ACTION, SELECTED } from './props';
import './style.less';


class ExportFileFromServerTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const {
      tooltip: tooltip = 'Download File',
      iconButtonStyle: iconButtonStyle = { height: '62px' },
      icon,
    } = this.props;
    return (
      <div
        style={{ display: 'inline-block' }}
        ref={(iconButton) => { this.iconButton = iconButton; }}
      >
        <IconButton
          name="icon-btn"
          style={iconButtonStyle}
          onClientClick={() => this.setState({ open: true })}
          tooltip={tooltip}
        >
          {icon}
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.iconButton}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={() => this.setState({ open: false })}
          style={{
            width: 180,
            maxWidth: '20%',
            height: 'auto',
          }}
        >
          <List>
            <ListItem
              primaryText="Export as XLSX"
              onClick={() => {
                if (this.props[ACTION] && this.props[SELECTED]) {
                  window.location.href = this.props[ACTION];
                  return;
                }
                message.config({
                  top: 60,
                  duration: 2,
                });
                message.error('请先选择下载内容');
              }}
            />
          </List>
        </Popover>
      </div>
    );
  }
}
export default ExportFileFromServerTool;
