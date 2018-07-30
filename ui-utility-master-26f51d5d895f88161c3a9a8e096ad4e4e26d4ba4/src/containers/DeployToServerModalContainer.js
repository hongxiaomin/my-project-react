import { connect } from 'react-redux';
import DeployToServerModal from '../components/deploy-to-server-modal';
import {
  closeDeployToServerModal,
  openDeployToServerToast,
  closeDeployToServerToast,
  updateDeployToServerFeedback,
} from '../actions';

import { outputZip } from '../utils';

const mapStateToProps = (state) => ({
  isDeployToServerModalOpen: state.getIn(['options', 'deployToServerModal', 'open']),
  isDeployToServerToastOpen: state.getIn(['options', 'deployToServerToast', 'open']),
  deployToServerFeedback: state.getIn(['fields', 'deployToServerFeedback']),
  routing: state.get('routing').toJS(),
  mqttSetting: state.getIn(['fields', 'mqttSetting']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closeDeployToServerModal: () => {
    dispatch(closeDeployToServerModal());
  },
  doDeployToServer: ({ apiURI, zipName, routing, mqttSetting }) => {
    outputZip({
      apiURI,
      zipName,
      routing,
      mqttSetting,
      callback: (json) => {
        dispatch(updateDeployToServerFeedback(json));
        dispatch(openDeployToServerToast());

        setTimeout(() => {
          dispatch(closeDeployToServerToast(json));
          // time use the same value with the ui
        }, 5000);
      },
    });

    dispatch(closeDeployToServerModal());
  },
  closeDeployToServerToast: () => {
    dispatch(closeDeployToServerToast());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeployToServerModal);
