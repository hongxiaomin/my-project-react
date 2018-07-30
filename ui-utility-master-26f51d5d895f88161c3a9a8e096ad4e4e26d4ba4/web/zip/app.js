import React from 'react';
import { render } from 'react-dom';
import MainView from './src/MainView';
import setupMQTT from './src/setup/setupMQTT';
import setupREST from './src/setup/setupREST';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
setupREST();
setupMQTT();

render(<MainView />, document.getElementById('container'));
