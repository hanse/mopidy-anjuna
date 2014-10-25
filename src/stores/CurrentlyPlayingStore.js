var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var MopidyActionTypes = require('../Constants').MopidyActionTypes;


var _track = {};
var _volume = 1;
var _timePosition = 0;
var _isPlaying = false;

var CurrentlyPlayingStore = Store.create({
  getState: function() {
    return {
      track: _track,
      isPlaying: _isPlaying
    };
  }
});

CurrentlyPlayingStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {
    case MopidyActionTypes.PAUSED:
      _isPlaying = false;
      CurrentlyPlayingStore.emitChange();
      break;

    case MopidyActionTypes.PLAYING:
      _isPlaying = true;
      CurrentlyPlayingStore.emitChange();
      break;

    case MopidyActionTypes.GET_CURRENT_TRACK:
      _track = action.track;
      CurrentlyPlayingStore.emitChange();
      break;
  }

  return true;
});

module.exports = CurrentlyPlayingStore;
