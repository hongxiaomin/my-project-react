/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/


import React from 'react';
import HomeViewContainer from '../containers/HomeViewContainer';
import './style.less';

const Layout = ({ children }) => (
   <div>

  <HomeViewContainer childrenProp={children} />
  </div>
);
export default Layout;
