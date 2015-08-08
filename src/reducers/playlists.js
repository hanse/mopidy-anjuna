import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

const initialState = {
  items: [],
  selectedIndex: 0
};

export default createReducer(initialState, {
  [ActionTypes.RECEIVE_PLAYLISTS]: (state, { payload }) => ({ ...state, items: payload }),
  [ActionTypes.SELECT_PLAYLIST]: (state, { payload }) => ({ ...state, selectedIndex: payload })
});
