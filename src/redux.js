import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loggerMiddleware, loadState } from './utils';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(loadState()(createStore));
const reducer = combineReducers(reducers);
export const store = createStoreWithMiddleware(reducer);
