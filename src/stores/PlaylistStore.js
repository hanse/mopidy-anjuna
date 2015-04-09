import createStore from '../createStore';

var _playlists = {};
var _currentPlaylist;
function _addPlaylists(playlists) {
  playlists.forEach(function(playlist) {
    _playlists[playlist.name] = playlists[playlist.name] || playlist;
  });
}

var PlaylistStore = createStore({

  getCurrent() {
    return _currentPlaylist;
  },

  getByName(name) {
    return _playlists[name];
  },

  getAll() {
    return Object.keys(_playlists).map((name) => {
      return _playlists[name];
    });
  },

  isEmpty() {
    return Object.keys(_playlists).length === 0;
  },

  actions: {
    receivePlaylists(action) {
      _addPlaylists(action.playlists);
      this.emitChange();
    },

    changePlaylist(action) {
      _currentPlaylist = _playlists[action.playlist];
      this.emitChange();
    }
  }
});

export default PlaylistStore;
