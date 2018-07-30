import { fromJS } from 'immutable';
import check from 'check-types';
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
  OPEN_ICON_SELECTOR_MODAL,
  CLOSE_ICON_SELECTOR_MODAL,
  OPEN_DEPLOY_TO_SERVER_MODAL,
  OPEN_DEPLOY_TO_SERVER_TOAST,
  CLOSE_DEPLOY_TO_SERVER_TOAST,
  CLOSE_DEPLOY_TO_SERVER_MODAL,
  OPEN_STENCIL_CLONE_MODAL,
  CLOSE_STENCIL_CLONE_MODAL,
  OPEN_STENCIL_CLONE_EXPLAIN_MODAL,
  CLOSE_STENCIL_CLONE_EXPLAIN_MODAL,
} from '../constants/actionTypes';

const initialState = fromJS({
  mode: 'edit',
  stencilEditorDrawer: {
    open: false,
    open2: false,
  },
  propertySelectionModal: {
    open: false,
  },
  pageEditorModal: {
    open: false,
  },
  pageManagerAction: 'add',
  rtchartEditorModal: {
    open: false,
  },
  rechartEditorModal: {
    open: false,
  },
  plainTableEditorModal: {
    open: false,
  },
  mqttSettingModal: {
    open: false,
  },
  iconSelectorModal: {
    open: false,
  },
  deployToServerModal: {
    open: false,
  },
  deployToServerToast: {
    open: false,
  },
  stencilCloneModal: {
    open: false,
    type: '',
  },
  stencilCloneExplainModal: {
    open: false,
  },
});

const handleEditModeSet = (state) => state.set('mode', 'edit');

const handlePreviewModeSet = (state) => state.set('mode', 'preview');

const handleStencilEditorDrawerOpened =
  (state) => state.setIn(['stencilEditorDrawer', 'open'], true)
              .setIn(['stencilEditorDrawer', 'open2'], false);

const handleStencilEditorDrawerClosed =
  (state) => state.setIn(['stencilEditorDrawer', 'open'], false);

const handleStencilEditorDrawerOpened2 =
  (state) => state.setIn(['stencilEditorDrawer', 'open2'], true)
              .setIn(['stencilEditorDrawer', 'open'], false);

const handleStencilEditorDrawerClosed2 =
  (state) => state.setIn(['stencilEditorDrawer', 'open2'], false);

const handlePropertySelectionModalOpened =
  (state) => state.setIn(['propertySelectionModal', 'open'], true);

const handlePropertySelectionModalClosed =
  (state) => state.setIn(['propertySelectionModal', 'open'], false);

const handlePageEditorModalOpened = (state) => state.setIn(['pageEditorModal', 'open'], true);

const handlePageEditorModalClosed = (state) => state.setIn(['pageEditorModal', 'open'], false);

const handlePageManagerActionChanged = (state, { payload }) =>
  state.set('pageManagerAction', payload.action);

const handleRTChartEditorModalOpened =
  (state) => state.setIn(['rtchartEditorModal', 'open'], true);

const handleRTChartEditorModalClosed =
  (state) => state.setIn(['rtchartEditorModal', 'open'], false);

const handleReChartEditorModalOpened =
  (state) => state.setIn(['rechartEditorModal', 'open'], true);

const handleReChartEditorModalClosed =
  (state) => state.setIn(['rechartEditorModal', 'open'], false);

const handlePlainTableEditorModalOpened =
  (state) => state.setIn(['plainTableEditorModal', 'open'], true);

const handlePlainTableEditorModalClosed =
  (state) => state.setIn(['plainTableEditorModal', 'open'], false);

const handleMQTTSettingModalOpened = (state) => state.setIn(['mqttSettingModal', 'open'], true);

const handleMQTTSettingModalClosed = (state) => state.setIn(['mqttSettingModal', 'open'], false);

const handleIconSelectorModalOpened = (state) => state.setIn(['iconSelectorModal', 'open'], true);

const handleIconSelectorModalClosed = (state) => state.setIn(['iconSelectorModal', 'open'], false);

const handleOpenDeployToServerModal = (state) => (
  state.setIn(['deployToServerModal', 'open'], true)
    .setIn(['deployToServerToast', 'open'], false)
);

