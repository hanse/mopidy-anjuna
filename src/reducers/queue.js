import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

export default createReducer([], {
  [ActionTypes.TRACKLIST_RECEIVED]: (state, { payload }) => payload
});
