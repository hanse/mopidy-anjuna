import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loggerMiddleware, loadState } from './utils';
import mopidyMiddleware from './mopidyMiddleware';
import reducer from './reducers';

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, mopidyMiddleware(), loggerMiddleware),
    loadState()
  )
);
