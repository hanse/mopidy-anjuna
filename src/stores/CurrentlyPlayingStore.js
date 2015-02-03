var createStore = require('../createStore');

var _track = {};
var _volume = 50;
var _timePosition = 0;
var _isPlaying = false;

function trackString() {
  if (Object.keys(_track).length === 0) return 'Nothing is playing';
  return _track.name + ' — ' + (_track.artists || []).map(function(artist) { return artist.name; }).join(', ')
}

var CurrentlyPlayingStore = createStore({

  getCurrentTrack() {
    return _track;
  },

  getState() {
    return {
      track: _track,
      isPlaying: _isPlaying,
      trackString: trackString(),
      volume: _volume
    };
  },

  actions: {
    paused() {
      _isPlaying = false;
      this.emitChange();
    },

    playing() {
      _isPlaying = true;
      this.emitChange();
    },

    getCurrentTrack(action) {
      _track = action.track || {};
      this.emitChange();
    },

    volumeChanged(action) {
      _volume = action.volume;
      this.emitChange();
    }
  }
});

module.exports = CurrentlyPlayingStore;
