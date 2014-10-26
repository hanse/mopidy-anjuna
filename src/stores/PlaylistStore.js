var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var PlaylistActionTypes = require('../constants').PlaylistActionTypes;

var _playlists = {};
var _currentPlaylist;
function _addPlaylists(playlists) {
  playlists.forEach(function(playlist) {
    _playlists[playlist.name] = playlists[playlist.name] || playlist;
  });
}

var PlaylistStore = Store.create({

  getCurrent: function() {
    return _currentPlaylist;
  },

  getByName: function(name) {
    return _playlists[name];
  },

  getAll: function() {
    var playlists = [];
    for (var playlist in _playlists) {
      playlists.push(_playlists[playlist]);
    }
    return playlists;
  },

  isEmpty: function() {
    return Object.keys(_playlists).length === 0;
  }
});

PlaylistStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {
    case PlaylistActionTypes.RECEIVE_PLAYLISTS:
      _addPlaylists(action.playlists);
      PlaylistStore.emitChange();
      break;

    case PlaylistActionTypes.CHANGE_PLAYLIST:
      _currentPlaylist = _playlists[action.playlist];
      window.localStorage.currentPlaylist = action.playlist;
      PlaylistStore.emitChange();
      break;
  }

  return true;
});

module.exports = PlaylistStore;
