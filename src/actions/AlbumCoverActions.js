var createActions = require('../createActions');

var AlbumCoverActions = createActions({

  albumCoverReceived(cover) {
    return {
      cover: cover
    };
  }
});

module.exports = AlbumCoverActions;
