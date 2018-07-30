import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import PageEditorModalContainer from '../../containers/PageEditorModalContainer';
import { getAllPageNames } from '../../utils';
import styles from './pageManagerToolbarStyles';

const iconButtons = [
  { tooltip: 'Delete Current Page', icon: <ActionDelete />, click: 'onDeleteClick' },
  { tooltip: 'Edit Page Name', icon: <ImageEdit />, click: 'onEditClick' },
  { tooltip: 'Create new page', icon: <ContentAdd />, click: 'onAddClick' },
  { tooltip: 'Clone Current Page', icon: <ContentCopy />, click: 'onCloneClick' },
];

export default class PageManagerToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.currentPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({
        page: nextProps.currentPage,
      });
    }
  }

  onChange = (event, index, value) => {
    this.setState({ page: value });
    this.props.onPageSwitch(value);
  }

  render() {
    return (
      <div style={styles.container}>
        <SelectField value={this.state.page} onChange={this.onChange}
          style={styles.selectField} underlineStyle={styles.underline}
          iconStyle={styles.dropdownIcon} labelStyle={styles.label}
        >
          {getAllPageNames(this.props.routes).map((page, index) =>
            <MenuItem key={index} value={page} primaryText={page} />
          )}
        </SelectField>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild style={styles.toolbarGroup}>
            {iconButtons.map((button, index) => {
              let style;
              if (index === iconButtons.length - 1) {
                style = Object.assign({}, styles.iconButton, styles.lastIconButton);
              } else {
                style = styles.iconButton;
              }
              return (
                <IconButton style={style} tooltip={button.tooltip} iconStyle={styles.icon}
                  key={index} tooltipPosition="bottom-right"
                  onTouchTap={this.props[button.click]}
                >
                  {button.icon}
                </IconButton>
              );}
            )}
          </ToolbarGroup>
        </Toolbar>
        <PageEditorModalContainer />
      </div>
    );
  }
}

PageManagerToolbar.propTypes = {
  currentPage: PropTypes.string,
  routes: PropTypes.array,
  onPageSwitch: PropTypes.func.isRequired,
};
