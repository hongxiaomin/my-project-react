import React from 'react';
import { ThemeProvider, getTheme, Header } from '@delta/common-utils';
import MyRouter from '../routes';
import './style.less';

const theme = getTheme({
  appBar: {
    color: '#0086DB',
    height: 56,
  },
});
const App = () => (
  <ThemeProvider muiTheme={theme}>
    <div className="app-wrapper-style">
      <div className="app-wrapper-header">
        <Header title="AMS Advanced Manufacturing System" routerName="myRouter" />
      </div>
      <div className="app-wrapper-content">
        <MyRouter name="myRouter" />
      </div>
    </div>
  </ThemeProvider>
);

export default App;
