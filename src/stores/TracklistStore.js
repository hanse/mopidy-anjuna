var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var PlaylistStore = require('./PlaylistStore');
var PlaylistActionTypes = require('../Constants').PlaylistActionTypes;

var TracklistStore = Store.create({
  getAll: function() {
    var playlist = PlaylistStore.getCurrent();
    if (playlist) return playlist.tracks;
    return [];
  }
});

TracklistStore.dispatchToken = AppDispatcher.register(function(payload) {

  AppDispatcher.waitFor([
    PlaylistStore.dispatchToken
  ]);

  var action = payload.action;
  switch (action.type) {
    case PlaylistActionTypes.CHANGE_PLAYLIST:
      TracklistStore.emitChange();
      break;
  }

  return true;
});

module.exports = TracklistStore;
