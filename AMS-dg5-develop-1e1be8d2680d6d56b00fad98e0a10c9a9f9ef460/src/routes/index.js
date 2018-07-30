import React from 'react';
import propTypes from 'prop-types';
import { Router, HashNavigator } from '@delta/common-utils';
import defaultRoutes from '../constants/Settings';
import './style.less';

const MyRouter = props => (
  <Router
    name={props.name}
    navigator={HashNavigator}
    routes={defaultRoutes}
  />
);
MyRouter.propTypes = {
  name: propTypes.string.isRequired,
};

export default MyRouter;
