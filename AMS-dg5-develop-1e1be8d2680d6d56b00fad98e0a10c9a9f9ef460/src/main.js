import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './layouts';

injectTapEventPlugin();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
};

if (module.hot) {
  module.hot.accept('./layouts', async () => {
    const { default: nextApp } = await import('./layouts');
    render(nextApp);
  });
}

render(App);

