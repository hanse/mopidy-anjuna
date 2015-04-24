import createStore from '../utils/createStore';

let _track = {};
let _playlist = '';
let _volume = 50;
let _timePosition = 0;
let _isPlaying = false;
let _connected = false;
let _coverURL = null;

const StatusStore = createStore({

  getState() {
    return {
      currentTrack: _track,
      currentPlaylistName: _playlist,
      isPlaying: _isPlaying,
      volume: _volume,
      connected: _connected,
      coverURL: _coverURL
    };
  },

  actions: {
    paused() {
      _isPlaying = false;
    },

    stopped() {
      _isPlaying = false;
      _track = {};
    },

    playing() {
      _isPlaying = true;
    },

    getCurrentTrack(action) {
      _track = action.track || {};
    },

    changePlaylist(action) {
      _playlist = action.playlist || '';
    },

    volumeChanged(action) {
      _volume = action.volume;
    },

    connected() {
      _connected = true;
    },

    disconnected() {
      _connected = false;
    },

    albumCoverReceived(action) {
      _coverURL = action.cover;
    }
  }
});

export default StatusStore;
