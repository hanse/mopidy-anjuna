var createActions = require('../createActions');

var PlaylistActions = createActions({
  changePlaylist(playlist) {
    return {
      playlist: playlist
    };
  },

  receivePlaylists(playlists) {
    return {
      playlists: playlists
    };
  }
});

module.exports = PlaylistActions;
