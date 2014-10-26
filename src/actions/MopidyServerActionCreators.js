var AppDispatcher = require('../AppDispatcher');
var MopidyActionTypes = require('../Constants').MopidyActionTypes;

module.exports = {

  receivePlaylists: function(playlists) {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.RECEIVE_PLAYLISTS,
      playlists: playlists
    });
  },

  connected: function() {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.CONNECTED,
    });
  },

  disconnected: function() {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.DISCONNECTED,
    });
  },

  paused: function() {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.PAUSED,
    });
  },

  playing: function() {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.PLAYING,
    });
  },

  stopped: function() {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.STOPPED,
    });
  },

  getCurrentTrack: function(track) {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.GET_CURRENT_TRACK,
      track: track
    });
  },

  volumeChanged: function(newVolume) {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.VOLUME_CHANGED,
      volume: newVolume
    })
  },
};
