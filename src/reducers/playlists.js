import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';
import { formatArtists } from '../helpers';

const initialState = {
  items: [],
  currentPlaylistTracks: [],
  currentPlaylistName: '',
  selectedIndex: 0
};

export default createReducer(initialState, {
  [ActionTypes.RECEIVE_PLAYLISTS]: (state, action) => ({ ...state, items: action.payload }),

  [ActionTypes.CHANGE_PLAYLIST]: (state, { payload }) => ({
    ...state,
    currentPlaylistTracks: payload.tracks.map(track =>
      ({ ...track, artistName: formatArtists(track.artists)})
    ),
    currentPlaylistName: payload.name
  }),
  
  [ActionTypes.SELECT_PLAYLIST]: (state, { payload }) => ({ ...state, selectedIndex: payload })
});
