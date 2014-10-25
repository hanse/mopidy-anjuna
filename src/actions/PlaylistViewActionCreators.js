var AppDispatcher = require('../AppDispatcher');
var PlaylistActionTypes = require('../Constants').PlaylistActionTypes;

module.exports = {

  changePlaylist: function(playlist) {
    AppDispatcher.handleViewAction({
      type: PlaylistActionTypes.CHANGE_PLAYLIST,
      playlist: playlist
    });
  },
};
