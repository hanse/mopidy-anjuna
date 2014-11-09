var AppDispatcher = require('../AppDispatcher');
var AlbumCoverActionTypes = require('../Constants').AlbumCoverActionTypes;

module.exports = {

  receiveAlbumCover: function(cover) {
    AppDispatcher.handleServerAction({
      type: AlbumCoverActionTypes.RECEIVE_ALBUM_COVER,
      cover: cover
    });
  }
};
