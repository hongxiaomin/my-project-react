import { createAction } from 'redux-actions';
import {
  SET_EDIT_MODE,
  SET_PREVIEW_MODE,
  OPEN_STENCIL_EDITOR_DRAWER,
  CLOSE_STENCIL_EDITOR_DRAWER,
  OPEN_STENCIL_EDITOR_DRAWER2,
  CLOSE_STENCIL_EDITOR_DRAWER2,
  OPEN_PROPERTY_SELECTION_MODAL,
  CLOSE_PROPERTY_SELECTION_MODAL,
  OPEN_PAGE_EDITOR_MODAL,
  CLOSE_PAGE_EDITOR_MODAL,
  CHANGE_PAGE_MANAGER_ACTION,
  OPEN_RTCHART_EDITOR_MODAL,
  CLOSE_RTCHART_EDITOR_MODAL,
  OPEN_RECHART_EDITOR_MODAL,
  CLOSE_RECHART_EDITOR_MODAL,
  OPEN_PLAIN_TABLE_EDITOR_MODAL,
  CLOSE_PLAIN_TABLE_EDITOR_MODAL,
  OPEN_MQTT_SETTING_MODAL,
  CLOSE_MQTT_SETTING_MODAL,
  OPEN_DEPLOY_TO_SERVER_MODAL,
  CLOSE_DEPLOY_TO_SERVER_MODAL,
  OPEN_DEPLOY_TO_SERVER_TOAST,
  CLOSE_DEPLOY_TO_SERVER_TOAST,
  OPEN_STENCIL_CLONE_MODAL,
  CLOSE_STENCIL_CLONE_MODAL,
  OPEN_STENCIL_CLONE_EXPLAIN_MODAL,
  CLOSE_STENCIL_CLONE_EXPLAIN_MODAL,
} from '../constants/actionTypes';

export const setEditMode = createAction(SET_EDIT_MODE);
export const setPreviewMode = createAction(SET_PREVIEW_MODE);
export const openStencilEditorDrawer = createAction(OPEN_STENCIL_EDITOR_DRAWER);
export const closeStencilEditorDrawer = createAction(CLOSE_STENCIL_EDITOR_DRAWER);
export const openStencilEditorDrawer2 = createAction(OPEN_STENCIL_EDITOR_DRAWER2);
export const closeStencilEditorDrawer2 = createAction(CLOSE_STENCIL_EDITOR_DRAWER2);
export const openPropertySelectionModal = createAction(OPEN_PROPERTY_SELECTION_MODAL);
export const closePropertySelectionModal = createAction(CLOSE_PROPERTY_SELECTION_MODAL);
export const openPageEditorModal = createAction(OPEN_PAGE_EDITOR_MODAL);
export const closePageEditorModal = createAction(CLOSE_PAGE_EDITOR_MODAL);
export const changePageManagerAction = createAction(CHANGE_PAGE_MANAGER_ACTION);
export const openRTChartEditorModal = createAction(OPEN_RTCHART_EDITOR_MODAL);
export const closeRTChartEditorModal = createAction(CLOSE_RTCHART_EDITOR_MODAL);
export const openReChartEditorModal = createAction(OPEN_RECHART_EDITOR_MODAL);
export const closeReChartEditorModal = createAction(CLOSE_RECHART_EDITOR_MODAL);
export const openPlainTableEditorModal = createAction(OPEN_PLAIN_TABLE_EDITOR_MODAL);
export const closePlainTableEditorModal = createAction(CLOSE_PLAIN_TABLE_EDITOR_MODAL);
export const openMQTTSettingModal = createAction(OPEN_MQTT_SETTING_MODAL);
export const closeMQTTSettingModal = createAction(CLOSE_MQTT_SETTING_MODAL);
export const openDeployToServerModal = createAction(OPEN_DEPLOY_TO_SERVER_MODAL);
export const closeDeployToServerModal = createAction(CLOSE_DEPLOY_TO_SERVER_MODAL);
export const openDeployToServerToast = createAction(OPEN_DEPLOY_TO_SERVER_TOAST);
export const closeDeployToServerToast = createAction(CLOSE_DEPLOY_TO_SERVER_TOAST);
export const openStencilCloneModal = createAction(OPEN_STENCIL_CLONE_MODAL);
export const closeStencilCloneModal = createAction(CLOSE_STENCIL_CLONE_MODAL);
export const openStencilCloneExplainModal = createAction(OPEN_STENCIL_CLONE_EXPLAIN_MODAL);
export const closeStencilCloneExplainModal = createAction(CLOSE_STENCIL_CLONE_EXPLAIN_MODAL);
