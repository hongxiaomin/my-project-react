import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import FileSaver from 'file-saver';
import 'whatwg-fetch';
import store from '../store';
import Appbar from '../components/appbar';
import { mqttClient } from '../constants/mqttClient';
import { RECHART_SPECIAL_TYPE } from '../constants/config';
import {
  getTopicsAndUrls, convertNonPrimitiveProps, resetDrawerSelectedStencil, outputZip,
} from '../utils';
import {
  setEditMode, setPreviewMode, deleteStencil, cloneStencil, loadPages,
  openMQTTSettingModal, setRESTData, updateStencilProperty, setMQTTData,
  openDeployToServerModal, openStencilCloneModal, openStencilCloneExplainModal,
} from '../actions';
import { version } from '../../package.json';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return str;
  }
  return JSON.parse(str);
}

function startSubscribeMQTT(dispatch, topics) {
  for (let i = 0; i < topics.length; i++) {
    mqttClient.subscribe(topics[i]);
    // when receive message from subscribed topic, save to store with its topic name
    // if it's JSON, parse it to object; if not, directly save to store
    mqttClient.onMessageArrived = ({ payloadString, destinationName }) => {
      const mqttData = { [destinationName]: isJson(payloadString) };
      dispatch(
        setMQTTData({ mqttData: fromJS(mqttData), mqttDataArrivedTime: new Date() })
      );
    };
  }
}
/**
 * remove CSS style in edit mode in canvas view
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} options.routing  [description]
 * @param  {[type]} options.isDoing  [description]
 * @return {[type]}                  [description]
 */
const removeEditModeStyle = ({ dispatch, routing, isDoing }) => {
  /*
  GridLayout
   */
  const hasEditModeComponent = ['GridLayout', 'Col'];
  for (let i = 0, j = routing.routes.length; i < j; i += 1) {
    const thisPageStencils = routing.routes[i].stencils;
    for (const componentId in thisPageStencils) {
      if (Object.hasOwnProperty.call(thisPageStencils, componentId)) {
        if (hasEditModeComponent.indexOf(thisPageStencils[componentId].name) > -1) {
          const oldProps = thisPageStencils[componentId].props;
          dispatch(updateStencilProperty({
            id: componentId,
            properties: (fromJS(oldProps).mergeDeep(fromJS({ isEditMode: !isDoing }))),
            pageIndex: i,
            drawerClosed: true,
          }));
        }
      }
    }
  }
};

