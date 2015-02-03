var createActions = require('../createActions');

var MopidyActions = createActions({

  voidActions: ['connected', 'disconnected', 'playing', 'paused', 'stopped'],

  receivePlaylists(playlists) {
    return {
      playlists: playlists
    };
  },

  getCurrentTrack(track) {
    return {
      track: track
    };
  },

  volumeChanged(newVolume) {
    return {
      volume: newVolume
    };
  }
});

module.exports = MopidyActions;
