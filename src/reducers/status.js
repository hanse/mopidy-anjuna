import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

const initialState = {
  currentTrack: {},
  currentPlaylistName: '',
  volume: 50,
  timePosition: 0,
  isPlaying: false,
  connected: false,
  covers: {}
};

/**
 * Status reducer
 *
 * Manage general music player state
 */
export default createReducer(initialState, {
  [ActionTypes.PAUSED]: state => ({ ...state, isPlaying: false }),
  [ActionTypes.STOPPED]: state => ({ ...state, isPlaying: false, currentTrack: {} }),
  [ActionTypes.PLAYING]: state => ({ ...state, isPlaying: true }),
  [ActionTypes.GET_CURRENT_TRACK]: (state, action) => ({ ...state, currentTrack: action.payload || {} }),
  [ActionTypes.CHANGE_PLAYLIST]: (state, action) => ({ ...state, currentPlaylistName: action.payload }),
  [ActionTypes.VOLUME_CHANGED]: (state, action) => ({ ...state, volume: action.payload }),
  [ActionTypes.CONNECTED]: state => ({ ...state, connected: true }),
  [ActionTypes.DISCONNECTED]: state => ({ ...state, connected: false }),
  [ActionTypes.ALBUM_COVER_RECEIVED]: (state, { payload }) => ({
    ...state,
    covers: { ...state.covers, [payload.track.uri]: payload.cover}
  }),
  [ActionTypes.TIME_POSITION_RECEIVED]: (state, action) => ({ ...state, timePosition: action.payload })
});
