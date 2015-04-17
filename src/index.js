import React from 'react';
import Router from 'react-router';

const { Route, DefaultRoute, NotFoundRoute } = Router;

const App = require('./components/App');

const routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