const mapStateToProps = (state) => ({
  mode: state.getIn(['options', 'mode']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  routing: state.get('routing').toJS(),
  currentPageIndex: state.getIn(['routing', 'index']),
  mqttSetting: state.getIn(['fields', 'mqttSetting']).toJS(),
});

const checkTransformerType = (transformer) => {
  if (typeof transformer === 'string') {
    return eval(`(${transformer})`);
  }
  return transformer;
};

const mapDispatchToProps = (dispatch) => ({
  onModeChange: (mode, routing, mqttSetting) => {
    if (mode === 'edit') {
      const { urls, topics } = getTopicsAndUrls(routing.routes);
      // check if mqtt topics is set but mqtt ip is not, cause subscribe of null
      if (topics.length > 0 && mqttSetting.ip.replace(/\s/g, '').length === 0) {
        window.console.error('Cannot have MQTT Topic without MQTT IP.' +
          ' Please check MQTT Setup before switch to Preview Mode');
        return;
      }
      // other cases won't cause problem so try to subscribeMQTT if besides above case
      startSubscribeMQTT(dispatch, topics);

      if (urls.length > 0) {
        for (let i = 0; i < urls.length; i++) {
          // each url object has: model, url, prefix, pageIndex
          const { url, prefix, model, pageIndex } = urls[i];
          fetch(url)
          .then(resp => resp.json())
          .then(json => {
            dispatch(setRESTData({ prefix, restData: fromJS(json) }));
            const restData = store.getState().getIn(['fields', 'restData']).toJS();
            const { props, name, id } = model;
            // if user didn't edit the recharts setting
            // the default transformer is string, need to check and transfer
            if (RECHART_SPECIAL_TYPE.indexOf(name) > -1) {
              props.transformer = checkTransformerType(props.transformer);
              Object.assign(props, { data: props.transformer(restData[prefix]) });
            } else {
              props.dataTransformer.transformer =
                checkTransformerType(props.dataTransformer.transformer);
              Object.assign(props, { data: props.dataTransformer.transformer(restData[prefix]) });
            }
            dispatch(updateStencilProperty({
              id, properties: fromJS(props), pageIndex, drawerClosed: true,
            }));
          }).catch(ex => {
            window.console.error(ex);
          });
        }
      }

      removeEditModeStyle({ dispatch, routing, isDoing: true });

      dispatch(setPreviewMode());
    } else {
      removeEditModeStyle({ dispatch, routing, isDoing: false });

      dispatch(setEditMode());
    }
    resetDrawerSelectedStencil();
  },
  onDeleteClick: (id) => {
    dispatch(deleteStencil({ id }));
    resetDrawerSelectedStencil();
  },
  // purely clone to the same page, payload is selectedStencil and sourcePageIndex only
  // no need to specify: cloneType, destinationPageIndex, parentId
  onCloneClick: (selectedStencil, currentPageIndex) => {
    dispatch(cloneStencil({ stencil: fromJS(selectedStencil), sourcePageIndex: currentPageIndex }));
  },
  onOpenStencilCloneModalClick: (cloneType) => {
    dispatch(openStencilCloneModal({ type: cloneType }));
  },
  onOpenStencilCloneExplainModalClick: () => {
    dispatch(openStencilCloneExplainModal());
  },
  onProjectSaveClick: (routing, mqttSetting) => {
    outputZip({
      routing,
      mqttSetting,
    });
  },
  onJSONSaveClick: (routing) => {
    const appRouting = routing;
    delete appRouting.locationBeforeTransitions;
    // convert transformer to be string since only string can be saved to JSON
    appRouting.routes = convertNonPrimitiveProps(appRouting.routes, 'save');
    // the third parameter: 2 is for prettify JSON
    const blob = new Blob([JSON.stringify(appRouting, null, 2)], { type: 'application/json' });
    const timestamp = new Date().toISOString().replace(/[:|\.]+/g, '-');
    FileSaver.saveAs(blob, `${timestamp}_v${version}_app.json`);
  },
  onJSONLoadClick: (routingJSON) => {
    // convert transformer to be function since routingJSON is all string
    const routing = JSON.parse(routingJSON);
    routing.routes = convertNonPrimitiveProps(routing.routes, 'load');
    dispatch(loadPages({ pages: fromJS(routing) }));
  },
  onMQTTSetUp: () => {
    dispatch(openMQTTSettingModal());
  },
  onDeploySetUp: () => {
    dispatch(openDeployToServerModal());
  },
});

function onStencilAction(stateProps, dispatchProps, activity) {
  const { selectedStencil, currentPageIndex } = stateProps;
  // cannot delete/clone ROOT_DIV and don't dispatch if click delete/clone without selecting stencil
  if (selectedStencil.parentId !== null && selectedStencil.id !== undefined) {
    if (activity === 'delete') {
      dispatchProps.onDeleteClick(selectedStencil.id);
    } else if (activity === 'clone') {
      dispatchProps.onCloneClick(selectedStencil, currentPageIndex);
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    onDeleteClick: () => {
      onStencilAction(stateProps, dispatchProps, 'delete');
    },
    onCloneClick: () => {
      onStencilAction(stateProps, dispatchProps, 'clone');
    },
    onProjectSaveClick: () => {
      const { routing, mqttSetting } = stateProps;
      dispatchProps.onProjectSaveClick(routing, mqttSetting);
    },
    onJSONSaveClick: () => {
      dispatchProps.onJSONSaveClick(stateProps.routing);
    },
    onModeChange: () => {
      const { mode, routing, mqttSetting } = stateProps;
      dispatchProps.onModeChange(mode, routing, mqttSetting);
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Appbar);
