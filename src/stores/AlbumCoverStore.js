var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var AlbumCoverActionTypes = require('../Constants').AlbumCoverActionTypes;

var _coverURL = null;

var AlbumCoverStore = Store.create({

  getCoverURL: function() {
    return _coverURL;
  }
});

AlbumCoverStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case AlbumCoverActionTypes.RECEIVE_ALBUM_COVER:
      _coverURL = action.cover;
      AlbumCoverStore.emitChange();
      break;
  }

  return true;
});

module.exports = AlbumCoverStore;
