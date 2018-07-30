import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline';
import { PAGE_NAME_RULE } from '../../constants/config';
import { getAllPageNames } from '../../utils';
import styles from './pageEditorModalStyles';

const DefaultDialog = props => (
  <Dialog {...props} titleStyle={styles.title} contentStyle={{ width: '50%' }} />
);

const DefaultTextField = props => (
  <TextField {...props} style={styles.textField} inputStyle={styles.input} autoFocus />
);

export default class PageEditorModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pageName: '',
    };
  }

  onCancel() {
    this.setState({
      pageName: '',
    });
    this.props.closePageEditorModal();
  }

  onSubmit() {
    if (this.state.pageName.length > 0) {    // only if user input, or won't submit
      this.props.onSubmitClick(this.state.pageName);
    } else if (this.props.pageManagerAction === 'delete') {    // delete page no need to input
      this.props.onSubmitClick();
    }
    this.setState({
      pageName: '',
    });
    this.props.closePageEditorModal();
  }

  checkPageName(pageName) {
    const existingPageNames = getAllPageNames(this.props.routes);
    if (existingPageNames.indexOf(pageName) > -1) {
      return {
        style: styles.errorStyle,
        hint: 'this name is already taken',
      };
    }
    const regexp = /^[a-zA-Z_$]((?! )[0-9a-zA-Z_$])*$/gm;
    const matchRule = regexp.test(pageName);
    const hasSpace = /\s/.test(pageName);
    if (pageName.length !== 0 && (!matchRule || hasSpace)) {
      return {
        style: styles.errorStyle,
        hint: 'page name violates the rules',
      };
    }
    return false;
  }

  handleChange(event) {
    this.setState({
      pageName: event.target.value,
    });
  }

  renderDialog() {
    const { pageEditorModalOpen, pageManagerAction } = this.props;
    const { pageName } = this.state;
    let title;
    let hintText = 'Page Name';
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        labelStyle={styles.label}
        onTouchTap={this.onCancel}
      />,
      <FlatButton
        label="Submit"
        primary
        labelStyle={styles.label}
        onTouchTap={this.onSubmit}
        disabled={pageManagerAction !== 'delete' &&
          (pageName.length === 0 || this.checkPageName(pageName) !== false)}
      />,
    ];

    if (pageManagerAction === 'add' || pageManagerAction === 'clone') {
      title = 'Enter name for new page';
    } else if (pageManagerAction === 'edit') {
      title = 'Edit name for current page';
      hintText = `Current Page Name: ${this.props.currentPage}`;
    } else if (pageManagerAction === 'delete') {
      if (this.props.routes.length === 1) {
        title = `Current page will NOT be deleted since it is the only page.
          Click "Submit" will delete all content of this page.`;
      } else {
        title = 'Are you sure you want to delete current page ?';
      }
    }
    return (
      <DefaultDialog
        title={title}
        modal={false}
        onRequestClose={this.onCancel}
        actions={actions}
        open={pageEditorModalOpen}
      >
        {pageManagerAction !== 'delete' &&
          <div>
            <div style={{ marginTop: -15, display: 'flex' }}>
              <DefaultTextField onChange={this.handleChange} hintText={hintText}
                errorText={this.checkPageName(pageName).hint}
                errorStyle={this.checkPageName(pageName).style}
              />
            </div>
            <List style={{ marginTop: 5 }}>
              <ListItem
                primaryText={<div style={styles.hintText}>Rules for page name</div>}
                leftIcon={<LightBulb color="green" />}
                initiallyOpen
                primaryTogglesNestedList
                nestedItems={
                  PAGE_NAME_RULE.map((rule, index) =>
                    <ListItem
                      key={index}
                      disabled
                      primaryText={`${index + 1}. ${rule}`}
                      style={{ marginTop: -15 }}
                    />)
                }
              />
            </List>
          </div>
        }
      </DefaultDialog>
    );
  }

  render() {
    return (
      this.renderDialog()
    );
  }
}

PageEditorModal.propTypes = {
  pageEditorModalOpen: PropTypes.bool.isRequired,
  closePageEditorModal: PropTypes.func.isRequired,
  pageManagerAction: PropTypes.string.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  routes: PropTypes.array,
};
