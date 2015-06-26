import React from 'react';
import Router from 'react-router';
import Dispatcher from './utils/Dispatcher';

const { Route, DefaultRoute, NotFoundRoute } = Router;

const App = require('./components/App');

Dispatcher.register(payload => {
  console.log('[Flux]', payload.action.type, payload.action);
});

const routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.getElementById('app'));
});
