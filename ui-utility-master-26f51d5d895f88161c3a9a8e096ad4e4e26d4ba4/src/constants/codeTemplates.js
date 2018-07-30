export const COMPONENT_TEMPLATE = `
  import React, { Component } from 'react';
  import * as mui from 'material-ui';
  import RTChart from 'react-real-time-chart';
  import * as icons from 'material-ui/svg-icons';
  import * as GridLayout from './grid-layout/index.js';
  import * as DRC from 'drc.atoms';
  import store from '../store/index';

  class {{path}} extends Component {
    render() {
      return (
        {{view}}
      );
    }
  }

  export default {{path}};
`;

export const CONTAINER_TOPIC_TRANSFORMER_TEMPLATE = `
  {{data.key}}: {{data.value}},
`;

export const CONTAINER_CHART_INFO_TEMPLATE = `
  {{prefix}}: {
    {{topicTransformer}}
  },
`;

export const CONTAINER_STATE_TEMPLATE = `
  {{chartInfo}}
  {{state.key}}: {{state.value}},
`;

export const CONTAINER_DISPATCH_TEMPLATE = `
  {{dispatchName}}: () => {
    {{dispatchBody}};
  },
`;

export const MQTT_SUBSCRIPTION_TEMPLATE = `
  client.subscribe("{{topic}}");
`;

export const REST_URL_TEMPLATE = `
  { prefix: '{{url.prefix}}', url: '{{url.url}}'},
`;

export const REST_SETUP_TEMPLATE = `
  import store from '../store/index';
  import { fromJS } from 'immutable';
  import 'whatwg-fetch';
  import { setRESTData } from '../actions/index';

  export default () => {
    const urls = [{{urlInfos}}];
    if (urls.length > 0) {
      for (let i = 0; i < urls.length; i++) {
        // each url object has: model, url, prefix
        const { url, prefix } = urls[i];
        fetch(url)
        .then(resp => resp.json())
        .then(json => {
          store.dispatch(setRESTData({ prefix, restData: fromJS(json) }));
        }).catch(ex => {
          window.console.error(ex);
        });
      }
    }
  };
`;

export const MQTT_SETUP_TEMPLATE = `
  import 'paho-mqtt';
  import store from '../store/index';
  import { fromJS } from 'immutable';
  import { setMQTTData } from '../actions/index';
  import uuid from 'uuid';

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return str;
    }
    return JSON.parse(str);
  }

  export default () => {
    const client = new Paho.MQTT.Client('{{mqttSetting.ip}}', {{mqttSetting.port}}, uuid.v4());

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
      userName: "{{mqttSetting.username}}",
      password: "{{mqttSetting.password}}",
      onSuccess: () => {
        onConnect();
      },
      onFailure: (resp) => {
        window.console.log('MQTT Server Connection Failed', resp);
        client.connected = false;
      },
    });

    function onConnect() {
      // Once a connection has been made, make a subscription
      window.console.log("onConnect");
      {{subscriptions}}
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        window.console.log("onConnectionLost: " + responseObject.errorMessage);
      }
    }

    function onMessageArrived({ payloadString, destinationName }) {
      const mqttData = { [destinationName]: isJson(payloadString) };
      store.dispatch(setMQTTData({ mqttData: fromJS(mqttData) }));
    }
  };
`;

export const CONTAINER_TEMPLATE = `
  import { connect } from 'react-redux';
  import {{path}} from '../components/{{path}}';
  import { push } from 'react-router-redux'

  const mapStateToProps = (state) => ({
    {{container.states}}
  });

  const mapDispatchToProps = (dispatch) => ({
    {{container.dispatches}}
  });

  export default connect(mapStateToProps, mapDispatchToProps)({{path}});
`;

export const IMPORT_TEMPLATE = `
  import {{path}}Container from './containers/{{path}}Container';
`;

export const MAIN_VIEW_TEMPLATE = `
  import React from 'react';
  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
  import { Router, Route, hashHistory } from 'react-router';
  import { syncHistoryWithStore, push } from 'react-router-redux'
  import { Provider } from 'react-redux';
  import deltaTheme from './constants/deltaTheme';
  import store from './store/index';
  {{imports}}

  const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState: () => ({}),
  });

  const MainView = () => (
    React.createElement(
      MuiThemeProvider,
      {"muiTheme": deltaTheme},
      React.createElement(
        Provider,
        {"store": store},
        React.createElement(
          Router,
          {"history": history},
          {{routes}}
        )
      )
    )
  );

  store.dispatch(push('{{firstPage}}'));

  export default MainView;
`;

export const DEFAULT_ROUTE_TEMPLATE = `
  React.createElement(
    Route,
    {"path": "/", "component": {{path}}Container, "key": {{i}}},
    null
  )
`;

export const ROUTE_TEMPLATE = `
  React.createElement(
    Route,
    {"path": "/{{path}}", "component": {{path}}Container, "key": {{i}}},
    null
  ),
`;
