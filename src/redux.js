import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loggerMiddleware, loadState } from './utils';
import mopidyMiddleware from './mopidyMiddleware';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  mopidyMiddleware(),
  loggerMiddleware
)(loadState()(createStore));
const reducer = combineReducers(reducers);
export const store = createStoreWithMiddleware(reducer);
