import React from 'react';
import Dispatcher from './utils/Dispatcher';
import App from './components/App';

Dispatcher.register(payload => {
  console.log('[Flux]', payload.action.type, payload.action);
});

React.render(<App />, document.getElementById('app'));
