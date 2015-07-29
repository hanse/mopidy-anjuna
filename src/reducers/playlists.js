import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

const initialState = {
  items: [],
  currentPlaylistTracks: [],
  currentPlaylistName: ''
};

export default createReducer(initialState, {
  [ActionTypes.RECEIVE_PLAYLISTS]: (state, action) => {
    return { ...state, items: action.payload };
  },

  [ActionTypes.CHANGE_PLAYLIST]: (state, { payload }) => {
    return { ...state, currentPlaylistTracks: payload.tracks, currentPlaylistName: payload.name };
  }
});
