import createStore from '../utils/createStore';

let _coverURL = null;

/**
 * Album Cover Store
 */
const AlbumCoverStore = createStore({

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