const handleOpenDeployToServerToast = (state) => state.setIn(['deployToServerToast', 'open'], true);

const handleCloseDeployToServerToast = (state) => (
  state.setIn(['deployToServerToast', 'open'], false)
);

const handleCloseDeployToServerModal = (state) => (
  state.setIn(['deployToServerModal', 'open'], false)
);

const handleStencilCloneModalOpened = (state, { payload }) =>
  state.setIn(['stencilCloneModal', 'open'], true).
  setIn(['stencilCloneModal', 'type'], payload.type);

const handleStencilCloneModalClosed = (state) =>
  state.setIn(['stencilCloneModal', 'open'], false).
  setIn(['stencilCloneModal', 'type'], '');

const handleStencilCloneExplainModalOpened = (state) => (
  state.setIn(['stencilCloneExplainModal', 'open'], true)
);

const handleStencilCloneExplainModalClosed = (state) => (
  state.setIn(['stencilCloneExplainModal', 'open'], false)
);

const reducers = {
  [SET_EDIT_MODE]: handleEditModeSet,
  [SET_PREVIEW_MODE]: handlePreviewModeSet,
  [OPEN_STENCIL_EDITOR_DRAWER]: handleStencilEditorDrawerOpened,
  [CLOSE_STENCIL_EDITOR_DRAWER]: handleStencilEditorDrawerClosed,
  [OPEN_STENCIL_EDITOR_DRAWER2]: handleStencilEditorDrawerOpened2,
  [CLOSE_STENCIL_EDITOR_DRAWER2]: handleStencilEditorDrawerClosed2,
  [OPEN_PROPERTY_SELECTION_MODAL]: handlePropertySelectionModalOpened,
  [CLOSE_PROPERTY_SELECTION_MODAL]: handlePropertySelectionModalClosed,
  [OPEN_PAGE_EDITOR_MODAL]: handlePageEditorModalOpened,
  [CLOSE_PAGE_EDITOR_MODAL]: handlePageEditorModalClosed,
  [CHANGE_PAGE_MANAGER_ACTION]: handlePageManagerActionChanged,
  [OPEN_RTCHART_EDITOR_MODAL]: handleRTChartEditorModalOpened,
  [CLOSE_RTCHART_EDITOR_MODAL]: handleRTChartEditorModalClosed,
  [OPEN_RECHART_EDITOR_MODAL]: handleReChartEditorModalOpened,
  [CLOSE_RECHART_EDITOR_MODAL]: handleReChartEditorModalClosed,
  [OPEN_PLAIN_TABLE_EDITOR_MODAL]: handlePlainTableEditorModalOpened,
  [CLOSE_PLAIN_TABLE_EDITOR_MODAL]: handlePlainTableEditorModalClosed,
  [OPEN_MQTT_SETTING_MODAL]: handleMQTTSettingModalOpened,
  [CLOSE_MQTT_SETTING_MODAL]: handleMQTTSettingModalClosed,
  [OPEN_ICON_SELECTOR_MODAL]: handleIconSelectorModalOpened,
  [CLOSE_ICON_SELECTOR_MODAL]: handleIconSelectorModalClosed,
  [OPEN_DEPLOY_TO_SERVER_MODAL]: handleOpenDeployToServerModal,
  [OPEN_DEPLOY_TO_SERVER_TOAST]: handleOpenDeployToServerToast,
  [CLOSE_DEPLOY_TO_SERVER_TOAST]: handleCloseDeployToServerToast,
  [CLOSE_DEPLOY_TO_SERVER_MODAL]: handleCloseDeployToServerModal,
  [OPEN_STENCIL_CLONE_MODAL]: handleStencilCloneModalOpened,
  [CLOSE_STENCIL_CLONE_MODAL]: handleStencilCloneModalClosed,
  [OPEN_STENCIL_CLONE_EXPLAIN_MODAL]: handleStencilCloneExplainModalOpened,
  [CLOSE_STENCIL_CLONE_EXPLAIN_MODAL]: handleStencilCloneExplainModalClosed,
};

const options = (state = initialState, action) => {
  let nextState = state;
  if (!check.undefined(reducers[action.type])) {
    nextState = reducers[action.type](state, action);
  }
  return nextState;
};

export default options;
