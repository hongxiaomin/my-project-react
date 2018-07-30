import { createAction } from 'redux-actions';
import {
  SUBMIT_SELECTED_PROPERTY,
  RESET_SELECTED_PROPERTY,
  DELETE_SELECTED_PROPERTY,
  SET_SELECTED_STENCIL,
  RESET_SELECTED_STENCIL,
  SET_MQTT_SETTING,
  SET_MQTT_DATA,
  RESET_DOUBLE_SELECTED_STENCIL,
  SET_DOUBLE_SELECTED_STENCIL,
  SET_REST_DATA,
  PICK_NEW_ICON,
  PICK_OLD_ICON,
  RESET_ICON_DATA,
  SET_ICON_SEARCHED_TEXT,
  OPEN_ICON_SELECTOR_MODAL,
  CLOSE_ICON_SELECTOR_MODAL,
  SET_USED_ICON,
  UPDATE_ICON_DATA,
  UPDATE_DEPLOY_TO_SERVER_FEEDBACK,
} from '../constants/actionTypes';

export const submitSelectedProperty = createAction(SUBMIT_SELECTED_PROPERTY);
export const resetSelectedProperty = createAction(RESET_SELECTED_PROPERTY);
export const deleteSelectedProperty = createAction(DELETE_SELECTED_PROPERTY);
export const setSelectedStencil = createAction(SET_SELECTED_STENCIL);
export const resetSelectedStencil = createAction(RESET_SELECTED_STENCIL);
export const setMQTTSetting = createAction(SET_MQTT_SETTING);
export const setMQTTData = createAction(SET_MQTT_DATA);
export const resetDoubleSelectedStencil = createAction(RESET_DOUBLE_SELECTED_STENCIL);
export const setDoubleSelectedStencil = createAction(SET_DOUBLE_SELECTED_STENCIL);
export const setRESTData = createAction(SET_REST_DATA);
export const pickNewIcon = createAction(PICK_NEW_ICON);
export const pickOldIcon = createAction(PICK_OLD_ICON);
export const resetIconData = createAction(RESET_ICON_DATA);
export const updateIconData = createAction(UPDATE_ICON_DATA);
export const setIconSearchedText = createAction(SET_ICON_SEARCHED_TEXT);
export const openIconSelectorModal = createAction(OPEN_ICON_SELECTOR_MODAL);
export const closeIconSelectorModal = createAction(CLOSE_ICON_SELECTOR_MODAL);
export const setUsedIcon = createAction(SET_USED_ICON);
export const updateDeployToServerFeedback = createAction(UPDATE_DEPLOY_TO_SERVER_FEEDBACK);
