import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

import ROUTE from './constants/routeConstants';
import CONSTS from './constants/commonConstants';

import App from './components';

export default (
  <Router history={browserHistory}>
    <Route path ={ROUTE.root} component={App}>
    </Route>
  </Router>
);
