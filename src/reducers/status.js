import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

// TODO: Find a decent default cover
const DEFAULT_COVER = '';

const initialState = {
  currentTrack: {},
  currentPlaylistName: '',
  volume: 50,
  timePosition: 0,
  isPlaying: false,
  connected: false,
  coverURL: DEFAULT_COVER
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
  [ActionTypes.GET_CURRENT_TRACK]: (state, action) => ({ ...state, coverURL: DEFAULT_COVER, currentTrack: action.payload || {} }),
  [ActionTypes.CHANGE_PLAYLIST]: (state, action) => ({ ...state, currentPlaylistName: action.payload }),
  [ActionTypes.VOLUME_CHANGED]: (state, action) => ({ ...state, volume: action.payload }),
  [ActionTypes.CONNECTED]: state => ({ ...state, connected: true }),
  [ActionTypes.DISCONNECTED]: state => ({ ...state, connected: false }),
  [ActionTypes.ALBUM_COVER_RECEIVED]: (state, action) => ({ ...state, coverURL: action.payload }),
  [ActionTypes.TIME_POSITION_RECEIVED]: (state, action) => ({ ...state, timePosition: action.payload })
});
