import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './redux';

global.log = function log(self = this) {
  console.log(self);
  return this;
};

render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById('root')
);
