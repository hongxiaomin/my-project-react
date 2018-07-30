import 'paho-mqtt';
import uuid from 'uuid';

export let mqttClient = null;
export const initMqttClient = (mqttSetting) => {
  const { ip, port, username, password } = mqttSetting;
  mqttClient = new Paho.MQTT.Client(ip, port, uuid.v4());
  mqttClient.connect({
    userName: username,
    password,
    onSuccess: () => {
      window.console.log('MQTT Server Connected');
    },
  });
  return mqttClient;
};
