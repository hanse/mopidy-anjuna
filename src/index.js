var React = require('react');
var Router = require('react-router');
var {Routes, Route, DefaultRoute, NotFoundRoute} = Router;

var App = require('./components/App');

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
