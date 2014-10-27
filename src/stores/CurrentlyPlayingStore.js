var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var MopidyActionTypes = require('../Constants').MopidyActionTypes;


var _track = {};
var _volume = 1;
var _timePosition = 0;
var _isPlaying = false;

function trackString() {
  if (Object.keys(_track).length === 0) return 'Nothing is playing';
  return _track.name + ' — ' + (_track.artists || []).map(function(artist) { return artist.name; }).join(', ')
}

var CurrentlyPlayingStore = Store.create({

  getCurrentTrack: function() {
    return _track;
  },

  getState: function() {
    return {
      track: _track,
      isPlaying: _isPlaying,
      trackString: trackString(),
      volume: _volume
    };
  }
});

CurrentlyPlayingStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {
    case MopidyActionTypes.PAUSED:
    case MopidyActionTypes.STOPPED:
      _isPlaying = false;
      CurrentlyPlayingStore.emitChange();
      break;

    case MopidyActionTypes.PLAYING:
      _isPlaying = true;
      CurrentlyPlayingStore.emitChange();
      break;

    case MopidyActionTypes.GET_CURRENT_TRACK:
      _track = action.track || {};
      CurrentlyPlayingStore.emitChange();
      break;

    case MopidyActionTypes.VOLUME_CHANGED:
      _volume = action.volume;
      CurrentlyPlayingStore.emitChange();
      break;
  }

  return true;
});

module.exports = CurrentlyPlayingStore;
