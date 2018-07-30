import { fromJS } from 'immutable';
import check from 'check-types';
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
  SET_USED_ICON,
  UPDATE_ICON_DATA,
  UPDATE_DEPLOY_TO_SERVER_FEEDBACK,
} from '../constants/actionTypes';

/**
 * [initialState description]
 * @type {Object}
 */
const initialState = fromJS({
  selectedProperty: {
    prop: [],
    style: [],
  },
  selectedStencil: {},
  mqttSetting: {
    ip: '',
    port: '',
    username: '',
    password: '',
  },
  mqttDataArrivedTime: null,
  mqttData: {},
  doubleSelectedStencilModelId: '',
  restData: {},
  iconData: {
    fieldName: '',     // component's prop name
    searchedText: '',  // search key word
    selectedIcon: '',  // original icon value
    oldPickedIcon: '', // tmp pick old
    newPickedIcon: '', // tmp pick new
  },
  deployToServerFeedback: {
    // example: {"success":true,"url":"http://10.120.136.90:3010/apps/test/"}
  },
});

// when click submit from PropertySelectionModal
const handleSelectedPropertySubmitted = (state, { payload }) => {
  const prop = state.getIn(['selectedProperty', 'prop'])
                              .concat(payload.moreProps.get('prop'));
  const style = state.getIn(['selectedProperty', 'style'])
                                .concat(payload.moreProps.get('style'));
  const newSelectedProperty = fromJS({ prop, style });

  return state.set('selectedProperty', newSelectedProperty);
};

// when close right stencilEditorDrawer
const handleSelectedPropertyReset = (state) => {
  const newState = state.set('selectedProperty', fromJS({ prop: [], style: [] }));

  return newState;
};

// when click trash icon next to stencil prop
// payload.propNames is a list since may have duplicated prop
const handleSelectedPropertyDeleted = (state, { payload }) => {
  let newState = state;
  const prop = newState.getIn(['selectedProperty', 'prop']);
  const style = newState.getIn(['selectedProperty', 'style']);

  for (let i = 0, j = payload.propNames.get('prop'); i < j.size; i++) {
    const propName = j.get(i);

    if (prop.indexOf(propName) > -1) {
      const newSelectedProperty = prop.delete(i);
      newState = newState.setIn(['selectedProperty', 'prop'], newSelectedProperty);
    }
  }
  for (let i = 0, j = payload.propNames.get('style'); i < j.size; i++) {
    const propName = j.get(i);

    if (style.indexOf(propName) > -1) {
      const newSelectedProperty = style.delete(i);
      newState = newState.setIn(['selectedProperty', 'style'], newSelectedProperty);
    }
  }

  return newState;
};

// when double click stencil will set stencil and show on right stencilEditorDrawer
const handleSelectedStencilSet = (state, { payload }) => (
  state.set('selectedStencil', payload.stencil)
);

// when close right stencilEditorDrawer
const handleSelectedStencilReset = (state) => state.set('selectedStencil', fromJS({}));

// when click trash icon next to stencil prop will update stencil prop on right stencilEditorDrawer
const handleSelectedStencilUpdated = (state, { payload }) => {
  let newProps;
  const props = state.getIn(['selectedStencil', 'props']);
  // click trash next to 'go to page'
  if (payload.removeActivity) {
    newProps = props.delete('onTouchTap');
  } else if (payload.updateActivity) {
    // only update onTouchTap, merge with original props
    newProps = props.merge(payload.properties);
  } else {
    // update style or element props, replace those and merge the original onTouchTap
    const activity = props.get('onTouchTap') === undefined ?
      fromJS({}) : fromJS({ onTouchTap: props.get('onTouchTap') });
    newProps = payload.properties.merge(activity);
  }
  return state.setIn(['selectedStencil', 'props'], newProps);
};

// currently this is for ListItem to add nestedItems
// when add nestedItems to stencil props, also need to update the selectedStencil props.nestedItems
// payload of ADD_PROPS_STENCIL different from UPDATE_STENCIL_PROPERTY, use this reducer to handle
const handlePropsStencilUpdated = (state, { payload }) => {
  const nestedItems = state.getIn(['selectedStencil', 'props', 'nestedItems']);
  const newNestedItems = nestedItems.push(payload);
  return state.setIn(['selectedStencil', 'props', 'nestedItems'], newNestedItems);
};

const handleMQTTSettingSet = (state, { payload }) => state.set('mqttSetting', payload.mqttSetting);

const handleMQTTDataSet = (state, { payload }) => {
  const mqttData = state.get('mqttData').mergeDeep(payload.mqttData);
  /*
  @see https://github.com/facebook/react/issues/3610
  if mqttData keep old data, use other prop key
   */
  return state.set('mqttData', mqttData)
              .set('mqttDataArrivedTime', payload.mqttDataArrivedTime);
};
/**
 * set model id for highlight select stencil (double click)
 * @param  {[type]} state           [description]
 * @param  {[type]} options.payload [description]
 * @return {[type]}                 [description]
 */
