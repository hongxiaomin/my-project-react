import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import UIUtilityViewContainer from '../../containers/UIUtilityViewContainer';
import store from '../../store';
import { deltaTheme } from '../../constants';

const history = syncHistoryWithStore(hashHistory, store, {
  // fix https://github.com/ReactTraining/react-router/issues/4467, return empty {}
  selectLocationState: () => ({}),
  // selectLocationState: state => ({
  //   locationBeforeTransitions: state.getIn(['routing', 'locationBeforeTransitions']).toJS(),
  // }),
});

const MainView = () => (
  <MuiThemeProvider muiTheme={deltaTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="*" component={UIUtilityViewContainer} />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default MainView;
