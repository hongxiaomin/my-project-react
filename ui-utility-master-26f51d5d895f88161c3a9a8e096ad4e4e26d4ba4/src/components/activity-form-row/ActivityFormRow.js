import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationArrow from 'material-ui/svg-icons/navigation/arrow-forward';
import { COLOR, VALID_DISPATCH_PAGE } from '../../constants/config';
import { getAllPageNames } from '../../utils';
import styles from './activityFormRowStyles';

const DeleteButton = props => (
  <IconButton {...props} iconStyle={styles.iconStyle}><ActionDelete /></IconButton>
);

const DefaultSelectField = props => (
  <SelectField {...props} floatingLabelFixed style={styles.textField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} menuStyle={styles.menu}
  />
);

export default class ActivityFormRow extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectFieldChange = this.onSelectFieldChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      page: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStencil !== this.props.selectedStencil) {
      const stencilContent = Object.keys(nextProps.selectedStencil).length;
      if (stencilContent !== 0) {
        const actions = nextProps.selectedStencil.props.onTouchTap;
        if (actions !== undefined) {
          for (let i = 0; i < actions.length; i++) {
            if (actions[i].name === 'push') {
              this.setState({ page: actions[i].args[0] });
            }
          }
        } else {
          this.setState({ page: '' });
        }
      } else if (stencilContent === 0) {
        this.setState({ page: '' });
      }
    }
  }

  onClose() {
    this.setState({ page: '' });
    this.props.closeStencilEditorDrawer();
  }

  onDelete() {
    this.setState({ page: '' });
    this.props.onDeleteActivity(this.props.selectedStencil.id);
  }

  // only if SelectField has value will do submit
  onSubmit() {
    if (this.state.page.length !== 0) {
      this.props.onActivityFormSubmit(this.props.selectedStencil.id, this.state.page);
    }
  }

  onSelectFieldChange(event, index, value) {
    this.setState({ page: value });
  }

  getButtonStyle() {
    let deleteIconStyle;
    if (this.state.page.length === 0) {
      deleteIconStyle = { top: -16 };
    } else {
      deleteIconStyle = { top: 6 };
    }
    return deleteIconStyle;
  }

  render() {
    // only VALID_DISPATCH_PAGE can dispatch to another pages
    return (
      VALID_DISPATCH_PAGE.indexOf(this.props.selectedStencil.name) > -1 &&
      <div style={styles.container}>
        <div style={styles.row}>
          <DeleteButton style={this.getButtonStyle()} onClick={this.onDelete} />
          <DefaultSelectField floatingLabelText="go to specific page" value={this.state.page}
            onChange={this.onSelectFieldChange}
          >
            {getAllPageNames(this.props.routes).map((page, i) =>
              <MenuItem key={i} value={page} primaryText={page} style={styles.menuItem} />
            )}
          </DefaultSelectField>
        </div>
        <FloatingActionButton mini onClick={this.onSubmit} backgroundColor={'#18bf2f'}
          style={styles.floatButton}
        >
          <NavigationCheck />
        </FloatingActionButton>
        <FloatingActionButton mini onClick={this.onClose} style={styles.floatButton}
          backgroundColor={COLOR.GREY[600]}
        >
          <NavigationArrow />
        </FloatingActionButton>
      </div>
    );
  }
}

ActivityFormRow.propTypes = {
  routes: PropTypes.array,
  selectedStencil: PropTypes.object.isRequired,
  closeStencilEditorDrawer: PropTypes.func.isRequired,
  onActivityFormSubmit: PropTypes.func.isRequired,
  onDeleteActivity: PropTypes.func.isRequired,
};
