import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'whatwg-fetch';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

import cssStyles from './DeployToServerModalStyles';

/**
 * DeployToServerModal
 * deploay button
 */
class DeployToServerModal extends Component {
  /**
   * [constructor description]
   * @param  {Object} props [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      apiURI: this.props.apiURI,
      isURIHttpSuccess: this.props.isURIHttpSuccess,
    };
  }
  /**
   * init
   * @return {[type]} [description]
   */
  resetProps =() => {
    this.setState({
      apiURI: this.props.apiURI,
      isURIHttpSuccess: this.props.isURIHttpSuccess,
    });
  };
  /**
   * handle button on dialog with cancel
   */
  handleCancelBtn = () => {
    this.props.closeDeployToServerModal();

    this.resetProps();
  };
  /**
   * handle button on dialog with deploy
   */
  handleDeployBtn = () => {
    const apiURI = this.state.apiURI;

    this.props.doDeployToServer({
      routing: this.props.routing,
      mqttSetting: this.props.mqttSetting,
      apiURI,
    });

    this.resetProps();
  };
  /**
   * handle onChange
   * @param  {String} key [description]
   */
  handleChange = (key) => (event) => {
    this.setState({
      [key]: event.target.value,
    });

    if (key === 'apiURI') {
      this.testHttp(event.target.value);
    }
  };
  /**
   * test api uri is ok
   * @param  {String} uri http://domain:port/api
   */
  testHttp = (uri) => {
    /**
     * http status
     * @param  {Object} response Promise
     * @see https://github.com/github/fetch
     * @see https://zh.wikipedia.org/zh-tw/HTTP%E7%8A%B6%E6%80%81%E7%A0%81?oldformat=true
     */
    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({
          isURIHttpSuccess: true,
        });

        return response;
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    };

    window.fetch(uri, { method: 'OPTIONS' })
      .then(checkStatus)
      .catch((error) => {
        window.console.info('fetch error', error);
        this.setState({
          isURIHttpSuccess: false,
        });
      });
  };
  /**
   * open a new window
   * @return {[type]} [description]
   */
  handleActionTouchTap = () => {
    const json = this.props.deployToServerFeedback;

    if (json && json.url) {
      window.open(json.url);
    }

    this.props.closeDeployToServerToast();
  };
  /**
   * output view
   * @return {React} [description]
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCancelBtn}
      />,
      <FlatButton
        label="Deploy"
        primary
        onTouchTap={this.handleDeployBtn}
        disabled={!this.state.isURIHttpSuccess}
        labelPosition="before"
        icon={
          this.state.isURIHttpSuccess ?
          <ActionDone color={'green'} /> : <ContentClear color={'red'} />
        }
      />,
    ];
    /*
    message too long to show ActionTouchTap btn
     */
    const deployToServerFeedback = this.props.deployToServerFeedback;
    const toastURI = deployToServerFeedback.url ?
      (deployToServerFeedback.url.length > 40 &&
        `${deployToServerFeedback.url.substring(0, 40)}...`) || deployToServerFeedback.url
      : 'fail';

    return (
      <div>
        <Dialog
          title="Deploy to server (METHOD: POST)"
          titleStyle={cssStyles.title}
          actions={actions}
          modal={false}
          onRequestClose={this.handleCancelBtn}
          open={this.props.isDeployToServerModalOpen}
          contentStyle={cssStyles.dialogContentStyle}
        >
          <TextField
            autoFocus
            style={cssStyles.textField}
            floatingLabelText="API URI"
            hintText="http://yourdomain:port/uri"
            defaultValue={this.state.apiURI}
            onChange={this.handleChange('apiURI')}
          />
          <div style={cssStyles.hintText}>
            If you want a readable domain name,<br />
            you can use "http://10.120.136.90:3010/apps?id={'{yourAppName}'}"
            <br /><br />
            Example: http://10.120.136.90:3010/apps?id=drc
          </div>
        </Dialog>
        <Snackbar
          open={this.props.isDeployToServerToastOpen}
          message={`Deploy success : ${toastURI} `}
          action="Check it"
          autoHideDuration={5000}
          onActionTouchTap={this.handleActionTouchTap}
        />
      </div>
    );
  }
}

DeployToServerModal.displayName = 'DeployToServerModal';

DeployToServerModal.propTypes = {
  apiURI: PropTypes.string.isRequired,
  isURIHttpSuccess: PropTypes.bool.isRequired,
  isDeployToServerModalOpen: PropTypes.bool,
  isDeployToServerToastOpen: PropTypes.bool,
  deployToServerFeedback: PropTypes.object,
  routing: PropTypes.object,
  mqttSetting: PropTypes.object,
  closeDeployToServerModal: PropTypes.func,
  closeDeployToServerToast: PropTypes.func,
  doDeployToServer: PropTypes.func,
};

DeployToServerModal.defaultProps = {
  apiURI: 'http://10.120.136.90:3010/apps',
  isURIHttpSuccess: true,
  isDeployToServerModalOpen: false,
  isDeployToServerToastOpen: false,
  deployToServerFeedback: {
    success: false,
    url: '',
  },
};

export default DeployToServerModal;