const handleSetDoubleSelectedStencil = (state, { payload }) => (
  state.set('doubleSelectedStencilModelId', payload && payload.modelId ? payload.modelId : '')
);
/**
 * reset model id for highlight select stencil (double click)
 * @param  {[type]} state           [description]
 * @return {[type]}                 [description]
 */
const handleResetDoubleSelectedStencil = (state) => (
  state.set('doubleSelectedStencilModelId', '')
);

const handleRESTDataSet = (state, { payload }) => {
  const restData = state.get('restData').set(payload.prefix, payload.restData);
  return state.set('restData', restData);
};
/**
 * keep search text for icon selector
 * @param  {[type]} state           [description]
 * @param  {[type]} options.payload [description]
 * @return {[type]}                 [description]
 */
const handleSetIconSearchedText = (state, { payload }) => (
  state.setIn(['iconData', 'searchedText'], payload.searchText)
);
/**
 * pick old icon
 * @param  {[type]} state           [description]
 * @param  {[type]} options.payload [description]
 * @return {[type]}                 [description]
 */
const handlePickOldIcon = (state) => (
  state.setIn(['iconData', 'oldPickedIcon'], state.getIn(['iconData', 'newPickedIcon']))
);
/**
 * pick new icon
 * @param  {[type]} state           [description]
 * @param  {[type]} options.payload [description]
 * @return {[type]}                 [description]
 */
const handlePickNewIcon = (state, { payload }) => (
  state.setIn(['iconData', 'newPickedIcon'], payload.iconName)
);
/**
 * reset icon data
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
const handleResetIconData = (state) => (
  state.set('iconData', fromJS({
    fieldName: '',
    searchedText: '',
    selectedIcon: '',
    oldPickedIcon: '',
    newPickedIcon: '',
  }))
);

const handleSetUsedIcon = (state, { payload }) => (
  state.setIn(['iconData', 'selectedIcon'], payload.iconName)
    .setIn(['iconData', 'fieldName'], payload.fieldName)
);

const handleUpdateIconData = (state, { payload }) => (
  state.setIn(['iconData', 'searchedText'], payload.searchedText)
    .setIn(['iconData', 'selectedIcon'], payload.selectedIcon)
    .setIn(['iconData', 'oldPickedIcon'], payload.oldPickedIcon)
    .setIn(['iconData', 'newPickedIcon'], payload.newPickedIcon)
);

const handleUpdateDeployToServerFeedback = (state, { payload }) => (
  state.set('deployToServerFeedback', payload)
);

const reducers = {
  [SUBMIT_SELECTED_PROPERTY]: handleSelectedPropertySubmitted,
  [RESET_SELECTED_PROPERTY]: handleSelectedPropertyReset,
  [DELETE_SELECTED_PROPERTY]: handleSelectedPropertyDeleted,
  [SET_SELECTED_STENCIL]: handleSelectedStencilSet,
  [RESET_SELECTED_STENCIL]: handleSelectedStencilReset,
  [SET_MQTT_SETTING]: handleMQTTSettingSet,
  [SET_MQTT_DATA]: handleMQTTDataSet,
  [RESET_DOUBLE_SELECTED_STENCIL]: handleResetDoubleSelectedStencil,
  [SET_DOUBLE_SELECTED_STENCIL]: handleSetDoubleSelectedStencil,
  [SET_REST_DATA]: handleRESTDataSet,
  [PICK_NEW_ICON]: handlePickNewIcon,
  [PICK_OLD_ICON]: handlePickOldIcon,
  [RESET_ICON_DATA]: handleResetIconData,
  [SET_ICON_SEARCHED_TEXT]: handleSetIconSearchedText,
  [SET_USED_ICON]: handleSetUsedIcon,
  [UPDATE_ICON_DATA]: handleUpdateIconData,
  [UPDATE_DEPLOY_TO_SERVER_FEEDBACK]: handleUpdateDeployToServerFeedback,
};

const fields = (state = initialState, action) => {
  let nextState = state;
  if (!check.undefined(reducers[action.type])) {
    nextState = reducers[action.type](state, action);
  }
  switch (action.type) {
    // when UPDATE_STENCIL_PROPERTY is dispatched, should also do handleSelectedStencilUpdated
    // but if the right drawer is closed, no need to update selectedStencil, it should be {}
    // if it's atypicalReChart, no need to update selectedStencil, propertyFormRow uses its parent
    case 'UPDATE_STENCIL_PROPERTY':
      if (action.payload.drawerClosed || action.payload.atypicalReChart) {
        // run ui-utility-core's handleStencilPropertyUpdated reducer
        break;
      }
      nextState = handleSelectedStencilUpdated(state, { payload: action.payload });
      break;
    case 'ADD_PROPS_STENCIL':
      nextState = handlePropsStencilUpdated(state, { payload: action.payload.stencil.get('id') });
      break;
    default:
      break;
  }
  return nextState;
};

export default fields;
