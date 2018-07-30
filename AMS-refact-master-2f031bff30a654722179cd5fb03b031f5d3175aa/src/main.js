/**
fileName    : main.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import MainRouter from './components/MainRouter';
import './layout/style';

const App = () => (
  <div>
    <MainRouter />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
