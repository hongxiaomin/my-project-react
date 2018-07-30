import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from './MQTTSettingModalStyles';

const DefaultTextField = props => (
  <div style={styles.inputContainer}>
    <TextField floatingLabelFixed style={styles.textField} inputStyle={styles.text}
      floatingLabelStyle={styles.floatingLabel} type="text" {...props}
    />
  </div>
);

export default class MQTTSettingModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mqttSettingModalOpen && !this.props.mqttSettingModalOpen) {
      this.state = nextProps.mqttSetting;
      this.setState(
        this.state
      );
    }
  }

  onCancel = () => {
    this.props.closeMQTTSettingModal();
    this.state = {};
    this.setState(
      this.state
    );
  }

  onSubmit = () => {
    this.state.port = Number(this.state.port);
    this.props.onMQTTSettingFormSubmit(this.state);
    this.props.closeMQTTSettingModal();
    this.state = {};
    this.setState(
      this.state
    );
  }

  onChange = (key) => (event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  isEmpty(value) {
    if (value === undefined || value.length === 0 ||
      value.toString().replace(/\s/g, '').length === 0) {
      return '* required';
    }
    return false;
  }

  render() {
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
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        onRequestClose={this.onCancel}
        open={this.props.mqttSettingModalOpen}
        contentStyle={{ width: '40%' }}
      >
        <div>
          <DefaultTextField floatingLabelText="IP"
            autoFocus
            value={this.state.ip}
            onChange={this.onChange('ip')}
            errorText={this.isEmpty(this.state.ip)}
            errorStyle={styles.errorStyle}
          />
          <DefaultTextField floatingLabelText="Port Number"
            value={this.state.port}
            onChange={this.onChange('port')}
            errorText={this.isEmpty(this.state.port)}
            errorStyle={styles.errorStyle}
          />
          <DefaultTextField floatingLabelText="User Name"
            value={this.state.username}
            onChange={this.onChange('username')}
          />
          <DefaultTextField floatingLabelText="Password"
            value={this.state.password}
            onChange={this.onChange('password')}
          />
        </div>
      </Dialog>
    );
  }
}

MQTTSettingModal.propTypes = {
  mqttSettingModalOpen: PropTypes.bool.isRequired,
  closeMQTTSettingModal: PropTypes.func.isRequired,
  onMQTTSettingFormSubmit: PropTypes.func.isRequired,
  mqttSetting: PropTypes.object.isRequired,
};
