var createStore = require('../createStore');

var _coverURL = null;

var AlbumCoverStore = createStore({

  getCoverURL() {
    return _coverURL;
  },

  actions: {
    albumCoverReceived(action) {
      _coverURL = action.cover;
      this.emitChange();
    }
  }
})

module.exports = AlbumCoverStore;
