import { createAction } from 'redux-actions';
import { SET_MQTT_DATA, SET_REST_DATA } from '../constants/actionTypes';

export const setMQTTData = createAction(SET_MQTT_DATA);
export const setRESTData = createAction(SET_REST_DATA);
