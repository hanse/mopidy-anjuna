var AppDispatcher = require('../AppDispatcher');
var PlaylistActionTypes = require('../Constants').PlaylistActionTypes;

module.exports = {

  receivePlaylists: function(playlists) {
    AppDispatcher.handleServerAction({
      type: PlaylistActionTypes.RECEIVE_PLAYLISTS,
      playlists: playlists
    });
  },
};
