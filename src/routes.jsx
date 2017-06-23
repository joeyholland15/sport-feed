import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import Research from './components/Research';
import TileMenu from './components/Menu/TileMenu';
import PlayerRoute from './components/Player/PlayerRoute';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/research" component={Research} />
    <Route path="/player/:playerId" component={PlayerRoute} />
    <IndexRoute component={TileMenu} />
  </Router>
);
