import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import MQTTSettingModal from '../components/mqtt-setting-modal';
import { initMqttClient } from '../constants/mqttClient';
import {
  closeMQTTSettingModal, setMQTTSetting,
} from '../actions';

const mapStateToProps = (state) => ({
  mqttSettingModalOpen: state.getIn(['options', 'mqttSettingModal', 'open']),
  mqttSetting: state.getIn(['fields', 'mqttSetting']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closeMQTTSettingModal: () => {
    dispatch(closeMQTTSettingModal());
  },
  onMQTTSettingFormSubmit: (mqttSetting) => {
    dispatch(setMQTTSetting({ mqttSetting: fromJS(mqttSetting) }));
    initMqttClient(mqttSetting);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MQTTSettingModal);
