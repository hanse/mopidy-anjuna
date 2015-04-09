import createStore from '../createStore';

var _coverURL = null;

/**
 * Album Cover Store
 */
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
});

export default AlbumCoverStore;
