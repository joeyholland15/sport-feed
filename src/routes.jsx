import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import Research from './components/Research';
import TileMenu from './components/Menu/TileMenu';
import HitterRoute from './components/Player/HitterRoute';
import PitcherRoute from './components/Player/PitcherRoute';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/research" component={Research} />
    <Route path="/hitter/:playerId" component={HitterRoute} />
    <Route path="/pitcher/:playerId" component={PitcherRoute} />
    <IndexRoute component={TileMenu} />
  </Router>
);
