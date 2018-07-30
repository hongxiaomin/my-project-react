import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainView from './src/components/main-view';

injectTapEventPlugin();

const container = document.getElementById('container');

render(
  <AppContainer>
    <MainView />
  </AppContainer>,
  container,
);

if (module.hot) {
  module.hot.accept('./src/components/main-view', () => {
    const NextMainView = require('./src/components/main-view').default;

    render(
      <AppContainer>
        <NextMainView />
      </AppContainer>,
      container,
    );
  });
}
