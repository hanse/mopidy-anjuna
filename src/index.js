import React from 'react';
import {Routes, Route, DefaultRoute, NotFoundRoute} from 'react-router';

const App = require('./components/App');

const routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
