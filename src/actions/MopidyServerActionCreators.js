var AppDispatcher = require('../AppDispatcher');
var MopidyActionTypes = require('../Constants').MopidyActionTypes;

module.exports = {

  receivePlaylists: function(playlists) {
    AppDispatcher.handleServerAction({
      type: MopidyActionTypes.RECEIVE_PLAYLISTS,
      playlists: playlists
    });
  },
};
