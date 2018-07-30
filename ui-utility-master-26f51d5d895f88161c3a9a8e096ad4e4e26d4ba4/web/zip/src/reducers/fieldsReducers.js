import { fromJS } from 'immutable';
import check from 'check-types';
import { SET_MQTT_DATA, SET_REST_DATA } from '../constants/actionTypes';

const initialState = fromJS({
  mqttData: {},
  restData: {},
});

const handleMQTTDataSet = (state, { payload }) => {
  const mqttData = state.get('mqttData').mergeDeep(payload.mqttData);
  return state.set('mqttData', mqttData);
};

const handleRESTDataSet = (state, { payload }) => {
  const restData = state.get('restData').set(payload.prefix, payload.restData);
  return state.set('restData', restData);
};

const reducers = {
  [SET_MQTT_DATA]: handleMQTTDataSet,
  [SET_REST_DATA]: handleRESTDataSet,
};

const fields = (state = initialState, action) => {
  let nextState = state;
  if (!check.undefined(reducers[action.type])) {
    nextState = reducers[action.type](state, action);
  }
  return nextState;
};

export default fields;
